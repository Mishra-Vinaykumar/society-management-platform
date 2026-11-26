# Phase 01 — Repository and Project Foundation

## Status

Implementation is complete and awaiting owner review on `chore/phase-01-monorepo-foundation`. Phase 02 has not started.

## Delivered foundation

- Exact Node.js `26.13.1` and pnpm `12.23.0` enforcement.
- pnpm workspaces with Turborepo task orchestration and a frozen lockfile.
- Next.js App Router frontend with React, strict TypeScript, Tailwind CSS, a shadcn/ui-compatible component foundation, and Lucide icons.
- NestJS modular API with validated environment configuration, global validation, URI versioning, problem-details errors, Swagger/OpenAPI, and a health endpoint.
- Platform-independent `contracts` and `api-client` packages plus shared `config`.
- Type-aware ESLint, Prettier, Vitest, Jest, Playwright, secret scanning, and GitHub Actions CI.
- Local commands for running the web and API independently or together.

## Verification performed

All results below were observed on 26 November 2026 with Node.js `26.13.1` and pnpm `12.23.0`.

| Check                                                                                    | Result                                                                                                        |
| ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `pnpm install --frozen-lockfile` after removing all workspace `node_modules` directories | Passed; 770 packages linked and the required `@parcel/watcher` install script completed.                      |
| `pnpm lint`                                                                              | Passed across all five workspaces.                                                                            |
| `pnpm typecheck`                                                                         | Passed across all five workspaces.                                                                            |
| `pnpm test`                                                                              | Passed: 6 Vitest assertions and 4 Jest assertions across 6 test files.                                        |
| `pnpm build`                                                                             | Passed for the web, API, and three shared packages.                                                           |
| `pnpm test:e2e`                                                                          | Passed in pinned Playwright Chromium: one combined web/API flow.                                              |
| `pnpm dev:web`                                                                           | Started successfully; HTTP `200` and expected landing content observed.                                       |
| `pnpm dev:api`                                                                           | Started successfully; health and OpenAPI responses validated.                                                 |
| `pnpm dev`                                                                               | Both applications started together successfully.                                                              |
| Browser inspection                                                                       | Responsive narrow layout verified, horizontal overflow corrected, and no browser warnings or errors observed. |
| `pnpm security:secrets`                                                                  | Passed; no high-confidence secret pattern detected.                                                           |
| `pnpm security:audit`                                                                    | Passed at the high-severity threshold; no high or critical advisory was found.                                |
| `pnpm format:check`                                                                      | Passed for all included implementation, configuration, and Phase 01 documentation files.                      |

### Runtime evidence

- `GET http://127.0.0.1:4000/api/v1/health` returned `status: "ok"`, service `society-management-api`, and version `0.1.0`.
- `GET http://127.0.0.1:4000/docs-json` returned the expected OpenAPI title and version.
- `GET http://127.0.0.1:3000` returned HTTP `200` and the expected foundation landing page.
- Playwright verified the landing-page heading, the explicit “Production data — Not connected” state, and the live API health response.

## Security review

- No production credentials, private environment values, resident data, society data, or database connection are present.
- The committed environment example contains local, non-secret defaults only.
- API configuration is validated before startup; CORS is restricted to the configured web origin.
- Global validation rejects unknown request fields, and the exception filter avoids returning stack traces for server errors.
- The repository has no `LICENSE` file, consistent with ADR-003.
- CI uses read-only repository permissions, disables persisted checkout credentials, installs from the frozen lockfile, and runs the quality gates.
- pnpm applies a 24-hour minimum release age. Required native build execution is allowlisted for `@parcel/watcher`; telemetry-oriented `@scarf/scarf` execution is denied.
- The repository secret scan is a high-confidence working-tree safeguard, not a substitute for GitHub server-side secret scanning, dependency alerts, or history scanning.
- The registry audit found two moderate, development-only transitive advisories under Jest (`glob` and `minimatch`). There is no production dependency path; keep them monitored and update through a compatible upstream Jest release rather than forcing an unverified major override.

## Maintainability and mobile-readiness review

- Workspaces have directional dependencies and separate build/type/test tasks.
- Shared schemas and the transport-injected API client do not depend on Next.js, DOM APIs, React, or Node-only runtime APIs.
- Native ESM output matches NestJS 12 and current Node.js behaviour.
- The web foundation uses semantic structure, responsive layout, visible focus styles, reduced-motion handling, and honest unavailable data.
- No database, authentication, multi-tenant business logic, or premature service abstraction was introduced.
- Exact framework versions and a committed lockfile make changes reviewable and reproducible.

## Known limitations

- This is a local development foundation, not a production release.
- Authentication, authorisation, tenant enforcement, persistence, rate limiting, security headers, audit logging, and business modules are intentionally deferred.
- Swagger is unauthenticated in local development and must be reviewed before any production exposure.
- Jest currently uses Node's `--experimental-vm-modules` flag to exercise the ESM-only NestJS 12 packages; Node prints an experimental warning even though the suites pass.
- The secret scanner checks high-confidence patterns in repository text but does not scan Git history or provide provider-side revocation.
- The two moderate Jest toolchain advisories remain an accepted review risk for Phase 01; no high or critical advisory is present.
- No React Native project, production database, paid service, hosting provider, deployment, or real resident information is included.

## Acceptance checklist

- [x] Clean frozen dependency installation succeeds.
- [x] Exact approved Node.js and pnpm versions are enforced.
- [x] Frontend starts successfully.
- [x] Backend starts successfully.
- [x] Versioned health endpoint returns a successful response.
- [x] OpenAPI documentation is available locally.
- [x] Shared packages resolve, build, and test correctly.
- [x] Linting passes.
- [x] Type checking passes.
- [x] Automated unit and integration tests pass.
- [x] Browser end-to-end test passes.
- [x] Production builds pass.
- [x] Secret and formatting checks pass.
- [x] No credential, real resident information, open-source licence, deployment, database, authentication, or business module was added.
- [ ] Owner review and approval are complete.
