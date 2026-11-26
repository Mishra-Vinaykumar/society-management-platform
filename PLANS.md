# Delivery Plan

The Society Management Platform is delivered in controlled phases. Only one phase may be active at a time. Each phase requires implementation, verification, documentation, and review before the next phase begins.

## Status legend

- `Complete`: acceptance criteria met and documented.
- `Awaiting review`: implementation is complete but owner approval is pending.
- `Planned`: not approved for implementation.
- `Blocked`: cannot proceed until a named decision or dependency is resolved.

## Progress

| Phase | Name | Status | Primary exit criteria |
| --- | --- | --- | --- |
| 00 | Product requirements and engineering rules | Awaiting review | Required blueprint documents exist; confirmed requirements, proposals, risks, and open decisions are distinguishable. |
| 01 | Repository and project foundation | Planned | pnpm/Turborepo workspace, web and API foundations, shared packages, CI, tests, builds, and setup documentation pass. |
| 02 | UI/UX design system | Planned | Accessible responsive design system and clearly labelled prototype dashboards pass visual and accessibility smoke checks. |
| 03 | Database and tenant isolation | Planned | Repeatable foundational migrations, constraints, RLS, fixtures, ER model, and cross-tenant denial tests pass. |
| 04 | Authentication and authorisation | Planned | Supabase Auth integration, scoped roles, server guards, session flows, and access-control tests pass. |
| 05 | Platform Super Admin | Planned | Society lifecycle and platform administration work end to end with audit coverage and permission tests. |
| 06 | Society, block, unit, and committee management | Planned | Organisation and occupancy workflows pass scope, history, validation, and multi-society tests. |
| 07 | Resident portal | Planned | Homeowner, tenant, and multi-residence experiences pass privacy, permission, accessibility, and responsive checks. |
| 08 | Maintenance billing | Planned | Approved billing rules are transaction-safe, reproducible, idempotent, exact, and covered by calculation and isolation tests. |
| 09 | Payments, receipts, and expenses | Planned | Approved financial workflows pass reconciliation, idempotency, audit, file-security, and access tests. |
| 10 | Announcements and notifications | Planned | Permission-aware targeting, scheduling, durable delivery, preferences, and read status pass accuracy and isolation tests. |
| 11 | Complaints and service requests | Planned | Approved state transitions, assignments, visibility boundaries, history, and notifications pass. |
| 12 | Dashboards, analytics, and reports | Planned | Server-calculated metrics and authorised exports reconcile with source transactions and prevent data leakage. |
| 13 | Security, testing, and optimisation | Planned | Repository review is complete; no unresolved critical or high security defects; measured readiness is documented. |
| 14 | Web deployment | Planned | Approved staging release, smoke tests, runbooks, backup/recovery, rollback, and release approval are complete. |
| 15 | React Native application | Planned | Approved mobile scope reuses the existing API and passes Android/iOS, permission, and notification verification. |

## Phase 00 — Product requirements and engineering rules

### Objective

Establish the shared product definition and engineering constraints before any framework or feature implementation.

### Deliverables

- `AGENTS.md`
- `PLANS.md`
- `docs/requirements/PRODUCT_REQUIREMENTS.md`
- `docs/requirements/ROLE_PERMISSION_MATRIX.md`
- `docs/requirements/UI_UX_REQUIREMENTS.md`
- `docs/architecture/SYSTEM_ARCHITECTURE.md`
- `docs/architecture/DATABASE_DESIGN.md`
- `docs/architecture/API_STANDARDS.md`
- `docs/decisions/OPEN_DECISIONS.md`
- `SECURITY.md`
- `README.md`

### Exit checklist

- [x] Product actors, modules, scope, and non-functional goals documented.
- [x] Confirmed requirements separated from proposed details.
- [x] Tenant, block, unit, and household access boundaries defined at a policy level.
- [x] Preliminary system, API, and database architecture documented.
- [x] UI/UX expectations and honest prototype behaviour documented.
- [x] Security expectations and vulnerability reporting guidance documented.
- [x] Open business rules and approval points listed without inventing policy.
- [x] No application framework or business functionality initialised.
- [ ] Product owner reviews and approves Phase 00.

## Phase 01 — Repository and project foundation

Phase 01 may begin only after Phase 00 approval.

### Planned scope

- Configure pnpm workspaces and Turborepo.
- Create `apps/web` with Next.js, React, strict TypeScript, Tailwind CSS, and the shadcn/ui foundation.
- Create `apps/api` with NestJS, strict TypeScript, health endpoint, and OpenAPI foundation.
- Create `packages/contracts`, `packages/api-client`, and `packages/config`.
- Configure shared TypeScript, ESLint, Prettier, environment validation, unit tests, Playwright, root scripts, and GitHub Actions.
- Add secret-free `.env.example` files and cross-platform setup documentation.

### Acceptance criteria

- Dependency installation succeeds from a clean checkout.
- Web and API run independently and through the root development command.
- API health endpoint responds successfully.
- Format check, lint, type-check, tests, and builds pass.
- Lockfile is committed only with approval.
- No production dashboard or domain module is implemented.
- No credential or secret is committed.

## Later phase controls

For Phases 02–15, the scope and exit criteria in the progress table are expanded by the approved requirements documents and a phase-specific implementation plan. Before each phase:

1. Resolve all decisions marked as required for that phase.
2. Define measurable acceptance criteria and test cases.
3. Confirm external services, costs, migrations, and deployment actions that require approval.
4. Create a focused branch and implementation plan.
5. Complete an independent review before advancing.
