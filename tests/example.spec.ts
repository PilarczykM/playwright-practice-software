import { HomePage } from "../lib/pages/Home";
import { expect, test } from "./base";

let homePage: HomePage;

test.describe("Home page spec", () => {
	test.beforeEach(async ({ page }) => {
		homePage = new HomePage(page);
		await homePage.goto();
	});

	test("check page title", async ({ page }) => {
		await expect(page).toHaveTitle(
			"Practice Software Testing - Toolshop - v5.0",
		);
	});
});

// This is only example fow to monitor site.
test.skip("Homepage network monitoring", async ({
	networkErrorMonitoring: page,
}) => {
	homePage = new HomePage(page);
	await homePage.goto();
});
