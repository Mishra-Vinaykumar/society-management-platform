# UI/UX Requirements

## Status

This document defines the product experience required for Phase 02 and later feature phases. **Society Management Platform** is the approved working name. The supplied hierarchy diagram is a conceptual reference for tenant and permission structure, not final visual branding; Phase 02 develops the final visual identity.

## Experience principles

- Make the user's current society, block, residence, and role context visible.
- Prioritise common tasks and critical status over decorative dashboard density.
- Present administrative interfaces as structured and information-rich; present resident interfaces as simple and action-oriented.
- Use a consistent design system rather than isolated page styling.
- Never present fixtures, unavailable modules, or client-only demonstrations as live production behaviour.
- Make permission denial understandable without exposing whether unauthorised data exists.
- Design mobile experiences intentionally rather than shrinking desktop tables.
- Use restrained motion, meaningful colour, clear hierarchy, and accessible interaction patterns.

## Information architecture

### Platform Super Admin

Proposed primary navigation:

- Overview
- Societies
- User Management
- Role Management
- Platform Announcements
- Activity Logs
- Platform Settings

The overview may show authorised society lifecycle, building or block, unit, account, onboarding, and recent activity statistics only when backed by real data.

### Society Chairman and administrators

Proposed primary navigation:

- Overview
- Society Profile
- Buildings and Blocks
- Residential Units
- Residents and Memberships
- Committee and Responsibilities
- Maintenance
- Payments and Expenses
- Announcements
- Complaints
- Reports
- Audit Activity
- Settings

Items appear only when the viewer has the relevant capability, but hidden navigation never replaces API authorisation.

### Block committee

Proposed primary navigation:

- Block Overview
- Residential Units
- Authorised Residents
- Committee
- Maintenance Summary
- Complaints
- Announcements

Every screen must reinforce the assigned block context and must not imply access to other blocks.

### Resident

Confirmed navigation direction:

- Home
- My Profile
- My Residence
- Maintenance
- Payment History
- Announcements
- Notifications
- Complaints
- Committee Members
- Settings

The mobile layout should prioritise outstanding actions, important alerts, maintenance summary, recent announcements, complaint status, and approved contact information.

## Global application shell

### Desktop

- Collapsible left navigation with labelled icons and clear selected state.
- Global header with page context, society or residence switcher when required, notifications, and profile controls.
- Breadcrumbs only where they clarify deep administration, not on every page.
- Main content uses readable maximum widths where appropriate and wider regions for data-heavy tables.

### Mobile and tablet

- Compact header with a clearly labelled navigation trigger.
- Navigation in an accessible drawer or equivalent pattern with focus management.
- Bottom navigation may be evaluated for the small resident task set; it is not assumed for administrative roles.
- Tables transform into cards, priority columns, or controlled horizontal regions based on task needs.
- Primary actions remain reachable without covering content or relying on hover.

### Context switching

- Multi-society and multi-residence users can switch active context deliberately.
- Show both society and residence labels where ambiguity is possible.
- Confirm or preserve safe unsaved work before a context change.
- Refresh permission-scoped data after switching and never retain previous-context private data in view.

## Design system requirements

### Foundations

- Semantic colour tokens for surface, text, border, primary action, focus, success, warning, danger, and informational states.
- Light and dark themes with independently checked contrast.
- Consistent spacing, radius, elevation, and typography scales.
- Body text at least `1rem`; regular labels at least `0.875rem`; smaller text reserved for secondary metadata.
- Lucide icons use consistent sizing and always have an accessible label when meaning is not conveyed by adjacent text.
- Motion is brief, purposeful, and disabled or reduced when the user requests reduced motion.

### Reusable components

- Page header with title, context, supporting text, and actions.
- Dashboard statistic card with value provenance and loading or unavailable variants.
- Data table with accessible headers, search, filters, sort, pagination, row actions, selection, and responsive alternative.
- Form field, description, error, and required-state patterns integrated with React Hook Form and Zod.
- Status badge with text, not colour alone.
- User avatar with text fallback.
- Chart container with title, summary, legend, accessible tabular alternative, and empty state.
- Dialog and drawer with focus trapping, labelled controls, safe dismissal, and destructive confirmation.
- Toast for non-blocking feedback; persistent inline message for errors requiring action.
- Skeleton, empty state, error state, permission-denied state, and module-unavailable state.
- Search, filter chips, date range, pagination, bulk import preview, and export progress.

## Required prototype screens for Phase 02

All prototypes use isolated development fixtures labelled as examples.

### Login

- Email and password fields, password visibility control, forgot-password path, submit state, safe authentication error, and accessibility labels.
- Invitation and registration entry points only when the approved flow exists.
- No fake authentication or production-looking successful login without backend integration.

### Platform Super Admin dashboard

