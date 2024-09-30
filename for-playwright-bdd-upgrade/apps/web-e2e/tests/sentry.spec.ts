import { expect, test } from "@playwright/test";

test.describe.skip(`Sentry`, () => {
  test(`Client-side errors are sent via proxy to Sentry`, async ({ page }) => {
    // The url "/monitoring" is used to proxy error to Sentry.
    const sentryReportUrl = `/monitoring?*`;
    // Mock report url - We don't want this error end up in real Sentry.
    await page.route(sentryReportUrl, (route) =>
      route.fulfill({ status: 200 }),
    );
    const requestPromise = page.waitForRequest(sentryReportUrl);

    await page.goto(`/test-sentry-error`);

    // Click button to generate error.
    await page.getByRole(`button`, { name: `Break the world` }).click();

    const request = await requestPromise;

    expect(request.postData()).toBeTruthy();
  });
});
