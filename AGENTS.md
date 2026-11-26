# Repository Engineering Guide

This file defines the permanent working rules for the Society Management Platform repository. These rules apply to every change unless a more specific `AGENTS.md` exists below the edited path.

## Product boundary

- Build a multi-tenant residential society management platform for platform operators, society management, block committees, homeowners, tenants, and authorised residents.
- Develop one approved phase at a time. Do not begin the next phase until the current phase has been reviewed and approved.
- Keep the web application, API, shared contracts, data access, and future mobile application independently deployable inside one monorepo.
- Use a modular monolith for the initial backend. Do not introduce microservices without an approved architecture decision.
- Treat requirements marked **proposed** or **open** as unapproved. Do not turn them into business rules without a recorded decision.

## Required workflow

1. Inspect the repository and working tree before editing.
2. Read `PLANS.md`, `SECURITY.md`, and the documents relevant to the active phase.
3. Confirm the approved phase and keep changes inside its scope.
4. Record significant architecture or business-rule decisions under `docs/decisions/`.
5. Implement the smallest complete change that satisfies the phase acceptance criteria.
6. Run the relevant format, lint, type-check, test, and build commands. Report only commands that actually ran.
7. Review the diff for secrets, personal data, generated files, accidental scope expansion, and documentation drift.
8. Update `PLANS.md` and relevant documentation before requesting review.
9. Use a focused branch and conventional commit. Do not push, deploy, migrate remote data, create paid resources, or modify external services without explicit approval.
10. Stop at the phase boundary and report unresolved decisions and verification limits.

## Architecture rules

- Use strict TypeScript. Avoid `any`; when unavoidable, isolate it at an integration boundary and document why.
- Separate presentation, application, domain, and infrastructure responsibilities.
- Keep controllers thin. Business rules belong in services or domain modules, and persistence belongs behind data-access boundaries.
- Share API contracts, validation schemas, and generated clients instead of duplicating request or response types.
- Prefer dependency injection and explicit interfaces at external boundaries.
- Keep modules cohesive and dependencies directional. Avoid circular imports and cross-module database access.
- Use environment validation at application startup. Commit examples only, never real credentials.
- Add dependencies only when they provide a clear, maintained capability that is not already available.
- Preserve backward compatibility for published API contracts unless a versioned change is approved.

## Multi-tenant and authorisation rules

- Deny access by default.
- Derive identity, active society, and permissions from verified server-side data. Never trust a role, society ID, block ID, unit ID, ownership claim, or payment result supplied by the client.
- Scope every protected query and mutation to the authorised society and, where applicable, block or residential unit.
- Enforce permissions in the NestJS API and use PostgreSQL row-level security as defence in depth.
- Use tenant-aware foreign keys and unique constraints to prevent cross-society relationships.
- Use transaction-local tenant context and ensure it cannot leak through pooled database connections.
- Never expose one household's private data to another household without an explicitly approved permission.
- Test both allowed access and denied cross-society, cross-block, and cross-unit access.

## Financial integrity rules

- Store INR amounts as integer paise unless another exact representation is explicitly approved. Never use floating-point arithmetic for money.
- Use database transactions for billing, payments, allocations, reversals, and reconciliation.
- Require idempotency for retryable financial commands and external payment events.
- Preserve immutable transaction history. Correct mistakes with authorised adjustments or reversals rather than destructive edits.
- Verify payment gateway signatures and webhook authenticity on the server. A browser callback is not proof of payment.
- Do not invent maintenance formulas, late fees, taxes, exemptions, approval thresholds, or receipt rules.

## API and data rules

- Follow `docs/architecture/API_STANDARDS.md` for versioning, errors, pagination, validation, idempotency, and OpenAPI documentation.
- Validate all untrusted input at the API boundary and validate important invariants again in the domain layer.
- Use version-controlled SQL migrations as the authoritative database history.
- Keep migration credentials separate from restricted runtime credentials.
- Do not apply migrations to shared, staging, or production databases without explicit approval.
- Use server-side pagination and aggregation for large datasets and reports.
- Protect uploads with type, size, content, ownership, and access checks. Store private files privately.
- Use structured logs with correlation identifiers and never log passwords, tokens, secrets, payment credentials, or unnecessary personal information.

## Frontend rules

- Use the Next.js App Router, feature-based organisation, reusable accessible components, and shared contracts.
- Enforce accessibility through semantic HTML, keyboard support, visible focus, labelled controls, sufficient contrast, and reduced-motion support.
- Build responsive experiences for mobile, tablet, laptop, and desktop.
- Never present fixtures, placeholder totals, or prototype actions as live production data.
- Permissions must still be enforced by the API even when controls are hidden in the interface.
- Include explicit loading, empty, error, unavailable, and permission-denied states.

## Testing and quality gates

- Add tests at the lowest useful level and cover critical workflows across unit, integration, database-security, contract, and end-to-end layers.
- Financial, authorisation, tenant-isolation, notification-delivery, and state-transition tests must include failure and concurrency cases where relevant.
- Do not weaken assertions, skip failing tests, or suppress errors to produce a passing result.
- Do not claim a command passed unless its exit result was observed.
- When a required external service is unavailable, use an approved local substitute or report the limitation honestly.
- Every phase must pass its documented acceptance criteria before it is marked complete.

## Git and documentation conventions

- Use branch names such as `docs/phase-00-product-blueprint`, `chore/phase-01-monorepo-foundation`, and `feat/phase-05-super-admin`.
- Use Conventional Commits, for example `docs: define phase 0 product blueprint`.
- Keep commits focused and reviewable. Do not mix unrelated formatting or refactors into a feature change.
- Do not rewrite shared history or use destructive Git operations without explicit approval.
- Update documentation when behaviour, architecture, setup, security controls, or decisions change.
- Do not add tool-generated attribution, promotional banners, or unrelated authorship statements to product files.
