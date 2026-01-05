import { interactWithSite } from "../browser/interactor";
import { analyzeInteractions } from "../analysis/analyzer";
import { detectSuspiciousBehavior } from "../analysis/suspicionAnalyzer";
import { decide } from "./decision";

export async function runAgent(url: string) {
  console.log(" Agent started");
  console.log(" Target:", url);

  const logs = await interactWithSite(url);

  const insights = analyzeInteractions(logs);
  const suspiciousFindings = detectSuspiciousBehavior(logs);
  const decision = decide([...insights, ...suspiciousFindings]);

  console.log("\n Observations & Summary:");
  console.log(`Visited URL: ${url}`);
  console.log(`Total browser events observed: ${logs.length}`);

  if (logs.some(l => l.type === "dom_modal_detected")) {
    console.log("Entry modal / overlay was observed during page load");
  }

  if (logs.some(l => l.type === "navigation")) {
    console.log("Page navigation events were observed");
  }

  if (logs.some(l => l.type === "popup_window")) {
    console.log("New browser window/tab was opened");
  }

  console.log("\n Detected Issues / Odd Behaviors:");
  if (
    insights.length === 1 &&
    insights[0].includes("no disruptive or suspicious")
  ) {
    console.log("No significant UX or security issues detected");
  } else {
    insights.forEach(i => console.log("• " + i));
    suspiciousFindings.forEach(f => console.log("• " + f));
  }

  console.log("\n Interaction Logs & Reasoning:");
  logs.forEach((log, index) => {
    console.log(`Step ${index + 1}:`, log);
  });

  console.log("\n Final Agent Decision:");
  console.log(decision);
}
