🕵️‍♂️ Semi-Autonomous Web Automation Agent

A semi-autonomous browser agent built using Playwright and TypeScript that explores real websites, observes runtime behavior, makes decisions based on what it sees, and produces reasoned insights about UX and potentially suspicious flows.

This project focuses on decision-making, reasoning, and explainability, not exhaustive test coverage.

🎯 Project Goal

To design an agent that can:

Open a real website

Interact with it in a controlled, human-like way

Observe browser and DOM behavior at runtime

Identify interruptive UX patterns and suspicious flows

Explain what happened, why it matters, and how the agent decided

🧠 Agent Architecture

The agent follows an Observe → Reason → Act → Explain workflow.

Browser
  ↓
Observer (DOM, navigation, popups)
  ↓
Analyzer (UX & behavior reasoning)
  ↓
Decision Engine
  ↓
Structured Report (observations, issues, logs)

🔧 Tech Stack

Language: TypeScript

Runtime: Node.js

Browser Automation: Playwright (Chromium)

Execution: ts-node

Design Pattern: Event-driven, heuristic-based agent

🤖 What the Agent Observes

The agent listens to real browser events, including:

Page navigations

DOM-based modals and overlays

New windows / popup tabs

Delayed UI behavior

User-flow interruptions

It intentionally avoids unsafe or unethical actions such as scraping, bypassing protections, or automated downloads.

🧠 Reasoning & Intelligence

The agent applies runtime reasoning, such as:

Distinguishing interruptive UX (e.g., entry modals) from suspicious behavior

Correlating transient modals followed by automatic navigation

Avoiding false positives caused by agent-triggered actions

Skipping external links to prevent artificial redirects

Reporting clean outcomes when no issues are observed

This ensures observations reflect genuine site behavior, not artifacts of automation.

📤 Output Structure

Each run produces three explicit sections, as required by the assignment:

1️⃣ Observations & Summary

What page was visited

What browser events occurred

High-level understanding of page behavior

2️⃣ Detected Issues / Odd Behaviors

Interruptive UX patterns

Suspicious flows (popups, forced redirects)

Clear explanations of why something is flagged

3️⃣ Interaction Logs with Reasoning

Step-by-step event logs

Agent decisions and skipped actions

Transparent reasoning for every action

▶️ Example Usage
npm run agent https://the-internet.herokuapp.com/entry_ad
npm run agent https://the-internet.herokuapp.com/windows

📌 Example Output (Simplified)
Observations & Summary:
• Entry modal observed during page load
• Navigation events detected

Detected Issues / Odd Behaviors:
• Modal overlay followed by automatic navigation — potential dark-pattern flow

Interaction Logs & Reasoning:
Step 1: Page loaded
Step 2: Modal detected
Step 3: External link skipped to avoid false redirect

Final Agent Decision:
CONTINUE_EXPLORATION

🧪 Tested Websites

The agent was validated on deterministic, automation-friendly websites to ensure reliable demonstration of behavior:

https://the-internet.herokuapp.com/entry_ad

https://the-internet.herokuapp.com/windows

Ad-heavy or anti-bot websites were intentionally avoided for demonstrations, as they suppress behavior under automation.

⚖️ Design Principles

Ethical automation

Conservative decision-making

Explainability over aggressiveness

No hard-coded site logic

No scraping or exploitation

🏁 Conclusion

This project demonstrates how a semi-autonomous agent can reason about real website behavior, adapt at runtime, and produce meaningful, explainable insights — aligning closely with real-world QA and automation practices.