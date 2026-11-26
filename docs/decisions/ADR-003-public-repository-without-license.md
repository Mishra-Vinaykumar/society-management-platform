# ADR-003: Public repository without an open-source licence

- Date: 2026-11-26
- Status: Accepted
- Decision owner: Product owner
- Resolves: DEC-003

## Context

The repository will be publicly visible during initial development and may become private later. Public visibility increases the impact of accidentally committed secrets, personal data, internal infrastructure detail, and unsafe development fixtures. Public visibility does not by itself define reuse permissions.

## Decision

- Keep the repository public during initial development; ownership may make it private later.
- Do not add an open-source licence or `LICENSE` file.
- Do not commit credentials, tokens, private keys, real environment files, real resident information, production exports, private documents, or other non-public society data.
- Use synthetic development fixtures that cannot be mistaken for real people or production records.
- Commit only documented placeholder environment examples.
- Add secret scanning and repository safety checks in Phase 01 CI.
- Treat a later visibility change as access control for future repository access, not as erasure of previously public history.

## Alternatives considered

### Keep the repository private from the beginning

Not selected by the product owner for initial development.

### Add an open-source licence

Rejected. No reuse licence is granted by the repository at this stage. Licensing can be reconsidered through a later explicit legal and ownership decision.

### Use realistic resident exports for development

Rejected because public source history is not an appropriate store for personal or society data, even when the repository may later become private.

## Consequences

- Documentation, examples, issue content, screenshots, logs, and fixtures must be safe for public disclosure.
- Contributors must review staged changes for secrets and personal information before every commit.
- If sensitive material is committed, rotation, incident handling, history remediation, and impact assessment are required; deleting the latest file is not sufficient.
- External users may view the code, but the repository contains no open-source licence grant.
- A future private conversion does not change the licence status unless a separate decision does so.

## Security impact

Public visibility increases supply-chain scrutiny but also increases the consequence of secret or personal-data leakage. CI scanning, placeholder configuration, synthetic data, minimal logs, protected branches, dependency review, and private vulnerability reporting are required controls.

## Migration impact

No code migration is required. Phase 01 will add ignore rules, placeholder environment files, secret scanning, and contributor setup guidance consistent with this decision.

## Approval

Approved by explicit product-owner instruction on 2026-11-26.
