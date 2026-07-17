---
type: procedure
title: Quickstart
icon: rocket
captured_at: '2026-07-17T05:43:23.342Z'
description: >-
  Set up the ModusBrain command-line interface and execute your first versioned
  operational skill in under 5 minutes.
captured_via: capture-cli
---

Welcome to the ModusBrain Quickstart Guide. This walk-through is designed to get you up and running with versioned, confidence-gated operational skills in just a few minutes. By following these steps, you will install the command-line interface, initialize a local brain database, compile a draft policy skill, approve it for agent use, and audit the results.

## Before you begin

Before initiating the installation, ensure that your environment meets the following baseline requirements:
* A terminal or command prompt is open and active on your system.
* [Bun](https://bun.sh) (version 1.3.10 or higher) or [Node.js](https://nodejs.org) (version 18.0.0 or higher) is installed.
* A code project or document directory is available to serve as the ingestion source for your brain's context.

<Info>
  This guide focuses on utilizing the local command-line interface (CLI). To integrate ModusBrain directly into your autonomous agent workflows, you can also run it as a Model Context Protocol (MCP) server compatible with clients like **Claude Desktop**, **Claude Code**, and **ChatGPT**.
</Info>

---

## Step 1: Install ModusBrain

To begin, install the ModusBrain command-line tool globally on your system. You can choose the package manager that best matches your existing JavaScript development environment:

```bash
npm install -g @genthropic/modusbrain
# or
bun install -g @genthropic/modusbrain
```

---

## Step 2: Initialize your brain

With the CLI installed, you must initialize your local database configuration. This command initializes a high-performance, embedded PGLite database locally at `~/.modusbrain`, which runs entirely in-process and requires no external database servers to be configured:

```bash
modusbrain init
modusbrain apply-migrations --yes
modusbrain config set schema_pack gbrain-base-v2
```

---

## Step 3: Compile your first skill

Once your local database is initialized, you can compile your first operational skill from your raw text or markdown guidelines. The compilation process reads your documentation and extracts structured policy constraints alongside semantic guidance for your agents:

```bash
modusbrain opskill compile "refund handling" --risk-tier low_stakes
modusbrain opskill show refund-handling
```

---

## Step 4: Approve and execute the skill

By design, newly compiled skills are held in a `draft` status and are confidence-gated, preventing autonomous agents from executing them until they are explicitly verified. To make the skill available, you must promote it to active status and then execute it:

```bash
# Promote the compiled draft version to active status
modusbrain opskill approve refund-handling --by owner@company.com

# Execute the active skill using the runtime evaluation engine
modusbrain opskill execute refund-handling \
  --task "Process $300 refund for order #1204" \
  --context '{"amount":300}'
```

---

## Step 5: Verify the action audit trail

Every time an agent executes a skill, ModusBrain logs the details to a secure, tamper-resistant audit ledger. You can inspect this trail to verify execution parameters, confidence scores, and final outcomes:

```bash
modusbrain opskill audit --slug refund-handling --json
```

---

## Next steps

Now that you have successfully completed your first operational loop, you can explore the advanced capabilities of the platform:

<CardGroup cols={2}>
  <Card title="Workflow Guide" icon="route" href="/opskill-workflow">
    Read the detailed walk-through covering all five phases of the operational skills lifecycle.
  </Card>
  <Card title="CLI Reference" icon="terminal" href="/cli-reference">
    Explore the complete list of available CLI commands, options, and MCP configuration parameters.
  </Card>
</CardGroup>
