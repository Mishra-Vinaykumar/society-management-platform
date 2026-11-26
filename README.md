# Society Management Platform

A multi-tenant residential society management and maintenance platform for platform operators, society administrators, committee members, homeowners, tenants, and authorised residents.

The product will provide one controlled system for society structure, residential units, membership and occupancy, maintenance billing, payments and expenses, announcements, complaints, analytics, and audit history. The responsive web application is the initial delivery target; a React Native application is planned only after the web platform is stable.

## Current status

**Phase 00 — Product requirements and engineering rules: complete.**

**Phase 01 — Repository and project foundation: ready, not started.**

Phase 00 contains documentation only. Application frameworks and business functionality intentionally begin with a separate Phase 01 implementation instruction.

## Approved foundation decisions

- Working product name: **Society Management Platform**; final branding is developed in Phase 02.
- Runtime baseline: Node.js `26.13.1` and pnpm `12.23.0`, pinned exactly during Phase 01.
- Initial development is local-first, and the NestJS API remains hosting-provider independent.
- Production hosting selection is deferred to deployment preparation.
- The repository is public during initial development and may become private later.
- No open-source licence is granted or added at this stage.
- Secrets, production credentials, and real resident or society information must never be committed.

## Architecture direction

- One pnpm and Turborepo monorepo.
- Next.js, React, and TypeScript for the web application.
- NestJS modular monolith and versioned REST/OpenAPI contracts.
- PostgreSQL on Supabase with Drizzle ORM and defence-in-depth row-level security.
- Supabase Auth and private Supabase Storage.
- Shared contracts and API client for web and future React Native clients.
- Vercel remains the planned web deployment target; the independent API host is selected during Phase 14.
- Strict tenant isolation at society, block, residential-unit, and household scopes.
- Platform-neutral contracts and API client boundaries for the future React Native application.

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
- [ADR-001: Node.js and pnpm versions](docs/decisions/ADR-001-node-and-pnpm-versions.md)
- [ADR-002: Local development and portable API hosting](docs/decisions/ADR-002-local-development-and-portable-api-hosting.md)
- [ADR-003: Public repository without an open-source licence](docs/decisions/ADR-003-public-repository-without-license.md)
- [ADR-004: Working product name](docs/decisions/ADR-004-working-product-name.md)
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

## Planned Phase 01 repository layout

```text
apps/
  web/
  api/
packages/
  contracts/
  api-client/
  config/
docs/
  requirements/
  architecture/
  decisions/
  phases/
  testing/
.github/
  workflows/
.gitignore
.env.example
.nvmrc
package.json
pnpm-workspace.yaml
pnpm-lock.yaml
turbo.json
AGENTS.md
PLANS.md
SECURITY.md
README.md
```

The database package and Supabase migration structure are introduced with the database phase. `apps/mobile` is introduced only in the future mobile phase. Directories are added when their approved phase requires them rather than as unused placeholders.

## Next approval

Phase 01 is ready to establish the monorepo, web and API foundations, shared packages, CI, tests, and local development workflow. It has not started and requires a separate implementation instruction.

