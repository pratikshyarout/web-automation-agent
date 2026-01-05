export function report(analysis: any, decision: string) {
  console.log("\n📊 Agent Report");
  console.log("Tests planned:", analysis.count);
  console.log("Risk level:", analysis.risk);
  console.log("Decision:", decision);
}
