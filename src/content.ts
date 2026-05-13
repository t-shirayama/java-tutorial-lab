import MarkdownIt from "markdown-it";
import hljs from "highlight.js";

type RawModules = Record<string, string>;

const markdownFiles = import.meta.glob("../docs/**/README.md", {
  query: "?raw",
  import: "default",
  eager: true
}) as RawModules;

const rootReadme = import.meta.glob("../README.md", {
  query: "?raw",
  import: "default",
  eager: true
}) as RawModules;

export type Section = {
  id: string;
  title: string;
  level: number;
};

export type Chapter = {
  slug: string;
  number: number;
  title: string;
  shortTitle: string;
  markdown: string;
  html: string;
  summary: string;
  sections: Section[];
  goals: string[];
  learningItems: string[];
  estimatedMinutes: number;
  difficulty: string;
};

export type Glossary = {
  slug: "glossary";
  title: string;
  markdown: string;
  html: string;
  sections: Section[];
};

export type HomeContent = {
  title: string;
  markdown: string;
  html: string;
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

const markdown: MarkdownIt = new MarkdownIt({
  html: false,
  linkify: true,
  typographer: true,
  highlight(code, language): string {
    if (language && hljs.getLanguage(language)) {
      return hljs.highlight(code, { language }).value;
    }
    return escapeHtml(code);
  }
});

function codeBlockKind(language: string): "source" | "command" | "output" {
  const normalized = language.toLowerCase();
  if (["bash", "sh", "shell", "zsh", "powershell", "ps1", "console"].includes(normalized)) {
    return "command";
  }
  if (["text", "txt", "plain", "output"].includes(normalized)) {
    return "output";
  }
  return "source";
}

markdown.renderer.rules.fence = (tokens, index, options) => {
  const token = tokens[index];
  const language = token.info.trim().split(/\s+/)[0] ?? "";
  const highlighted = options.highlight?.(token.content, language, "") ?? escapeHtml(token.content);
  const kind = codeBlockKind(language);
  const languageClass = language ? ` language-${escapeHtml(language)}` : "";

  return `<pre class="code-block code-block-${kind}"><code class="${languageClass.trim()}">${highlighted}</code></pre>\n`;
};

function slugify(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^\w\u3040-\u30ff\u3400-\u9fff]+/g, "-")
    .replace(/^-+|-+$/g, "") || "section";
}

function normalizeMarkdownLinks(markdownText: string): string {
  return markdownText
    .replace(/\]\(\.\.\/([0-9]{2}-[^/)]+)\/\)/g, "](#/chapters/$1)")
    .replace(/\]\(docs\/([0-9]{2}-[^/)]+)\/\)/g, "](#/chapters/$1)")
    .replace(/\]\(\.\.\/glossary\/\)/g, "](#/glossary)")
    .replace(/\]\(docs\/glossary\/\)/g, "](#/glossary)");
}

function renderMarkdown(markdownText: string): string {
  return markdown.render(normalizeMarkdownLinks(markdownText));
}

