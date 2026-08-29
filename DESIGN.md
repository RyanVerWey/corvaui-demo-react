---
name: Morrow Archive
description: Museum collection and exhibition operations, composed with published CorvaUI tokens.
colors:
  light-canvas: "#F4F7F5"
  light-surface: "#FCFFFE"
  light-subtle: "#E6EEEC"
  light-text: "#04363D"
  light-muted: "#246870"
  light-border: "#B8CBC8"
  light-accent: "#03646B"
  dark-canvas: "#021617"
  dark-surface: "#04363D"
  dark-subtle: "#063F47"
  dark-text: "#FCFFFE"
  dark-muted: "#D3CFCA"
  dark-border: "#2D6970"
  dark-accent: "#03767E"
  signal-gold: "#D9B54E"
typography:
  display:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "3.75rem"
    fontWeight: 800
    lineHeight: 0.98
  title:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 800
    lineHeight: 1.1
  body:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.5
rounded:
  xs: "0.125rem"
  sm: "0.25rem"
  md: "0.5rem"
  lg: "0.75rem"
spacing:
  xs: "0.25rem"
  sm: "0.5rem"
  md: "1rem"
  lg: "1.5rem"
  xl: "3rem"
components:
  button-primary:
    backgroundColor: "{colors.light-accent}"
    textColor: "{colors.light-surface}"
    rounded: "{rounded.sm}"
    height: "2.5rem"
  surface:
    backgroundColor: "{colors.light-surface}"
    textColor: "{colors.light-text}"
    rounded: "{rounded.md}"
    padding: "1rem"
---

# Design System: Morrow Archive

## 1. Overview

**Creative North Star: "The Living Register"**

Morrow Archive should feel like a museum's working register opened beside an active gallery: ordered, material, and alive with evidence. The published CorvaUI `concept-light` and `concept-dark` themes are the only palette source. App CSS controls composition, cropping, rhythm, and responsive behavior without redefining component colors or semantic tokens.

Editorial surfaces use image-led asymmetry, ruled divisions, strong type, and measured negative space. Operational surfaces become compact and highly legible, using familiar navigation, tables, forms, timelines, and workflows. The system rejects decorative card grids, fake gradients, glassmorphism, oversized empty hero copy, and disconnected component specimens.

**Key Characteristics:**

- Museum-grade image crops paired with exact operational language.
- Flat, ruled layouts that group through alignment before containers.
- Dense product surfaces that progressively disclose on small screens.
- One consistent CorvaUI component vocabulary across every route and state.

## 2. Colors

The palette is the published CorvaUI Concept family, unchanged. Deep mineral teal, archival paper, and a restrained signal gold create identity without app-level color invention.

### Primary

- **Register Teal:** The published accent identifies primary actions, focus, and current selection.
- **Signal Gold:** The published `accentStrong` and warning role marks attention-worthy evidence and milestones, never decoration.

### Neutral

- **Archive Paper / Night Store:** Published canvas and surface tokens establish theme-aware depth.
- **Ledger Ink:** Published text and muted roles carry hierarchy and metadata.
- **Rule Line:** Published border tokens divide information without turning every group into a card.

### Named Rules

**The Published Palette Rule.** Never declare or override a CorvaUI color token in application CSS. Use existing semantic variables exactly as supplied.

**The Evidence Rule.** Semantic colors communicate status with text or icons, never color alone.

## 3. Typography

**Display Font:** Published CorvaUI sans stack
**Body Font:** Published CorvaUI sans stack

**Character:** A single, disciplined sans family keeps the product credible. Identity comes from scale, weight, tracking, measure, and layout rather than an imported decorative typeface.

### Hierarchy

- **Display** (800, up to 3.75rem, 0.98): reserved for the editorial home and exhibition title.
- **Headline** (800, 2rem, 1.05): route-level product headings.
- **Title** (800, 1.5rem, 1.1): major sections and focused work areas.
- **Body** (400, 1rem, 1.5): instructions and editorial copy, capped near 70ch.
- **Label** (600, 0.75rem, tracked): concise metadata, statuses, and table annotations.

### Named Rules

**The Fixed Product Scale Rule.** Operational routes use fixed rem sizes; only the editorial display adapts at narrow breakpoints.

## 4. Elevation

The interface is flat by default. CorvaUI surfaces, borders, and spacing establish most depth. Published shadows are reserved for active overlays, floating actions, and selected image-led surfaces.

### Shadow Vocabulary

- **Raised control:** the published small shadow for menus and transient controls.
- **Overlay:** the published medium shadow for drawers, dialogs, and popovers.

### Named Rules

**The Working Surface Rule.** If a shadow is visible at rest on every region, the hierarchy is too decorative.

## 5. Components

CorvaUI components remain visually authoritative. Local selectors may arrange components and size their containing regions, but never restyle their palettes.

### Buttons

- **Shape:** Published compact radius and control heights.
- **Primary:** Reserved for the next consequential action.
- **Hover / Focus:** Native CorvaUI states, preserved without local color overrides.
- **Secondary:** Used for reversible or lower-priority actions.

### Chips

- **Style:** Used sparingly for active filters and collection taxonomy.
- **State:** Selected state always corresponds to a visible result change.

### Cards / Containers

- **Corner Style:** Published radii.
- **Background:** Published surface role.
- **Shadow Strategy:** Flat by default.
- **Border:** Published border role.
- **Internal Padding:** Varies by information density; nested cards are forbidden.

### Inputs / Fields

- **Style:** Published field treatment with persistent labels.
- **Focus:** Native CorvaUI focus treatment.
- **Error / Disabled:** Explicit messages and real disabled controls.

### Navigation

Desktop uses compact product navigation. Tablet and mobile use a true drawer plus bottom navigation for core destinations. All labels tolerate realistic expansion and all touch targets meet the 44px minimum.

### Collection Register

Dense objects, loans, and conservation records use responsive data views: full tables where space allows, intentional stacked records on narrow screens, and no page-level horizontal overflow.

## 6. Do's and Don'ts

### Do:

- **Do** use `concept-light` and `concept-dark` exactly as published.
- **Do** group with alignment, spacing, and rules before adding a surface container.
- **Do** make mobile workflows complete, touch-safe, and content-prioritized.
- **Do** use original local imagery for exhibition and conservation evidence.
- **Do** provide realistic loading, empty, success, warning, error, validation, disabled, and overlay states.

### Don't:

- **Don't** create a generic SaaS dashboard, shallow mock business, decorative card grid, nested-card composition, or component specimen sheet.
- **Don't** use fake gradients, glassmorphism, oversized empty hero copy, excessive pills, or decorative hero metrics.
- **Don't** override or recreate CorvaUI design-system tokens, theme colors, or package component colors.
- **Don't** hide desktop tables inside uncontrolled page overflow on mobile.
- **Don't** use colored side-stripe borders, gradient text, or em dashes.
