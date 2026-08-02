# Frontend & UI Architecture Rulebook (`ui_rules.md`)

This document outlines mandatory engineering standards, CSS architecture rules, asset management protocols, layout guidelines, performance requirements, and state machine patterns for the Marvel Superhero web codebase.

---

## 1. Core Engineering & Tech Stack Rules

1. **Framework & Styling**:
   - **Framework**: TanStack Start + React 18/19.
   - **CSS Engine**: Tailwind CSS v4 (`@import "tailwindcss";` in `src/styles.css`).
   - **Color Space**: OKLCH only (`oklch(L C H)`). Never use legacy hardcoded hex or plain RGB values for theme tokens.
   - **Iconography**: Use `lucide-react` icons (or inline clean SVG for custom brand marks like X/Twitter).

2. **Typography Rules**:
   - **Font Family**: Google Font **Outfit** (weights 300 to 900).
   - **Loading Protocol**: Load fonts exclusively via `<link rel="preconnect">` and `<link rel="stylesheet">` tags in `index.html` or `routes/__root.tsx`. **NEVER `@import` font URLs in CSS stylesheets**.

3. **Layout & Viewport Restrictions**:
   - **Viewport Bounds**: The showcase page is strictly full-viewport (`w-screen h-screen overflow-hidden`).
   - **Scroll Lock**: `body { overflow: hidden }` is strictly enforced to prevent browser scrollbars during 3D parallax movement.

---

## 2. Asset Pointer Architecture

1. **No Binary Copies in Repository Root**:
   - Images are managed through JSON pointer modules defined in `src/assets/*.asset.json`.
   - Example pointer file structure:
     ```json
     {
       "name": "spiderman-cutout",
       "url": "/images/image 6.png"
     }
     ```
   - In React components, import asset pointers and access `.url`:
     ```ts
     import spidermanCutoutAsset from './assets/spiderman-cutout.asset.json';
     const imageUrl = spidermanCutoutAsset.url;
     ```

2. **Static Asset Directory**:
   - High-resolution hero cutout and background images are served from `public/images/` via Vite static asset routing.
   - Mockup reference screenshots (`Spider-man (1).png`, `Captain America (1).png`, etc.) are for layout comparison only and must never be embedded or imported in application code.

---

## 3. Theme & State Transition Rules

1. **Root Hero Attribute**:
   - The primary theme container must define a `data-hero` dataset attribute: `data-hero="spiderman"`, `data-hero="captain"`, or `data-hero="panther"`.
   - Changing `data-hero` triggers CSS custom variable interpolation.

2. **Color Transition Protocol**:
   - Theme variables (`--primary`, `--wedge`) must transition over 700ms using `.theme-transition`.
   - Do NOT use hardcoded tailwind color utility classes like `text-red-500` or `bg-blue-900`. Use CSS variable bindings: `text-[var(--primary)]`, `bg-[var(--wedge)]`, `bg-[var(--background)]`, `text-[var(--foreground)]`.

3. **Re-triggered Animation Keys**:
   - Entrance animations (`animate-hero-enter` and `animate-text-enter`) must be re-triggered on slide change by assigning React `key={`...-${currentHero.id}`}` to animated nodes.

---

## 4. 3D Parallax Stage Rules

1. **Stage Perspective**:
   - Stage container must apply `.stage` utility: `perspective: 1400px; transform-origin: 60% 50%;`.
2. **3D Layer Preservation**:
   - Parallax layers must apply `.layer-3d` utility: `transform-style: preserve-3d; transition: transform 120ms cubic-bezier(0.1, 0.4, 0.2, 1);`.
3. **Cursor Normalization**:
   - Track mouse position relative to screen center, normalizing `x` and `y` to `[-1..1]`.
   - On `onMouseLeave`, reset `x` and `y` to `0` smoothly.
4. **Transform Mathematical Formula**:
   ```ts
   const tx = -x * z * 8;
   const ty = -y * z * 5;
   const ry = -x * z * 1.6;
   const rx = y * z * 1.1;
   transform = `translate3d(${tx}px, ${ty}px, 0px) rotateY(${ry}deg) rotateX(${rx}deg)`;
   ```

---

## 5. Geometric Clip-Path Utilities

- `.wedge-panel`: `clip-path: polygon(38% 0, 100% 0, 100% 100%, 8% 100%);`
- `.wedge-photo`: `clip-path: polygon(22% 0, 100% 0, 78% 100%, 0 100%);`
- `.skew-tile`: `clip-path: polygon(14% 0, 100% 0, 86% 100%, 0 100%);`

---

## 6. Accessibility & Keyboard Control Rules

1. **Keyboard Binding**:
   - `ArrowRight`: Advance character index (with array wrapping).
   - `ArrowLeft`: Previous character index (with array wrapping).
2. **Interactive Element Accessibility**:
   - All navigation buttons must have descriptive `aria-label` attributes (`"Previous character"`, `"Next character"`).
   - All interactive controls must support visible focus rings (`focus:ring-2 focus:ring-[var(--primary)]`).
