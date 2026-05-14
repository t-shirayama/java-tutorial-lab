import { expect, Page, test } from "@playwright/test";

async function layoutMetrics(page: Page) {
  return page.evaluate(() => {
    const rectFor = (selector: string) => {
      const element = document.querySelector(selector);
      if (!element) {
        throw new Error(`Missing element: ${selector}`);
      }
      const rect = element.getBoundingClientRect();
      return {
        top: rect.top,
        right: rect.right,
        bottom: rect.bottom,
        left: rect.left,
        width: rect.width,
        height: rect.height
      };
    };

    return {
      viewportWidth: window.innerWidth,
      scrollWidth: document.documentElement.scrollWidth,
      sidebar: rectFor(".sidebar"),
      main: rectFor(".main-pane"),
      hero: rectFor(".chapter-hero"),
      heroTitle: rectFor(".chapter-hero h1"),
      goal: rectFor(".goal-card"),
      firstCard: rectFor(".learning-card")
    };
  });
}

test.describe("tutorial layout", () => {
  test("desktop chapter page does not overlap sidebar and keeps headings readable", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name.includes("mobile"), "desktop-only layout assertions");

    await page.goto("/#/chapters/04-integers-and-booleans");
    await expect(page.getByRole("heading", { name: "4章 整数とブーリアン" })).toBeVisible();

    const metrics = await layoutMetrics(page);

    expect(metrics.scrollWidth, "page must not create horizontal overflow").toBeLessThanOrEqual(metrics.viewportWidth + 1);
    expect(metrics.sidebar.right, "sidebar must end before main content begins").toBeLessThanOrEqual(metrics.main.left + 1);
    expect(metrics.sidebar.width, "desktop sidebar width should stay bounded").toBeGreaterThanOrEqual(280);
    expect(metrics.sidebar.width, "desktop sidebar width should stay bounded").toBeLessThanOrEqual(420);
    expect(metrics.hero.left, "chapter hero must be inside main content").toBeGreaterThanOrEqual(metrics.main.left);
    expect(metrics.hero.right, "chapter hero must be inside viewport").toBeLessThanOrEqual(metrics.viewportWidth);
    expect(metrics.heroTitle.height, "Japanese chapter title should not collapse into one-character columns").toBeLessThan(150);
    expect(metrics.goal.top, "goal card should sit below the top bar").toBeGreaterThan(72);
    expect(metrics.firstCard.top, "learning cards should be below the hero").toBeGreaterThan(metrics.hero.bottom - 1);
  });

  test("desktop home page stays within viewport", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name.includes("mobile"), "desktop-only layout assertions");

    await page.goto("/");
    await expect(page.getByRole("heading", { name: "Javaチュートリアル" })).toBeVisible();

    const metrics = await page.evaluate(() => {
      const sidebar = document.querySelector(".sidebar")!.getBoundingClientRect();
      const main = document.querySelector(".main-pane")!.getBoundingClientRect();
      return {
        viewportWidth: window.innerWidth,
        scrollWidth: document.documentElement.scrollWidth,
        sidebarRight: sidebar.right,
        mainLeft: main.left
      };
    });

    expect(metrics.scrollWidth).toBeLessThanOrEqual(metrics.viewportWidth + 1);
    expect(metrics.sidebarRight).toBeLessThanOrEqual(metrics.mainLeft + 1);
  });

  test("sidebar shows chapter sections immediately below the active chapter", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name.includes("mobile"), "desktop-only layout assertions");

    await page.goto("/#/chapters/21-numbers");
    await expect(page.getByRole("heading", { name: "21章 数値" })).toBeVisible();

    const positions = await page.evaluate(() => {
      const activeChapter = document.querySelector(".chapter-link.active");
      const sectionList = document.querySelector(".section-list");
      const nextChapter = Array.from(document.querySelectorAll(".chapter-link")).find((link) =>
        link.textContent?.includes("22章")
      );

      if (!activeChapter || !sectionList || !nextChapter) {
        throw new Error("Missing sidebar elements for active chapter assertion");
      }

      const activeRect = activeChapter.getBoundingClientRect();
      const sectionRect = sectionList.getBoundingClientRect();
      const nextRect = nextChapter.getBoundingClientRect();

      return {
        activeBottom: activeRect.bottom,
        sectionTop: sectionRect.top,
        sectionBottom: sectionRect.bottom,
        nextTop: nextRect.top
      };
    });

    expect(positions.sectionTop, "section list should start just under the active chapter").toBeGreaterThanOrEqual(
      positions.activeBottom - 1
    );
    expect(positions.sectionBottom, "section list should appear before the next chapter").toBeLessThanOrEqual(
      positions.nextTop + 1
    );
  });

  test("desktop sidebar can be collapsed and restored", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name.includes("mobile"), "desktop-only layout assertions");

    await page.goto("/#/chapters/10-java-program-execution");
    await expect(page.getByRole("heading", { name: "10章 Javaプログラムの実行" })).toBeVisible();

    const before = await page.evaluate(() => {
      const sidebar = document.querySelector(".sidebar")!.getBoundingClientRect();
      const main = document.querySelector(".main-pane")!.getBoundingClientRect();
      return { sidebarRight: sidebar.right, mainLeft: main.left };
    });

    await page.getByRole("button", { name: "サイドメニューを閉じる" }).click();
    await expect(page.locator(".sidebar-restore")).toBeVisible();

    const collapsed = await page.evaluate(() => {
      const sidebar = document.querySelector(".sidebar")!.getBoundingClientRect();
      const main = document.querySelector(".main-pane")!.getBoundingClientRect();
      return { sidebarRight: sidebar.right, mainLeft: main.left };
    });

    expect(before.sidebarRight).toBeGreaterThan(280);
    expect(before.mainLeft).toBeGreaterThanOrEqual(before.sidebarRight - 1);
    expect(collapsed.sidebarRight).toBeLessThanOrEqual(4);
    expect(collapsed.mainLeft).toBeLessThan(40);

    await page.locator(".sidebar-restore").click();
    await expect(page.getByRole("button", { name: "サイドメニューを閉じる" })).toBeVisible();
  });

  test("sidebar highlights the section closest to the reading position", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name.includes("mobile"), "desktop-only layout assertions");

    await page.goto("/#/chapters/10-java-program-execution");
    await expect(page.getByRole("heading", { name: "10章 Javaプログラムの実行" })).toBeVisible();

    await page.evaluate(() => {
      const section = document.getElementById("10-3-コマンドライン引数");
      if (section) {
        document.documentElement.style.scrollBehavior = "auto";
        window.scrollTo(0, window.scrollY + section.getBoundingClientRect().top - 100);
      }
    });

    await expect
      .poll(async () =>
        page.evaluate(() => document.querySelector(".section-link.active")?.textContent?.trim())
      )
      .toContain("10-3 コマンドライン引数");
  });

  test("markdown links resolve to app routes or repository files", async ({ page }) => {
    await page.goto("/#/chapters/01-overview");
    await expect(page.getByRole("heading", { name: "1章 Javaの概要" })).toBeVisible();

    await expect(page.getByRole("link", { name: "JavaOverviewApp.java" })).toHaveAttribute(
      "href",
      "https://github.com/t-shirayama/java-tutorial-lab/blob/main/docs/01-overview/examples/src/main/java/lab/overview/JavaOverviewApp.java"
    );

    await page.goto("/#/glossary");
    await expect(page.getByRole("heading", { name: "用語集" })).toBeVisible();
    await expect(page.locator(".markdown-body a", { hasText: "1章" }).first()).toHaveAttribute(
      "href",
      "#/chapters/01-overview"
    );

    await page.goto("/");
    await expect(page.locator(".markdown-body a", { hasText: "用語集" }).first()).toHaveAttribute("href", "#/glossary");
  });

  test("code blocks render as dark editor panels", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name.includes("mobile"), "desktop-only layout assertions");

    await page.goto("/#/chapters/07-strings");
    const codeBlock = page.locator(".markdown-body pre").first();
    const sourceBlock = page.locator(".markdown-body pre.code-block-source").first();
    const commandBlock = page.locator(".markdown-body pre.code-block-command").first();
    const outputBlock = page.locator(".markdown-body pre.code-block-output").first();

    await expect(codeBlock).toBeVisible();
    await expect(sourceBlock).toBeVisible();
    await expect(commandBlock).toBeVisible();
    await expect(outputBlock).toBeVisible();

    const styles = await codeBlock.evaluate((element) => {
      const computed = window.getComputedStyle(element);
      return {
        backgroundColor: computed.backgroundColor,
        borderLeftColor: computed.borderLeftColor,
        paddingTop: Number.parseFloat(computed.paddingTop)
      };
    });

    expect(styles.backgroundColor).toBe("rgb(30, 30, 30)");
    expect(styles.borderLeftColor).toBe("rgb(0, 122, 204)");
    expect(styles.paddingTop).toBeGreaterThanOrEqual(48);

    const labels = await page.evaluate(() => {
      const labelFor = (selector: string) =>
        window.getComputedStyle(document.querySelector(selector)!, "::before").content.replaceAll("\"", "");
      return {
        source: labelFor(".code-block-source"),
        command: labelFor(".code-block-command"),
        output: labelFor(".code-block-output")
      };
    });

    expect(labels.source).toBe("SOURCE CODE");
    expect(labels.command).toBe("COMMAND");
    expect(labels.output).toBe("OUTPUT");
  });

  test("mobile chapter page hides sidebar until the menu is opened", async ({ page }, testInfo) => {
    test.skip(!testInfo.project.name.includes("mobile"), "mobile-only layout assertions");

    await page.goto("/#/chapters/04-integers-and-booleans");
    await expect(page.getByRole("heading", { name: "4章 整数とブーリアン" })).toBeVisible();

    const hiddenMetrics = await page.evaluate(() => {
      const sidebar = document.querySelector(".sidebar")!.getBoundingClientRect();
      return {
        sidebarRight: sidebar.right,
        viewportWidth: window.innerWidth,
        scrollWidth: document.documentElement.scrollWidth
      };
    });

    expect(hiddenMetrics.sidebarRight, "closed mobile sidebar should be off canvas").toBeLessThanOrEqual(4);
    expect(hiddenMetrics.scrollWidth, "mobile page must not create horizontal overflow").toBeLessThanOrEqual(
      hiddenMetrics.viewportWidth + 1
    );

    await page.getByRole("button", { name: "章メニューを開く" }).click();
    await expect(page.locator(".sidebar.show")).toBeVisible();

    await expect
      .poll(async () =>
        page.evaluate(() => document.querySelector(".sidebar.show")!.getBoundingClientRect().left)
      )
      .toBeGreaterThanOrEqual(-1);

    const shownMetrics = await page.evaluate(() => {
      const sidebar = document.querySelector(".sidebar.show")!.getBoundingClientRect();
      return { sidebarLeft: sidebar.left, sidebarRight: sidebar.right };
    });

    expect(shownMetrics.sidebarLeft).toBeGreaterThanOrEqual(-1);
    expect(shownMetrics.sidebarRight).toBeGreaterThan(260);
  });
});
