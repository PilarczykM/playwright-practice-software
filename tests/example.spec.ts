import { expect, test } from "@playwright/test";
import { HomePage } from "../lib/pages/Home";

let homePage: HomePage;

test.describe("Home page spec", () => {
	test.beforeEach(async ({ page }) => {
		homePage = new HomePage(page);
	});

	test("check page title", async ({ page }) => {
		await homePage.goto();

		await expect(page).toHaveTitle(
			"Practice Software Testing - Toolshop - v5.0",
		);
	});
});
