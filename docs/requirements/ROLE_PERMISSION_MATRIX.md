# Role and Permission Matrix

## Status and interpretation

This is a **proposed authorisation model**, not a final grant of authority. It establishes safe boundaries for implementation planning while the product owner confirms detailed permissions.

Permissions are assignments with a scope and optional effective period. A user can hold multiple assignments. The API evaluates the union of active grants within the selected context, subject to explicit policy constraints. No role bypasses tenant isolation.

## Scope hierarchy

```text
Platform
└── Society
    ├── Building or block
    │   └── Residential unit
    │       └── Residential membership
    └── Society-wide responsibilities
```

The exact building/block relationship is unresolved. Until approved, implementations must not assume the two are interchangeable or necessarily nested.

## Authorisation principles

- Deny by default.
- Authenticate first, then load active server-side memberships and assignments.
- Never trust client-supplied role or scope claims.
- Check action, resource type, resource identifier, tenant, scope, lifecycle state, and relevant business invariants.
- A broader role does not automatically grant every sensitive operation; financial, user-management, audit, and platform operations may require explicit capabilities.
- UI visibility is convenience only. The API remains the enforcement point.
- PostgreSQL row-level security and tenant-aware constraints provide defence in depth.
- Suspended accounts and expired assignments grant no access.

## Proposed roles

| Role | Base scope | Purpose | Status |
| --- | --- | --- | --- |
| Platform Super Admin | Platform | Operate authorised platform and society lifecycle functions. | Confirmed actor; detailed grants proposed. |
| Society Chairman | Society | Lead the assigned society and delegate approved administration. | Confirmed actor; detailed grants proposed. |
| Society Admin | Society | Perform delegated administration. | Confirmed actor; detailed grants proposed. |
| Secretary | Society | Perform approved secretarial, meeting, and communication work. | Expected; final scope open. |
| Treasurer | Society | Perform approved finance operations and reporting. | Expected; final scope open. |
| Block Head | Building/block | Coordinate an assigned block. | Confirmed actor; detailed grants proposed. |
| Committee Member | Society or block | Perform explicitly assigned responsibilities. | Confirmed actor; responsibility catalogue open. |
| Homeowner | Residential membership | Use approved services for owned residences. | Confirmed actor; detailed grants proposed. |
| Tenant | Residential membership | Use approved services during valid tenancy. | Confirmed actor; detailed grants proposed. |
| Authorised Resident | Residential membership | Use a limited approved subset for an associated residence. | Proposed supporting role. |

## Capability matrix

Legend: `P` proposed by default, `S` only with an explicit scoped grant, `O` own or associated records only, `V` view only where authorised, `—` no default capability.

| Capability | Platform Super Admin | Chairman | Society Admin | Secretary | Treasurer | Block Head | Committee Member | Homeowner | Tenant |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| View platform overview | P | — | — | — | — | — | — | — | — |
| Create or update society | P | V own society | V own society | V | V | V assigned | V assigned | V associated | V associated |
| Suspend or archive society | S | — | — | — | — | — | — | — | — |
| Assign society leadership | S | S own society | S | — | — | — | — | — | — |
| Manage platform users | S | — | — | — | — | — | — | — | — |
| Manage society memberships | S | P | S | S | — | S assigned | S assigned | O profile only | O profile only |
| Manage buildings or blocks | — | P | S | S | V | S assigned | S assigned | V associated | V associated |
| Manage units and occupancy | — | P | S | S | V | S assigned | S assigned | V associated | V associated |
| Manage committee assignments | — | P | S | S | V | S assigned | — | V approved contacts | V approved contacts |
| Configure billing rules | — | S | S | — | S | — | — | — | — |
| Generate or publish bills | — | S | S | — | S | — | — | V own bills | V own bills |
| Record or verify payments | — | S | S | — | P | — | — | O initiate if approved | O initiate if approved |
| Reverse or reconcile payments | — | S | S | — | S | — | — | — | — |
| Record or approve expenses | — | S | S | — | S | S block if approved | — | — | — |
| View financial reports | S platform aggregates | S society | S | S limited | P society | V assigned block | V assigned responsibility | O | O |
| Publish announcements | S platform | P society | S society | S society | S society | S assigned block | S assigned scope | — | — |
| Read announcements | V authorised | V authorised | V authorised | V authorised | V authorised | V authorised | V authorised | O audience | O audience |
| Create complaint | — | O if resident | O if resident | O if resident | O if resident | O if resident | O if resident | O | O |
| Manage complaints | — | S society | S society | S society | S | S assigned block | S assigned | O view/respond | O view/respond |
| View audit history | S platform | S society | S society | S limited | S finance | S assigned block | S assigned activity | O activity where exposed | O activity where exposed |
| Manage society settings | — | S | S | S limited | S finance limited | — | — | O preferences | O preferences |

Every `P` or `S` cell requires final approval and a server-side capability definition before implementation.

## Resource-level boundaries

### Platform

- Platform roles may view or operate only on societies and platform resources permitted by their platform assignment.
- Platform access does not imply unrestricted access to private household or financial details.

### Society

- A society assignment is valid only for its society.
- Society-wide administrators cannot access another society through guessed identifiers, filters, exports, background tasks, or aggregate endpoints.

### Building or block

- Block assignments must filter reads and writes to assigned blocks.
- A Block A assignment never grants Block B access unless a separate active assignment explicitly does so.

### Residential unit and membership

- Residents can access only residences linked by an active, authorised membership.
- Access to historical residence data after move-out requires an explicit policy.
- Personal contact and household information are not society-directory data by default.

### Sensitive capabilities

The following should be separate capabilities rather than implied by a broad title:

- Society suspension or archival.
- Role assignment and revocation.
- Bulk import commit.
- Billing configuration, approval, and publication.
- Payment verification, reconciliation, and reversal.
- Expense approval.
- Private document access.
- Audit-log access and export.
- Personal-data export.
- Announcement publication to broad or emergency audiences.
- Complaint internal-note access.

## Proposed permission-check inputs

Every protected application service should evaluate:

```text
verified user
active account state
active society context
active scoped assignments
requested action
target resource and tenant ownership
block/unit/residence boundary
record lifecycle state
required separation-of-duties rule
```

## Required denial tests

- Anonymous request to every protected endpoint.
- Suspended user with a previously valid session.
- Expired or revoked invitation and assignment.
- Valid user requesting another society's record by identifier.
- Block committee member requesting another block.
- Resident requesting another household's profile, bill, receipt, complaint, or attachment.
- User changing a scope identifier in request body, query, path, or export filter.
- User attempting to assign a role or capability they cannot delegate.
- User accessing archived or historical records outside approved policy.
- Background job or report aggregating data without tenant filters.

## Decisions required before Phase 04

- Final launch roles and names.
- Capability catalogue and delegation rules.
- Whether chairman and society admin powers differ and how.
- Secretary, treasurer, block head, and committee responsibility boundaries.
- Multi-society platform operator access to private tenant data.
- Historical access after move-out, ownership transfer, suspension, or archival.
- MFA enforcement by role.
- Separation-of-duties requirements for financial actions.
