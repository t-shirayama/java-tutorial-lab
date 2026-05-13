from __future__ import annotations

import html
import re
from dataclasses import dataclass
from pathlib import Path

import markdown
from pygments.formatters import HtmlFormatter


ROOT = Path(__file__).resolve().parents[1]
OUTPUT_DIR = ROOT / "_site"
OUTPUT_FILE = OUTPUT_DIR / "index.html"


@dataclass(frozen=True)
class ReadmePage:
    title: str
    slug: str
    path: Path
    markdown_text: str


def main() -> None:
    pages = collect_readmes()
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    for page in pages:
        output_file = output_path(page)
        output_file.parent.mkdir(parents=True, exist_ok=True)
        output_file.write_text(render_html(pages, page), encoding="utf-8")
        print(f"Generated {output_file.relative_to(ROOT)}")


def collect_readmes() -> list[ReadmePage]:
    pages = [make_page(ROOT / "README.md", "index")]
    chapter_paths = sorted((ROOT / "docs").glob("*/README.md"), key=chapter_sort_key)
    pages.extend(make_page(path, path.parent.name) for path in chapter_paths)
    return pages


def make_page(path: Path, slug: str) -> ReadmePage:
    markdown_text = path.read_text(encoding="utf-8")
    title = extract_title(markdown_text) or path.parent.name
    return ReadmePage(title=title, slug=slug, path=path, markdown_text=markdown_text)


def chapter_sort_key(path: Path) -> tuple[int, str]:
    match = re.match(r"(\d+)-", path.parent.name)
    if match:
        return int(match.group(1)), path.parent.name
    return 10_000, path.parent.name


def extract_title(markdown_text: str) -> str | None:
    for line in markdown_text.splitlines():
        if line.startswith("# "):
            return line.removeprefix("# ").strip()
    return None


def output_path(page: ReadmePage) -> Path:
    if page.slug == "index":
        return OUTPUT_FILE
    return OUTPUT_DIR / "chapters" / page.slug / "index.html"


def page_href(from_page: ReadmePage, to_page: ReadmePage) -> str:
    from_dir = output_path(from_page).parent
    to_file = output_path(to_page)
    relative = to_file.relative_to(from_dir) if to_file.is_relative_to(from_dir) else None
    if relative is None:
        relative = Path("../" * len(from_dir.relative_to(OUTPUT_DIR).parts)) / to_file.relative_to(OUTPUT_DIR)
    href = relative.as_posix()
    return href if href else "index.html"


def render_page(page: ReadmePage, pages: list[ReadmePage]) -> str:
    source_note = html.escape(str(page.path.relative_to(ROOT)))
    content = markdown.markdown(
        normalize_links(page.markdown_text, page, pages),
        extensions=["extra", "toc", "fenced_code", "codehilite"],
        extension_configs={
            "toc": {
                "permalink": True,
                "slugify": make_slugify(page.slug),
            },
            "codehilite": {
                "guess_lang": False,
                "linenums": False,
                "use_pygments": True,
            },
        },
        output_format="html5",
    )
    pager = render_page_switcher(pages, page)
    return f"""
<article class="readme-section">
  <div class="source-path">{source_note}</div>
  {content}
  {pager}
</article>
"""


def render_page_switcher(pages: list[ReadmePage], current_page: ReadmePage) -> str:
    index = pages.index(current_page)
    previous_page = pages[index - 1] if index > 0 else None
    next_page = pages[index + 1] if index + 1 < len(pages) else None

    previous_link = (
        f'<a class="page-switcher-link previous" href="{page_href(current_page, previous_page)}">'
        f'<span>前へ</span><strong>{html.escape(previous_page.title)}</strong></a>'
        if previous_page else '<span></span>'
    )
    next_link = (
        f'<a class="page-switcher-link next" href="{page_href(current_page, next_page)}">'
        f'<span>次へ</span><strong>{html.escape(next_page.title)}</strong></a>'
        if next_page else '<span></span>'
    )
    return f"""
<nav class="page-switcher" aria-label="前後の章">
  {previous_link}
  {next_link}
</nav>
"""


def normalize_links(markdown_text: str, current_page: ReadmePage, pages: list[ReadmePage]) -> str:
    result = markdown_text
    chapter_pages = {f"docs/{page.slug}/": page for page in pages if page.slug != "index"}
    for markdown_href, page in chapter_pages.items():
        result = result.replace(f"]({markdown_href})", f"]({page_href(current_page, page)})")
    return result


def make_slugify(prefix: str):
    def slugify(value: str, separator: str) -> str:
        value = re.sub(r"[^\w\u3040-\u30ff\u3400-\u9fff]+", separator, value.lower())
        value = re.sub(f"{re.escape(separator)}+", separator, value).strip(separator)
        return f"{prefix}-{value or 'section'}"

    return slugify


