import { expect } from "./fixtures/base";
import { test } from "./fixtures/homePage";
import { HomePage } from "./poms/Home";

test.describe("Home page spec", () => {
  test("check page title", async ({ homePage, page }) => {
    await homePage.goto();

    await expect(page).toHaveTitle(
      "Practice Software Testing - Toolshop - v5.0"
    );
  });
});

// This is only example fow to monitor site.
test.skip("Homepage network monitoring", async ({
  networkErrorMonitoring: page,
}) => {
  const homePage = new HomePage(page);
  await homePage.goto();
});
