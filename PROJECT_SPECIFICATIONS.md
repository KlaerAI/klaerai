# DIGITAL CAMPUS ECOSYSTEM — MASTER PRODUCT SPECIFICATION (V6.0)
================================================================================
> **DOCUMENT TYPE**: Source of Truth / Engineering Blueprint
> **VERSION**: 6.0 (The "Human-Compiler" Edition)
> **STATUS**: FROZEN FOR DEVELOPMENT
> **REFERENCE**: SAV1N Premium UI/UX x Digital Campus Content Blueprint
> **TARGET AUDIENCE**: Frontend Engineers, Motion Designers, QA, AI Agents

---

## 1.0 EXECUTIVE SUMMARY & VISION
This document serves as the absolute source of truth for the **Digital Campus Ecosystem** promotional showcase. 
The goal is to build a web experience that feels like a **Tier-1 Agency Portfolio (SAV1N)** but functions as a **High-Trust Institutional Platform**.

### 1.1 The "Fusion" Core Philosophy
We are merging two distinct identities:
1.  **The Aesthetic (SAV1N)**: Dark mode dominance, massive typography, technical grid lines, cyan accents, and organic "curved" transitions.
2.  **The Function (Digital Campus)**: Modular service breakdowns, clear value propositions, trust-building copy, and "students-first" imagery.

### 1.2 The User Journey Funnel
1.  **Hook (Loader + Hero)**: "One Campus. Infinite Opportunities." (Wow factor).
2.  **Empathy (Problem)**: "The system is fragmented." (Emotional connection).
3.  **Solution (Services)**: "A Unified Ecosystem." (Rational proof).
4.  **System (Flywheel)**: "It's a growth engine." (Logic).
5.  **Trust (Founder)**: "We lived it." (Human connection).
6.  **Action (Footer)**: "Join Us." (Conversion).

---

## 2.0 DESIGN SYSTEM & TOKENS (TAILWIND EXTENSION)

### 2.1 Color Palette (Strict Hex Codes)
These variables must be defined in `globals.css` and exposed to Tailwind.

| CSS Variable | Tailwind Name | Hex Value | Usage Rules |
| :--- | :--- | :--- | :--- |
| `--black-primary` | `black-primary` | `#0A0A0A` | **Default Background**. Not pure RGB black. A rich, deep void. |
| `--navy-dark` | `navy-dark` | `#0F172A` | **Secondary Background**. Used for "Services" to separate from Hero. |
| `--white-primary` | `white-primary` | `#FFFFFF` | **Primary Text**, Headings, Icons. Maximum contrast. |
| `--accent-cyan` | `accent-cyan` | `#00BCD4` | **Interactive Signal**. Links, Highlights, Buttons (Hover). **Max 10%**. |
| `--gray-body` | `gray-body` | `#9CA3AF` | **Body Text**. Reduced contrast to 60% for hierarchy. |
| `--gray-border` | `gray-border` | `#333333` | **Grid Lines**. Subtle dividers. 1px width only. |
| `--glass-bg` | `glass-bg` | `rgba(10,10,10,0.8)` | **Header**. Must be paired with `backdrop-filter: blur(12px)`. |
| `--error-red` | `error-red` | `#EF4444` | Form errors only. |

### 2.2 Typography Scale (Responsive)
Font Face: **Inter** (Primary), **Helvetica Neue** (Fallback).

| Semantic Role | Desktop Size | Mobile Size | Weight | Tracking | Line Height |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Display H1** | `5rem` (80px) | `3rem` (48px) | 300 (Light) | `-0.03em` | `1.1` |
| **Section H2** | `3.5rem` (56px) | `2.25rem` (36px) | 700 (Bold) | `-0.02em` | `1.2` |
| **Card Title H3** | `1.5rem` (24px) | `1.25rem` (20px) | 600 (Semi) | `-0.01em` | `1.3` |
| **Body Lead** | `1.25rem` (20px) | `1.125rem` (18px) | 400 | `0em` | `1.6` |
| **Body Base** | `1rem` (16px) | `1rem` (16px) | 400 | `0em` | `1.6` |
| **Index Label** | `4rem` (64px) | `3rem` (48px) | 700 (Bold) | `-0.05em` | `1.0` |

