# ADR-002: Local development and portable API hosting

- Date: 2026-11-26
- Status: Accepted
- Decision owner: Product owner
- Resolves: DEC-002

## Context

The initial phases need a reliable development environment without creating remote infrastructure, paid services, or provider lock-in. The eventual web, API, database, identity, and storage deployment topology is addressed during controlled deployment planning.

## Decision

- Use local development for the initial phases.
- Do not require a production hosting account or remote application deployment to complete Phase 01.
- Keep the NestJS API hosting-provider independent.
- Defer the production API hosting-provider selection until Phase 14 deployment preparation.
- Keep runtime configuration environment-based and validate it at startup.
- Keep domain and application layers independent from provider SDKs. Provider-specific integrations belong behind explicit infrastructure adapters.
- Use standard Node.js process, HTTP, health, readiness, logging, and graceful-shutdown behaviour that can run on multiple approved hosts.
- Treat the roadmap's Vercel and Supabase targets as deployment direction, not authorisation to create remote projects or resources during the initial phases.

## Alternatives considered

### Select and integrate a production API host in Phase 01

Rejected because it adds external configuration and provider constraints before the API architecture and operational requirements are proven.

### Couple the backend to the web host

Rejected because the product requires an independently deployable NestJS API and a future React Native client.

### Require remote development services immediately

Rejected because local-first development is more reproducible, less costly, and safer while data and security architecture are still being established.

## Consequences

- Phase 01 must document local setup for Windows, macOS, and Linux.
- Early tests must not depend on production credentials or paid resources.
- Provider selection remains an explicit deployment decision covering runtime limits, background work, networking, observability, regions, cost, and operational ownership.
- Infrastructure adapters may be replaced without changing domain rules or public API contracts.
- Local development does not remove the requirement to test approved hosted behaviour in staging before production.

## Security impact

No production secrets or resident data are needed for initial development. Local fixtures must be synthetic. Environment examples contain placeholders only. Provider credentials, when eventually required, remain outside source control and are scoped by environment and service.

## Migration impact

There is no application migration. Phase 01 will establish portable configuration and local commands; Phase 14 will record the selected production topology.

## Approval

Approved by explicit product-owner instruction on 2026-11-26.
