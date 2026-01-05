export function analyzeInteractions(logs: any[]) {
  const insights: string[] = [];

  // Find positions of key events
  const modalIndex = logs.findIndex(l => l.type === "dom_modal_detected");
  const navigationIndex = logs.findIndex(l => l.type === "navigation");
  const popupIndex = logs.findIndex(l => l.type === "popup_window");

  // 🔴 CORRELATED BEHAVIOR: modal → auto navigation (entry_ad case)
  if (modalIndex !== -1 && navigationIndex !== -1) {
    if (navigationIndex > modalIndex && navigationIndex - modalIndex <= 3) {
      insights.push(
        "Modal overlay appeared briefly and was followed by automatic navigation — potential dark-pattern or forced redirect"
      );
    } else {
      insights.push("Modal dialog detected — possible interruptive UX");
    }
  } 
  // Modal without navigation
  else if (modalIndex !== -1) {
    insights.push("Modal dialog detected — possible interruptive UX");
  }

  // Popup window (new tab / ad window)
  if (popupIndex !== -1) {
    insights.push("New window opened after interaction");
  }

  // No meaningful observations
  if (logs.length === 0) {
    insights.push("No observable interaction occurred");
  }

  // Fallback: agent observed but nothing abnormal happened
  if (insights.length === 0) {
    insights.push(
      "Agent observed the page but no disruptive or suspicious behavior was triggered during the observation window"
    );
  }

  return insights;
}
