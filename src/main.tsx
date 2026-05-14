import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  BookOpen,
  CheckCircle2,
  ChevronDown,
  Circle,
  Code2,
  FileText,
  Github,
  GraduationCap,
  Home,
  Lightbulb,
  Link2,
  ListChecks,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  Search,
  Sparkles,
  Target,
  Timer,
  X
} from "lucide-react";
import "@fontsource/noto-sans-jp/400.css";
import "@fontsource/noto-sans-jp/500.css";
import "@fontsource/noto-sans-jp/700.css";
import "@fontsource/noto-sans-jp/900.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/600.css";
import "@fontsource/jetbrains-mono/700.css";
import "highlight.js/styles/vs2015.css";
import "./styles.css";
import {
  Chapter,
  chapterHref,
  chapters,
  findChapter,
  glossary,
  glossaryHref,
  homeContent,
  homeHref
} from "./content";
import { loadProgress, ProgressState, saveProgress } from "./progressStorage";

type Route =
  | { kind: "home" }
  | { kind: "chapter"; slug: string }
  | { kind: "glossary" };

type SearchResult = {
  chapter: Chapter;
  score: number;
  excerpt: string;
};

const githubUrl = "https://github.com/t-shirayama/java-tutorial-lab";

function parseRoute(hash: string): Route {
  const value = hash.replace(/^#/, "") || "/";
  const chapterMatch = value.match(/^\/chapters\/([^/]+)$/);
  if (chapterMatch) {
    return { kind: "chapter", slug: chapterMatch[1] };
  }
  if (value === "/glossary") {
    return { kind: "glossary" };
  }
  return { kind: "home" };
}

function useRoute(): Route {
  const [route, setRoute] = useState<Route>(() => parseRoute(window.location.hash));

  useEffect(() => {
    const onHashChange = () => setRoute(parseRoute(window.location.hash));
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return route;
}

function searchChapters(query: string): SearchResult[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) {
    return [];
  }

  return chapters
    .map((chapter) => {
      const titleHit = chapter.title.toLowerCase().includes(normalized) ? 8 : 0;
      const sectionHit = chapter.sections.some((section) => section.title.toLowerCase().includes(normalized)) ? 5 : 0;
      const bodyIndex = chapter.markdown.toLowerCase().indexOf(normalized);
      const bodyHit = bodyIndex >= 0 ? 2 : 0;
      const score = titleHit + sectionHit + bodyHit;
      const excerpt =
        bodyIndex >= 0
          ? chapter.markdown
              .slice(Math.max(0, bodyIndex - 38), bodyIndex + normalized.length + 72)
              .replace(/\s+/g, " ")
          : chapter.summary;
      return { chapter, score, excerpt };
    })
    .filter((result) => result.score > 0)
    .sort((first, second) => second.score - first.score || first.chapter.number - second.chapter.number)
    .slice(0, 8);
}

function App() {
  const route = useRoute();
  const routeKey = route.kind === "chapter" ? `${route.kind}:${route.slug}` : route.kind;
  const [progress, setProgress] = useState<ProgressState>(() => loadProgress());
  const [query, setQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const activeChapter = route.kind === "chapter" ? findChapter(route.slug) : undefined;
  const activeSectionId = useActiveSection(activeChapter);
  const completedSet = useMemo(() => new Set(progress.completedChapters), [progress.completedChapters]);
  const completedCount = chapters.filter((chapter) => completedSet.has(chapter.slug)).length;
  const progressPercent = Math.round((completedCount / chapters.length) * 100);
  const searchResults = useMemo(() => searchChapters(query), [query]);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useLayoutEffect(() => {
    const root = document.documentElement;
    const previousScrollBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    const animationFrame = window.requestAnimationFrame(() => {
      root.style.scrollBehavior = previousScrollBehavior;
    });

    return () => window.cancelAnimationFrame(animationFrame);
  }, [routeKey]);

  useEffect(() => {
    const currentPage = window.location.hash || "#/";
    setProgress((previous) => {
      if (previous.lastVisitedPage === currentPage) {
        return previous;
      }
      const next = { ...previous, lastVisitedPage: currentPage };
      saveProgress(next);
      return next;
    });
  }, [route]);

  function toggleChapter(slug: string) {
    setProgress((previous) => {
      const completed = new Set(previous.completedChapters);
      if (completed.has(slug)) {
        completed.delete(slug);
      } else {
        completed.add(slug);
      }
      const next = {
        ...previous,
        completedChapters: Array.from(completed),
        lastVisitedPage: window.location.hash || "#/"
      };
      saveProgress(next);
      return next;
    });
  }

  return (
    <div className={`app-shell ${sidebarCollapsed ? "sidebar-collapsed" : ""}`}>
      <TopBar
        query={query}
        setQuery={setQuery}
        progressPercent={progressPercent}
        completedCount={completedCount}
        openSidebar={() => setSidebarOpen(true)}
      />
      <div className="app-body">
        <Sidebar
          activeChapter={activeChapter}
          activeSectionId={activeSectionId}
          completedSet={completedSet}
          open={sidebarOpen}
          collapsed={sidebarCollapsed}
          close={() => setSidebarOpen(false)}
          toggleCollapsed={() => setSidebarCollapsed((collapsed) => !collapsed)}
        />
        {sidebarCollapsed ? (
          <button
            className="sidebar-restore"
            type="button"
            onClick={() => setSidebarCollapsed(false)}
            aria-label="サイドメニューを開く"
          >
            <PanelLeftOpen size={18} />
            目次
          </button>
        ) : null}
        <main className="main-pane">
          {query.trim() ? (
            <SearchPanel query={query} results={searchResults} clear={() => setQuery("")} />
          ) : null}
          {route.kind === "home" ? <HomePage completedCount={completedCount} progressPercent={progressPercent} /> : null}
          {route.kind === "chapter" ? (
            activeChapter ? (
              <ChapterPage
                chapter={activeChapter}
                completed={completedSet.has(activeChapter.slug)}
                toggleCompleted={() => toggleChapter(activeChapter.slug)}
              />
            ) : (
              <NotFound />
            )
          ) : null}
          {route.kind === "glossary" ? <GlossaryPage /> : null}
        </main>
      </div>
    </div>
  );
}

function useActiveSection(activeChapter?: Chapter): string | undefined {
  const sectionIds = useMemo(
    () => new Set(activeChapter?.sections.filter((section) => /^\d+-\d+/.test(section.title)).map((section) => section.id) ?? []),
    [activeChapter]
  );
  const [activeSectionId, setActiveSectionId] = useState<string | undefined>();

  useEffect(() => {
    if (!activeChapter || sectionIds.size === 0) {
      setActiveSectionId(undefined);
      return;
    }

    let animationFrame = 0;

    const updateActiveSection = () => {
      animationFrame = 0;
      const headings = Array.from(document.querySelectorAll<HTMLElement>(".markdown-body h2[id], .markdown-body h3[id]"))
        .filter((heading) => sectionIds.has(heading.id));

      if (!headings.length) {
        setActiveSectionId(undefined);
        return;
      }

      const readingLine = 118;
      const current =
        headings
          .map((heading) => ({ id: heading.id, top: heading.getBoundingClientRect().top }))
          .filter((heading) => heading.top <= readingLine)
          .at(-1) ?? headings.map((heading) => ({ id: heading.id, top: heading.getBoundingClientRect().top }))[0];

      setActiveSectionId((previous) => (previous === current.id ? previous : current.id));
    };

    const scheduleUpdate = () => {
      if (animationFrame) {
        return;
      }
      animationFrame = window.requestAnimationFrame(updateActiveSection);
    };

    const timeout = window.setTimeout(updateActiveSection, 80);
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.clearTimeout(timeout);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
      }
    };
  }, [activeChapter, sectionIds]);

  return activeSectionId;
}

function TopBar({
  query,
  setQuery,
  progressPercent,
  completedCount,
  openSidebar
}: {
  query: string;
  setQuery: (query: string) => void;
  progressPercent: number;
  completedCount: number;
  openSidebar: () => void;
}) {
  return (
    <header className="topbar">
      <button className="icon-button mobile-menu" type="button" onClick={openSidebar} aria-label="章メニューを開く">
        <Menu size={20} />
      </button>
      <a className="brand-mark" href={homeHref()} aria-label="Javaチュートリアルトップ">
        <span className="java-cup">☕</span>
        <span>
          <strong>Javaチュートリアル</strong>
          <small>基礎からオブジェクト指向まで</small>
        </span>
      </a>
      <label className="search-box">
        <Search size={18} />
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="キーワードで検索..." />
        <kbd>Ctrl K</kbd>
      </label>
      <div className="top-actions">
        <div className="course-progress" aria-label={`コース進捗 ${progressPercent}%`}>
          <span>コース進捗</span>
          <strong>{progressPercent}%</strong>
          <div className="progress-track">
            <div style={{ width: `${progressPercent}%` }} />
          </div>
          <small>{completedCount}/28</small>
        </div>
        <a className="github-link" href={githubUrl} target="_blank" rel="noreferrer">
          <Github size={18} />
          GitHub
        </a>
        <div className="avatar">T</div>
      </div>
    </header>
  );
}

function Sidebar({
  activeChapter,
  activeSectionId,
  completedSet,
  open,
  collapsed,
  close,
  toggleCollapsed
}: {
  activeChapter?: Chapter;
  activeSectionId?: string;
  completedSet: Set<string>;
  open: boolean;
  collapsed: boolean;
  close: () => void;
  toggleCollapsed: () => void;
}) {
  function scrollToSection(sectionId: string) {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
    close();
  }

  return (
    <>
      <div className={`sidebar-backdrop ${open ? "show" : ""}`} onClick={close} />
      <aside className={`sidebar ${open ? "show" : ""} ${collapsed ? "collapsed" : ""}`} aria-hidden={collapsed && !open}>
        <div className="sidebar-top">
          <a className="all-chapters" href={homeHref()} onClick={close}>
            <Home size={16} />
            すべての章
          </a>
          <button
            className="icon-button sidebar-collapse"
            type="button"
            onClick={toggleCollapsed}
            aria-label={collapsed ? "サイドメニューを開く" : "サイドメニューを閉じる"}
          >
            {collapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
          </button>
          <button className="icon-button sidebar-close" type="button" onClick={close} aria-label="閉じる">
            <X size={18} />
          </button>
        </div>
        <div className="toc-heading">目次</div>
        <nav className="chapter-nav" aria-label="章一覧">
          {chapters.map((chapter) => {
            const active = activeChapter?.slug === chapter.slug;
            const completed = completedSet.has(chapter.slug);
            return (
              <React.Fragment key={chapter.slug}>
                <a
                  href={chapterHref(chapter.slug)}
                  className={`chapter-link ${active ? "active" : ""}`}
                  onClick={close}
                >
                  <span className="chapter-icon">{completed ? <CheckCircle2 size={15} /> : <FileText size={15} />}</span>
                  <span>{chapter.number}章 {chapter.shortTitle}</span>
                  {active ? <span className="active-dot" /> : null}
                </a>
                {active ? (
                  <div className="section-list">
                    {chapter.sections
                      .filter((section) => /^\d+-\d+/.test(section.title))
                      .map((section) => (
                        <button
                          key={section.id}
                          className={`section-link ${activeSectionId === section.id ? "active" : ""}`}
                          type="button"
                          onClick={() => scrollToSection(section.id)}
                        >
                          <Circle size={10} />
                          {section.title}
                        </button>
                      ))}
                  </div>
                ) : null}
              </React.Fragment>
            );
          })}
        </nav>
        <a className="about-link" href={glossaryHref()} onClick={close}>
          <BookOpen size={17} />
          用語集
          <ChevronDown size={16} />
        </a>
      </aside>
    </>
  );
}

function HomePage({ completedCount, progressPercent }: { completedCount: number; progressPercent: number }) {
  return (
    <section className="page-stack">
      <div className="home-hero">
        <div>
          <span className="eyebrow">
            <GraduationCap size={16} />
            Java 21 LTS対応
          </span>
          <h1>Javaチュートリアル</h1>
          <p>01章から28章まで、手を動かしながらJavaの基礎と実務入口を順番に学びます。</p>
          <div className="hero-actions">
            <a className="primary-action" href={chapterHref(chapters[0].slug)}>
              学習を始める
            </a>
            <a className="secondary-action" href={progressPercent > 0 ? loadProgress().lastVisitedPage : chapterHref(chapters[0].slug)}>
              前回の続き
            </a>
          </div>
        </div>
        <div className="home-progress-card">
          <Target size={28} />
          <strong>{progressPercent}%</strong>
          <span>{completedCount} / 28章 完了</span>
          <div className="progress-track large">
            <div style={{ width: `${progressPercent}%` }} />
          </div>
        </div>
      </div>
      <div className="chapter-grid">
        {chapters.map((chapter) => (
          <a key={chapter.slug} href={chapterHref(chapter.slug)} className="chapter-card">
            <span>{String(chapter.number).padStart(2, "0")}</span>
            <strong>{chapter.shortTitle}</strong>
            <small>{chapter.sections.filter((section) => section.level === 2).length} セクション</small>
          </a>
        ))}
      </div>
      <MarkdownArticle html={homeContent.html} />
    </section>
  );
}

function ChapterPage({
  chapter,
  completed,
  toggleCompleted
}: {
  chapter: Chapter;
  completed: boolean;
  toggleCompleted: () => void;
}) {
  const learningCards = buildLearningCards(chapter);
  const sectionRows = chapter.sections.filter((section) => /^\d+-\d+/.test(section.title));

  return (
    <section className="page-stack">
      <div className="breadcrumb">
        <Home size={15} />
        <span>Javaチュートリアル</span>
        <span>/</span>
        <strong>{chapter.title}</strong>
      </div>
      <header className="chapter-hero">
        <div className="chapter-hero-main">
          <div className="chapter-number">{chapter.number}</div>
          <div>
            <h1>{chapter.title}</h1>
            <p>{chapter.summary}</p>
            <div className="meta-row">
              <span><Timer size={15} /> 学習時間の目安: {chapter.estimatedMinutes}分</span>
              <span><BookOpen size={15} /> セクション数: {sectionRows.length || chapter.sections.length}</span>
              <span><Sparkles size={15} /> 難易度: {chapter.difficulty}</span>
            </div>
          </div>
        </div>
        <aside className="goal-card">
          <Target size={22} />
          <h2>この章のゴール</h2>
          <p>{chapter.goals[0] ?? `${chapter.shortTitle}の基本を説明し、サンプルコードで確認できるようになります。`}</p>
          <button type="button" className={completed ? "complete-button done" : "complete-button"} onClick={toggleCompleted}>
            {completed ? <CheckCircle2 size={18} /> : <Circle size={18} />}
            {completed ? "完了済み" : "未完了"}
          </button>
        </aside>
      </header>
      <div className="learning-card-grid">
        {learningCards.map((card) => (
          <div key={card.title} className="learning-card">
            <div className={`learning-icon ${card.color}`}>{card.icon}</div>
            <strong>{card.title}</strong>
            <p>{card.text}</p>
          </div>
        ))}
      </div>
      <div className="overview-grid">
        <InfoPanel title="この章でできるようになること" icon={<Target size={21} />}>
          <ul className="check-list">
            {(chapter.goals.length ? chapter.goals : chapter.learningItems).slice(0, 6).map((goal) => (
              <li key={goal}><CheckCircle2 size={17} /> {goal}</li>
            ))}
          </ul>
        </InfoPanel>
        <InfoPanel title="この章で学ぶこと" icon={<BookOpen size={21} />}>
          <ol className="number-list">
            {(chapter.learningItems.length ? chapter.learningItems : sectionRows.map((section) => section.title)).slice(0, 6).map((item, index) => (
              <li key={item}><span>{String(index + 1).padStart(2, "0")}</span>{item}</li>
            ))}
          </ol>
        </InfoPanel>
      </div>
      <InfoPanel title="この章の構成" icon={<ListChecks size={21} />}>
        <div className="section-table">
          {sectionRows.slice(0, 10).map((section, index) => (
            <div className="section-row" key={section.id}>
              <FileText size={18} />
              <strong>{section.title}</strong>
              <span>{chapter.learningItems[index] ?? "本文とサンプルコードで確認します"}</span>
              <small>{Math.max(5, Math.round(chapter.estimatedMinutes / Math.max(1, sectionRows.length)))}分</small>
            </div>
          ))}
        </div>
      </InfoPanel>
      <MarkdownArticle html={chapter.html} />
    </section>
  );
}

function buildLearningCards(chapter: Chapter) {
  const source = (chapter.learningItems.length ? chapter.learningItems : chapter.goals).slice(0, 4);
  const fallback = [
    `${chapter.shortTitle}の基本を理解します`,
    "サンプルコードを動かして確認します",
    "よくあるつまずきを整理します",
    "練習問題で自分のコードを書きます"
  ];
  const items = source.length >= 4 ? source : [...source, ...fallback].slice(0, 4);
  const icons = [
    { icon: <Code2 size={24} />, color: "blue" },
    { icon: <Search size={24} />, color: "purple" },
    { icon: <Lightbulb size={24} />, color: "green" },
    { icon: <Link2 size={24} />, color: "orange" }
  ];

  return items.map((item, index) => ({
    title: item.length > 22 ? `${item.slice(0, 22)}...` : item,
    text: item,
    ...icons[index]
  }));
}

function InfoPanel({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="info-panel">
      <h2>{icon}{title}</h2>
      {children}
    </section>
  );
}

function SearchPanel({ query, results, clear }: { query: string; results: SearchResult[]; clear: () => void }) {
  return (
    <section className="search-panel">
      <div className="search-panel-head">
        <strong>「{query}」の検索結果</strong>
        <button type="button" onClick={clear}>閉じる</button>
      </div>
      {results.length ? (
        <div className="search-results">
          {results.map(({ chapter, excerpt }) => (
            <a key={chapter.slug} href={chapterHref(chapter.slug)} onClick={clear}>
              <span>{chapter.number}章</span>
              <strong>{chapter.shortTitle}</strong>
              <p>{excerpt}</p>
            </a>
          ))}
        </div>
      ) : (
        <p>一致する章がありません。</p>
      )}
    </section>
  );
}

function GlossaryPage() {
  if (!glossary) {
    return <NotFound />;
  }
  return (
    <section className="page-stack">
      <div className="breadcrumb">
        <Home size={15} />
        <span>Javaチュートリアル</span>
        <span>/</span>
        <strong>用語集</strong>
      </div>
      <header className="simple-hero">
        <span className="eyebrow"><BookOpen size={16} /> 補助資料</span>
        <h1>{glossary.title}</h1>
        <p>学習中に出てきた用語を、必要なタイミングで確認するためのページです。</p>
      </header>
      <MarkdownArticle html={glossary.html} />
    </section>
  );
}

function MarkdownArticle({ html }: { html: string }) {
  return <article className="markdown-body" dangerouslySetInnerHTML={{ __html: html }} />;
}

function NotFound() {
  return (
    <section className="simple-hero">
      <h1>ページが見つかりません</h1>
      <p>章番号やURLを確認してください。</p>
      <a className="primary-action" href={homeHref()}>トップへ戻る</a>
    </section>
  );
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
