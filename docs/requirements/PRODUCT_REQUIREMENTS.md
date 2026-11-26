# Product Requirements

## Document status

- Phase: 00 — Product requirements and engineering rules
- Status: Proposed for product-owner review
- Product: Society Management Platform

This document separates **confirmed direction** from **proposed detail**. Confirmed direction comes from the approved project brief. Proposed detail is a design recommendation and must not be treated as a final society policy. Unresolved business rules are tracked in [Open Decisions](../decisions/OPEN_DECISIONS.md).

## Product vision

### Confirmed

Build a production-ready, secure, maintainable, and scalable multi-tenant platform that digitises residential society management. It connects platform operators, society management, block committees, homeowners, tenants, and authorised residents through role-specific experiences and a shared source of truth.

The first product is a responsive web application. A React Native and Expo application may be added after the web platform is stable, using the same API, database, authentication, permissions, notifications, and financial business logic.

## Product outcomes

### Confirmed

- Keep every society's data and permissions isolated.
- Represent buildings or blocks, residential units, ownership, tenancy, occupancy, and committee responsibilities accurately over time.
- Give each user only the information and actions authorised by their scoped assignments.
- Make maintenance billing, payments, expenses, and receipts exact, reproducible, and auditable.
- Provide targeted society communication and structured complaint resolution.
- Replace manual summaries with permission-aware, database-derived dashboards and reports.
- Preserve an audit history for sensitive administrative and financial changes.

### Proposed success measures

Final targets require product-owner approval and baseline data. Candidate measures are:

- Society onboarding completion rate and time to first usable structure.
- Percentage of active units with verified owner or tenant relationships.
- Maintenance collection rate and reconciliation exception count.
- Duplicate or inconsistent financial transaction rate.
- Announcement delivery and read rates.
- Complaint first-response and resolution times.
- Cross-tenant access-control test pass rate.
- Task completion rate and accessibility defect rate for core user journeys.

## Actors and scopes

| Actor | Confirmed responsibility | Typical scope |
| --- | --- | --- |
| Platform Super Admin | Operates the multi-society platform and manages authorised platform administration. | Platform and explicitly authorised societies. |
| Society Chairman | Leads and administers an assigned society. | Assigned society. |
| Society Admin | Performs delegated society administration. | Assigned society and granted capabilities. |
| Secretary | Performs approved secretarial and communication duties. | Assigned society and granted capabilities. |
| Treasurer | Performs approved billing, payment, expense, and reporting duties. | Assigned society and granted capabilities. |
| Block Head | Coordinates approved work for an assigned building or block. | Assigned blocks. |
| Committee Member | Performs specifically assigned responsibilities. | Assigned society or blocks and granted capabilities. |
| Homeowner | Accesses approved information and services for owned residences. | Authorised residential memberships. |
| Tenant | Accesses approved information and services for occupied residences. | Authorised residential memberships during valid occupancy. |
| Authorised Resident | May represent another approved occupant category. | Explicitly authorised residential memberships. |

Role names and final capabilities remain subject to approval. A person may have multiple scoped assignments and may belong to multiple societies or residential units.

## Functional requirements

### FR-01 Identity and account lifecycle

**Confirmed**

- Support secure login, logout, invitation-based registration, password recovery, session refresh, activation, and suspension.
- Support user profiles and role-aware routing.
- Support users with multiple society or residence memberships and an active context selection.
- Support administrator multi-factor authentication.
- Derive privileges from trusted server-side memberships and assignments.

**Open**

- Whether MFA is mandatory or optional for each administrative role.
- Invitation expiry, resend, domain restrictions, and identity-verification policy.

### FR-02 Authorisation and tenant isolation

**Confirmed**

- Use scoped assignments instead of one global role per user.
- Enforce permission checks on every protected API operation.
- Isolate societies and further restrict data by block, residential unit, household, and responsibility where applicable.
- Deny unauthorised cross-society and cross-block access.
- Maintain audit events for sensitive access and administrative changes.

### FR-03 Society lifecycle

**Confirmed**

- Platform administration can create, view, and update societies.
- Support activate, suspend, and archive lifecycle states without deleting historical records.
- Invite, assign, replace, and revoke authorised society administrators.
- Search, filter, sort, and paginate society records.
- Present society onboarding status and authorised statistics.

### FR-04 Buildings, blocks, floors, and residential units