def render_nav(pages: list[ReadmePage], current_page: ReadmePage) -> str:
    items = "\n".join(
        render_nav_item(page, current_page) for page in pages
    )
    return f"""
<nav class="toc" aria-label="README目次">
  <div class="toc-title">目次</div>
  {items}
</nav>
"""


def render_nav_item(page: ReadmePage, current_page: ReadmePage) -> str:
    active = ' class="active"' if page == current_page else ""
    return f'<a{active} href="{page_href(current_page, page)}">{html.escape(page.title)}</a>'


def render_html(pages: list[ReadmePage], current_page: ReadmePage) -> str:
    body = render_page(current_page, pages)
    nav = render_nav(pages, current_page)
    pygments_css = HtmlFormatter(style="friendly").get_style_defs(".codehilite")
    return f"""<!doctype html>
<html lang="ja">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{html.escape(current_page.title)} | Javaチュートリアル</title>
  <style>
{base_css()}
{pygments_css}
  </style>
  <script>
{copy_button_script()}
  </script>
</head>
<body>
  <div class="layout">
    <aside class="sidebar">
      <div class="brand">Javaチュートリアル</div>
      {nav}
    </aside>
    <main class="content">
      {body}
    </main>
  </div>
</body>
</html>
"""


def copy_button_script() -> str:
    return """
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("pre").forEach((block) => {
    if (block.closest(".codehilite")) {
      block = block.closest(".codehilite");
    }
    if (block.dataset.copyReady === "true") {
      return;
    }
    block.dataset.copyReady = "true";
    const button = document.createElement("button");
    button.className = "copy-code-button";
    button.type = "button";
    button.textContent = "コピー";
    button.addEventListener("click", async () => {
      const code = block.querySelector("code") || block.querySelector("pre") || block;
      await navigator.clipboard.writeText(code.innerText);
      button.textContent = "コピー済み";
      setTimeout(() => {
        button.textContent = "コピー";
      }, 1400);
    });
    block.appendChild(button);
  });
});
"""


