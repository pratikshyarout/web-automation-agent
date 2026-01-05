import { chromium } from "@playwright/test";

export async function interactWithSite(url: string) {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  const logs: any[] = [];

  //Detect popup windows/new tabs
  page.on("popup", popup => {
    logs.push({
      type: "popup_window",
      url: popup.url()
    });
  });

  page.on("frameattached", frame => {
    const frameUrl = frame.url();
    if (
      frameUrl.includes("google") ||
      frameUrl.includes("ads") ||
      frameUrl.includes("doubleclick")
    ) {
      logs.push({
        type: "ad_iframe_detected",
        url: frameUrl
      });
    }
  });
  page.on("framenavigated", frame => {
    if (frame === page.mainFrame()) {
      logs.push({
        type: "navigation",
        url: frame.url()
      });
    }
  });

  // Load page
  await page.goto(url, { waitUntil: "domcontentloaded" });
  logs.push({ type: "page_loaded", url: page.url() });

try {
  await page.waitForSelector("#modal", {
    state: "visible",
    timeout: 4000
  });

  logs.push({
    type: "dom_modal_detected",
    observation: "Entry modal became visible during page load"
  });
} catch {
  // Modal never became visible
}
const internalLink = page.locator("a").filter({
  hasNotText: /github|external|docs/i
}).first();

if (await internalLink.count()) {
  const href = await internalLink.getAttribute("href");

  if (href && href.startsWith("/")) {
    logs.push({
      type: "decision",
      action: "probe_click_internal_link",
      href
    });

    await internalLink.click();
  } else {
    logs.push({
      type: "interaction_skipped",
      reason: "First link is external; skipping auto-click"
    });
  }
}
  logs.push({
    type: "observation",
    message: "Waiting 20 seconds to observe delayed behavior"
  });

  if (!page.isClosed()) {
    await page.waitForTimeout(20000);
  }

  await browser.close();
  return logs;
}
