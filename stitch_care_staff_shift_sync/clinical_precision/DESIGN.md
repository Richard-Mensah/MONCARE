---
name: Clinical Precision
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#3f484f'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#6f7881'
  outline-variant: '#bec8d1'
  surface-tint: '#006590'
  primary: '#00628d'
  on-primary: '#ffffff'
  primary-container: '#007cb1'
  on-primary-container: '#fcfcff'
  inverse-primary: '#88ceff'
  secondary: '#006687'
  on-secondary: '#ffffff'
  secondary-container: '#5ccdff'
  on-secondary-container: '#005571'
  tertiary: '#006952'
  on-tertiary: '#ffffff'
  tertiary-container: '#008469'
  on-tertiary-container: '#f5fff9'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#c8e6ff'
  primary-fixed-dim: '#88ceff'
  on-primary-fixed: '#001e2f'
  on-primary-fixed-variant: '#004c6e'
  secondary-fixed: '#c1e8ff'
  secondary-fixed-dim: '#72d2ff'
  on-secondary-fixed: '#001e2b'
  on-secondary-fixed-variant: '#004d66'
  tertiary-fixed: '#6efad1'
  tertiary-fixed-dim: '#4cddb5'
  on-tertiary-fixed: '#002118'
  on-tertiary-fixed-variant: '#00513f'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
  status-confirmed: '#1CBF99'
  status-pending: '#F59E0B'
  status-canceled: '#EF4444'
  text-main: '#222222'
  text-secondary: '#64748B'
  border-light: '#E2E8F0'
typography:
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 34px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-sm:
    fontFamily: Hanken Grotesk
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  data-tabular:
    fontFamily: Hanken Grotesk
    fontSize: 15px
    fontWeight: '500'
    lineHeight: 20px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  gutter-md: 24px
  margin-page: 32px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
---

## Brand & Style

The brand personality is **Trustworthy Clinical**—an intersection of medical authority and modern accessibility. This design system prioritizes clarity and efficiency to serve busy medical professionals and administrators. The visual language is rooted in reliability, ensuring that critical information like shift timings and locations is never obscured by decorative elements.

The chosen style is **Corporate / Modern** with a focus on high information density. It utilizes expansive white space, a disciplined color palette, and clear structural hierarchy to reduce cognitive load in high-stress environments. The aesthetic evokes the cleanliness of a modern healthcare facility: sterile but welcoming, efficient but human-centric.

## Colors

The color strategy is anchored by the primary brand blue (`#1190CB`), chosen for its association with stability and professionalism in healthcare. A light color mode is mandatory to maintain a "clinical white" environment that feels open and clean.

- **Primary & Secondary Blues:** Used for primary actions, branding, and active states.
- **Neutrals:** Soft grays and near-whites (`#F8FAFC`) are used for surfaces and containers to prevent the harshness of pure white while maintaining high contrast.
- **Status Indicators:** These are non-negotiable for safety and clarity. 
    - **Green (#1CBF99):** Confirmed shifts and successful operations.
    - **Amber (#F59E0B):** Pending requests or warnings.
    - **Red (#EF4444):** Canceled shifts or critical alerts.

## Typography

This design system uses **Hanken Grotesk** for all levels. Its sharp, contemporary geometry provides the precision required for a clinical setting while remaining highly legible in dense data tables.

- **Headlines:** Use heavy weights (700) with slight negative letter-spacing to create a sense of authority.
- **Labels:** Small labels use uppercase with increased tracking to ensure readability at a glance, specifically for shift types and role categories.
- **Data-Tabular:** A specific role for shift times and location strings, optimized for scanning within grids and lists.

## Layout & Spacing

The system employs a **Fixed Grid** model on desktop (12 columns, 1200px max-width) to ensure layouts remain organized and professional. On mobile, it transitions to a flexible single-column layout with 16px side margins.

- **Rhythm:** An 8px base grid drives all spacing.
- **Density:** High-density layouts are preferred for management dashboards. Information should be grouped into logical "cards" or "modules" with consistent 24px internal padding.
- **Reflow:** Multi-column forms on desktop must stack vertically on mobile (breakpoint: 768px). Data tables should prioritize the 'Shift Time' and 'Status' columns when space is constrained.

## Elevation & Depth

Visual hierarchy is achieved through **Tonal Layers** and **Low-Contrast Outlines**. Deep shadows are avoided to maintain a flat, modern clinical feel.

- **Level 0 (Background):** `#F8FAFC` - The primary canvas.
- **Level 1 (Cards/Containers):** `#FFFFFF` - Used for primary content areas. These feature a subtle 1px border (`#E2E8F0`) rather than a shadow.
- **Level 2 (Active/Floating):** A very soft, diffused shadow (12% opacity, 8px blur, 4px Y-offset) is used only for elements like dropdown menus or active modals to separate them from the content layer.

## Shapes

The shape language is **Soft** (4px / 0.25rem). This small radius provides a subtle modern touch that softens the "coldness" of a medical UI without sacrificing the professional, structured look of a grid-based system. Buttons, input fields, and status badges all share this consistent radius to create a unified visual signature.

## Components

- **Buttons:** Primary buttons use the brand blue with white text. Secondary buttons use a light blue ghost style. Both use a fixed height (44px) for touch-target reliability.
- **Chips / Badges:** Essential for status indicators. They should have a subtle tinted background (e.g., 10% opacity of the status color) with high-contrast text.
- **Input Fields:** Labeled with clear, top-aligned text. Use a 1px border that thickens and turns brand-blue on focus.
- **Cards:** The primary container for shift data. Each card must have a clear "Status" indicator in the top right and "Time" in the top left.
- **Shift Lists:** High-contrast rows with alternating backgrounds or subtle dividers. Locations should always be accompanied by a small map/pin icon for instant recognition.
- **Checkboxes & Radios:** Use the primary blue for selected states; ensure the hit area is a minimum of 40x40px to accommodate busy environments.