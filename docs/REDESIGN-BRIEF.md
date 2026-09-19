# Asterline redesign brief

## Feature summary

Asterline is an infrastructure-intelligence product for teams responsible for energy, transit, water, ports, and connected civic systems. Six editorial public routes explain the product and its outcomes; a separate Command Center proves dense operational discovery, triage, scheduling, response creation, evidence handling, and feedback states.

## Primary user action

Identify a consequential network signal, understand its operational context, and create or advance the response while keeping ownership and evidence visible.

## Design direction

- **Color strategy:** Use the published `concept-light` and `concept-dark` themes unchanged. Documentary infrastructure media supplies material color; semantic CorvaUI roles carry status and action meaning.
- **Scene sentence:** An infrastructure operator moves from a regional network picture into the exact asset, consequence, owner, and next action without losing context.
- **North star:** The living network—connected, consequential, precise, and grounded in the physical systems the product helps operate.
- **Visual language:** Large documentary media and open editorial composition on public routes; ruled, dense, highly scannable composition in Command Center.

## Scope

- Seven-route React showcase: Home, Platform, Industries, Customers, Intelligence, Company, and Command Center.
- Complete public storytelling plus operational workflows and feedback states.
- Responsive composition with explicit desktop and 390px mobile verification.
- Deterministic synthetic data only. Real server-backed contract adoption is a separate release-dependent slice.
- Preview deployment only. Production promotion and custom-domain verification require explicit approval.

## Information architecture

1. **Home:** Product promise, infrastructure context, customer evidence, and entry to Command Center.
2. **Platform:** Connected operating model, decision latency, and shared operational truth.
3. **Industries:** Energy, transit, water, port, and civic-network use cases.
4. **Customers:** Outcomes, portfolio evidence, and case-study proof.
5. **Intelligence:** Searchable research and a recoverable no-results state.
6. **Company:** Product history, operating principles, roles, and contact workflow.
7. **Command Center:** Asset discovery, sorting, filtering, paging, consequence charts, work orchestration, schedules, response creation, uploads, dialogs, and system feedback.

## Responsive system

- **Base, below 40rem:** single-column reading and working flow, disclosure navigation, touch-safe controls, locally scrolling dense components, and no page-level overflow.
- **40rem to 63.99rem:** selective two-column sections, compact navigation, and reflowed operational panels.
- **64rem and above:** full editorial compositions and a dense multi-panel Command Center.
- Tables and grids may scroll inside their owned container; the document itself must not overflow.
- Dialogs, drawers, and actions remain reachable within the viewport.

## Key states

- Default, hover, focus, active, disabled, and reduced motion.
- Deterministic loading, empty, warning, error, and success feedback.
- Search recovery, filter reset, sorting, pagination, response creation, upload, schedule, workflow, dialog, modal, drawer, and snackbar behavior.
- Light and dark themes without app-defined component colors.
- Keyboard navigation, visible focus, accessible labels, and color-independent status meaning.

## CorvaUI ownership boundary

CorvaUI components, package CSS, tokens, events, accessibility behavior, and state contracts remain authoritative. Application CSS owns only composition, spacing, responsive placement, image crops, and restrained entrance motion. The demo does not recreate controls or introduce a competing visual layer.
