import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const source = readFileSync(new URL("../src/main.tsx", import.meta.url), "utf8");
const pkg = JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8"));

describe("React showcase integrity", () => {
  it("uses only published CorvaUI packages", () => {
    expect(pkg.dependencies["@corvaui/react"]).toBe("^0.1.7");
    expect(pkg.dependencies["@corvaui/tokens"]).toBe("^0.1.7");
    expect(source).not.toMatch(/apexui|@apexui/i);
  });

  it("keeps the full operational route set and local media", () => {
    for (const route of ["metrics", "work-orders", "customers", "data-table", "settings", "proof"]) {
      expect(source).toContain(`id: "${route}"`);
    }
    expect(source).toContain("images/corva-rooftop.jpg");
    expect(source).toContain("images/corva-chillers.jpg");
  });
});