function extractTitle(markdownText: string): string {
  const title = markdownText.match(/^#\s+(.+)$/m)?.[1]?.trim();
  return title ?? "Javaチュートリアル";
}

function stripChapterPrefix(title: string): string {
  return title.replace(/^\d+章\s+/, "").trim();
}

function extractSections(markdownText: string): Section[] {
  const sections: Section[] = [];
  const used = new Map<string, number>();

  for (const match of markdownText.matchAll(/^(#{2,3})\s+(.+)$/gm)) {
    const level = match[1].length;
    const title = match[2].trim();
    const baseId = slugify(title);
    const count = used.get(baseId) ?? 0;
    used.set(baseId, count + 1);
    sections.push({
      id: count === 0 ? baseId : `${baseId}-${count + 1}`,
      title,
      level
    });
  }

  return sections;
}

function extractListAfterHeading(markdownText: string, heading: string): string[] {
  const lines = markdownText.split(/\r?\n/);
  const headingIndex = lines.findIndex((line) => line.trim() === `## ${heading}`);
  if (headingIndex === -1) {
    return [];
  }

  const items: string[] = [];
  for (const line of lines.slice(headingIndex + 1)) {
    if (line.startsWith("## ")) {
      break;
    }
    const item = line.match(/^-\s+(.+)$/)?.[1]?.trim();
    if (item) {
      items.push(item.replace(/`/g, ""));
    }
  }
  return items;
}

function extractSummary(markdownText: string): string {
  const withoutTitle = markdownText.replace(/^#\s+.+$/m, "").trim();
  const paragraph = withoutTitle
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .find((block) => block && !block.startsWith("#") && !block.startsWith("-") && !block.startsWith("```"));
  return paragraph?.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/`/g, "") ?? "";
}

function extractHeadingBlock(markdownText: string, heading: string): string {
  const lines = markdownText.split(/\r?\n/);
  const headingIndex = lines.findIndex((line) => line.trim() === `## ${heading}`);
  if (headingIndex === -1) {
    return "";
  }

  const block: string[] = [];
  for (const line of lines.slice(headingIndex + 1)) {
    if (line.startsWith("## ")) {
      break;
    }
    block.push(line);
  }

  return block.join("\n");
}

function countChecklistItems(markdownBlock: string): number {
  return Array.from(markdownBlock.matchAll(/^(?:[-*]|\d+\.)\s+\S/gm)).length;
}

function estimateMinutes(markdownText: string, sections: Section[], chapterNumber: number): number {
  const codeBlocks = Array.from(markdownText.matchAll(/```(\w+)?\r?\n([\s\S]*?)```/g));
  const textWithoutCode = markdownText.replace(/```[\s\S]*?```/g, "");
  const textCharacters = textWithoutCode
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[#>*_`|\-\[\]():]/g, "")
    .replace(/\s/g, "").length;

  const codeLineCount = codeBlocks.reduce((total, block) => {
    const language = block[1] ?? "";
    if (codeBlockKind(language) !== "source") {
      return total;
    }
    const lines = block[2].split(/\r?\n/).filter((line) => line.trim()).length;
    return total + lines;
  }, 0);
  const commandBlockCount = codeBlocks.filter((block) => codeBlockKind(block[1] ?? "") === "command").length;
  const h2Count = sections.filter((section) => section.level === 2).length;
  const h3Count = sections.filter((section) => section.level === 3).length;
  const handsOnCount = countChecklistItems(extractHeadingBlock(markdownText, "ハンズオン"));
  const exerciseCount =
    countChecklistItems(extractHeadingBlock(markdownText, "練習問題")) +
    Array.from(extractHeadingBlock(markdownText, "練習問題").matchAll(/^###\s+Level\s+\d+/gm)).length;
  const checkCount = countChecklistItems(extractHeadingBlock(markdownText, "理解チェック"));

  const readingMinutes = textCharacters / 450;
  const conceptMinutes = h2Count * 0.9 + h3Count * 0.4;
  const codeMinutes = codeBlocks.length + codeLineCount * 0.45;
  const commandMinutes = commandBlockCount * 1.5;
  const practiceMinutes = handsOnCount * 2.5 + exerciseCount * 3.5 + checkCount * 1.5;
  const complexityMultiplier = chapterNumber <= 7 ? 1 : chapterNumber <= 17 ? 1.06 : chapterNumber <= 23 ? 1.12 : 1.15;
  const estimated = (readingMinutes + conceptMinutes + codeMinutes + commandMinutes + practiceMinutes) * complexityMultiplier;

  return Math.min(120, Math.max(20, Math.round(estimated / 5) * 5));
}

function difficultyFor(number: number): string {
  if (number <= 7) {
    return "初級";
  }
  if (number <= 17) {
    return "標準";
  }
  if (number <= 23) {
    return "実務入口";
  }
  return "発展";
}

function chapterFrom(path: string, markdownText: string): Chapter | Glossary | null {
  const slug = path.match(/\.\.\/docs\/([^/]+)\/README\.md$/)?.[1];
  if (!slug) {
    return null;
  }

  const title = extractTitle(markdownText);
  const sections = extractSections(markdownText);
  const html = renderMarkdown(markdownText);

  if (slug === "glossary") {
    return {
      slug,
      title,
      markdown: markdownText,
      html,
      sections
    };
  }

  const number = Number(slug.match(/^(\d{2})-/)?.[1]);
  if (!Number.isFinite(number)) {
    return null;
  }

  const learningItems = extractListAfterHeading(markdownText, "この章で学ぶこと");
  const goals = extractListAfterHeading(markdownText, "この章でできるようになること");

  return {
    slug,
    number,
    title,
    shortTitle: stripChapterPrefix(title),
    markdown: markdownText,
    html,
    summary: extractSummary(markdownText),
    sections,
    goals,
    learningItems,
    estimatedMinutes: estimateMinutes(markdownText, sections, number),
    difficulty: difficultyFor(number)
  };
}

const parsedPages = Object.entries(markdownFiles)
  .map(([path, markdownText]) => chapterFrom(path, markdownText))
  .filter((page): page is Chapter | Glossary => Boolean(page));

export const chapters = parsedPages
  .filter((page): page is Chapter => page.slug !== "glossary")
  .sort((first, second) => first.number - second.number);

export const glossary = parsedPages.find((page): page is Glossary => page.slug === "glossary");

const homeMarkdown = Object.values(rootReadme)[0] ?? "# Javaチュートリアル";

export const homeContent: HomeContent = {
  title: extractTitle(homeMarkdown),
  markdown: homeMarkdown,
  html: renderMarkdown(homeMarkdown)
};

export function findChapter(slug: string | null): Chapter | undefined {
  return chapters.find((chapter) => chapter.slug === slug);
}

export function chapterHref(slug: string): string {
  return `#/chapters/${slug}`;
}

export function glossaryHref(): string {
  return "#/glossary";
}

export function homeHref(): string {
  return "#/";
}