- Platform overview, society status distribution, onboarding trend, and recent administrative activity.
- Clear unavailable or fixture labels until backed by Phase 05 data.

### Chairman dashboard

- Society context, block or building overview, units, occupancy, maintenance summary, complaints, and recent announcements.
- Block cards clearly show scope and approved responsible person information.

### Block committee dashboard

- Assigned block identity, occupancy summary, authorised maintenance view, pending issues, and committee responsibilities.

### Resident dashboard

- Resident and residence context, maintenance summary, outstanding action, recent announcements, alerts, complaint status, quick actions, and approved contacts.
- Mobile-first task order and concise language.

## Forms and validation

- Use visible labels; placeholders do not replace labels.
- State required fields in text and expose required semantics to assistive technology.
- Validate on an appropriate interaction, preserve user input, and move focus to a useful error summary after failed submission.
- Show field-level messages that explain the correction without exposing internal rules.
- Use the right input type, autocomplete attribute, and mobile keyboard hint.
- Confirm sensitive actions with the resource name and consequence.
- Do not rely on confirmation dialogs for ordinary safe edits.
- Disable duplicate submission while preserving an understandable progress state.

## Data tables and bulk actions

- Default to a meaningful, stable sort.
- Keep search and filter state visible and resettable.
- Show result count only when backed by a correct permission-scoped count.
- Preserve focus and announce updates after filtering or pagination.
- Bulk import requires template guidance, validation preview, row-level errors, duplicate detection, summary, and explicit commit.
- Destructive or sensitive bulk actions require capability checks, impact summary, and confirmation.

## Charts and analytics

- Use charts only when they communicate a comparison or trend better than text.
- Provide exact values, unit, time range, data definition, and last updated state.
- Provide a table or accessible textual equivalent.
- Do not use colour as the only series distinction.
- Avoid misleading truncated scales, fabricated smooth trends, or mixed units.
- Show zero, unavailable, permission-limited, and failed states distinctly.

## Feedback and state

Every data-dependent surface must deliberately handle:

- Initial loading.
- Background refresh.
- Empty but valid result.
- Feature not yet available.
- Permission denied.
- Validation error.
- Dependency or network error.
- Partial failure where safe.
- Successful completion and next action.

Financial and sensitive actions show a durable result page or record reference rather than relying only on a toast.

## Accessibility

### Proposed conformance target

WCAG 2.2 Level AA for supported web journeys.

### Requirements

- Semantic landmarks, heading order, lists, tables, buttons, and links.
- Full keyboard operation with visible focus and logical order.
- Skip link and reliable focus restoration after navigation, dialogs, and errors.
- Sufficient text and non-text contrast in light and dark themes.
- Text zoom and browser font scaling without loss of content or function.
- Touch targets sized for reliable mobile interaction.
- Live-region announcements for important asynchronous updates without excessive interruption.
- Captions or alternatives for future media.
- Reduced motion support and no critical information conveyed only by animation.
- Automated checks plus manual keyboard and screen-reader smoke testing.

## Responsive verification matrix

Phase 02 must verify representative screens at:

- Small mobile portrait.
- Large mobile portrait and landscape where relevant.
- Tablet portrait and landscape.
- Laptop.
- Wide desktop.

Exact viewport values will be recorded in the Phase 02 test plan. Verification includes overflow, navigation, dialogs, tables, forms, charts, text scaling, and touch interaction.

## Privacy and security in the interface

- Mask or omit personal contact and financial details unless required for the task and authorised.
- Do not place tokens, secret identifiers, or private file URLs in visible error messages.
- Clear previous-scope content promptly when active society or residence changes.
- Avoid exposing inaccessible resource names through autocomplete, counts, or error messages.
- Show session timeout and reauthentication requirements clearly for sensitive actions.
- Do not persist sensitive filters or form values in URLs unless approved.

## Content guidelines

- Use plain, direct language and established domain terms.
- Use “society,” “building,” “block,” “residential unit,” “homeowner,” and “tenant” consistently after the hierarchy decision.
- Actions use verbs that describe the result, such as “Publish announcement” or “Record payment.”
- Destructive actions state the consequence and recovery path.
- Status labels use one approved vocabulary across UI, API, reports, and audit history.
- Avoid placeholder claims, inflated marketing language, and unexplained abbreviations.

## Phase 02 acceptance criteria

- Shared tokens and component patterns are documented.
- Light and dark themes pass contrast review.
- Five required prototype screens exist and use clearly labelled isolated fixtures.
- Navigation and core components work at the responsive matrix.
- Loading, empty, error, denied, and unavailable states are demonstrated.
- Keyboard navigation and focus behaviour pass manual smoke tests.
- Automated accessibility smoke tests have no unresolved serious violations.
- No prototype claims to have working backend data or authentication.
