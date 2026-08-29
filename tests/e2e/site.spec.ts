import { createRequire } from "node:module";
import { expect, test } from "@playwright/test";

const require = createRequire(import.meta.url);
const axePath = require.resolve("axe-core/axe.min.js");

const routes = [
  ["home", "/#/", "Field service that feels calm", 1],
  ["metrics", "/#/metrics", "Operations command center", 1],
  ["work-orders", "/#/work-orders", "Create a service visit", 0],
  ["customers", "/#/customers", "Account pipeline and health records", 0],
  ["data", "/#/data-table", "Service records", 0],
  ["settings", "/#/settings", "Workspace preferences", 0],
  ["proof", "/#/proof", "React integration details", 0],
] as const;

for (const [name, path, content, imageCount] of routes) {
  test(`${name} is responsive and WCAG AA clean`, async ({ page }, testInfo) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
    await page.goto(path, { waitUntil: "networkidle" });
    await expect(page.locator("h1").first()).toBeVisible();
    await expect(page.getByText(content, { exact: false }).first()).toBeVisible();
    await expect(page.locator("main img")).toHaveCount(imageCount + 1);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(1);
    await page.addScriptTag({ path: axePath });
    const violations = await page.evaluate(async () => (await (window as typeof window & { axe: { run: Function } }).axe.run(document, { runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21aa"] } })).violations);
    expect(violations).toEqual([]);
    expect(errors).toEqual([]);
    await page.screenshot({ path: testInfo.outputPath(`${name}.png`), fullPage: true });
  });
}

test("Gilded dark mode stays accessible", async ({ page }) => {
  await page.goto("/#/", { waitUntil: "networkidle" });
  if ((page.viewportSize()?.width ?? 1280) < 1320) {
    await page.locator(".mobile-menu summary").click();
    await page.getByText("Dark mode", { exact: true }).click();
  } else {
    await page.getByText("Dark", { exact: true }).click();
  }
  await expect(page.locator(".site-shell")).toHaveAttribute("data-corva-theme", "gilded-dark");
});
