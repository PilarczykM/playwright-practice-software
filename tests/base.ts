import { test as base, type Page } from "@playwright/test";

interface ErrorRequest {
	url: string;
	status: number;
}

export const test = base.extend<{ networkErrorMonitoring: Page }>({
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
