export function detectSuspiciousBehavior(logs: any[]) {
  const findings: string[] = [];

  if (logs.some(l => l.type === "popup_or_new_tab")) {
    findings.push("New tab or popup opened after interaction");
  }
  if (
  logs.some(l => l.type === "dom_modal_detected") &&
  logs.some(l => l.type === "navigation")
) {
  findings.push(
    "Overlay appeared briefly before automatic redirection — suspicious"
  );
}

if (logs.some(l => l.type === "popup_window")) {
  findings.push("Ad window opened via popup after interaction");
}

if (logs.some(l => l.type === "ad_iframe_detected")) {
  findings.push("Fullscreen ad overlay detected (iframe-based)");
}

  if (logs.some(l => l.type === "external_domain_navigation")) {
    findings.push("Navigation redirected to external domain");
  }

  if (logs.some(l => l.type === "redirect")) {
    findings.push("Unexpected redirect occurred after clicking content");
  }

  if (findings.length === 0) {
    findings.push("No suspicious behavior detected during controlled probe");
  }

  return findings;
}
