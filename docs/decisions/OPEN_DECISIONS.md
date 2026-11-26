# Open Decisions

## Purpose

The project brief intentionally leaves society policies and business rules unconfirmed. This register prevents proposals from becoming accidental requirements. A decision is complete only when the product owner approves it and the outcome is recorded in a dated architecture or product decision record.

Priority indicates the first phase that is materially blocked or constrained by the decision.

## Decisions required before Phase 01

| ID | Decision | Why it matters | Proposed direction | Status |
| --- | --- | --- | --- | --- |
| DEC-001 | Minimum supported Node.js and pnpm versions | Reproducible local development and CI | Select stable versions supported by the chosen Next.js, NestJS, and Turborepo releases; pin them in repository metadata. | Open |
| DEC-002 | API hosting target for development and eventual production | Affects runtime constraints, background jobs, networking, and deployment documentation | Keep the API portable in Phase 01; approve a provider before deployment work. | Open |
| DEC-003 | License and contribution policy | Determines reuse and contributor expectations | Keep the repository private and omit an open-source license until ownership decides. | Open |
| DEC-004 | Product name and initial visual brand | Affects metadata and Phase 02 design direction | Use “Society Management Platform” as a working product name with neutral branding. | Open |

## Decisions required before Phase 03

| ID | Decision | Questions to approve | Proposed direction | Status |
| --- | --- | --- | --- | --- |
| DEC-010 | Society hierarchy | Are building and block synonyms, separate siblings, or nested? Are floors mandatory? Can a society have houses without blocks? | Model a flexible hierarchy only after real society examples are reviewed; do not encode names as assumptions. | Open |
| DEC-011 | Unit identity | Which fields make a flat or house unique? Are wings, towers, floors, and unit categories required? | Use a stable UUID plus a tenant-scoped human identifier. | Open |
| DEC-012 | Ownership model | Is joint ownership supported? Can organisations own units? What evidence and approval are required? | Time-bound relationship records with multiple parties if approved. | Open |
| DEC-013 | Occupancy model | Can owners and tenants overlap? How are family members, dependants, staff, or vacant units represented? | Separate legal relationship from physical occupancy if business examples require it. | Open |
| DEC-014 | Historical access | What can former owners or tenants access after move-out or transfer? | End active access at the effective time while retaining narrowly approved historical records. | Open |
| DEC-015 | Society timezone and financial year | Scheduling, due dates, reports, and numbering depend on it | Store timestamps in UTC and keep an IANA timezone per society; define financial year explicitly. | Open |
| DEC-016 | Retention and erasure | How long are personal, occupancy, complaint, audit, and financial records kept? | Define category-specific retention with legal review before production. | Open |
| DEC-017 | RLS request context | Which PostgreSQL mechanism and connection pool will set trusted identity and scope? | Use transaction-local settings under a restricted runtime role and test context leakage. | Open |

## Decisions required before Phase 04

| ID | Decision | Questions to approve | Proposed direction | Status |
| --- | --- | --- | --- | --- |
| DEC-020 | Launch role catalogue | Are Chairman, Society Admin, Secretary, Treasurer, Block Head, Committee Member, Homeowner, and Tenant all required? | Keep roles as scoped assignments and remove or merge only after workflow review. | Open |
| DEC-021 | Capability catalogue | Which operations can each role perform and delegate? | Approve explicit capabilities; do not grant all actions from a title alone. | Open |
| DEC-022 | Separation of duties | Must billing approval, payment verification, reconciliation, reversal, and expense approval be performed by different people? | Require maker-checker for high-risk actions if the society has enough authorised users. | Open |
| DEC-023 | Administrator MFA | Is MFA mandatory for platform, chairman, admin, and finance roles? | Make MFA mandatory for high-privilege and financial roles before production. | Open |
| DEC-024 | Invitation policy | Who may invite, how long links live, and what verification is required? | Single-use hashed tokens with expiry, revocation, and audit. | Open |
| DEC-025 | Platform support access | Can platform staff view society personal or financial data for support? | No default private-data access; use time-bound, audited support elevation only if approved. | Open |
| DEC-026 | Session policy | Idle timeout, absolute lifetime, device management, and reauthentication requirements | Reauthenticate sensitive operations and use stricter policy for administrators. | Open |

## Decisions required before Phases 05–07

| ID | Decision | Questions to approve | Proposed direction | Status |
| --- | --- | --- | --- | --- |
| DEC-030 | Society onboarding states | Which steps and approvals make a society active? | Draft, onboarding, active, suspended, archived with explicit allowed transitions. | Open |
| DEC-031 | Bulk import policy | Who can import, what template is supported, and how are conflicts handled? | Validate and preview every row; commit atomically or in clearly reported batches. | Open |
| DEC-032 | Committee terms | Are appointments time-bound? Who appoints or replaces members? | Effective dates with history and explicit appointment/revocation authority. | Open |
| DEC-033 | Resident directory | Which committee or resident contact fields can residents see? | Share the minimum approved role contact information, not private household data. | Open |
| DEC-034 | Profile editing | Which identity and contact fields may a resident change directly versus request approval? | Allow low-risk preferences directly; review changes that affect identity or official records. | Open |
| DEC-035 | Multiple residences | How should users select context and how are shared households represented? | Explicit active residence context with no data carryover between contexts. | Open |

## Decisions required before Phase 08

