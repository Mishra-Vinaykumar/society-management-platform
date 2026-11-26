# ADR-001: Node.js and pnpm versions

- Date: 2026-11-26
- Status: Accepted
- Decision owner: Product owner
- Resolves: DEC-001

## Context

Phase 01 needs a reproducible runtime and package-manager baseline for Next.js, NestJS, Turborepo, local development, and CI. Using unqualified `latest` versions would make clean installations change over time and could create different results across Windows, macOS, Linux, and CI.

Compatibility was reviewed on 2026-11-26 against the official release pages and current package metadata:

| Component | Reviewed version or line | Published requirement | Result with Node.js 26.13.1 |
| --- | --- | --- | --- |
| Node.js | 26.13.1 | Latest LTS release on the review date | Selected baseline. |
| pnpm | 12.23.0 | pnpm 12 officially supports Node.js 26 | Compatible. |
| Next.js | 16.4.6 | Node.js `>=20.9.0` | Compatible. |
| NestJS | 12.6.3 | Core declares Node.js `>=20`; NestJS 12 generators support Node.js 26+ | Compatible. |
| Turborepo | 2.11.13 | The package publishes no restrictive Node.js engine range and provides platform binaries | Compatible by published metadata; Phase 01 installation and task execution remain the required practical verification. |

Primary references:

- [Node.js release status and current LTS](https://nodejs.org/en/about/previous-releases)
- [Next.js installation requirements](https://nextjs.org/docs/app/getting-started/installation)
- [NestJS version compatibility](https://docs.nestjs.com/faq/versions)
- [NestJS generator requirements](https://docs.nestjs.com/migration-guide)
- [pnpm installation and Node.js compatibility](https://pnpm.io/installation)
- [Turborepo repository installation](https://turborepo.dev/docs/getting-started/installation)
- [Current Next.js package metadata](https://registry.npmjs.org/next/latest)
- [Current pnpm package metadata](https://registry.npmjs.org/pnpm/latest)

## Decision

- Approve Node.js `26.13.1` and pnpm `12.23.0` for Phase 01.
- Phase 01 will pin Node.js exactly in `.nvmrc`, the root package metadata, and CI.
- Phase 01 will pin pnpm exactly in the root `packageManager` field and use the same version in CI and setup documentation.
- Framework and library versions will be selected and locked during Phase 01 after peer-dependency resolution. They must remain compatible with this runtime baseline.
- Turborepo will be installed as a repository dev dependency at an exact version. A global installation is optional and must defer to the local binary.
- A clean dependency installation, framework generation, lint, type-check, tests, builds, and development startup on the selected runtime are Phase 01 acceptance checks.
- Toolchain upgrades require a focused dependency change with compatibility evidence and passing quality gates. They do not require a new ADR unless the supported runtime policy changes materially.

## Alternatives considered

### Node.js 24 LTS

Node.js 24 remains supported and satisfies the reviewed framework requirements. It was not selected because Node.js 26 is the latest active LTS, is explicitly supported by pnpm 12 and the NestJS 12 generators, and provides a longer forward-support window for a new project.

### Version ranges without exact pins

Rejected because ranges do not guarantee identical local and CI toolchains.

### Automatically tracking the newest release

Rejected because an automatic runtime or package-manager change bypasses compatibility review and can invalidate the lockfile or CI environment.

## Consequences

- Contributors need the approved Node.js and pnpm versions before installing dependencies.
- The repository will fail fast on a mismatched runtime once Phase 01 configuration exists.
- Security and maintenance updates are deliberate repository changes rather than silent environment drift.
- The framework compatibility snapshot is evidence for this decision, not permission to use floating framework versions.

## Security impact

Using a supported LTS runtime reduces exposure to unpatched runtime vulnerabilities. Exact pins and a reviewed lockfile improve build reproducibility and supply-chain traceability. Contributors should use official Node.js binaries or a trusted version manager and verify downloads where appropriate.

## Migration impact

There is no application migration because no application code exists. Phase 01 will introduce the pins as part of the repository foundation.

## Approval

Approved by explicit product-owner instruction on 2026-11-26.