### 2.3 Spacing System (8px Grid)
*   **Section Vertical Padding**: `py-32` (128px) or `py-40` (160px). Mobile: `py-20`.
*   **Container Width**: `max-w-[1440px]`. Centered `mx-auto`.
*   **Horizontal Gutters**: `px-4` (Mobile), `px-8` (Tablet), `px-12` (Desktop), `px-20` (Ultrawide).
*   **Card Gaps**: `gap-10` (40px) to `gap-20` (80px).

---

## 3.0 GLOBAL INTERACTIVE STATES

### 3.1 Buttons
*   **Primary (Solid)**:
    *   Bg: `white-primary`. Text: `black-primary`. Radius: `rounded-full`.
    *   Hover: `scale-105`, `shadow-lg`. Transition: `300ms cubic-bezier`.
*   **Secondary (Outline)**:
    *   Border: `1px solid gray-border`. Text: `white-primary`.
    *   Hover: Border `accent-cyan`, Text `accent-cyan`.
*   **Text Link**:
    *   Bottom border `1px solid transparent`.
    *   Hover: Bottom border `accent-cyan` (expands from left).

### 3.2 Forms (Inputs)
*   Bg: `transparent`. Border: `1px solid gray-border`.
*   Focus: Border `accent-cyan`, `ring-2 ring-cyan/20`.

### 3.3 Scrollbars
*   Width: `6px`. Track: `black-primary`. Thumb: `gray-border`.
*   Hover Thumb: `accent-cyan`.

---

## 4.0 DETAILED COMPONENT SPECIFICATIONS

### 4.1 COMPONENT: PAGE LOADER
**File**: `app/components/Loader.tsx`
**Concept**: A specific "SAV1N" replica loader that builds brand authority before the site even appears.

**Animation Timeline (Total: 4600ms)**
*   **0ms - 400ms**:
    *   Logo "SAV" scales in (`0.8 -> 1`).
    *   Logo "SAV" moves up (`y: 30px -> 0`).
    *   Opacity fades in (`0 -> 1`).
*   **400ms - 600ms**:
    *   SVG Stroke Animation: A "1" or "Line" draws itself next to the logo.
    *   Easing: `easeOutQuad`.
*   **600ms - 3600ms (The Wait)**:
    *   **Right Bar**: A 3px Cyan vertical line grows at the right edge of viewport. Height `0% -> 100%`.
    *   **Counter**: A number in bottom-right (`bottom-10 right-10`) counts `0000 %` to `0100 %`.
    *   *Note*: The number should use `tabular-nums` font feature to prevent jitter.
*   **3600ms - 4600ms (The Exit)**:
    *   **Curtain**: The entire white loader container translates `y: 0 -> -100%`.
    *   **Parallax Elements**:
        *   "SAV" Logo translates `y: 0 -> -200px` (Faster than curtain).
        *   Counter translates `y: 0 -> -100px`.
        *   **Vertical Bar**: Translates `x: 0 -> -50vw` (Slides to horizontal center).
    *   *Result*: A complex, multi-layered exit that reveals the Hero.

---

### 4.2 COMPONENT: HEADER (NAVBAR)
**File**: `app/components/layout/Header.tsx`
**Behavior**: Fixed, Sticky, Transformative.

**States**:
1.  **Top (0px scroll)**:
    *   Background: `transparent`.
    *   Border: `none`.
    *   Padding: `py-6`.
2.  **Scrolled (> 50px)**:
    *   Background: `--glass-bg` (Black 80%, Blur 12px).
    *   Border-bottom: `1px solid rgba(255,255,255,0.05)`.
    *   Padding: `py-4`.
    *   Transition: `all 0.4s ease`.

