import { test as base, type Page } from "@playwright/test";

interface ErrorRequest {
	url: string;
	status: number;
}

export const test = base.extend<{
	timeLogger: Promise<void>;
	errorLogger: Promise<void>;
	networkErrorMonitoring: Page;
}>({
	// Custom timeLogger fixture with annotation.
	// It can be user type, or some different information for specific tests.
	timeLogger: [
		async ({ page }, use, testInfo) => {
			testInfo.annotations.push({
				type: "Start",
				description: new Date().toISOString(),
			});

			await use(page);

			testInfo.annotations.push({
				type: "End",
				description: new Date().toISOString(),
			});
		},
		{ auto: true },
	],
	errorLogger: [
		async ({ page }, use) => {
			const errors: Error[] = [];

			page.on("pageerror", (err) => {
				errors.push(err);
			});

			await use(page);

			if (errors.length > 0) {
				await test.info().attach("frontend-exceptions", {
					body: errors
						.map((error) => `${error.message}\n${error.stack}`)
						.join("\n----\n"),
				});
			}
		},
		{ auto: true },
	],
	networkErrorMonitoring: async ({ page }, use, testInfo) => {
		const errorData: ErrorRequest[] = [];
		page.on("response", async (response) => {
			const url = response.url();
			const status = response.status();

			if (status >= 400) {
				const errorRequest: ErrorRequest = {
					url,
					status,
				};

				errorData.push(errorRequest);
			}
		});

		await use(page);

		if (errorData.length > 0) {
			const fileName = "error_requests.json";
			await testInfo.attach(fileName, {
				body: JSON.stringify(errorData, null, 2),
				contentType: "application/json",
			});
			throw new Error(
				`Network errors detected: ${errorData.length} requests failed. Check the attached ${fileName} file.`,
			);
		}
	},
});

export { expect } from "@playwright/test";
