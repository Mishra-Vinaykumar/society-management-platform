# Security Policy and Engineering Requirements

## Reporting a vulnerability

Do not report suspected vulnerabilities in a public issue or include secrets, personal data, exploit payloads, or private society information in public channels.

Until a private security-advisory workflow and security contact are configured, contact the designated repository owner through an existing private channel and include only the minimum information needed to establish impact. The repository owner must add an approved private reporting address before public production release.

Please provide:

- A concise description and affected component.
- Preconditions, affected roles, and tenant scope.
- Safe reproduction steps using synthetic data.
- Expected and observed behaviour.
- Potential confidentiality, integrity, availability, or financial impact.
- Any temporary mitigation already applied.

Do not access another person's data, modify production records, disrupt service, or perform social engineering while researching a report.

## Supported versions

The application is not yet released. A supported-version table, response targets, and disclosure policy must be added before production launch.

## Public repository controls

- The repository is public during initial development and may become private later.
- Public visibility does not make secrets, resident information, society documents, production exports, private logs, or real environment configuration acceptable source content.
- Use synthetic identities and records for examples, tests, screenshots, fixtures, and issue reproduction.
- Do not add an open-source licence without a new approved ownership decision.
- Phase 01 CI must add secret scanning and dependency review appropriate for a public repository.
- A later private conversion does not remove material from clones, forks, caches, package artefacts, or prior public history.
- If sensitive content is committed, immediately stop further distribution, rotate affected credentials, preserve incident evidence, assess exposure, and perform approved history remediation. Deleting only the latest file is insufficient.

## Security objectives

- Prevent unauthorised access across societies, blocks, units, households, and functional responsibilities.
- Protect identity, personal information, financial records, private documents, and authentication material.
- Preserve exact and auditable billing, payments, expenses, and receipts.
- Detect and investigate sensitive administrative or financial changes.
- Recover safely from operational failure without corrupting tenant or financial data.

## Threat model priorities

The project treats these as primary risks:

- Broken object-level and function-level authorisation.
- Cross-society or cross-block query, report, cache, job, export, or storage leakage.
- Privilege escalation through user-editable role or scope data.
- Authentication, invitation, session, reset, and account-recovery abuse.
- SQL injection, cross-site scripting, CSRF where applicable, server-side request abuse, and unsafe redirects.
- Malicious or unauthorised file uploads and downloads.
- Secret leakage through source, builds, logs, errors, or client bundles.
- Duplicate, forged, replayed, or partially applied financial transactions.
- Payment callback or webhook forgery.
- Audit-log tampering and insufficient traceability.
- Denial of service and abusive broad notification or export operations.
- Vulnerable dependencies and compromised build or deployment paths.

## Identity and access control

- Validate Supabase tokens on the server using approved issuer, audience, signing, and expiry checks.
- Map verified identity to an active application profile and server-owned memberships.
- Deny by default and use explicit, scoped capabilities.
- Recheck access to the target resource in the service and database query, not only a route guard.
- Treat society, block, unit, role, ownership, and payment fields from the client as untrusted claims.
- Revoke access for suspended users, ended occupancy, expired assignment, or archived context according to approved policy.
- Require reauthentication and, once approved, MFA for high-risk actions.
- Never use shared administrator accounts.

## Tenant isolation

- Include tenant scope in repositories, unique constraints, foreign keys, audit events, jobs, storage metadata, cache keys, and exports.
- Enforce PostgreSQL RLS under a non-owner runtime role without `BYPASSRLS`.
- Use transaction-local trusted context and verify it cannot leak through connection pooling.
- Keep application tables outside unused public data API exposure.
- Test allowed and denied `SELECT`, `INSERT`, `UPDATE`, and `DELETE` operations.
- Conceal existence of inaccessible records where disclosure would leak information.

## Financial security

