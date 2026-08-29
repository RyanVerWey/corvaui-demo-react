import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const source = readFileSync(new URL("../src/App.tsx", import.meta.url), "utf8");
const styles = readFileSync(new URL("../src/styles.css", import.meta.url), "utf8");
const coverage = readFileSync(new URL("../docs/COMPONENT-COVERAGE.md", import.meta.url), "utf8");
const packageIndex = readFileSync(new URL("../node_modules/@corvaui/react/src/index.ts", import.meta.url), "utf8");
const pkg = JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8"));

const publicComponents = [...packageIndex.matchAll(/components\/(?:atoms|molecules|organisms)\/([^\"]+)/g)].map((match) =>
  match[1].replace(/\.js$/, ""),
);

describe("Morrow Archive flagship integrity", () => {
  it("uses the published CorvaUI packages and unchanged Concept themes", () => {
    expect(pkg.dependencies["@corvaui/react"]).toBe("^0.1.8");
    expect(pkg.dependencies["@corvaui/tokens"]).toBe("^0.1.8");
    expect(source).toContain("concept-light");
    expect(source).toContain("concept-dark");
    expect(styles).not.toMatch(/--corva-color-[\w-]+\s*:/);
  });

  it("integrates every public React component in rendered JSX", () => {
    expect(publicComponents).toHaveLength(67);
    for (const component of publicComponents) {
      expect(source, `${component} must appear in rendered JSX`).toMatch(new RegExp(`<${component}\\b`));
      expect(coverage).toMatch(new RegExp(`\\|\\s*${component}\\s*\\|`));
    }
    expect(coverage).toContain("Planned and implemented responsibly: **67**");
    expect(coverage).toContain("Omitted: **0**");
  });

  it("keeps all eight mature product routes", () => {
    for (const route of ["exhibition", "overview", "collection", "loans", "conservation", "calendar", "settings", "proof"]) {
      expect(source).toContain(`id: "${route}"`);
    }
  });

  it("uses a theme-aware Morrow Archive brand mark", () => {
    expect(source).toContain("function MorrowMark()");
    expect(source).toContain('aria-label="Morrow Archive home"');
    expect(styles).toContain(".morrow-mark-outline");
    expect(styles).toContain("var(--corva-color-accent-text)");
    expect(styles).toContain("var(--corva-color-accent-strong)");
  });

  it("shows a signed-in account menu with settings and logout actions", () => {
    expect(source).toContain('className="account-menu"');
    expect(source).toContain('className="account-menu-name"');
    expect(source).toContain('onSelect: () => navigate("settings")');
    expect(source).toContain("Log out");
  });

  it("includes a complete institutional footer", () => {
    expect(source).toContain("function SiteFooter()");
    expect(source).toContain("<SiteFooter />");
    expect(source).toContain("https://www.corvaui.com/");
    expect(source).toContain("Instagram");
    expect(source).toContain("LinkedIn");
    expect(source).toContain("YouTube");
    expect(styles).toContain(".site-footer-grid");
  });

  it("avoids rejected visual shortcuts", () => {
    expect(styles).not.toMatch(/linear-gradient|radial-gradient|background-clip\s*:\s*text/i);
    expect(styles).not.toMatch(/border-(?:left|right)\s*:\s*[2-9]/i);
    expect(source).not.toMatch(/field service|work orders|customer portal/i);
  });

  it("uses project-local generated imagery with attribution", () => {
    for (const asset of ["gallery-installation.png", "conservation-detail.png", "collections-logistics.png"]) {
      expect(source).toContain(asset);
      expect(coverage).toContain("OpenAI ImageGen");
    }
  });
});
