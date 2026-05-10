# Model Routing — Workspace Source to Spec

## Purpose
Định nghĩa model ưu tiên cho từng workflow và thứ tự fallback khi model bị giới hạn.

> **Lưu ý**: Antigravity không tự chuyển model. Nếu model hiện tại fail, dừng tại checkpoint và yêu cầu user chuyển model thủ công.

## Model Groups

| Group | Dùng khi | Model ưu tiên |
|---|---|---|
| **High Reasoning** | Business logic, cross-module, conflict review, final review | Gemini 3.1 Pro High → Claude Opus 4.6 Thinking |
| **Code Reasoning** | Đọc source, map module, extract validation/API/permission | Claude Sonnet 4.6 Thinking → Gemini 3.1 Pro High |
| **Fast / Format** | Scan repo, inventory, format, manifest, checklist | Gemini 3 Flash → GPT-OSS 120B Medium |

## Workflow Model Routing

| Workflow | Primary Model | Fallback | Allow Lower |
|---|---|---|---|
| `/scan_module` | Gemini 3 Flash | Claude Sonnet 4.6 Thinking | yes |
| `/extract_module_spec` | Claude Sonnet 4.6 Thinking | Gemini 3.1 Pro High | partial |
| `/describe_spec` | Gemini 3.1 Pro High | Claude Sonnet 4.6 Thinking | partial |
| `/finalize_spec` | Gemini 3.1 Pro High | Claude Opus 4.6 Thinking | no |

**Allow Lower = partial**: Model thấp hơn chỉ được format/map/package. Không được infer business rule mới.  
**Allow Lower = no**: Phải chuyển sang high-reasoning fallback trước khi tiếp tục.

## Fallback Checkpoint Format

```text
MODEL_FALLBACK_CHECKPOINT:
- workflow: <tên workflow>
- module: <module_id>
- failed_model: <model>
- reason: unavailable | quota_limited | rate_limited
- completed_artifacts: <danh sách>
- pending_artifacts: <danh sách>
- recommended_fallback: <model>
- allow_lower_model: yes | no | partial
- action: switch model manually and continue from this checkpoint
```