| ID | Decision | Questions to approve | Proposed direction | Status |
| --- | --- | --- | --- | --- |
| DEC-040 | Billing models | Fixed, area-based, category-based, or other? Can models combine? | Configure only approved models and version their inputs. | Open |
| DEC-041 | Billing frequency and period | Monthly, quarterly, annual, or custom? Calendar or financial year? | Explicit periods with one approved bill per unit and charge context. | Open |
| DEC-042 | Area definition | Built-up, carpet, super built-up, or another area? What unit and rounding? | Do not implement area billing until the exact source and rounding are approved. | Open |
| DEC-043 | Proration | Are move-in, move-out, ownership transfer, or mid-period changes prorated? | No proration by default unless an exact policy is approved. | Open |
| DEC-044 | Late fees and interest | Formula, grace period, cap, waiver, tax treatment, and compounding? | Do not implement until legally and operationally approved. | Open |
| DEC-045 | Discounts and exemptions | Who qualifies, who approves, and how are they audited? | Explicit, time-bound adjustments with reason and approval. | Open |
| DEC-046 | Bill numbering and publication | Numbering scope, approval flow, edit cutoff, and delivery date | Assign immutable number at approved publication and preserve a reproducible snapshot. | Open |
| DEC-047 | Money representation | Integer paise or exact decimal, and is multi-currency needed? | Integer paise with `INR` for initial release. | Open |

## Decisions required before Phase 09

| ID | Decision | Questions to approve | Proposed direction | Status |
| --- | --- | --- | --- | --- |
| DEC-050 | Accepted payment methods | Cash, bank, UPI, cheque, or gateway? Who records and verifies each? | Enable only approved methods with method-specific verification state. | Open |
| DEC-051 | Payment allocation | Oldest bill first, payer-selected, administrator-selected, or policy-based? | Record explicit allocations; do not infer silently. | Open |
| DEC-052 | Overpayments and credits | Can accounts hold credit? Can refunds occur? Who approves? | Use a separately auditable credit/refund workflow if approved. | Open |
| DEC-053 | Receipt numbering | Society, year, payment method, or global sequence? Can receipts be voided? | Immutable unique receipt with visible reversal or void status. | Open |
| DEC-054 | Reconciliation | Required bank data, matching rules, exception ownership, and close process | Human-reviewable matching with no destructive edits. | Open |
| DEC-055 | Expense approvals | Categories, budgets, thresholds, block authority, and evidence | Capability and amount-based approval policy with attachments and audit. | Open |
| DEC-056 | Online gateway | Is Razorpay approved? Who owns account, fees, refunds, and webhook secrets? | Test mode only until commercial and security approval. | Open |
| DEC-057 | Tax and accounting | GST or other taxes, invoices, accounting periods, and export requirements | Obtain qualified accounting guidance before implementation. | Open |

## Decisions required before Phases 10–12

| ID | Decision | Questions to approve | Proposed direction | Status |
| --- | --- | --- | --- | --- |
| DEC-060 | Announcement publishers | Which roles can draft, approve, schedule, and publish to each audience? | Separate draft from broad or emergency publication where practical. | Open |
| DEC-061 | Notification delivery | In-app only for launch? Retention, retry window, quiet hours, and expiry? | In-app initially with durable outbox and configurable preferences where safety allows. | Open |
| DEC-062 | Emergency overrides | Can emergency alerts bypass preferences or quiet hours? Who can send them? | Require an explicit emergency capability and audit. | Open |
| DEC-063 | Attachments | Allowed types, maximum sizes, scanning, retention, and download policy | Private storage, allowlist, size limits, content inspection, and authorised download. | Open |
| DEC-064 | Complaint categories and priorities | Who configures categories and priority? | Society-scoped approved catalogue with stable identifiers. | Open |
| DEC-065 | Complaint transitions | Who can assign, resolve, close, reopen, and escalate? Are service targets required? | Explicit transition table with permissions, reasons, and full history. | Open |
| DEC-066 | Internal notes | Which roles can read internal complaint notes? | Only explicitly assigned management capabilities; never resident-visible. | Open |
| DEC-067 | Metrics definitions | Exact formulas for collection rate, outstanding, occupancy, resolution time, and growth | Publish a metric dictionary and reconcile each value to source records. | Open |
| DEC-068 | Export limits | Which roles, fields, date ranges, formats, retention, and row limits? | Permission-scoped asynchronous exports with expiry and audit for sensitive data. | Open |

## Decisions required before Phase 14

| ID | Decision | Questions to approve | Proposed direction | Status |
| --- | --- | --- | --- | --- |
| DEC-070 | Environments and providers | API host, Supabase projects, Vercel teams, regions, and ownership | Separate development, staging, and production resources. | Open |
| DEC-071 | Domain and email | Approved domains, sender identity, DNS owner, and transactional email provider | Defer all DNS and provider changes until release approval. | Open |
| DEC-072 | Monitoring and incident response | Error monitoring, logs, metrics, alert owners, and escalation | Select privacy-conscious tools and create an incident runbook. | Open |
| DEC-073 | Backup and recovery objectives | Retention, RPO, RTO, restore testing, and responsible owner | Define targets from business impact and prove restoration before production. | Open |
| DEC-074 | Data residency and legal obligations | Required region, privacy notices, terms, consent, and regulatory duties | Obtain qualified legal review for production policy. | Open |
| DEC-075 | Production administrator onboarding | Who receives initial privileged access and how is it verified? | Named, MFA-protected, auditable onboarding with no shared accounts. | Open |
| DEC-076 | Release approval | Who signs off security, data migration, costs, and go-live? | Use a written release checklist and explicit owner approval. | Open |

## Decision record process

When a decision is approved:

1. Create `docs/decisions/ADR-NNN-short-title.md`.
2. Record date, status, context, decision, alternatives, consequences, security impact, migration impact, and owner approval.
3. Update this register with the ADR link and `Decided` status.
4. Update affected requirements, architecture, API, database, UI, and test documents.
5. Do not rewrite historical ADRs; supersede them with a new decision.
