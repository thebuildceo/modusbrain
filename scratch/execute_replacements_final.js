import { readFileSync, writeFileSync } from 'fs';

// 1. docs/ethos/THIN_HARNESS_FAT_SKILLS.md
const thinHarnessPath = 'docs/ethos/THIN_HARNESS_FAT_SKILLS.md';
let thinHarness = readFileSync(thinHarnessPath, 'utf-8');

thinHarness = thinHarness.replace(/I've seen it\. I've lived it\./g, "We've seen it. We've lived it.");
thinHarness = thinHarness.replace(/I call it \*\*thin harness, fat skills\*\*\./g, "the concept of **thin harness, fat skills**.");
thinHarness = thinHarness.replace(/I want to tell you about one more harness\./g, "Let's look at one more harness.");
thinHarness = thinHarness.replace(/I run a personal AI agent on OpenClaw\. It has a persona, knows who I am, and maintains a knowledge base of thousands of interconnected files\./g, 
  "We run a personal AI agent on OpenClaw. It has a persona, knows who we are, and maintains a knowledge base of thousands of interconnected files.");
thinHarness = thinHarness.replace(/I tweeted about this a few days ago:/g, "We wrote about this recently:");
thinHarness = thinHarness.replace(/If I ask you to do something/g, "If we ask you to do something");
thinHarness = thinHarness.replace(/Show me the output\. If I approve/g, "Show us the output. If we approve");
thinHarness = thinHarness.replace(/if I have to ask you/g, "if we have to ask you");

writeFileSync(thinHarnessPath, thinHarness);

// 2. docs/tutorials/company-brain.md
const companyBrainPath = 'docs/tutorials/company-brain.md';
let companyBrain = readFileSync(companyBrainPath, 'utf-8');

companyBrain = companyBrain.replace(/The shape I actually run in production:/g, "The shape recommended for this setup:");
companyBrain = companyBrain.replace(/This is the structure I run:/g, "This is the recommended structure:");
companyBrain = companyBrain.replace(/The conventions I run:/g, "The recommended conventions:");

writeFileSync(companyBrainPath, companyBrain);

// 3. docs/guides/multi-source-brains.md
const multiSourcePath = 'docs/guides/multi-source-brains.md';
let multiSource = readFileSync(multiSourcePath, 'utf-8');

multiSource = multiSource.replace(/personal writing\. You explicitly DON'T want them mixed in search — YC/g, 
  "personal writing. You explicitly DON'T want them mixed in search — company");
multiSource = multiSource.replace(/returns only yc-media hits\./g, "returns only team-media hits.");

writeFileSync(multiSourcePath, multiSource);

console.log("Final replacements executed successfully.");
