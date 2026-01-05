import { Page } from "@playwright/test";

export async function observePage(page: Page) {
  return {
    url: page.url(),
    title: await page.title(),
    linkCount: await page.locator("a").count(),
    buttonCount: await page.locator("button").count(),
    hasForm: (await page.locator("form").count()) > 0
  };
}
