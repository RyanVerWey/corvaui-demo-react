# CorvaUI React component coverage

Audit source: published `@corvaui/react` version `0.1.7`, inspected from its public package index before redesign implementation.

## Coverage matrix

| Component            | Product use                                                                                                      |
| -------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Accordion            | Loan handling requirements and proof-route implementation notes                                                  |
| Alert                | SLA warning, sync error, validation guidance, and proof states                                                   |
| AppBar               | Global compact application header                                                                                |
| Autocomplete         | Artist, lender, and object lookup                                                                                |
| Avatar               | Assignee and team identity                                                                                       |
| Backdrop             | Bounded collection synchronization state                                                                         |
| Badge                | Operational status and counts                                                                                    |
| BottomNavigation     | Four primary mobile destinations; extended routes remain in the header Drawer pending upstream narrow-width work |
| Box                  | Structured summary and state regions                                                                             |
| Breadcrumbs          | Route and record location context                                                                                |
| Button               | Primary and secondary actions                                                                                    |
| ButtonGroup          | View and workflow action grouping                                                                                |
| Calendar             | Installation and courier schedule                                                                                |
| Card                 | Singular featured object and related programme item only                                                         |
| Carousel             | Editorial exhibition stories                                                                                     |
| Chart                | Readiness, movements, environment, and workload data                                                             |
| Checkbox             | Conservation and transport checklists                                                                            |
| Chip                 | Active taxonomy and search filters                                                                               |
| Container            | Route content width and reading measure                                                                          |
| DataGrid             | Interactive loan and risk exploration                                                                            |
| DataTable            | Collection register and proof inventory                                                                          |
| DatePicker           | Loan departure and return dates                                                                                  |
| Dialog               | Final loan approval confirmation                                                                                 |
| Divider              | Ruled editorial and operational grouping                                                                         |
| Drawer               | Mobile navigation and record detail                                                                              |
| EmptyState           | No-result collection recovery                                                                                    |
| FileUpload           | Condition and courier evidence                                                                                   |
| FloatingActionButton | Narrow-screen create-record action                                                                               |
| Grid                 | Responsive summaries and form sections                                                                           |
| Icon                 | Navigation, status, and action meaning                                                                           |
| ImageList            | Condition evidence and installation views                                                                        |
| Link                 | Package, policy, and contextual navigation                                                                       |
| List                 | Compact actions, findings, and programme information                                                             |
| Masonry              | Variable-length exhibition notes and object stories                                                              |
| Menu                 | Object row actions                                                                                               |
| MenuBar              | Wide primary navigation                                                                                          |
| Modal                | Object quick view with evidence                                                                                  |
| NumberField          | Insurance value, humidity, and light thresholds                                                                  |
| Pagination           | Collection register pages                                                                                        |
| Paper                | Working panels and overlays                                                                                      |
| Popover              | Quick status and filter explanations                                                                             |
| Progress             | Exhibition readiness and workflow completion                                                                     |
| RadioGroup           | Transport and handling method selection                                                                          |
| Rating               | Condition severity and inspection confidence                                                                     |
| SearchForm           | Global and collection search                                                                                     |
| Select               | Gallery, status, department, and cadence filters                                                                 |
| Sidebar              | Persistent product navigation and conservation sections                                                          |
| Skeleton             | Structured loading preview                                                                                       |
| Slider               | Environmental threshold tuning                                                                                   |
| Snackbar             | Saved, assigned, and restored feedback                                                                           |
| SpeedDial            | Mobile evidence creation actions                                                                                 |
| Spinner              | Bounded save/sync progress                                                                                       |
| Stack                | Component composition and action alignment                                                                       |
| Stepper              | Progressive four-stage loan dossier review                                                                       |
| Switch               | Theme and workspace preferences                                                                                  |
| Tabs                 | Record details, evidence, activity, and proof views                                                              |
| Textarea             | Condition, courier, and policy notes                                                                             |
| TextInput            | Object, contact, workspace, and reference fields                                                                 |
| TimePicker           | Courier pickup and installation windows                                                                          |
| Timeline             | Object, loan, and conservation event history                                                                     |
| ToggleGroup          | Density, range, and view selection                                                                               |
| Toolbar              | Route-level tools and filters                                                                                    |
| Tooltip              | Compact icon-action explanation                                                                                  |
| TransferList         | Team access and exhibition assignment                                                                            |
| TreeView             | Collection and location hierarchy                                                                                |
| Typography           | Semantic display, heading, body, and metadata text                                                               |
| WorkflowBoard        | Three-stage institutional loan pipeline                                                                           |

## Summary

- Public components audited: **67**
- Planned and implemented responsibly: **67**
- Omitted: **0**

Coverage is counted only when a component participates in a believable Morrow Archive workflow or state. Merely importing or hiding a component does not qualify.

## Upstream findings

The audit produced three focused CorvaUI issues. The demo retains only narrow composition or keyboard workarounds and does not modify the published package:

- [#789 — Keep BottomNavigation single-row at narrow mobile widths](https://github.com/RyanVerWey/CorvaUI/issues/789)
- [#790 — Add an operable controlled trigger API to SpeedDial](https://github.com/RyanVerWey/CorvaUI/issues/790)
- [#791 — Complete focus management for Dialog, Modal, and Drawer](https://github.com/RyanVerWey/CorvaUI/issues/791)

## Asset attribution

The gallery installation, conservation detail, and collections logistics images were generated specifically for this private demo with OpenAI ImageGen on 2026-08-28. No external stock assets or third-party artwork reproductions are used.
