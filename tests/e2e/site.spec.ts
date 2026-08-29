import { createRequire } from "node:module";
import { expect, test, type Page } from "@playwright/test";

const require = createRequire(import.meta.url);
const axePath = require.resolve("axe-core/axe.min.js");

const routes = [
  ["exhibition", "/#/", "Measures of distance"],
  ["overview", "/#/overview", "Today across Morrow"],
  ["collection", "/#/collection", "The collection register"],
  ["loans", "/#/loans", "Move work without losing trust"],
  ["conservation", "/#/conservation", "Mountain Valley, 1867"],
  ["calendar", "/#/calendar", "Installation calendar"],
  ["settings", "/#/settings", "Institution settings"],
  ["proof", "/#/proof", "CorvaUI, exercised as a product"],
] as const;

const viewports = [
  ["desktop-1440", 1440, 900],
  ["laptop-1280", 1280, 800],
  ["tablet-768", 768, 1024],
  ["mobile-390", 390, 844],
] as const;

async function setTheme(page: Page, mode: "light" | "dark") {
  await page.addInitScript(
    (theme) => window.localStorage.setItem("morrow-theme", theme),
    mode,
  );
}

async function collectErrors(page: Page) {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  return errors;
}

async function expectNoPageOverflow(page: Page) {
  const overflow = await page.evaluate(
    () =>
      document.documentElement.scrollWidth -
      document.documentElement.clientWidth,
  );
  expect(overflow).toBeLessThanOrEqual(1);
}

async function expectAxeClean(page: Page) {
  await page.addScriptTag({ path: axePath });
  const violations = await page.evaluate(async () => {
    const axe = (window as typeof window & { axe: { run: Function } }).axe;
    return (
      await axe.run(document, {
        runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21aa"] },
      })
    ).violations;
  });
  expect(violations).toEqual([]);
}

for (const mode of ["light", "dark"] as const) {
  for (const [name, path, heading] of routes) {
    test(`${name} is WCAG AA clean in ${mode} mode`, async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 800 });
      const errors = await collectErrors(page);
      await setTheme(page, mode);
      await page.goto(path, { waitUntil: "networkidle" });
      await expect(page.locator("h1").first()).toContainText(heading);
      await expect(page.locator(".app-root")).toHaveAttribute(
        "data-corva-theme",
        `concept-${mode}`,
      );
      await expectNoPageOverflow(page);
      await expectAxeClean(page);
      expect(errors).toEqual([]);
    });
  }
}

for (const [viewportName, width, height] of viewports) {
  for (const mode of ["light", "dark"] as const) {
    test(`visual review set at ${viewportName} in ${mode} mode`, async ({
      page,
    }, testInfo) => {
      await page.setViewportSize({ width, height });
      await setTheme(page, mode);
      for (const [routeName, path] of routes) {
        await page.goto(path, { waitUntil: "networkidle" });
        await expect(page.locator("h1").first()).toBeVisible();
        await expectNoPageOverflow(page);
        await page.screenshot({
          path: testInfo.outputPath(`${viewportName}-${mode}-${routeName}.png`),
          fullPage: true,
        });
      }
    });
  }
}

test("theme choice persists across reload", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("/#/overview", { waitUntil: "networkidle" });
  const current = await page
    .locator(".app-root")
    .getAttribute("data-corva-theme");
  const nextMode = current === "concept-dark" ? "light" : "dark";
  await page.getByRole("button", { name: `Use ${nextMode} theme` }).click();
  await expect(page.locator(".app-root")).toHaveAttribute(
    "data-corva-theme",
    `concept-${nextMode}`,
  );
  await page.reload({ waitUntil: "networkidle" });
  await expect(page.locator(".app-root")).toHaveAttribute(
    "data-corva-theme",
    `concept-${nextMode}`,
  );
});

