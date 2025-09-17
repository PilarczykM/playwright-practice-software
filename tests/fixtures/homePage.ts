import { HomePage } from "../poms/Home";
import { test as base } from "./base";

export type TestOption = {
  homePage: HomePage;
};

export const test = base.extend<TestOption>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);

    await use(homePage);
  },
});
