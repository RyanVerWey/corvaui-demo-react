import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  outputDir: "./test-results",
  fullyParallel: false,
  retries: 0,
  reporter: "line",
  expect: { timeout: 8_000 },
  use: {
    baseURL: "http://127.0.0.1:4188",
    browserName: "chromium",
    trace: "retain-on-failure",
    screenshot: "only-on-failure"
  },
  projects: [{ name: "chromium" }],
  webServer: {
    command: "npm run preview -- --port 4188 --strictPort",
    url: "http://127.0.0.1:4188",
    reuseExistingServer: false
  }
});