test("mobile navigation and touch workflow remain usable", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/#/overview", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Open navigation" }).click();
  await expect(
    page.getByRole("complementary", { name: "Navigate Morrow Archive" }),
  ).toBeVisible();
  await page.getByRole("button", { name: /Collection/ }).click();
  await expect(page).toHaveURL(/#\/collection$/);
  await expect(page.locator(".mobile-records")).toBeVisible();
  await page.getByRole("button", { name: "Loans", exact: true }).last().click();
  await expect(page).toHaveURL(/#\/loans$/);
  await expect(
    page.getByRole("button", { name: "Create a new record" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page.getByRole("button", { name: /Institution settings/ }).click();
  await expect(page).toHaveURL(/#\/settings$/);
  await expect(
    page.getByRole("button", { name: "Create a new record" }),
  ).toHaveCount(0);
  await expectNoPageOverflow(page);
});

test("narrow mobile navigation stays single-row with long labels", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 720 });
  await page.goto("/#/overview", { waitUntil: "networkidle" });
  await expectNoPageOverflow(page);

  const navItems = page.locator(
    ".mobile-bottom-nav .corva-bottom-navigation-item",
  );
  await expect(navItems).toHaveCount(4);
  const itemTops = await navItems.evaluateAll((items) =>
    items.map((item) => Math.round(item.getBoundingClientRect().top)),
  );
  expect(new Set(itemTops).size).toBe(1);

  await page.getByRole("button", { name: "Open navigation" }).click();
  const longLabel = page.getByRole("button", { name: "Installation calendar" });
  await expect(longLabel).toBeVisible();
  const contained = await longLabel.evaluate((element) => {
    const drawer = element.closest(".mobile-drawer")?.getBoundingClientRect();
    const label = element.getBoundingClientRect();
    return Boolean(
      drawer && label.left >= drawer.left && label.right <= drawer.right,
    );
  });
  expect(contained).toBe(true);
});

test("reduced motion and coarse touch input preserve the primary workflow", async ({
  browser,
}) => {
  const context = await browser.newContext({
    viewport: { width: 360, height: 800 },
    hasTouch: true,
    isMobile: true,
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  await page.goto("/#/overview", { waitUntil: "networkidle" });
  await expect(page.locator("html")).toHaveCSS("scroll-behavior", "auto");
  await page.getByRole("button", { name: "Objects" }).tap();
  await expect(page).toHaveURL(/#\/collection$/);
  await expectNoPageOverflow(page);
  await context.close();
});

test("collection search supports empty recovery and Escape closes overlays", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("/#/collection", { waitUntil: "networkidle" });
  await page.getByLabel("Search collection").fill("impossible object name");
  await page.getByRole("button", { name: "Find objects" }).click();
  await expect(
    page.getByText("No collection records match this search"),
  ).toBeVisible();
  await page.getByRole("button", { name: "Clear search" }).click();
  await expect(page.getByText("Threshold Study III").first()).toBeVisible();
  await page.getByRole("button", { name: "Create object" }).click();
  await expect(
    page.getByRole("complementary", { name: "Create collection object" }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("complementary", { name: "Create collection object" }),
  ).toHaveCount(0);
});

test("loan approval dialog supports keyboard dismissal and success", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("/#/loans", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Review approval" }).click();
  await expect(
    page.getByRole("dialog", { name: "Approve incoming loan LN-2468?" }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("dialog", { name: "Approve incoming loan LN-2468?" }),
  ).toHaveCount(0);
  await page.getByRole("button", { name: "Review approval" }).click();
  await page.getByRole("button", { name: "Approve incoming loan" }).click();
  await expect(page.getByText("Incoming loan approved.")).toBeVisible();
});

test("loading, error, disabled, and validation states are complete", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("/#/overview", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Refresh" }).click();
  await expect(page.getByLabel("Loading readiness summary")).toBeVisible();
  await expect(
    page.getByLabel("Opening readiness by discipline"),
  ).toBeVisible();
  await page.getByRole("button", { name: "Simulate issue" }).click();
  await expect(page.getByText("Movement feed is unavailable")).toBeVisible();
  await page.goto("/#/settings", { waitUntil: "networkidle" });
  await page.getByLabel("Operations email").fill("not-an-email");
  await expect(page.getByText("Email address needs an @ symbol")).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Save workspace" }),
  ).toBeDisabled();
});
