---
trigger: always_on
---

# Model Routing — Workspace Gen Testcase

## Purpose
Define the preferred model for each workflow and the fallback model order when the selected model is unavailable, quota-limited, or rate-limited.

This rule is only for model routing. It does not handle context-token errors.

## Important
Antigravity may not switch models automatically from this file. If the current model fails, stop at the checkpoint and continue after the user switches to the recommended fallback model in the model selector.

## Model Groups

### High Reasoning
Use for strong UT generation, expanded IT generation, coverage review, conflict review, and final testcase review.

Preferred order:
1. Gemini 3.1 Pro High
2. Claude Opus 4.6 Thinking
3. Claude Sonnet 4.6 Thinking

### Test Design / Source-Aware Reasoning
Use for preparing manual scope, mapping testcase to spec, automation input mapping, and traceability.

Preferred order:
1. Claude Sonnet 4.6 Thinking
2. Gemini 3.1 Pro High
3. Gemini 3.1 Pro Low

### Fast / Formatting
Use for intake, formatting, manifest, checklist, and final packaging.

Preferred order:
1. Gemini 3 Flash
2. GPT-OSS 120B Medium
3. Gemini 3.1 Pro Low

## Workflow Model Routing

| Workflow | Primary Model | Fallback 1 | Fallback 2 | Allow Lower Model |
|---|---|---|---|---|
| `00_intake_spec` | Gemini 3 Flash | GPT-OSS 120B Medium | Gemini 3.1 Pro Low | yes |
| `01_prepare_manual_scope` | Gemini 3.1 Pro Low | Claude Sonnet 4.6 Thinking | Gemini 3 Flash | yes |
| `02_generate_ut` | Gemini 3.1 Pro High | Claude Opus 4.6 Thinking | Claude Sonnet 4.6 Thinking | no |
| `03_generate_it` | Gemini 3.1 Pro High | Claude Opus 4.6 Thinking | Claude Sonnet 4.6 Thinking | no |
| `04_generate_usercases` | Gemini 3.1 Pro Low | Claude Sonnet 4.6 Thinking | Gemini 3 Flash | yes |
| `05_review_manual_pack` | Gemini 3.1 Pro High | Claude Opus 4.6 Thinking | Claude Sonnet 4.6 Thinking | no |
| `06_prepare_automation_input` | Claude Sonnet 4.6 Thinking | Gemini 3.1 Pro High | Gemini 3.1 Pro Low | partial |
| `07_final_handoff_pack` | Gemini 3 Flash | GPT-OSS 120B Medium | Gemini 3.1 Pro Low | yes |

## Fallback Rule

If the current model is unavailable, quota-limited, or rate-limited:

1. Stop the current workflow.
2. Write a checkpoint.
3. Recommend the next fallback model from the table above.
4. Do not silently continue with a weaker model.
5. If `Allow Lower Model = no`, only continue after switching to a high reasoning fallback.
6. If `Allow Lower Model = partial`, lower model may only format, map, or package existing information. It must not generate new UT/IT logic.
7. If `Allow Lower Model = yes`, lower model may continue the workflow if traceability to source spec is preserved.

## Strict Quality Rule

For these workflows, do not downgrade to Gemini Flash or GPT-OSS:

- `02_generate_ut`
- `03_generate_it`
- `05_review_manual_pack`

These workflows directly affect testcase quality and coverage.

## Required Checkpoint Format

```text
MODEL_FALLBACK_CHECKPOINT:
- workspace: gen-testcase
- workflow:
- module:
- failed_model:
- reason: unavailable | quota_limited | rate_limited
- completed_artifacts:
- pending_artifacts:
- recommended_fallback_model:
- allow_lower_model: yes | no | partial
- action_required: switch model manually and continue from this checkpoint
```
