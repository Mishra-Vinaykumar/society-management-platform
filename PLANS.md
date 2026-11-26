# Delivery Plan

The Society Management Platform is delivered in controlled phases. Only one phase may be active at a time. Each phase requires implementation, verification, documentation, and review before the next phase begins.

## Status legend

- `Complete`: acceptance criteria met and documented.
- `Ready`: prerequisites are satisfied and implementation may begin only when explicitly instructed.
- `Awaiting review`: implementation is complete but owner approval is pending.
- `Planned`: not approved for implementation.
- `Blocked`: cannot proceed until a named decision or dependency is resolved.

## Progress

| Phase | Name                                           | Status          | Primary exit criteria                                                                                                         |
| ----- | ---------------------------------------------- | --------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| 00    | Product requirements and engineering rules     | Complete        | Required blueprint documents exist; confirmed requirements, proposals, risks, and open decisions are distinguishable.         |
| 01    | Repository and project foundation              | Awaiting review | pnpm/Turborepo workspace, web and API foundations, shared packages, CI, tests, builds, and setup documentation pass.          |
| 02    | UI/UX design system                            | Planned         | Accessible responsive design system and clearly labelled prototype dashboards pass visual and accessibility smoke checks.     |
| 03    | Database and tenant isolation                  | Planned         | Repeatable foundational migrations, constraints, RLS, fixtures, ER model, and cross-tenant denial tests pass.                 |
| 04    | Authentication and authorisation               | Planned         | Supabase Auth integration, scoped roles, server guards, session flows, and access-control tests pass.                         |
| 05    | Platform Super Admin                           | Planned         | Society lifecycle and platform administration work end to end with audit coverage and permission tests.                       |
| 06    | Society, block, unit, and committee management | Planned         | Organisation and occupancy workflows pass scope, history, validation, and multi-society tests.                                |
| 07    | Resident portal                                | Planned         | Homeowner, tenant, and multi-residence experiences pass privacy, permission, accessibility, and responsive checks.            |
| 08    | Maintenance billing                            | Planned         | Approved billing rules are transaction-safe, reproducible, idempotent, exact, and covered by calculation and isolation tests. |
| 09    | Payments, receipts, and expenses               | Planned         | Approved financial workflows pass reconciliation, idempotency, audit, file-security, and access tests.                        |
| 10    | Announcements and notifications                | Planned         | Permission-aware targeting, scheduling, durable delivery, preferences, and read status pass accuracy and isolation tests.     |
| 11    | Complaints and service requests                | Planned         | Approved state transitions, assignments, visibility boundaries, history, and notifications pass.                              |
| 12    | Dashboards, analytics, and reports             | Planned         | Server-calculated metrics and authorised exports reconcile with source transactions and prevent data leakage.                 |
| 13    | Security, testing, and optimisation            | Planned         | Repository review is complete; no unresolved critical or high security defects; measured readiness is documented.             |
| 14    | Web deployment                                 | Planned         | Approved staging release, smoke tests, runbooks, backup/recovery, rollback, and release approval are complete.                |
| 15    | React Native application                       | Planned         | Approved mobile scope reuses the existing API and passes Android/iOS, permission, and notification verification.              |

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
- [x] Node.js and pnpm baseline, local-first development, public-repository policy, and working product name recorded as accepted ADRs.
- [x] Independent architecture, security, maintainability, scalability, and mobile-readiness review completed.
- [x] No application framework or business functionality initialised.
- [x] Product owner reviewed and approved Phase 00.

## Phase 01 — Repository and project foundation

Phase 01 is implemented on `chore/phase-01-monorepo-foundation` and is awaiting owner review. Phase 02 remains planned and must not begin until Phase 01 is approved.

### Implemented scope

- [x] Configured pnpm workspaces and Turborepo.
- [x] Pinned Node.js `26.13.1` and pnpm `12.23.0` as specified by [ADR-001](docs/decisions/ADR-001-node-and-pnpm-versions.md).
- [x] Created `apps/web` with Next.js, React, strict TypeScript, Tailwind CSS, and the shadcn/ui foundation.
- [x] Created `apps/api` with NestJS, strict TypeScript, validated configuration, problem-details errors, a versioned health endpoint, and OpenAPI.
- [x] Created functional, platform-independent `packages/contracts`, `packages/api-client`, and `packages/config`.
- [x] Configured shared TypeScript, ESLint, Prettier, Vitest, Jest, Playwright, root scripts, and GitHub Actions.
- [x] Added a secret-free `.env.example` and cross-platform setup documentation.
- [x] Kept local development independent from production hosting and the NestJS API provider-neutral as specified by [ADR-002](docs/decisions/ADR-002-local-development-and-portable-api-hosting.md).
- [x] Added public-repository secret scanning and synthetic-data safeguards without adding an open-source licence, as specified by [ADR-003](docs/decisions/ADR-003-public-repository-without-license.md).

### Acceptance criteria

- [x] Dependency installation succeeds from a clean dependency state with `pnpm install --frozen-lockfile`.
- [x] Node.js and pnpm pins match ADR-001 locally and in CI.
- [x] Web and API run independently and through the root development command.
- [x] API health endpoint responds successfully.
- [x] Format check, lint, type-check, tests, end-to-end test, and builds pass.
- [x] Framework and Turborepo tasks execute successfully under Node.js `26.13.1`.
- [x] Initial development requires no production host, paid resource, production credential, or real resident data.
- [x] Approved reproducible lockfile is included.
- [x] No production dashboard or domain module is implemented.
- [x] No credential or secret is committed.
- [x] No open-source licence is added.
- [ ] Product owner review and Phase 01 approval are complete.

Executed verification, security review, and known limitations are recorded in [Phase 01 foundation](docs/phases/PHASE_01_FOUNDATION.md).

## Later phase controls

For Phases 02–15, the scope and exit criteria in the progress table are expanded by the approved requirements documents and a phase-specific implementation plan. Before each phase:

1. Resolve all decisions marked as required for that phase.
2. Define measurable acceptance criteria and test cases.
3. Confirm external services, costs, migrations, and deployment actions that require approval.
4. Create a focused branch and implementation plan.
5. Complete an independent review before advancing.
