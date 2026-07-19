# Skillpack anatomy

The canonical one-page reference for what a third-party modusbrain skillpack
looks like. The reference pack at `examples/skillpack-reference/` is the
live artifact this page describes; clone its tree and you have a 10/10
starting point.

## Tree

```
my-skillpack/
├── skillpack.json                # manifest (cathedral fields declared)
├── skills/
│   └── <skill-slug>/
│       ├── SKILL.md              # frontmatter + body, agent-readable
│       └── routing-eval.jsonl    # >= 5 intents pinning trigger -> skill
├── runbooks/
│   └── bootstrap.md              # post-scaffold display (NOT an executor)
├── test/
│   └── *.test.ts                 # bun:test unit tests
├── e2e/
│   └── *.test.ts                 # integration tests, gated on DATABASE_URL
├── evals/
│   └── *.judge.json              # LLM-judge eval configs (>= 3 cases each)
├── CHANGELOG.md                  # Keep-a-Changelog shape
├── LICENSE                       # SPDX-matching text
├── README.md
└── .gitignore
```

`modusbrain skillpack init &lt;name&gt;` scaffolds this exact tree, pre-filled
with stubs that score 10/10 on `modusbrain skillpack doctor . --quick`
immediately. Replace the stubs with real content, run the doctor
between edits, and `modusbrain skillpack pack` produces a deterministic
`&lt;name&gt;-&lt;version&gt;.tgz` ready to publish to the registry.

## How the agent uses a scaffolded pack

After `modusbrain skillpack scaffold &lt;source&gt;` lands the files:

1. The user's agent walks `skills/*/SKILL.md` frontmatter and reads
   each pack's `triggers:` array on startup or per-message.
2. When a user phrasing matches a trigger, the agent reads that
   SKILL.md body top-to-bottom as in-context instructions.
3. modusbrain DISPLAYS `runbooks/bootstrap.md` once after the scaffold
   but does NOT auto-execute it. The agent decides whether to walk
   the steps. This is the codex T1 supply-chain hardening: an
   auto-walker would let a malicious pack mutate the user's brain
   on install, which is how npm postinstall attacks happen.

## How the doctor scores a pack

Ten binary dimensions. Each is checked by a pure function in
`src/core/skillpack/rubric.ts` and returns `&#123;passed, detail, fix_hint&#125;`.
The doctor walks them in order and prints the score + per-dimension
status + paste-ready fix for every failure.

&lt;!-- BEGIN auto-generated:rubric --&gt;

### Core dimensions (5; must all pass to publish at any tier)

| # | Name | Description | Auto-fixable |
|---|------|-------------|--------------|
| 1 | `manifest_valid` | skillpack.json passes the v1 schema validator | no |
| 2 | `skills_have_skill_md` | every listed skill has SKILL.md with valid frontmatter (name, description, triggers) | no |
| 3 | `routing_evals_present` | every skill has routing-eval.jsonl with >= 5 intents | yes |
| 4 | `skills_have_unique_triggers` | no two skills in this pack share an exact trigger phrase (MECE) | no |
| 5 | `changelog_present_and_current` | CHANGELOG.md present and contains an entry for the current version | yes |

### Quality badges (5; earn for tier eligibility)

| # | Name | Description | Auto-fixable |
|---|------|-------------|--------------|
| 6 | `unit_tests_present` | pack declares unit_tests[] with at least one matching test file | yes |
| 7 | `e2e_tests_present` | pack declares e2e_tests[] with at least one matching test file | yes |
| 8 | `llm_eval_present` | pack declares llm_evals[] with >= 1 file containing >= 3 cases | yes |
| 9 | `bootstrap_runbook_present` | pack declares runbooks.bootstrap and the file is non-empty | yes |
| 10 | `license_present` | LICENSE file exists at the pack root (informational badge) | yes |

_Generated from `src/core/skillpack/rubric.ts` by `bun run scripts/build-skillpack-anatomy.ts`._

&lt;!-- END auto-generated:rubric --&gt;
## Tier eligibility

| Tier | Requirement |
|------|-------------|
| `endorsed` | All 5 core + all 5 badges, plus Garry's `endorsements.json` overlay in the registry repo |
| `community` | All 5 core + >= 3 of 5 badges. Default tier on PR merge. |
| `experimental` | All 5 core + &lt;3 badges |
| `blocked` | Any core dimension fails |

## CLI reference (third-party path)

```bash
# Publisher side
modusbrain skillpack init my-pack         # scaffold the tree
modusbrain skillpack doctor my-pack       # see the score + fix hints
modusbrain skillpack doctor my-pack --fix --yes  # auto-scaffold missing pieces
modusbrain skillpack pack my-pack         # deterministic tarball + SHA-256

# Consumer side
modusbrain skillpack search <query>       # browse the registry
modusbrain skillpack info <name>          # show full pack metadata
modusbrain skillpack scaffold <source>    # owner/repo, https, ./dir, ./*.tgz
modusbrain skillpack registry --url X     # point at a custom registry
```

## See also

- `examples/skillpack-reference/` — the live 10/10 reference pack
- `docs/designs/SKILLPACK_REGISTRY_V1_SPEC.md` — strategic spec + decisions
- `docs/guides/skillpacks-as-scaffolding.md` — v0.36 scaffold/reference model
