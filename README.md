# Society Management Platform

A multi-tenant residential society management and maintenance platform for platform operators, society administrators, committee members, homeowners, tenants, and authorised residents.

The responsive web application is the initial delivery target. The monorepo keeps API contracts and the API client platform-independent so a future React Native application can reuse them after the web platform is stable.

## Current status

**Phase 00 — Product requirements and engineering rules: complete.**

**Phase 01 — Repository and project foundation: implemented and awaiting review.**

Phase 01 contains the repository foundation only. It does not include production dashboards, authentication, databases, business modules, deployment, or a React Native application.

## Approved toolchain

- Node.js `26.13.1`
- pnpm `12.23.0`
- Next.js `16.4.6` with React `19.3.1`
- NestJS `12.6.3`
- TypeScript `6.0.3`
- Turborepo `2.11.13`

The repository rejects mismatched Node.js or pnpm versions during installation. Dependency versions and the lockfile are pinned for reproducible installs.

## Repository structure

```text
apps/
  web/                 Next.js App Router frontend
  api/                 NestJS REST API
packages/
  contracts/           Platform-independent schemas and API types
  api-client/          Transport-injected client for web and future mobile
  config/              Shared TypeScript, ESLint, and runtime constants
docs/
  architecture/
  decisions/
  phases/
  requirements/
.github/
  workflows/ci.yml
scripts/
  check-secrets.mjs
  verify-toolchain.mjs
tests/
  e2e/
```

Database packages and Supabase migrations are intentionally deferred to the database phase. `apps/mobile` is introduced only in the future mobile phase.

## Local setup

### Windows

1. Install Node.js `26.13.1` directly or with nvm-windows:

   ```powershell
   nvm install 26.13.1
   nvm use 26.13.1
   npm install --global pnpm@12.23.0
   ```

2. Install dependencies from the repository root:

   ```powershell
   pnpm install --frozen-lockfile
   ```

3. Optional: create a local environment file from the safe example:

   ```powershell
   Copy-Item .env.example .env
   ```

### macOS and Linux

1. Install and select the pinned Node.js version with a compatible Node version manager:

   ```bash
   nvm install 26.13.1
   nvm use 26.13.1
   npm install --global pnpm@12.23.0
   ```

2. Install dependencies from the repository root:

   ```bash
   pnpm install --frozen-lockfile
   ```

3. Optional: create a local environment file from the safe example:

   ```bash
   cp .env.example .env
   ```

Never add credentials, production values, or real resident information to committed environment files.

## Development commands

| Command                 | Purpose                                                   |
| ----------------------- | --------------------------------------------------------- |
| `pnpm dev`              | Run the web and API development servers together.         |
| `pnpm dev:web`          | Run only the Next.js frontend at `http://127.0.0.1:3000`. |
| `pnpm dev:api`          | Run only the NestJS API at `http://127.0.0.1:4000`.       |
| `pnpm build`            | Build all production artifacts.                           |
| `pnpm lint`             | Run strict, type-aware ESLint checks.                     |
| `pnpm typecheck`        | Type-check every workspace.                               |
| `pnpm test`             | Run Vitest and Jest suites.                               |
| `pnpm test:e2e`         | Run the Playwright browser test.                          |
| `pnpm format`           | Format implementation and configuration files.            |
| `pnpm format:check`     | Verify formatting without changing files.                 |
| `pnpm security:audit`   | Fail for high or critical package-registry advisories.    |
| `pnpm security:secrets` | Scan repository text for high-confidence secret patterns. |
| `pnpm check`            | Run the repository quality gate except Playwright.        |

Install the pinned Playwright browser once before the local end-to-end test:

```bash
pnpm exec playwright install chromium
pnpm test:e2e
```

## Local endpoints

- Web application: `http://127.0.0.1:3000`
- API health: `http://127.0.0.1:4000/api/v1/health`
- Swagger UI: `http://127.0.0.1:4000/docs`
- OpenAPI JSON: `http://127.0.0.1:4000/docs-json`

The API validates environment configuration at startup, uses URI-based REST versioning, applies global request validation, restricts CORS to the configured web origin, and returns consistent problem-details responses.

## Quality and security controls

- Strict TypeScript with exact optional-property and unchecked-index safeguards.
- Shared, type-aware ESLint configuration and Prettier checks.
- Vitest for the web and shared packages, Jest for NestJS, and Playwright for the combined web/API flow.
- CI verifies frozen installation, secret scanning, high-severity dependency advisories, formatting, linting, types, tests, production builds, and browser end-to-end behaviour.
- pnpm applies a 24-hour package release-age policy, explicitly permits the required `@parcel/watcher` install script, and denies `@scarf/scarf` install execution.
- No open-source licence, secrets, real society data, production services, or deployment configuration are included.

See [Phase 01 verification](docs/phases/PHASE_01_FOUNDATION.md) for the executed checks, results, and known limitations.

## Documentation

- [Delivery plan](PLANS.md)
- [Product requirements](docs/requirements/PRODUCT_REQUIREMENTS.md)
- [Role and permission matrix](docs/requirements/ROLE_PERMISSION_MATRIX.md)
- [UI/UX requirements](docs/requirements/UI_UX_REQUIREMENTS.md)
- [System architecture](docs/architecture/SYSTEM_ARCHITECTURE.md)
- [Preliminary database design](docs/architecture/DATABASE_DESIGN.md)
- [API standards](docs/architecture/API_STANDARDS.md)
- [Open decisions](docs/decisions/OPEN_DECISIONS.md)
- [Architecture decision records](docs/decisions/)
- [Security policy](SECURITY.md)
- [Repository engineering guide](AGENTS.md)

## Review boundary

Phase 01 is ready for owner review. Do not begin Phase 02 until this branch is reviewed and Phase 01 is explicitly approved.
