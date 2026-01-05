import { runAgent } from "./agent/agent";

const url = process.argv[2];

if (!url) {
  console.error("Usage: npm run agent <url>");
  process.exit(1);
}

runAgent(url);
