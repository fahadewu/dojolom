import { defineConfig, devices } from "@playwright/test";

/* End-to-end tests run against the static export in out/, which is what ships.
   `npm run build` must have produced it first (the test script does this). */
export default defineConfig({
  testDir: "tests/e2e",
  timeout: 60_000,
  expect: { timeout: 10_000 },
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  reporter: [["list"]],
  use: {
    baseURL: "http://127.0.0.1:4173",
    timezoneId: "Europe/London",
    trace: "retain-on-failure",
    ...devices["Desktop Chrome"],
  },
  webServer: {
    command: "npx serve out -l 4173 --no-clipboard --no-port-switching",
    url: "http://127.0.0.1:4173",
    reuseExistingServer: !process.env.CI,
    timeout: 30_000,
  },
});
