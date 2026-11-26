# ADR-004: Working product name

- Date: 2026-11-26
- Status: Accepted
- Decision owner: Product owner
- Resolves: DEC-004

## Context

The repository and documentation need a consistent product name before the visual identity, logo, colour system, and final market-facing brand are designed.

## Decision

- Use **Society Management Platform** as the working product name.
- Use neutral visual branding until Phase 02.
- Develop final branding, visual identity, and presentation choices during Phase 02.
- Treat the working name as product metadata, not a registered trademark or final public brand commitment.

## Alternatives considered

### Delay all naming

Rejected because it would create inconsistent repository, package, documentation, and interface labels.

### Treat the working name as final branding

Rejected because Phase 02 explicitly owns the design-system and branding work.

## Consequences

- Documentation and Phase 01 metadata use one consistent name.
- Phase 02 may propose a final brand without changing the underlying domain architecture.
- Package names, URLs, and identifiers should avoid unnecessary coupling to a final marketing name where a stable technical name is more appropriate.

## Security impact

None beyond avoiding unauthorised trademark or ownership claims.

## Migration impact

Future branding may require copy and asset changes. It should not require API, database, or domain-model changes.

## Approval

Approved by explicit product-owner instruction on 2026-11-26.
