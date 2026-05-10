# Test Basis Index: Admin

## Business Rules
- **BR-001**: Delete System Users (Bảo vệ user đang đăng nhập và admin mặc định).
- **BR-002**: Create System User (Unique username, valid empNumber).
- **BR-003**: Update Job Specification Attachment (Xử lý file upload và cờ currentJobSpecification).
- **BR-004**: Delete Organization Subunit Protection (Không xóa node gốc).
- **BR-005**: Pay Grade Salary Range Validation (Max > Min).
Nguồn: `inputs/source_to_spec_handoff/modules/admin/phase2_rules/business_rules.md`

## Field Rules
- FR-ADM-001 đến FR-ADM-025 (Bao gồm User, Job Title, Category, Skill, Education, Location, Pay Grade, etc.)
Nguồn: `inputs/source_to_spec_handoff/modules/admin/phase2_rules/field_rules.csv`

## Features
- ADM-USER, ADM-JOB, ADM-ORG, ADM-QUAL, ADM-NAT, ADM-CONF
Nguồn: `inputs/source_to_spec_handoff/modules/admin/phase1_scan/feature_list.md`

## Gaps
- `inputs/source_to_spec_handoff/modules/admin/handoff/gaps_and_questions.md`
