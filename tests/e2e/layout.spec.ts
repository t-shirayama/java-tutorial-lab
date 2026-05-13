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