def base_css() -> str:
    return """
:root {
  --paper: #fbf8f0;
  --paper-deep: #f2ecdf;
  --ink: #25211c;
  --muted: #6f665a;
  --line: #ded2bd;
  --accent: #2f6f73;
  --accent-deep: #1f5157;
  --code-bg: #fffdf7;
  --code-line: #87a99d;
  --shadow: rgba(47, 41, 32, 0.08);
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  background: var(--paper);
  color: var(--ink);
  font-family: "Hiragino Sans", "Yu Gothic", "YuGothic", "Noto Sans JP", sans-serif;
  line-height: 1.85;
}

a {
  color: var(--accent-deep);
  text-decoration-thickness: 0.08em;
  text-underline-offset: 0.18em;
}

.layout {
  display: grid;
  grid-template-columns: 280px minmax(0, 1fr);
  min-height: 100vh;
}

.sidebar {
  position: sticky;
  top: 0;
  height: 100vh;
  overflow: auto;
  padding: 28px 22px;
  background: var(--paper-deep);
  border-right: 1px solid var(--line);
}

.brand {
  margin-bottom: 22px;
  color: var(--accent-deep);
  font-size: 1.2rem;
  font-weight: 700;
}

.toc-title {
  margin-bottom: 10px;
  color: var(--muted);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
}

.toc a {
  display: block;
  padding: 7px 0;
  color: var(--ink);
  font-size: 0.93rem;
  text-decoration: none;
  border-bottom: 1px solid rgba(222, 210, 189, 0.7);
}

.toc a:hover {
  color: var(--accent);
}

.toc a.active {
  color: var(--accent-deep);
  font-weight: 700;
}

.content {
  width: min(100%, 980px);
  padding: 48px 42px 80px;
}

.readme-section {
  margin-bottom: 72px;
  padding-bottom: 48px;
  border-bottom: 1px solid var(--line);
}

.source-path {
  display: inline-block;
  margin-bottom: 14px;
  padding: 2px 9px;
  color: var(--muted);
  background: rgba(255, 253, 247, 0.72);
  border: 1px solid var(--line);
  border-radius: 999px;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 0.78rem;
}

h1,
h2,
h3 {
  line-height: 1.35;
}

h1 {
  margin: 0 0 20px;
  color: var(--accent-deep);
  font-size: 2.25rem;
}

h2 {
  margin-top: 46px;
  padding-top: 18px;
  border-top: 1px solid var(--line);
  font-size: 1.45rem;
}

h3 {
  margin-top: 32px;
  font-size: 1.12rem;
}

p,
ul,
ol {
  max-width: 760px;
}

li + li {
  margin-top: 0.25rem;
}

code {
  padding: 0.12em 0.35em;
  background: rgba(255, 253, 247, 0.88);
  border: 1px solid rgba(222, 210, 189, 0.7);
  border-radius: 4px;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 0.92em;
}

pre code {
  padding: 0;
  background: transparent;
  border: 0;
  border-radius: 0;
}

pre,
.codehilite {
  position: relative;
  max-width: 100%;
  overflow-x: auto;
  background: var(--code-bg);
  border: 1px solid var(--line);
  border-left: 5px solid var(--code-line);
  border-radius: 8px;
  box-shadow: 0 16px 34px var(--shadow);
}

pre,
.codehilite pre {
  margin: 18px 0;
  padding: 18px 20px;
}

.codehilite {
  margin: 18px 0;
}

.codehilite pre {
  margin: 0;
  border: 0;
  box-shadow: none;
}

.copy-code-button {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 2;
  padding: 5px 10px;
  color: var(--accent-deep);
  background: rgba(255, 253, 247, 0.92);
  border: 1px solid var(--line);
  border-radius: 999px;
  cursor: pointer;
  font: inherit;
  font-size: 0.78rem;
  line-height: 1.2;
  box-shadow: 0 8px 18px var(--shadow);
}

.copy-code-button:hover {
  color: #fff;
  background: var(--accent);
  border-color: var(--accent);
}

blockquote {
  margin-left: 0;
  padding-left: 18px;
  color: var(--muted);
  border-left: 4px solid var(--line);
}

table {
  display: block;
  width: 100%;
  max-width: 100%;
  margin: 24px 0 30px;
  overflow-x: auto;
  border: 1px solid var(--line);
  border-radius: 12px;
  border-spacing: 0;
  border-collapse: separate;
  background: rgba(255, 253, 247, 0.82);
  box-shadow: 0 14px 30px var(--shadow);
  font-size: 0.94rem;
  line-height: 1.75;
}

thead {
  background: linear-gradient(180deg, #e5f0ed 0%, #d8e8e4 100%);
  color: var(--accent-deep);
}

tbody tr:nth-child(even) {
  background: rgba(242, 236, 223, 0.58);
}

tbody tr:hover {
  background: rgba(226, 241, 236, 0.72);
}

th,
td {
  min-width: 8.5rem;
  padding: 12px 16px;
  vertical-align: top;
  border-right: 1px solid rgba(222, 210, 189, 0.9);
  border-bottom: 1px solid rgba(222, 210, 189, 0.9);
}

th {
  font-weight: 700;
  text-align: left;
  white-space: nowrap;
}

td {
  overflow-wrap: anywhere;
}

th:last-child,
td:last-child {
  border-right: 0;
}

tbody tr:last-child td {
  border-bottom: 0;
}

th:first-child,
td:first-child {
  min-width: 9rem;
  font-weight: 700;
}

th:last-child,
td:last-child {
  min-width: 24rem;
}

.page-switcher {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 16px;
  margin-top: 56px;
  padding-top: 24px;
  border-top: 1px solid var(--line);
}

.page-switcher-link {
  display: block;
  min-height: 88px;
  padding: 16px 18px;
  color: var(--ink);
  text-decoration: none;
  background: rgba(255, 253, 247, 0.78);
  border: 1px solid var(--line);
  border-radius: 14px;
  box-shadow: 0 12px 28px var(--shadow);
}

.page-switcher-link:hover {
  border-color: var(--accent);
  transform: translateY(-1px);
}

.page-switcher-link span {
  display: block;
  margin-bottom: 4px;
  color: var(--muted);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
}

.page-switcher-link strong {
  display: block;
  color: var(--accent-deep);
  line-height: 1.5;
}

.page-switcher-link.next {
  text-align: right;
}

@media (max-width: 860px) {
  .layout {
    display: block;
  }

  .sidebar {
    position: static;
    height: auto;
    padding: 22px 20px;
    border-right: 0;
    border-bottom: 1px solid var(--line);
  }

  .toc {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 0 14px;
  }

  .toc-title {
    grid-column: 1 / -1;
  }

  .content {
    padding: 34px 20px 60px;
  }

  h1 {
    font-size: 1.8rem;
  }

  .page-switcher {
    grid-template-columns: 1fr;
  }

  .page-switcher-link.next {
    text-align: left;
  }
}

@media print {
  body {
    background: white;
  }

  .layout {
    display: block;
  }

  .sidebar {
    display: none;
  }

  .content {
    width: 100%;
    padding: 0;
  }

  .readme-section {
    break-after: page;
  }
}
"""


if __name__ == "__main__":
    main()
