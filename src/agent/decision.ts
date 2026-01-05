export function decide(findings: string[]) {
  if (
    findings.some(f =>
      f.toLowerCase().includes("popup") ||
      f.toLowerCase().includes("dark")
    )
  ) {
    return "STOP_AND_REPORT_SUSPICIOUS_BEHAVIOR";
  }

  return "CONTINUE_EXPLORATION";
}
