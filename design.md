# Marvel Superhero Universe — Design System & Character Themes

This document defines the overarching design philosophy, color system, character-specific themes, visual storytelling guidelines, and motion specifications for the Marvel Superhero Showcase application.

---

## 1. Design Philosophy

- **Experience & Visual Impact First**: The site prioritizes high-fidelity visual storytelling, dynamic 3D depth, cinematic micro-interactions, and immersive theme shifts over generic tabular content.
- **Universe Metamorphosis**: Switching characters is not a simple color swap—it transitions the entire atmosphere, color space, depth contrast, and visual energy of the user interface.
- **Layered Spatial Composition**: Depth is established via a 7-layer 3D stage with real-time cursor parallax, wedge geometric clipping, atmospheric image overlays, and dynamic wordmark backdrops.

---

## 2. Global Color System & Design Tokens

All colors are specified using modern **OKLCH** color tokens in `src/styles.css` for wide-gamut vibrancy, uniform perceptual lightness, and smooth color interpolations.

### Base Surface & Neutral Palette
| Token | OKLCH Value | Description |
| :--- | :--- | :--- |
| `--background` | `oklch(1 0 0)` | Pure crisp white base canvas |
| `--foreground` | `oklch(0.19 0.03 265)` | Near-black deep navy for typography and primary UI boundaries |
| `--ghost-text` | `oklch(0.96 0.004 260)` | Ultra-light atmospheric wordmark tint |
| `--radius` | `0.25rem` | Standard 4px subtle rounded corner radius |

---

## 3. Character Theme Specifications

### 🕷️ Spider-Man (`[data-hero="spiderman"]`)
- **Primary / Accent Color**: Marvel Crimson Red — `oklch(0.55 0.23 27.5)`
- **Atmosphere**: Energetic, high-octane street level heroics, urban dynamic contrast.
- **Typography Tone**: Bold, loud, athletic uppercase typography with high contrast tracking.
- **Visual Motif**: Diagonal wedged geometry mimicking city skyscrapers and dynamic web swinging vectors.
- **Future Universe Extension**: Web cursor particle trail, building skyline parallax layers, web-slinging transition effects.

### 🛡️ Captain America (`[data-hero="captain"]`)
- **Primary / Accent Color**: Tactical Sentinel Navy — `oklch(0.27 0.055 265)`
- **Atmosphere**: Military briefing tactical grid, patriotic shield sentinel aesthetic, grounded honor.
- **Typography Tone**: Sturdy, commanding, structured black-weight headlines.
- **Visual Motif**: Heavy diagonal tactical slab geometry with dark atmospheric scene backdrops.
- **Future Universe Extension**: Shield ricochet impact transitions, classified file folder UI overlays, military briefing HUD grid lines.

### 🐾 Black Panther (`[data-hero="panther"]`)
- **Primary / Accent Color**: Wakandan Vibranium Purple — `oklch(0.48 0.22 300)`
- **Atmosphere**: Royal, technologically advanced, purple Vibranium energy pulses, sacred Wakandan heritage.
- **Typography Tone**: Regal, sharp, high-tech royal typography.
- **Visual Motif**: Sleek Vibranium energy wedges and dark atmospheric jungle/lab scene contrast.
- **Future Universe Extension**: Purple kinetic energy pulse waves on interaction, Wakandan holographic glyph overlays, Vibranium particle effects.

---

## 4. 3D Spatial Hierarchy & Depth Layers

| Layer | Depth `z` | Component | Styling / Geometry | Motion / Animation |
| :---: | :---: | :--- | :--- | :--- |
| 1 | `z=0.20` | Ghost Wordmark | `text-[22vw]`, font weight 900, `--ghost-text` | Parallax scale `tx = -x * 1.6px`, `ty = -y * 1.0px` |
| 2 | `z=0.35` | Wedge Solid Panel | `inset-y-[-10%] right-[-6%] w-[34%]`, `clip-path: polygon(38% 0, 100% 0, 100% 100%, 8% 100%)` | `hero-enter` keyframe animation (800ms) |
| 3 | `z=0.60` | Backdrop Photo Slab | `inset-y-[-6%] right-[6%] w-[62%]`, `clip-path: polygon(22% 0, 100% 0, 78% 100%, 0 100%)`, dark overlay `bg-black/45` + gradient | Parallax shift, scale-110 object-cover |
| 4 | `z=1.15` | Character Cutout | Foreground cutout, `right-[8%] w-[54%] bottom-0 h-[88%]`, drop-shadow `0 40px 60px rgba(0,0,0,0.45)` | Maximum 3D tilt & translation (`tx = -x * 9.2px`), `hero-enter` animation |
| 5 | `z=0.45` | Left Content Column | `max-w-[46%] p-[4vw]`, MARVEL header, breadcrumbs, `text-[5vw]` title, description, social icons | `text-enter` 24px rise animation (650ms) |
| 6 | `z=0.90` | Skew Navigation Buttons | `bottom-[6vh]`, `h-16 w-32`, `clip-path: polygon(14% 0, 100% 0, 86% 100%, 0 100%)` | Skew-tile parallelogram, hover nudge ±1 unit |
| 7 | Fixed | Right Rail | 4 vertical stacked 3px dashes at `right-[3%]`, active `w-10 opacity-100`, inactive `w-6 opacity-45` | Smooth 500ms width & opacity transition |

---

## 5. Micro-Interactions & Animation Specs

- **Theme Transition**: 700ms smooth cubic-bezier (`cubic-bezier(0.22, 1, 0.36, 1)`) transition across color tokens.
- **Hero Entrance Animation (`.animate-hero-enter`)**:
  - Duration: 800ms
  - Easing: `cubic-bezier(0.22, 1, 0.36, 1)`
  - Transform sequence: `translate3d(60px, 20px, -120px) rotateY(-8deg)` $\rightarrow$ `translate3d(0, 0, 0) rotateY(0deg)`.
- **Text Entrance Animation (`.animate-text-enter`)**:
  - Duration: 650ms
  - Easing: `cubic-bezier(0.22, 1, 0.36, 1)`
  - Transform sequence: `translateY(24px)` fade-in.
- **Navigation Controls**:
  - Left Button: `hover:-translate-x-1`
  - Right Button: `hover:translate-x-1`
  - Social Links: `hover:opacity-60 transition-opacity`
