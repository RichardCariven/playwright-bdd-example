// below code is will be removed once we have agreed that playwright-BDD is the best way forward for E2E tests.

// import {expect, test} from "@playwright/test";

// test.describe("Test locale routing (FI)", () => {
//     test.use({
//         locale: "fi",
//     });
//
//     test("With supported locale", async ({page}) => {
//         await page.goto("/fi-fi");
//         const url = new URL(page.url());
//         const langAttributeValue = await page.getAttribute("html", "lang");
//         expect(langAttributeValue).toBe("fi");
//         expect(url.pathname).toBe("/fi-fi");
//     });
// });
//
// test.describe("Test locale routing (EN)", () => {
//     //test.use({
//     //locale: "en",
//     // });
//
//     test("With locale what has alias redirect to alias", async ({page}) => {
//         await page.goto("/en-gb");
//         const url = new URL(page.url());
//         const langAttributeValue = await page.getAttribute("html", "lang");
//         expect(langAttributeValue).toBe("en");
//         expect(url.pathname).toBe("/uk");
//     });
//
//     test("With path without locale", async ({page}) => {
//         await page.goto("/stations");
//         const url = new URL(page.url());
//         const langAttributeValue = await page.getAttribute("html", "lang");
//         expect(langAttributeValue).toBe("en");
//         expect(url.pathname).toBe("/uk/stations");
//     });
// });
