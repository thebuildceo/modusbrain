import type { BrainEngine } from '../core/engine.ts';
import { handleToolCall } from '../mcp/server.ts';
import { resolveSourceId } from '../core/source-resolver.ts';

/**
 * `modusbrain call <tool> <json>` — trusted local op-dispatch surface.
 *
 * v0.31.8 (D22): grammar accepts an optional `--source <id>` flag before the
 * tool name. The flag is the highest-priority tier in resolveSourceId()'s
 * 6-tier chain (--source > MODUSBRAIN_SOURCE > .modusbrain-source dotfile > path-match
 * > brain default > 'default'). Without --source, the chain still resolves —
 * env / dotfile / path-match all work.
 */
export async function runCall(engine: BrainEngine, args: string[]) {
  // Parse --source <id> from anywhere in args (must come before tool/json
  // tokens to keep the existing `modusbrain call <tool> <json>` shape readable,
  // but the parser is positional-tolerant for ergonomics).
  let explicitSource: string | null = null;
  const rest: string[] = [];
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a === '--source') {
      const next = args[i + 1];
      if (!next || next.startsWith('--')) {
        console.error('--source requires an id (e.g. --source jarvis-memory)');
        process.exit(1);
      }
      explicitSource = next;
      i++;
      continue;
    }
    if (a.startsWith('--source=')) {
      explicitSource = a.slice('--source='.length);
      continue;
    }
    rest.push(a);
  }

  const tool = rest[0];
  const jsonStr = rest[1];

  if (!tool) {
    console.error("Usage: modusbrain call [--source <id>] <tool> '<json>'");
    process.exit(1);
  }

  let params = {};
  if (jsonStr) {
    try {
      params = JSON.parse(jsonStr);
    } catch (err) {
      try {
        // Try fixing common PowerShell quote-escaping artifact: replace `\"` with `"`
        const fixed = jsonStr.replace(/\\"/g, '"');
        params = JSON.parse(fixed);
      } catch {
        console.error(`JSON Parse error: ${(err as Error).message}`);
        console.error(`Received input: ${jsonStr}`);
        console.error(`Usage: modusbrain call [--source <id>] <tool> '<json>'`);
        console.error(`Note (Windows PowerShell): use single quotes around JSON and double quotes inside:`);
        console.error(`  modusbrain call search_brain '{"query": "operational skills"}'`);
        process.exit(1);
      }
    }
  }
  // Resolve through the canonical 6-tier chain. resolveSourceId() throws if
  // an explicit/env/dotfile id refers to a non-registered source.
  const sourceId = await resolveSourceId(engine, explicitSource);
  const result = await handleToolCall(engine, tool, params, { sourceId });
  console.log(JSON.stringify(result, null, 2));
}
