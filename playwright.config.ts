import { defineConfig, devices } from "@playwright/test";

/* End-to-end tests run against the production build (next start), which is what ships.
   `npm run build` must have produced it first (the test script does this).
   The tutor runs on a scripted model there (DOJOLOM_TUTOR_SCRIPT=1), never a real one. */
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
    command: "npx next start -p 4173 -H 127.0.0.1",
    url: "http://127.0.0.1:4173",
    reuseExistingServer: !process.env.CI,
    timeout: 30_000,
    env: { DOJOLOM_TUTOR_SCRIPT: "1" },
  },
});
