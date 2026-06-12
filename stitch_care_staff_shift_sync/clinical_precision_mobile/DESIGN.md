---
name: Clinical Precision Mobile
colors:
  surface: '#f8f9ff'
  surface-dim: '#ccdbf3'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e6eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d5e3fc'
  on-surface: '#0d1c2e'
  on-surface-variant: '#3f484f'
  inverse-surface: '#233144'
  inverse-on-surface: '#eaf1ff'
  outline: '#6f7881'
  outline-variant: '#bec8d1'
  surface-tint: '#006590'
  primary: '#00628d'
  on-primary: '#ffffff'
  primary-container: '#007cb1'
  on-primary-container: '#fcfcff'
  inverse-primary: '#88ceff'
  secondary: '#2d6483'
  on-secondary: '#ffffff'
  secondary-container: '#a7dbff'
  on-secondary-container: '#2a6180'
  tertiary: '#545d62'
  on-tertiary: '#ffffff'
  tertiary-container: '#6d767a'
  on-tertiary-container: '#fafdff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#c8e6ff'
  primary-fixed-dim: '#88ceff'
  on-primary-fixed: '#001e2f'
  on-primary-fixed-variant: '#004c6e'
  secondary-fixed: '#c7e7ff'
  secondary-fixed-dim: '#99cdf0'
  on-secondary-fixed: '#001e2e'
  on-secondary-fixed-variant: '#0c4c6a'
  tertiary-fixed: '#dbe4e9'
  tertiary-fixed-dim: '#bfc8cd'
  on-tertiary-fixed: '#141d20'
  on-tertiary-fixed-variant: '#3f484c'
  background: '#f8f9ff'
  on-background: '#0d1c2e'
  surface-variant: '#d5e3fc'
typography:
  display-sm:
    fontFamily: Manrope
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Manrope
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-numeric:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 16px
  label-caps:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  touch-target-min: 44px
  gutter: 1rem
  margin-mobile: 1.25rem
  stack-sm: 0.5rem
  stack-md: 1rem
  stack-lg: 1.5rem
---

## Brand & Style
The design system focuses on high-stakes medical environments where clarity, speed, and accuracy are paramount. The mobile extension prioritizes a **Modern Corporate** aesthetic with a heavy emphasis on **High-Contrast** accessibility. 

The personality is authoritative yet supportive—designed to reduce cognitive load for healthcare professionals during critical workflows. The UI utilizes a "mobile-first, data-dense" philosophy, ensuring that clinical information is legible under varying light conditions (e.g., bright clinics or dim hospital wards). Visual elements are characterized by systematic alignment, purposeful whitespace, and surgical precision in iconography.

## Colors
This design system utilizes a palette optimized for clinical reliability. 
- **Primary (#1190cb):** Used for primary actions, active states, and critical navigation landmarks.
- **Secondary:** A deep navy for high-contrast text and structural elements.
- **Tertiary:** A light azure tint used for subtle grouping and row zebra-striping in dense data tables.
- **Neutral:** A slate-grey scale for secondary information and iconography to prevent visual fatigue.
- **Status Colors:** Standardized semantic colors for vitals, alerts, and lab results, ensuring AA accessibility against white backgrounds.

## Typography
Typography is split into three functional roles to maximize mobile legibility:
- **Headlines (Manrope):** Balanced and professional, used for patient names and section headers.
- **Body (Inter):** Highly utilitarian, chosen for its neutral character and exceptional readability at small sizes.
- **Data (JetBrains Mono):** A monospaced font specifically for numeric lab values, dosages, and timestamps to ensure vertical alignment in lists and charts.

Mobile-specific adjustments focus on reducing the scale of display type to prevent excessive line-wrapping while maintaining large tap targets for interactive labels.

## Layout & Spacing
This design system employs a **Fluid Grid** optimized for single-column mobile layouts.
- **Margins:** A 20px (1.25rem) safety margin is enforced on the X-axis for all mobile screens.
- **Touch Targets:** No interactive element (button, checkbox, menu item) shall be smaller than 44x44px.
- **Stacking:** A strict 4px-based rhythm is used for vertical spacing. Data-heavy lists use a compact 8px gap, while distinct content sections use 24px.
- **Bottom-Sheet Pattern:** Primary navigation and complex filter menus are housed in bottom-anchored sheets to keep controls within the "thumb zone."

## Elevation & Depth
In this design system, depth is used sparingly to denote interactivity and priority.
- **Tonal Layers:** The primary background is light grey (#F8FAFC). Cards and surfaces use pure white (#FFFFFF) to "pop" forward.
- **Low-Contrast Outlines:** Instead of heavy shadows, surfaces are defined by 1px borders in a soft neutral (#E2E8F0).
- **Active Elevation:** Bottom sheets use a soft, 15% opacity ambient shadow with a 20px blur to signal their temporary nature above the primary interface.
- **Scrim:** When a bottom sheet is active, the background is obscured by a 40% opacity neutral-900 overlay to focus user attention.

## Shapes
This design system uses a **Soft** shape language to maintain a clinical, professional feel without appearing overly "bubbly" or consumer-oriented. 
- **Standard Radius:** 4px (0.25rem) for input fields, buttons, and small cards.
- **Container Radius:** 12px (0.75rem) for bottom sheets and large modal overlays to soften the upper edges.
- **Progress Bars:** Use 0px (sharp) or very minimal 2px radius to maximize the perceived precision of clinical data.

## Components
- **Buttons:** Primary buttons use the #1190cb fill with white text. Minimum height is 48px for mobile. Secondary buttons use a primary-colored border with no fill.
- **Bottom Sheets:** Use a "grab handle" indicator (32x4px, rounded) at the top. Content should be scrollable within the sheet if it exceeds 60% of screen height.
- **Compact Data Rows:** Use Inter 14px for labels and JetBrains Mono 14px for values. Rows must include a subtle 1px divider.
- **Chips/Badges:** Use Tertiary (#EEF7FC) backgrounds for neutral states and semantic fills (Success/Warning/Error) for vitals status.
- **Input Fields:** High-contrast 1px borders (#94A3B8). Labels must remain visible (floating or top-aligned) even when the field is populated.
- **Bottom Navigation:** A fixed bar with 4-5 icons (24px) using #1190cb for the active state and Neutral for inactive.