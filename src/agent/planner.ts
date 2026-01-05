export function planTests(site: any) {
  const tests = [];

  if (site.links.length > 0) {
    tests.push({ type: "navigation", risk: "low" });
  }

  if (site.buttons.length > 3) {
    tests.push({ type: "ui", risk: "low" });
  }

  return tests;
}