**Layout**:
*   **Left**: Brand Logo (Text: "Digital Campus"). Font: Inter Bold. Size: `text-xl`. Tracking: `-0.02em`.
*   **Center** (Desktop Only): Nav Links (Vision, Services, About). Opacity `0.7` -> `1.0` (Hover).
*   **Right**:
    *   **Primary CTA**: "Join Campus" (White Pill Button).
    *   **Mobile Trigger**: Hamburger Icon (3 lines).

---

### 4.3 COMPONENT: HERO SECTION
**File**: `app/components/home/Hero.tsx`
**Theme**: `--black-primary`.
**Height**: `100vh`.

**Background Layer**:
*   **Element**: WebGL Canvas or Video Loop.
*   **Visual**: Abstract "Opportunity Network". Nodes connecting, lines drawing. Cyan points.
*   **Physics**: Rotates slowly. Mouse interaction creates subtle parallax.
*   **Scroll**: `y` translation at `speed 0.5` (Parallax). Fades out opacity `1 -> 0`.

**Foreground Content (Left Aligned)**:
*   **H1 Headline**:
    > "One Campus.\n**Infinite Opportunities**."
    *   "One Campus" = White, Light Weight.
    *   "Infinite Opportunities" = Cyan Accent, Bold Weight.
    *   **Animation**: SVG Ellipse draws around the word "Opportunities" at `1.2s` mark.
*   **Subheadline**:
    > "An all-in-one digital ecosystem that democratizes academic support, events, freelancing, and networking for every college student—powered by AI."
    *   Width: `max-w-xl`. Color: `--gray-body`.
*   **CTAs**:
    *   Primary: "Explore Ecosystem" (Outlined Pill). Hover: Fill Cyan.
    *   Secondary: "Partner With Us" (Link).

**Transition Out**:
*   Smooth Gradient fade to White at the bottom `h-32`.

---

### 4.4 COMPONENT: PROBLEM SECTION
**File**: `app/components/home/Problem.tsx`
**Theme**: **INVERTED** (White Background).
**Separator**: **Curved SVG Top** (Black fill, convex shape) overlapping the Hero.

**Grid Layout**:
*   **Desktop**: 4-Column Grid.
*   **Content**: 
    1.  **Unequal Access**: "Resources scattered by zip code."
    2.  **Gated Opportunity**: "Status over merit."
    3.  **Discontinuous Events**: "No portfolio continuity."
    4.  **Meritless Networking**: "Who you know > What you do."
*   **Card Design**:
    *   No Background (Transparent).
    *   Dividers: `border-r` (Right) and `border-b` (Bottom) using `--gray-border`.
    *   Typography: Large H3 Headlines. Minimal body text.
    *   **Interaction**: Hovering a cell turns Background Black, Text White. (Inversion Effect).

---

### 4.5 COMPONENT: SERVICES SECTION
**File**: `app/components/home/Services.tsx`
**Theme**: `--navy-dark` (`#0F172A`).
**Separator**: **Curved SVG Top** (White fill, concave shape) overlapping the Problem section.

**Headline**:
*   "A Unified Digital Campus."
*   Centered or Left-aligned.
*   H2 Style.

**The "SAV1N" Grid**:
*   Layout: 2 Columns x 3 Rows (Desktop).
*   **Card Anatomy**:
    *   **Index**: Huge `01` text in top-left. Color: White, Opacity 0.1. Font: Bold.
    *   **Borders**: `border-t` and `border-l` only. Color: `#333`.
    *   **Content**:
        *   Title: "AI Academic Support". Color: White. (Hover: Cyan).
        *   Desc: "Personalized intelligence for every student."
        *   Features: `<ul>` with 3 items. Bullet point style.
    *   **Interaction**:
        *   Hover: Background `rgba(0, 188, 212, 0.05)`.
        *   Title: Turns Cyan.
        *   Arrow Icon (Top Right): Rotates `45deg`.

**Modules to List**:
1.  AI Academic Support.
2.  Event Infrastructure.
3.  Student Marketplace.
4.  Merit Networking.
5.  Campus Forum.

---

