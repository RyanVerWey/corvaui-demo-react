import { expect, test, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

async function expectNoPageOverflow(page: Page) {
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
}

async function waitForFiniteMotion(page: Page) {
  await page.evaluate(async () => {
    const animations = document.getAnimations().filter((animation) => animation.effect?.getTiming().iterations !== Infinity);
    await Promise.allSettled(animations.map((animation) => animation.finished));
  });
}

async function expectFictionalDisclosure(page: Page) {
  const disclosure = page.getByRole("note", { name: "Fictional demo disclosure" });
  await expect(disclosure).toBeVisible();
  await expect(disclosure).toContainText("Fictional product demonstration");
  await expect(disclosure).toContainText("Nothing shown is a customer endorsement or live service.");
}

test("home behaves like a complete infrastructure product site", async ({ page }, testInfo) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1, name: /Keep the world/ })).toBeVisible();
  await expect(page.getByText("Asterline infrastructure intelligence")).toBeVisible();
  await expect(page.getByText("Fictional Metro East scenario")).toBeVisible();
  await expect(page.getByRole("button", { name: "Enter command center" })).toBeVisible();
  await expectFictionalDisclosure(page);
  await expectNoPageOverflow(page);
  await page.screenshot({ path: testInfo.outputPath("home-disclosure.png"), fullPage: true });
});

test("all public routes use browser history and retain Asterline navigation", async ({ page }) => {
  const routes = [
    ["Platform", "/platform", /operating system for physical networks/i],
    ["Industries", "/industries", /Different networks/i],
    ["Customers", "/customers", /Measured in service kept/i],
    ["Intelligence", "/insights", /people who operate the real world/i],
    ["Company", "/company", /physical world deserves better/i],
  ] as const;
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  for (const [label, path, heading] of routes) {
    await page.getByRole("menuitem", { name: label, exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`${path}$`));
    await expect(page.getByRole("heading", { level: 1, name: heading })).toBeVisible();
    await expectFictionalDisclosure(page);
  }
  await page.goBack();
  await expect(page).toHaveURL(/\/insights$/);
});

test("command center supports data discovery, sorting, pagination, and response creation", async ({ page }) => {
  await page.goto("/command");
  await expectFictionalDisclosure(page);
  await expect(page.getByRole("heading", { level: 1, name: "North region" })).toBeVisible();
  await expect(page.getByText("Deterministic preview · synthetic data")).toBeVisible();
  const assetFilter = page.getByRole("searchbox", { name: "Filter Asset" });
  await assetFilter.fill("SUB-09");
  await expect(page.getByText("SUB-09", { exact: true })).toBeVisible();
  await expect(page.getByText("WTG-214", { exact: true })).toHaveCount(0);
  await assetFilter.fill("");
  await page.getByRole("button", { name: "Sort by Asset" }).click();
  await page.getByRole("button", { name: "Next", exact: true }).click();
  await expect(page.getByText("Page 2 of 2")).toBeVisible();
  await page.getByRole("button", { name: "Create response" }).first().click();
  await expect(page.getByRole("heading", { name: "Create response" })).toBeVisible();
  await page.getByRole("button", { name: "Create response" }).last().click();
  await expect(page.getByText("Response created and routed for approval.")).toBeVisible();
});

test("theme, contact dialog, and mobile drawer work", async ({ page }) => {
  await page.goto("/");
  await page.locator(".corva-switch").click();
  await expect(page.locator("#root > [data-corva-theme='concept-dark']")).toBeVisible();
  await page.getByRole("button", { name: "Talk to an engineer" }).click();
  await expect(page.getByRole("heading", { name: "Plan an Asterline working session" })).toBeVisible();
  await page.getByRole("button", { name: "Cancel" }).click();
  await page.setViewportSize({ width: 320, height: 720 });
  await page.getByRole("button", { name: "Open navigation" }).click();
  await expect(page.locator(".corva-drawer-title")).toHaveText("Asterline navigation");
  await expect(page.getByRole("button", { name: "Platform" }).last()).toBeVisible();
  await expectNoPageOverflow(page);
});

test("intelligence search exposes a recoverable empty state", async ({ page }) => {
  await page.goto("/insights");
  await page.getByRole("textbox", { name: "Search intelligence" }).fill("no-matching-briefing");
  await page.getByRole("button", { name: "Search", exact: true }).click();
  await expect(page.getByRole("heading", { name: "No intelligence matches that search" })).toBeVisible();
  await page.getByRole("button", { name: "Clear filters" }).click();
  await expect(page.getByRole("heading", { name: "Why condition is not consequence", exact: true })).toBeVisible();
});

test("320px home and command center remain complete without page overflow", async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 320, height: 720 });
  for (const route of ["/", "/command"]) {
    await page.goto(route);
    await expectFictionalDisclosure(page);
    await expectNoPageOverflow(page);
    await expect(page.locator("h1").first()).toBeVisible();
  }
  const grid = page.locator(".corva-data-grid .corva-table-container");
  const dimensions = await grid.evaluate((element) => ({ clientWidth: element.clientWidth, scrollWidth: element.scrollWidth }));
  expect(dimensions.scrollWidth).toBeGreaterThan(dimensions.clientWidth);
  await page.screenshot({ path: testInfo.outputPath("command-disclosure-320.png"), fullPage: true });
});

test("all routes and themes have no serious or critical accessibility violations", async ({ page }) => {
  for (const mode of ["light", "dark"] as const) {
    for (const route of ["/", "/platform", "/industries", "/customers", "/insights", "/company", "/command"]) {
      await page.goto(route);
      const themeRoot = page.locator("#root > [data-corva-theme]");
      if ((await themeRoot.getAttribute("data-corva-theme")) !== `concept-${mode}`) {
        await page.locator(".corva-switch").click();
      }
      await expect(themeRoot).toHaveAttribute("data-corva-theme", `concept-${mode}`);
      await waitForFiniteMotion(page);
      const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
      const severe = results.violations.filter((violation) => violation.impact === "serious" || violation.impact === "critical");
      expect(severe, `${mode} ${route}: ${severe.map((item) => item.id).join(", ")}`).toEqual([]);
    }
  }
});