**Confirmed**

- Society management can create and manage the approved hierarchy of buildings or blocks, floors, and residential units.
- Unit identifiers and relationships must be unique within the correct tenant scope.
- Block-level users can operate only on explicitly assigned blocks.
- Support controlled bulk import with validation and preview before commit.

**Open**

- Whether building and block are interchangeable, nested, or separate concepts.
- Required unit attributes, unit categories, floor rules, and numbering conventions.

### FR-05 Ownership, tenancy, residents, and occupancy

**Confirmed**

- Represent owners, tenants, multiple authorised occupants where allowed, move-in and move-out dates, invitation status, occupancy status, and history.
- Preserve historical ownership and occupancy rather than overwriting it.
- Protect household personal information from unrelated residents.
- Support users authorised for more than one residence.

**Open**

- Joint ownership rules, minors or dependants, staff or family categories, verification evidence, and approval workflows.

### FR-06 Committee appointments and responsibilities

**Confirmed**

- Assign block heads and committee members to approved society or block scopes.
- Assign explicit responsibilities and permissions with effective periods.
- Allow residents to view only approved committee information.

**Open**

- Final committee roles, responsibility catalogue, term rules, quorum, replacement, and approval requirements.

### FR-07 Maintenance billing

**Confirmed**

- Configure approved billing models, billing periods, draft generation, preview, approval, publication, due dates, balances, partial payments, bill history, approved adjustments, controlled corrections, reversals, and printable bills.
- Prevent duplicate bills for the same unit, period, and applicable charge.
- Store amounts exactly and retain historically reproducible published bills.
- Use transactional and idempotent generation.

**Proposed models requiring approval**

- Fixed amount per unit.
- Area-based amount.
- Unit-category-based amount.
- Additional explicitly approved charges.

The platform must not invent late fees, taxes, exemptions, discounts, proration, or rounding rules.

### FR-08 Payments, receipts, and reconciliation

**Confirmed**

- Record and verify approved payments, allocate them to bills, support partial allocation, prevent duplicates, generate unique receipts, reconcile, and perform authorised reversals.
- Maintain an immutable financial audit trail with compensating corrections.
- Never mark a bill paid from a client-side success callback alone.
- If an online gateway is approved, verify signatures and process webhooks idempotently on the server.

**Candidate methods requiring approval**

- Cash, bank transfer, UPI, cheque, and online payment gateway.
- Razorpay test-mode evaluation before any live enablement.

### FR-09 Expenses and financial records

**Confirmed**

- Support approved expense categories, society expenses, permitted block expenses, invoices, supporting documents, approval status, summaries, and cash or bank movement tracking.
- Store supporting files privately with access controls.
- Preserve financial records and use reversals rather than destructive deletion.

**Open**

- Approval thresholds, maker-checker requirements, budgets, categories, numbering, accounting periods, and tax treatment.

### FR-10 Announcements and notifications

**Confirmed**

- Authorised users can target approved societies, a society, buildings or blocks, residential units, committee members, or selected authorised residents.
- Support drafts, publication, scheduled publication, priority, expiry, attachments, history, read state, unread count, preferences, search, filters, and audience preview.
- Store notifications durably and prevent duplicate or lost delivery through a reliable delivery design.
- Use in-app notifications for the initial release and prepare a provider boundary for future mobile push.
- Do not add paid SMS, email, or WhatsApp delivery without approval.

### FR-11 Complaints and service requests

**Confirmed**

- Residents can create categorised requests with descriptions and permitted attachments, view status and resident-visible responses, provide feedback, and request reopening where allowed.
- Management can view authorised tickets, assign owners, set priority, update status, add internal or resident-visible notes, escalate, and record resolution.
- Keep internal notes separate from resident-visible communication.
- Maintain status and assignment history and send authorised notifications.

**Proposed transition vocabulary**

`Open → Assigned → In Progress → Resolved → Closed`, with an approved path to `Reopened`. Exact transition permissions and reopening limits require approval.

### FR-12 Dashboards and reports

**Confirmed**

- Provide role-specific dashboards derived from backend data rather than hardcoded totals.
- Support authorised date, society, block, and unit filters where applicable.
- Provide maintenance, outstanding, payments, income and expense, block, occupancy, complaint, and audit reports.
- Support authorised CSV, Excel, and PDF exports.
- Use server-side aggregation and pagination and document metric definitions.

