import { expect, test } from "@playwright/test";

const TIMEZONES = [
	{
		name: "Warsaw, Poland",
		timezoneId: "Europe/Warsaw",
		expectedTime: `Saturday, October 25, 2025 at 4:00 PM`,
	},
	{
		name: "NYC, USA",
		timezoneId: "America/New_York",
		expectedTime: `Saturday, October 25, 2025 at 10:00 AM`,
	},
	{
		name: "Sydney, Australia",
		timezoneId: "Australia/Sydney",
		expectedTime: `Sunday, October 26, 2025 at 1:00 AM`,
	},
];

TIMEZONES.forEach(({ name, timezoneId, expectedTime }) => {
	test.describe(`Test from ${name}`, () => {
		test.use({
			timezoneId: timezoneId,
		});

		test(`Event time is correct`, async ({ page }) => {
			await page.goto("/timezone");
			await expect(page.getByRole("heading")).toHaveText(expectedTime);
		});
	});
});

// Working with CLOCK
test("Control time", async ({ page }) => {
	await page.clock.install();

	await page.goto("/clock");

	const button = page.getByRole("button", { name: "Start session" });
	await button.click();
	await expect(button).toBeDisabled();

	const timeDisplay = page.getByTestId("elapsed-time");

	await page.clock.fastForward(60_000);
	await expect(timeDisplay).toContainText(/3m 5\ds/); // Expect regex because of tick mechanism in JS.

	await page.clock.fastForward(240_000);
	await expect(timeDisplay).toBeHidden();
	await expect(button).not.toBeDisabled();
});
