# CorvaUI React component coverage

Audit source: published `@corvaui/react` version `0.2.1`, matched against the imports and rendered workflows in `src/App.tsx`.

## Asterline usage

| Component | Product use |
| --- | --- |
| Accordion | Company roles and expandable supporting detail |
| Alert | Operational warnings and validation guidance |
| Avatar | Team and owner identity |
| Badge | Asset health, status, and counts |
| Box | Structured summaries and state regions |
| Button | Navigation, calls to action, and workflow commands |
| Calendar | Scheduled network work |
| Carousel | Editorial infrastructure stories |
| Chart | Consequence, readiness, response, and operating metrics |
| Checkbox | Consent and response checklists |
| DataGrid | Asset discovery, filtering, sorting, and paging |
| DatePicker | Response and maintenance dates |
| Dialog | Contact and response-creation workflows |
| Divider | Ruled editorial and operational grouping |
| Drawer | Mobile navigation |
| EmptyState | Recoverable intelligence-search result |
| FileUpload | Response evidence selection |
| Grid | Responsive summaries and form sections |
| Icon | Navigation, status, and action meaning |
| Link | CorvaUI and contextual navigation |
| MenuBar | Desktop public navigation |
| Modal | Focused operational detail |
| NumberField | Thresholds and numeric operating inputs |
| Paper | Working panels and comparison surfaces |
| Progress | Readiness and workflow completion |
| RadioGroup | Response choices |
| SearchForm | Intelligence discovery |
| Select | Network, region, owner, and status choices |
| Sidebar | Drawer navigation and working context |
| Slider | Operating thresholds |
| Snackbar | Saved and routed feedback |
| Stack | Component and action composition |
| Switch | Concept light/dark selection |
| Tabs | Command Center views |
| Textarea | Contact and response notes |
| TextInput | Search, identity, and work details |
| TimePicker | Scheduled response time |
| Timeline | Company and operating history |
| ToggleGroup | Range and view selection |
| Toolbar | Command Center tools |
| Typography | Semantic headings, body text, and metadata |
| WorkflowBoard | Response triage, field work, and verification |

## Summary

- Public components available in CorvaUI 0.2.1: **67**
- Components used in Asterline: **42**
- Components intentionally not forced into this product: **25**

Coverage is counted from the current Asterline source. The demo uses components only where they support a believable infrastructure workflow; importing, hiding, or inventing a workflow solely to reach 67/67 would not count as product-quality adoption.

## Scope boundary

The current Command Center uses deterministic synthetic data and released CorvaUI 0.2.1 packages. Server paging/filtering/sorting and validated remote workflows remain tracked in RyanVerWey/CorvaUI#860 until `@corvaui/data` and the CorvaUI ASP.NET Core packages are published.