- Store money exactly and never use binary floating-point arithmetic.
- Use database transactions, unique constraints, idempotency keys, and trusted provider event identifiers.
- Verify payment signatures and webhooks on the backend before changing payment state.
- Do not trust browser success callbacks.
- Preserve immutable transaction history; use authorised adjustments and reversals.
- Apply separation of duties when approved for configuration, publication, verification, reconciliation, approval, and reversal.
- Reconcile derived balances to source transactions and alert on exceptions.

## Application security

- Validate and limit all request bodies, queries, headers, and uploaded content.
- Use parameterised database access and narrowly scoped repositories.
- Encode output by context and keep rich text sanitisation allowlist-based.
- Protect cookie-based state changes against CSRF if cookies are used for authentication.
- Apply restrictive CORS and trusted origins per environment.
- Set appropriate security headers, including content security policy after asset needs are known.
- Rate limit authentication, recovery, invitations, uploads, exports, financial commands, and broad communications.
- Return consistent safe errors without stack traces, SQL detail, secrets, or cross-tenant existence leaks.

## File security

- Private storage is the default.
- Generate object keys on the server and associate tenant, resource, uploader, purpose, size, and type in trusted metadata.
- Restrict size and allowlisted types, verify detected content, and define malware scanning before production uploads.
- Serve files with safe content-disposition and content-type headers.
- Authorise each download or issue short-lived scoped access after a fresh permission check.
- Remove metadata or transform image content where privacy policy requires it.

## Secrets and configuration

- Never commit passwords, access tokens, service keys, database credentials, webhook secrets, private keys, or real `.env` files.
- Never commit real resident information, private society documents, production exports, or production database snapshots.
- Commit only documented `.env.example` placeholders.
- Keep secrets in the approved environment secret store and restrict by service and environment.
- Separate runtime, migration, CI, staging, and production credentials.
- Rotate secrets after suspected exposure and document the incident.
- Ensure server-only secrets cannot enter browser bundles or client-visible error output.

## Logging, audit, and privacy

- Use structured logs with request and correlation identifiers.
- Redact tokens, credentials, payment secrets, private documents, and unnecessary personal fields.
- Keep operational logs separate from domain audit records.
- Audit sensitive role, membership, society lifecycle, billing, payment, expense, announcement, complaint, settings, export, and support-access events.
- Protect audit records from ordinary update or delete paths.
- Define retention, access, export, and erasure policies before production.

## Dependency and supply-chain security

- Pin compatible dependency versions through the approved lockfile.
- Review new packages for maintenance, provenance, licence, transitive risk, and necessity.
- Run dependency and secret scanning in CI once the project foundation exists.
- Protect the default branch, require review and passing checks, and restrict deployment credentials.
- Produce builds from reviewed source and identify deployed releases.
- Do not suppress vulnerability findings without a documented risk decision and expiry.

## Verification requirements

- Authentication and session tests.
- Privilege-escalation and broken-access-control tests.
- Cross-society, cross-block, cross-unit, household, report, export, file, and background-job isolation tests.
- RLS tests under real runtime credentials and pool concurrency.
- Injection, output encoding, request-forgery, upload, rate-limit, and secret-leak checks.
- Financial idempotency, signature verification, duplicate prevention, concurrency, adjustment, and reversal tests.
- Audit integrity and sensitive-log review.
- Dependency, build, and environment configuration review.
- Representative security testing in an explicitly authorised local or staging environment.

## Incident response direction

Before production, create and approve an incident runbook covering:

1. Triage, severity, ownership, and safe evidence handling.
2. Containment of accounts, tokens, integrations, deployments, and database access.
3. Tenant impact analysis and preservation of audit evidence.
4. Remediation, credential rotation, data correction, and recovery.
5. Required notifications and legal review.
6. Post-incident review, tests, and control improvements.

## Production release gate

Do not declare the platform production-ready while any critical or high-severity security defect remains unresolved. Production also requires approved private vulnerability reporting, administrator MFA policy, retention policy, backups and restore testing, monitoring and alert ownership, incident response, and release sign-off.
