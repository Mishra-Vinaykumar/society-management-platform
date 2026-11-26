# API Standards

## Status

These are the proposed standards for the NestJS REST API and shared clients. They become binding when approved in Phase 01 and implemented consistently. Domain-specific rules remain governed by their approved phase requirements.

## Core principles

- REST over HTTPS with an OpenAPI description.
- Stable, explicit transport contracts independent of database entities.
- Server-side authentication, authorisation, validation, and tenant scoping.
- Predictable errors, pagination, idempotency, concurrency behaviour, and observability.
- Backward-compatible evolution where practical.
- Shared generated or typed client for web and future mobile applications.

## Base paths and versioning

- Proposed base path: `/api/v1`.
- Health endpoints may live outside the business version path, for example `/health` and `/ready`.
- Put a new major version in the path only for a breaking contract change that cannot be introduced compatibly.
- Add optional response fields compatibly; clients must tolerate unknown fields.
- Do not silently change meaning, units, defaults, validation, or permission scope under an existing contract.
- Document deprecation and provide a migration period before removal.

## Resource naming

- Use plural lowercase nouns and hyphens where multiple words are necessary.
- Use identifiers for canonical resources: `/societies/{societyId}/blocks/{blockId}`.
- Use subordinate resources only when ownership is meaningful and the nesting remains readable.
- Model domain commands that do not fit CRUD as explicit actions, for example `POST /bills/{billId}/publish`, rather than ambiguous field updates.
- Do not expose database table or internal service names merely because they exist.

## HTTP semantics

| Method | Use | Idempotency expectation |
| --- | --- | --- |
| `GET` | Retrieve a resource or collection. | Safe and idempotent. |
| `POST` | Create a resource or execute a command. | Use idempotency protection where retry could duplicate effects. |
| `PUT` | Replace an explicitly replaceable resource. | Idempotent. |
| `PATCH` | Apply a validated partial update. | Designed to be retry-safe where practical. |
| `DELETE` | Remove only when deletion is permitted. Most historical records use archive commands instead. | Idempotent result. |

### Proposed success codes

- `200 OK` for successful reads and commands returning a representation.
- `201 Created` with `Location` for resource creation.
- `202 Accepted` for an asynchronous operation with a status resource.
- `204 No Content` for successful commands with no response body.

## Authentication and active context

- Accept Supabase access tokens through `Authorization: Bearer <token>`.
- Validate issuer, audience, signature, expiry, and other required claims using approved server configuration.
- Map the verified subject to an active application profile.
- Load memberships and scoped assignments from trusted application data.
- Never accept a client-provided role as authority.
- A client may request an active society context, but the API verifies membership before use.
- Suspended accounts and inactive memberships receive an appropriate authentication or permission failure.

## Authorisation

Every protected operation must name an action and target resource. Guards and application services evaluate:

- Verified subject and account state.
- Active society and assignment effective period.
- Capability required by the operation.
- Society, block, unit, and residential-membership ownership of the target.
- Record lifecycle and separation-of-duties constraints.

Collection endpoints, counts, exports, search suggestions, files, and background jobs require the same scoping as single-resource endpoints.

## Request and response representation

- Media type: `application/json` unless a documented upload or download contract applies.
- Encoding: UTF-8.
- Proposed property convention: `camelCase` in JSON and TypeScript contracts.
- Identifiers are opaque strings; clients must not infer type or tenancy from them.
- Timestamps use RFC 3339 UTC strings, for example `2026-11-26T10:30:00Z`.
- Calendar dates use `YYYY-MM-DD` when no time exists.
- Monetary amounts use integer minor units plus a currency, for example:

```json
{
  "amountMinor": 125000,
  "currency": "INR"
}
```

- Avoid binary floating-point monetary fields.
- Enumerations are documented and validated. Unknown future values must not cause unsafe client behaviour.
- Response DTOs expose only approved fields, never raw ORM entities.

## Validation

- Reject unknown or forbidden fields where silent acceptance would hide client mistakes or create mass-assignment risk.
- Validate syntax at the transport boundary and business invariants in the application or domain service.
- Normalise only when the rule is explicit; do not silently alter financial or identity data.
- Return field-level validation details without exposing internals.
- Enforce configured body, query, and upload size limits.

## Error format

Use a consistent problem-details-style body:

```json
{
  "type": "https://example.invalid/problems/validation-error",
  "title": "Request validation failed",
  "status": 422,
  "code": "VALIDATION_ERROR",
  "detail": "One or more fields are invalid.",
  "instance": "/api/v1/societies",
  "requestId": "01J...",
  "errors": [
    {
      "field": "name",
      "code": "REQUIRED",
      "message": "Name is required."
    }
  ]
}
```

