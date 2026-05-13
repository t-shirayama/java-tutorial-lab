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
    anchor: str
    path: Path
    markdown_text: str


def main() -> None:
    pages = collect_readmes()
    body = "\n".join(render_page(page) for page in pages)
    nav = render_nav(pages)
    html_text = render_html(nav, body)

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    OUTPUT_FILE.write_text(html_text, encoding="utf-8")
    print(f"Generated {OUTPUT_FILE.relative_to(ROOT)}")


def collect_readmes() -> list[ReadmePage]:
    pages = [make_page(ROOT / "README.md", "top")]
    chapter_paths = sorted((ROOT / "docs").glob("*/README.md"), key=chapter_sort_key)
    pages.extend(make_page(path, chapter_anchor(path)) for path in chapter_paths)
    return pages


def make_page(path: Path, anchor: str) -> ReadmePage:
    markdown_text = path.read_text(encoding="utf-8")
    title = extract_title(markdown_text) or path.parent.name
    return ReadmePage(title=title, anchor=anchor, path=path, markdown_text=markdown_text)


def chapter_sort_key(path: Path) -> tuple[int, str]:
    match = re.match(r"(\d+)-", path.parent.name)
    if match:
        return int(match.group(1)), path.parent.name
    return 10_000, path.parent.name


def chapter_anchor(path: Path) -> str:
    return f"chapter-{path.parent.name}"


def extract_title(markdown_text: str) -> str | None:
    for line in markdown_text.splitlines():
        if line.startswith("# "):
            return line.removeprefix("# ").strip()
    return None


def render_page(page: ReadmePage) -> str:
    source_note = html.escape(str(page.path.relative_to(ROOT)))
    content = markdown.markdown(
        normalize_links(page.markdown_text),
        extensions=["extra", "toc", "fenced_code", "codehilite"],
        extension_configs={
            "toc": {
                "permalink": True,
                "slugify": make_slugify(page.anchor),
            },
            "codehilite": {
                "guess_lang": False,
                "linenums": False,
                "use_pygments": True,
            },
        },
        output_format="html5",
    )
    return f"""
<section class="readme-section" id="{page.anchor}">
  <div class="source-path">{source_note}</div>
  {content}
</section>
"""


def normalize_links(markdown_text: str) -> str:
    result = markdown_text
    result = result.replace("](docs/", "](#chapter-")
    result = re.sub(r"\]\(#chapter-([^)]+)/\)", r"](#chapter-\1)", result)
    return result


def make_slugify(prefix: str):
    def slugify(value: str, separator: str) -> str:
        value = re.sub(r"[^\w\u3040-\u30ff\u3400-\u9fff]+", separator, value.lower())
        value = re.sub(f"{re.escape(separator)}+", separator, value).strip(separator)
        return f"{prefix}-{value or 'section'}"

    return slugify


def render_nav(pages: list[ReadmePage]) -> str:
    items = "\n".join(
        f'<a href="#{page.anchor}">{html.escape(page.title)}</a>' for page in pages
    )
    return f"""
<nav class="toc" aria-label="README目次">
  <div class="toc-title">目次</div>
  {items}
</nav>
"""


def render_html(nav: str, body: str) -> str:
    pygments_css = HtmlFormatter(style="friendly").get_style_defs(".codehilite")
    return f"""<!doctype html>
<html lang="ja">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Javaチュートリアル</title>
  <style>
{base_css()}
{pygments_css}
  </style>
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

blockquote {
  margin-left: 0;
  padding-left: 18px;
  color: var(--muted);
  border-left: 4px solid var(--line);
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
