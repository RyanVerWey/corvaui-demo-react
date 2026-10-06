import { existsSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const app = readFileSync(new URL("../src/App.tsx", import.meta.url), "utf8");
const styles = readFileSync(new URL("../src/styles.css", import.meta.url), "utf8");
const main = readFileSync(new URL("../src/main.tsx", import.meta.url), "utf8");
const readme = readFileSync(new URL("../README.md", import.meta.url), "utf8");
const product = readFileSync(new URL("../PRODUCT.md", import.meta.url), "utf8");
const design = readFileSync(new URL("../DESIGN.md", import.meta.url), "utf8");
const designJson = JSON.parse(readFileSync(new URL("../DESIGN.json", import.meta.url), "utf8"));
const brief = readFileSync(new URL("../docs/REDESIGN-BRIEF.md", import.meta.url), "utf8");
const coverage = readFileSync(new URL("../docs/COMPONENT-COVERAGE.md", import.meta.url), "utf8");
const attribution = readFileSync(new URL("../public/images/ATTRIBUTION.md", import.meta.url), "utf8");

describe("Asterline React demo contract", () => {
  it("keeps CorvaUI packages and semantic tokens authoritative", () => {
    expect(main).toContain('import "@corvaui/tokens/css"');
    expect(main).toContain('import "@corvaui/react/styles.css"');
    expect(styles).not.toMatch(/#[0-9a-f]{3,8}\b/i);
    expect(styles).not.toMatch(/--corva-[\w-]+\s*:/);
    expect(styles).not.toMatch(/linear-gradient|radial-gradient/i);
    expect(app).not.toMatch(/style=\{\{/);
    expect(app).not.toMatch(/<(button|input|select|textarea)\b/);
  });

  it("presents a clearly fictional infrastructure-product scenario across seven routes", () => {
    expect(app).toContain('type Route = "home" | "platform" | "industries" | "customers" | "insights" | "company" | "command"');
    for (const page of ["HomePage", "PlatformPage", "IndustriesPage", "CustomersPage", "InsightsPage", "CompanyPage", "CommandPage"]) {
      expect(app).toContain(`function ${page}`);
    }
    expect(app).not.toMatch(/component catalog|showcase CorvaUI|atomic taxonomy/i);
    expect(app).toContain('aria-label="Fictional demo disclosure"');
    expect(app).toContain("Nothing shown is a customer endorsement or live service.");
    expect(app).toContain("Fictional operator perspective");
  });

  it("uses the complete generated editorial image set", () => {
    for (const asset of ["asterline-port-hero.png", "asterline-wind-field.png", "asterline-control-room.png", "asterline-city-network.png"]) {
      expect(app).toContain(asset);
      expect(existsSync(new URL(`../public/images/${asset}`, import.meta.url))).toBe(true);
    }
  });

  it("contains credible product workflows and edge states", () => {
    for (const component of ["Chart", "DataGrid", "WorkflowBoard", "Calendar", "Dialog", "Modal", "Drawer", "SearchForm", "Timeline", "Carousel", "FileUpload"]) {
      expect(app, `${component} should appear in rendered JSX`).toMatch(new RegExp(`<${component}\\b`));
    }
    expect(app).toContain("North region priority asset register");
    expect(app).toContain("sortable filterable pageable");
    expect(app).toContain("No assets match this search");
    expect(styles).toContain("prefers-reduced-motion");
  });

  it("uses chart variety and intentional marketing action scale", () => {
    for (const type of ["histogram", "radar", "donut", "gauge"]) {
      expect(app).toContain(`type=\"${type}\"`);
    }
    expect(app).toContain('marker="01 / Operating model"');
    expect(app).toContain('marker="05 / Asterline scenario"');
    expect(app.match(/size="lg"/g)?.length ?? 0).toBeGreaterThanOrEqual(12);
  });

  it("balances editorial content with a working metrics dashboard", () => {
    expect(app).toContain("function DataCard");
    expect(app.match(/<DataCard\b/g)?.length ?? 0).toBe(4);
    expect(app).toContain("Current response readiness compared with sector benchmark");
    expect(app).toContain("Median signal to owner time compared with previous baseline");
    expect(styles).toContain(".comparison-grid");
  });

  it("keeps product documentation aligned with the Asterline source", () => {
    for (const document of [readme, product, design, brief, coverage]) {
      expect(document).toContain("Asterline");
      expect(document).not.toContain("Morrow Archive");
    }
    expect(readme).toContain("six public routes and a separate Command Center");
    expect(designJson.title).toBe("Design System: Asterline");
    expect(designJson.narrative.northStar).toBe("The living network");

    const importBlock = app.match(/import \{([\s\S]*?)\} from "@corvaui\/react";/)?.[1] ?? "";
    const componentImports = importBlock
      .split(",")
      .map((name) => name.trim())
      .filter((name) => name && !name.startsWith("type "));
    expect(componentImports).toHaveLength(42);
    expect(coverage).toContain("Components used in Asterline: **42**");
    expect(coverage).toContain("Components intentionally not forced into this product: **25**");

    for (const asset of ["asterline-port-hero.png", "asterline-wind-field.png", "asterline-control-room.png", "asterline-city-network.png"]) {
      expect(attribution).toContain(asset);
    }
  });
});
