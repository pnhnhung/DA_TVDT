# Suggested Testcases — Contract Management
> Class: SUGGESTED | Workflow: 09 | Date: 2026-05-02

| TC ID | Title | Lý do SUGGESTED | Rule | Risk |
|---|---|---|---|---|
| IT-CONT-020 | 2 Admin cùng hủy cùng GD → chỉ 1 hủy thực sự | Concurrency — inferred | BR_CONT_006 | High |
| IT-CONT-021 | Customer double-tap nút Thanh toán → 1 Tx tạo | Concurrency — idempotency inferred | BR_CONT_010 | High |
| IT-CONT-007b | Fee fallback: Contract không có fee → dùng Shop fee | Fallback behavior chưa có testcase cụ thể | BR_CONT_011 | Medium |
| IT-CONT-016b | Async batch job fail → status FAILED trên CMS | Failure path async job inferred | BR_CONT_008 | Medium |