### 4.6 COMPONENT: FLYWHEEL SECTION
**File**: `app/components/home/Flywheel.tsx`
**Theme**: `--black-primary`.
**Concept**: Visualizing " Growth".

**Mechanism**:
*   Sticky Container (`h-[300vh]`).
*   **Left Side**: Sticky Graphic (Circular Diagram).
*   **Right Side**: Scrolling Text Panels.
    *   Panel 1: "Learn".
    *   Panel 2: "Build".
    *   Panel 3: "Earn".
    *   Panel 4: "Lead".
*   **Logic**: As Panel X enters view, Graphic rotates to Sector X.

---

### 4.7 COMPONENT: FOUNDER SECTION
**File**: `app/components/home/Founder.tsx`
**Theme**: `--white-primary`.
**Separator**: Curved SVG (Black -> White).

**Layout**:
*   **Left**: Founder Image.
    *   Style: Grayscale, High Contrast, Grain Filter.
    *   Aspect: Portrait (3:4).
*   **Right**: Manifesto.
    *   Font: Serif (for contrast).
    *   Copy: "Talent is universal. Opportunity is not. We built this to bridge the gap."
    *   Signature: Animated SVG signature at the bottom.

---

### 4.8 COMPONENT: FOOTER
**File**: `app/components/layout/Footer.tsx`
**Theme**: `--black-primary`.
**Separator**: Curved SVG (White -> Black).

**CTA Zone**:
*   **Headline**: "Campus Reimagined."
*   **Primary Button**: "Join as Student" (Massive Pill Button).
*   **Secondary**: "Partner with Us".

**Links Grid**:
*   4 Columns.
*   Opacity: `0.6` -> `1.0` (Hover).
*   Copyright Line: "© 2026 Digital Campus."

---

## 5.0 MOTION PHYSICS & TIMING

### 5.1 The "Premium" Curve
Abandon browser defaults. All significant motion must use:
**`cubic-bezier(0.76, 0, 0.24, 1)`**
*   **Characteristics**: Slow start, snappy middle, soft landing.
*   **Usage**: Modals, entering sections, hover scales.

### 5.2 Scroll Reveals (`useInView`)
*   Elements must NOT be static on load.
*   **Initial**: `opacity: 0`, `y: 40px`.
*   **Final**: `opacity: 1`, `y: 0`.
*   **Duration**: `0.8s`.
*   **Stagger**: `0.1s` between grid items.

---

## 6.0 ASSET REGISTRY & IMPLEMENTATION

### 6.1 Images
*   **Founder**: `placehold.co` or Unsplash ID `324523` (Black and white).
*   **Hero BG**: `canvas` element.

### 6.2 Icons
*   Library: `lucide-react`.
*   Style: Stroke width `1.5px` (Thin/Premium).

### 6.3 3D Implementation (Hero)
*   Lib: `react-three-fiber`.
*   Geometry: `SphereGeometry`.
*   Material: `PointsMaterial` (Color: Cyan).
*   Animation: `useFrame` hook for rotation.

---

## 7.0 COPYWRITING SCRIPT

### Hero
> H1: "One Campus. Infinite Opportunities."
> Sub: "Democratizing access for every student."

### Problem
> H2: "The Broken Reality."
> Cards: "Unequal Access", "Gated Merit", "Fragmented Tools".

### Services
> H2: "A Unified Ecosystem."
> Titles: "AI Intelligence", "Global Events", "Skill Marketplace".

### CTA
> H2: "Ready to redefine your future?"

---

## 8.0 QA & VERIFICATION
Before shipping, verify:
1.  **Parallax Performance**: Does the globe lag on scroll? (Target 60fps).
2.  **Responsiveness**: Do the Grids collapse to 1-col on Mobile?
3.  **Curved Separators**: Are there hairline gaps between SVG and Section? (Fix with `margin-top: -1px`).
4.  **Loader Exit**: Is the "Curtain Lift" smooth?
5.  **Contrast**: Is the Gray text legible on Black?

**END OF SPECIFICATION (V6.0)**