### FR-13 Audit and activity history

**Confirmed**

- Audit sensitive society lifecycle, role assignment, membership, billing, payment, expense, complaint, announcement, and settings changes.
- Record trusted actor, scope, action, target, time, result, and appropriate change context without recording secrets.
- Protect audit integrity and authorise audit access.

### FR-14 Society profile and settings

**Confirmed**

- Authorised society management can maintain approved society profile and configuration.
- Settings changes that affect permissions or financial behaviour must be audited.

**Open**

- Branding, locale, timezone, financial year, numbering, policy, contact, and approval settings.

## Role-specific experience requirements

### Platform operator

- Overview of authorised societies, blocks or buildings, units, active accounts, onboarding, and recent administrative activity.
- Society lifecycle, platform users, role administration, announcements, audit logs, and platform settings.

### Society management

- Society profile, organisation, units, memberships, committee assignments, authorised finance, communications, complaints, reports, and settings.
- Statistics are shown only when their source module exists and the viewer is authorised.

### Block committee

- Assigned block overview, permitted committee and resident information, occupancy, activity, maintenance statistics, and complaint workload.
- No access to unrelated blocks without another explicit assignment.

### Resident

- Personal profile and residence context, maintenance and payment history, announcements, notifications, complaints, approved committee contacts, and settings.
- Mobile-first access with clear unavailable states for modules not yet delivered.

## Non-functional requirements

### Security and privacy

- Enforce least privilege, defence-in-depth tenant isolation, secure session handling, private storage, secure uploads, safe secret management, and dependency review.
- Protect financial data and personal information in transit and at rest through approved infrastructure controls.
- Prevent common web and API vulnerabilities, including broken access control, injection, cross-site scripting, request forgery where applicable, unsafe uploads, and sensitive logging.

### Reliability and integrity

- Use transaction-safe financial workflows, idempotency, unique constraints, durable notifications, health checks, structured error handling, backups, and recovery procedures.
- Do not lose historical ownership, occupancy, financial, complaint, or audit records through normal edits.

### Performance and scalability

- Paginate large collections, aggregate on the server, index tenant and lookup keys, avoid N+1 queries, and measure before caching.
- Scale the initial modular monolith without weakening tenant isolation. Extract services only when evidence justifies it.

### Accessibility and responsiveness

- Support keyboard use, semantic structure, labelled controls, visible focus, sufficient contrast, reduced motion, and accessible status messaging.
- Support mobile, tablet, laptop, and desktop layouts.

### Maintainability and testability

- Use modular, typed, documented code; shared contracts; versioned migrations; automated tests; consistent tooling; CI; and controlled releases.
- Keep business rules out of presentation components so future clients can reuse them.

### Observability and operations

- Use structured logs, correlation identifiers, safe metrics, error monitoring, health and readiness endpoints, migration procedures, backup and recovery runbooks, and rollback instructions.

## Initial release boundaries

### Confirmed exclusions until separately approved

- React Native mobile application.
- Public production deployment, DNS changes, production migrations, or paid resources.
- Live payment processing.
- Paid SMS, email, or WhatsApp notification providers.
- Premature microservices.
- Any unapproved maintenance formula, late fee, tax, exemption, or financial policy.
- Fabricated production data or fake authentication.

## Acceptance strategy

Every phase must define and execute relevant checks from this set:

- Unit tests for isolated rules and validation.
- API integration and contract tests.
- Database constraint, migration, and RLS tests.
- Authorisation tests for allowed and denied scopes.
- End-to-end role journeys.
- Financial calculation, idempotency, reversal, and concurrency tests.
- Notification targeting, scheduling, and duplicate-delivery tests.
- Responsive, accessibility, and visual smoke tests.
- Performance tests using representative data and documented measurements.
- Security review with severity-classified findings.

## Dependencies and approvals

- Phase 01 requires Phase 00 approval.
- Phase 03 requires hierarchy, membership, and tenant-isolation decisions needed by the schema.
- Phase 04 requires final role and permission decisions for initial launch.
- Phases 08 and 09 require approved billing and financial policies.
- Phase 10 requires approved announcement roles, retention, and scheduling policy.
- Phase 11 requires approved complaint transitions and visibility rules.
- Phase 14 requires hosting, domain, monitoring, backup, cost, and release approval.
