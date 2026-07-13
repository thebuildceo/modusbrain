---
name: migrate
description: Universal migration from Obsidian, Notion, Logseq, markdown, CSV, JSON, Roam
triggers:
  - "migrate from"
  - "import from obsidian"
  - "import from notion"
tools:
  - put_page
  - search
  - add_link
  - add_tag
  - sync_brain
mutating: true
---

# Migrate Skill

Universal migration from any wiki, note tool, or brain system into ModusBrain.

## Contract

- Source data is never modified or deleted; migration is additive only.
- Every migrated page is verified round-trip: written to modusbrain, read back, spot-checked.
- Cross-references from the source system (wikilinks, block refs, tags) are converted to modusbrain equivalents.
- Migration is tested on a sample (5-10 files) before bulk execution.
- Post-migration health check confirms page count, link integrity, and embedding coverage.

## Supported Sources

| Source | Format | Strategy |
|--------|--------|----------|
| Obsidian | Markdown + `[[wikilinks]]` | Direct import, convert wikilinks to modusbrain links |
| Notion | Exported markdown or CSV | Parse Notion's export structure |
| Logseq | Markdown with `((block refs))` | Convert block refs to page links |
| Plain markdown | Any .md directory | Import directory into modusbrain directly |
| CSV | Tabular data | Map columns to frontmatter fields |
| JSON | Structured data | Map keys to page fields |
| Roam | JSON export | Convert block structure to pages |

## Phases

1. **Assess the source.** What format? How many files? What structure?
2. **Plan the mapping.** How do source fields map to modusbrain fields (type, title, tags, compiled_truth, timeline)?
3. **Test with a sample.** Import 5-10 files, verify by reading them back from modusbrain and exporting.
4. **Bulk import.** Import the full directory into modusbrain.
5. **Verify.** Check modusbrain health and statistics, spot-check pages.
6. **Build links.** Extract cross-references from content and create typed links in modusbrain.

## Obsidian Migration

1. Import the vault directory into modusbrain (Obsidian vaults are markdown directories)
2. Wire the graph with native wikilink support (v0.12.1+):

   ```bash
   modusbrain extract links --source db --dry-run | head -20    # preview
   modusbrain extract links --source db                         # commit
   ```

   `extract links` natively parses `[[relative/path]]` and `[[relative/path|Display Text]]`
   alongside standard `[text](page.md)` markdown syntax. Ancestor-search resolution handles
   wiki KBs where authors omit one or more leading `../` prefixes. The `.md` suffix is
   inferred automatically for wikilinks.

Obsidian-specific:
- Tags (`#tag`) become modusbrain tags
- Frontmatter properties map to modusbrain frontmatter
- Attachments (images, PDFs) are noted but handled separately via file storage

## Notion Migration

1. Export from Notion: Settings > Export > Markdown & CSV
2. Notion exports nested directories with UUIDs in filenames
3. Strip UUIDs from filenames for clean slugs
4. Map Notion's database properties to frontmatter
5. Import the cleaned directory into modusbrain

## CSV Migration

For tabular data (e.g., CRM exports, contact lists):
1. For each row in the CSV, create a page with column values as frontmatter
2. Use a designated column as the slug (e.g., name)
3. Use another column as compiled_truth (e.g., notes)
4. Store each page in modusbrain

## Verification

After any migration:
1. Check modusbrain statistics to verify page count matches source
2. Check modusbrain health for orphans and missing embeddings
3. Export pages from modusbrain for round-trip verification
4. Spot-check 5-10 pages by reading them from modusbrain
5. Test search: search modusbrain for "someone you know is in the data"

## Anti-Patterns

- **Bulk import without sample test.** Never import the full dataset before verifying with 5-10 files. The cost of cleaning up hundreds of bad pages is enormous.
- **Destroying source data.** Migration is additive. Never modify, move, or delete the source files.
- **Ignoring cross-references.** Wikilinks, block refs, and tags from the source system must be converted to modusbrain equivalents. Dropping them loses the knowledge graph.
- **Skipping verification.** A migration without post-import health check, page count comparison, and spot-check reads is incomplete.

## Output Format

```
MIGRATION REPORT -- [source] -> ModusBrain
=======================================

Source: [format] ([file count] files, [size])
Mapping: [field mapping summary]

Sample Test (N files):
- Imported: N/N
- Round-trip verified: N/N
- Cross-refs converted: N

Bulk Import:
- Total imported: N
- Skipped (duplicates/errors): N
- Links created: N
- Tags migrated: N

Verification:
- Page count match: [yes/no]
- Health check: [pass/fail]
- Search test: [query] -> [result count] hits
```

## Tools Used

- Store/update pages in modusbrain (put_page)
- Read pages from modusbrain (get_page)
- Link entities in modusbrain (add_link)
- Tag pages in modusbrain (add_tag)
- Get modusbrain statistics (get_stats)
- Check modusbrain health (get_health)
- Search modusbrain (query)
