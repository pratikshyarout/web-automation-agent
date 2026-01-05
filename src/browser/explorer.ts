import { chromium } from "@playwright/test";

export async function exploreSite(url: string) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto(url, { timeout: 30000 });

  const links = await page.$$eval("a", els =>
    els.map(e => ({
      text: e.textContent?.trim(),
      href: e.getAttribute("href")
    }))
  );

  const buttons = await page.$$eval("button", els =>
    els.map(e => e.textContent?.trim())
  );

  await browser.close();

  return { url, links, buttons };
}
