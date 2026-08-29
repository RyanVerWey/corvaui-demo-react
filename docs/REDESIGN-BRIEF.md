# Morrow Archive redesign brief

## Feature summary

Morrow Archive is a production-depth museum exhibition and collection-operations product for registrars, conservators, curators, art handlers, and operations leads. It combines a public editorial exhibition entry with dense working routes for collection research, loan coordination, conservation evidence, installation planning, institutional settings, and CorvaUI integration proof.

## Primary user action

Understand what needs attention next, then move an object, loan, conservation record, or installation task forward with clear evidence and feedback.

## Design direction

- **Color strategy:** Restrained product palette with a committed image-led editorial hero. Use the published `concept-light` and `concept-dark` themes unchanged.
- **Scene sentence:** A registrar reviews a high-value outgoing loan on a tablet in a softly lit preparation gallery while installation crews work nearby and deadlines remain visible.
- **North star:** The Living Register, inspired by museum collection ledgers, exhibition catalogues, architectural wayfinding, and specialist collection-management tools.
- **Approved probes:** `docs/concepts/north-star-desktop.png` sets the image/meta/register composition. `docs/concepts/north-star-mobile.png` sets priority-first ordering, stacked evidence, bottom navigation, and touch action treatment.

## Scope

- Production-ready, multi-page React showcase.
- Interactive workflows and complete feedback states.
- Mobile-first composition with compact, wide, tablet, and narrow viewport behavior.
- Local preview only. Production deployment requires visual approval.

## Information architecture

1. **Exhibition:** Immersive public entry, editorial story, installation progress, selected works, visitor programme.
2. **Overview:** Operational readiness, risk, movement, team load, live alerts, loading and failure simulation.
3. **Collection:** Search, taxonomy, hierarchy, sortable/filterable records, pagination, preview overlays, empty state.
4. **Loans:** Workflow board, staged request form, transport and insurance detail, assignment, approval dialog.
5. **Conservation:** Focused workspace, condition imagery, checklists, evidence upload, history, treatment notes.
6. **Calendar:** Installation calendar, daily schedule, event timeline, crew and gallery filters.
7. **Settings:** Workspace, notification, access, theme, thresholds, transfer list, validation and save feedback.
8. **System proof:** Package/version evidence, component coverage, state controls, accessibility commitments, attribution.

## Responsive system

- **Base, below 40rem:** one-column working flow, 16px body text, 44px controls, bottom navigation, drawer navigation, stacked record rows, figures cropped for subject priority, primary action remains reachable.
- **40rem to 63.99rem:** two-column sections where useful, compact menu bar, drawer for secondary navigation, charts and forms reflow without horizontal page overflow.
- **64rem and above:** persistent left rail for product routes, full working canvas, dense tables/data grids, editorial hero with metadata rail.
- Data tables remain locally scrollable only when semantic transformation would hide important relationships. The primary collection table uses a purpose-built mobile record list instead.
- Overlays never exceed the viewport and actions remain visible above safe-area insets.

## Key states

- Default, hover, focus, active, disabled.
- Skeleton loading and bounded spinner saving.
- Empty collection search with a recovery action.
- Success snackbar after saved work.
- Warning and error alerts with specific recovery guidance.
- Field validation connected to labels and messages.
- Dialog, modal, drawer, popover, menu, tooltip, and backdrop states.
- Long labels, reduced motion, touch input, light theme, dark theme, and persisted preference.

## Mock fidelity inventory

| Visible ingredient | Implementation |
| --- | --- |
| Single dominant gallery scene | Generated local responsive image asset |
| Exhibition metadata rail | Semantic definition list beside the hero |
| Ruled collection register | CSS grid/dividers plus CorvaUI data components |
| Compact institutional navigation | CorvaUI AppBar, MenuBar, Drawer, Sidebar, BottomNavigation |
| Gold attention signals | Published theme warning/accent-strong semantics only |
| Mobile priority ordering | CSS grid areas and dedicated compact record rendering |
| Dense evidence rows | Semantic lists, tables, Timeline, ImageList |
| Touch action tray | CorvaUI ButtonGroup, FloatingActionButton, and SpeedDial |

The generated comps are not literalized as screenshots. Text, controls, tables, navigation, state, and accessibility remain semantic React.
