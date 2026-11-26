# Society Management Platform

A multi-tenant residential society management and maintenance platform for platform operators, society administrators, committee members, homeowners, tenants, and authorised residents.

The product will provide one controlled system for society structure, residential units, membership and occupancy, maintenance billing, payments and expenses, announcements, complaints, analytics, and audit history. The responsive web application is the initial delivery target; a React Native application is planned only after the web platform is stable.

## Current status

**Phase 00 — Product requirements and engineering rules: awaiting review.**

This phase contains documentation only. Application frameworks and business functionality intentionally begin in Phase 01 after approval.

## Architecture direction

- One pnpm and Turborepo monorepo.
- Next.js, React, and TypeScript for the web application.
- NestJS modular monolith and versioned REST/OpenAPI contracts.
- PostgreSQL on Supabase with Drizzle ORM and defence-in-depth row-level security.
- Supabase Auth and private Supabase Storage.
- Shared contracts and API client for web and future React Native clients.
- Vercel for the web application and an independently hosted API.
- Strict tenant isolation at society, block, residential-unit, and household scopes.

## Documentation

### Product and experience

- [Product requirements](docs/requirements/PRODUCT_REQUIREMENTS.md)
- [Role and permission matrix](docs/requirements/ROLE_PERMISSION_MATRIX.md)
- [UI/UX requirements](docs/requirements/UI_UX_REQUIREMENTS.md)

### Architecture

- [System architecture](docs/architecture/SYSTEM_ARCHITECTURE.md)
- [Preliminary database design](docs/architecture/DATABASE_DESIGN.md)
- [API standards](docs/architecture/API_STANDARDS.md)

### Delivery and governance

- [Delivery plan](PLANS.md)
- [Open decisions](docs/decisions/OPEN_DECISIONS.md)
- [Security policy](SECURITY.md)
- [Repository engineering guide](AGENTS.md)

## Core engineering principles

- Develop and review one approved phase at a time.
- Enforce permissions on the server and deny access by default.
- Keep each society's data isolated in application logic, database constraints, and row-level security.
- Preserve exact, auditable, transaction-safe financial history.
- Reuse shared contracts and business APIs across web and mobile clients.
- Show honest unavailable states instead of fabricated production data.
- Test critical workflows, access denials, concurrency, and failure paths.

## Planned repository layout

```text
apps/
  web/
  api/
  mobile/              # Future phase only
packages/
  contracts/
  api-client/
  database/
  config/
supabase/
  migrations/
  tests/
docs/
  requirements/
  architecture/
  decisions/
  phases/
  testing/
```

Directories are introduced only when their phase requires them; the repository will not be filled with unused placeholders.

## Next approval

Review the Phase 00 documents and resolve the decisions marked as required before Phase 01. After approval, Phase 01 will establish the monorepo, web and API foundations, shared packages, CI, tests, and local development workflow.

