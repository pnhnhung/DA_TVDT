# Test Basis Index: Authentication

## Business Rules
- **BR-001**: CSRF & Credential Validation (`inputs/source_to_spec_handoff/modules/authentication/phase2_rules/business_rules.md`)
- **BR-002**: Password Policy Constraint on Strength (`inputs/source_to_spec_handoff/modules/authentication/phase2_rules/business_rules.md`)

## Field Rules
- **FR-001**: `login.username` (required, string)
- **FR-002**: `login.password` (required, string)
- **FR-003**: `login._token` (required, string, CSRF format)
- **FR-004**: `passwordValidation.password` (required, string)
Nguồn: `inputs/source_to_spec_handoff/modules/authentication/phase2_rules/field_rules.csv`

## Features
- **AUTH-001**: Password validation (`inputs/source_to_spec_handoff/modules/authentication/phase1_scan/feature_list.md`)
- **AUTH-002**: View login form
- **AUTH-003**: Process login
- **AUTH-004**: Logout
- **AUTH-005**: Request password reset
- **AUTH-006**: Reset password
- **AUTH-007**: Admin verify

## Gaps
- `inputs/source_to_spec_handoff/modules/authentication/handoff/gaps_and_questions.md`
