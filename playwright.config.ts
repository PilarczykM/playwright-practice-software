import path from "node:path";
import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";
import type { AuthOptions } from "./tests/config";

dotenv.config({ path: path.resolve(__dirname, ".env") });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig<AuthOptions>({
	testDir: "./tests",
	/* Run tests in files in parallel */
	fullyParallel: true,
	/* Fail the build on CI if you accidentally left test.only in the source code. */
	forbidOnly: !!process.env.CI,
	/* Retry on CI only */
	retries: process.env.CI ? 2 : 0,
	/* Opt out of parallel tests on CI. */
	workers: process.env.CI ? 1 : undefined,
	/* Reporter to use. See https://playwright.dev/docs/test-reporters */
	reporter: "html",
	/* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
	use: {
		/* Base URL to use in actions like `await page.goto('/')`. */
		baseURL: process.env.UI_URL,

		/* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
		trace: "on-first-retry",

		authPath: "playwright/.auth.json",
	},

	/* Configure projects for major browsers */
	projects: [
		{
			name: "practicesoftwaretesting",
			use: { ...devices["Desktop Chrome"] },
			testIgnore: ["**/demo/**"],
		},
		{
			name: "demo",
			use: { ...devices["Desktop Chrome"], baseURL: "http://localhost:3000" },
			testMatch: ["**/demo/**/*.spec.ts"],
		},

		// {
		//   name: "firefox",
		//   use: { ...devices["Desktop Firefox"] },
		// },

		// {
		//   name: "webkit",
		//   use: { ...devices["Desktop Safari"] },
		// },

		/* Test against mobile viewports. */
		// {
		//   name: 'Mobile Chrome',
		//   use: { ...devices['Pixel 5'] },
		// },
		// {
		//   name: 'Mobile Safari',
		//   use: { ...devices['iPhone 12'] },
		// },

		/* Test against branded browsers. */
		// {
		//   name: 'Microsoft Edge',
		//   use: { ...devices['Desktop Edge'], channel: 'msedge' },
		// },
		// {
		//   name: "Google Chrome",
		//   use: { ...devices["Desktop Chrome"], channel: "chrome" },
		// },
	],

	/* Run your local dev server before starting the tests */
	webServer: {
		command: "npm run demo",
		url: "http://localhost:3000",
		reuseExistingServer: !process.env.CI,
	},
});