The production `type` URI will use an approved documentation origin.

### Status guidance

| Status | Meaning |
| --- | --- |
| `400` | Malformed syntax or request shape. |
| `401` | Missing, invalid, or expired authentication. |
| `403` | Authenticated but not permitted in the requested scope. |
| `404` | Resource is absent or intentionally concealed from the caller. |
| `409` | State, uniqueness, idempotency, or version conflict. |
| `422` | Semantically invalid input. |
| `429` | Rate limit exceeded. |
| `500` | Unexpected server failure with no internal detail exposed. |
| `503` | Required dependency is unavailable or service is not ready. |

Do not reveal whether an inaccessible cross-tenant resource exists when that would leak information.

## Collections, filtering, and sorting

### Proposed pagination

- Prefer cursor pagination for changing or large datasets.
- Permit offset pagination only for small administrative lists where stable ordering and total counts are required and measured.
- Use bounded `limit` with a documented default and maximum.
- Always define deterministic ordering with a unique tie-breaker.

Example:

```json
{
  "items": [],
  "pageInfo": {
    "nextCursor": null,
    "hasNextPage": false
  }
}
```

- Whitelist filter and sort fields.
- Validate date ranges and tenant context.
- Do not accept raw SQL, arbitrary field paths, or unbounded export filters.
- Counts and aggregates are permission-scoped and may be omitted when too costly or not authorised.

## Idempotency

- Require an `Idempotency-Key` for retryable financial commands, bill generation, receipt creation, broad publication, and other approved high-impact operations.
- Scope the key to authenticated actor, tenant, operation, and a canonical request fingerprint.
- Reusing a key with a different request returns `409`.
- A retry returns the original terminal result while the retention window is active.
- External provider events use their trusted unique event identifier and are processed through an idempotent inbox.

## Concurrency and state transitions

- Protect state-changing operations with database transactions.
- Use unique constraints as the final duplicate defence.
- Use optimistic version fields or conditional headers for edits where lost updates matter.
- Validate state transitions on the server; clients cannot set arbitrary statuses.
- Use row locks only where justified by an identified race and keep transactions short.

## Long-running operations

- For exports, bulk imports, or large generation jobs, respond `202` with a permission-scoped operation resource.
- Operation state is one of a documented set such as `queued`, `running`, `succeeded`, `failed`, or `cancelled`.
- Result files are private, expire according to policy, and require fresh authorisation to download.
- Retrying a job creation command must not create duplicate financial or notification effects.

## File uploads and downloads

- Use an API-mediated or approved signed-upload flow.
- Validate declared and detected content type, size, extension where relevant, malware policy, tenant ownership, and purpose.
- Generate storage keys server-side; never trust a client path.
- Store original display name as metadata after sanitisation, not as the storage key.
- Downloads require current permission, not possession of a permanent public URL.
- Use safe content-disposition and content-type headers.

## Rate limiting and abuse controls

- Apply tighter limits to authentication, invitation, password recovery, file upload, export, and broad notification endpoints.
- Key limits using safe combinations of account, tenant, route, and network signal.
- Do not create a shared limit that lets one society exhaust capacity for all others without consideration.
- Return `Retry-After` when meaningful.

## OpenAPI and shared clients

- Document every public endpoint, auth requirement, scope, request, response, error, enum, and example.
- Keep OpenAPI generation deterministic and validate it in CI.
- Generate or maintain `packages/api-client` from the contract rather than hand-copying DTOs.
- Keep transport schemas in `packages/contracts` free of server-only implementation details.
- Add contract tests to prevent undocumented response changes.

## Observability

- Accept or generate a request ID and return it in responses.
- Propagate correlation IDs through API, database work, jobs, and external calls.
- Log route template, method, status, duration, environment, release, and safe tenant identifier where approved.
- Never log access tokens, passwords, invitation tokens, payment secrets, full private documents, or unnecessary personal fields.
- Audit events are domain records and are not replaced by operational logs.

## API verification

- Schema and DTO validation tests.
- Authentication and permission tests for each protected route.
- Cross-society, cross-block, and cross-household denial tests.
- OpenAPI snapshot or breaking-change review.
- Pagination stability and filter validation tests.
- Idempotency and concurrent request tests.
- Error-shape consistency tests.
- File-access and signed-URL expiry tests.
- Consumer contract tests for web and future mobile clients.
