# 🦸‍♂️ Marvel Superhero Showcase — 3D Parallax Landing Page

A single-page, full-viewport, 7-layer 3D character showcase landing page built with **TanStack Start**, **React**, **Tailwind CSS v4**, and **OKLCH Color Tokens**.

Featuring real-time 3D cursor parallax depth tracking, custom geometric wedge clip-paths, atmospheric dark overlays, smooth 700ms theme transitions, keyboard controls, and asset pointer JSON architecture.

---

## ⚡ Tech Stack

- **Framework**: TanStack Start + React 18
- **Styling & CSS Engine**: Tailwind CSS v4 (`@import "tailwindcss";`)
- **Color Space**: OKLCH Wide-Gamut Tokens (`[data-hero="..."]`)
- **Icons**: Lucide React
- **Typography**: Google Font **Outfit** (Weights 300–900)
- **Build System**: Vite 6 + TypeScript

---

## ✨ Features

- **7-Layer 3D Depth Composition**: Real-time cursor movement tracking calculating 3D perspective translations and rotations (`translate3d` + `rotateX`/`rotateY`).
- **Dynamic Character Theme Shifts**: Smooth 700ms color transitions across 3 Marvel universes:
  - 🕷️ **Spider-Man**: Marvel Crimson Red (`oklch(0.55 0.23 27.5)`)
  - 🛡️ **Captain America**: Sentinel Navy (`oklch(0.27 0.055 265)`)
  - 🐾 **Black Panther**: Wakandan Vibranium Purple (`oklch(0.48 0.22 300)`)
- **Geometric Wedges & Parallelograms**:
  - `wedge-panel`: Right-pinned solid accent slab (`polygon(38% 0, 100% 0, 100% 100%, 8% 100%)`)
  - `wedge-photo`: Backdrop scene photo slab (`polygon(22% 0, 100% 0, 78% 100%, 0 100%)`)
  - `skew-tile`: Parallelogram navigation arrow buttons (`polygon(14% 0, 100% 0, 86% 100%, 0 100%)`)
- **Atmospheric Overlays**: Dark blend overlay (`bg-black/45 mix-blend-multiply`) and gradient backdrop tint for optimal character cutout contrast.
- **Asset Pointer Architecture**: `src/assets/*.asset.json` pointer modules separating binary assets from codebase definitions.
- **Keyboard Navigation**: Global `ArrowLeft` / `ArrowRight` listener with seamless wrapping.
- **SEO & Meta**: Configured head tags, OpenGraph social properties, and Twitter cards.

---

## 📁 Repository Structure

```text
.
├── public/
│   └── images/             # Static character cutout & backdrop image binaries
├── src/
│   ├── assets/             # Asset JSON pointers (*.asset.json)
│   ├── routes/             # TanStack Start / Router routes (__root.tsx, index.tsx)
│   ├── App.tsx             # 3D Stage & Character Showcase component
│   ├── main.tsx            # Entry point
│   ├── styles.css          # Tailwind v4 imports, OKLCH variables, custom utilities
│   └── vite-env.d.ts       # Module declarations
├── index.html              # HTML shell & Google Font links
├── package.json            # Project dependencies & scripts
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite build & dev server config
├── design.md               # Character design theme specifications
├── ui_rules.md             # Frontend & UI architecture rules
└── README.md               # Project documentation & patch notes
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js `^18.0.0` or `^20.0.0` or higher
- npm `^9.0.0` or higher

### Running Locally

1. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000/` in your browser.

3. Build for production:
   ```bash
   npm run build
   ```

### Deploying to Vercel / CI
The repository includes pre-configured `.npmrc`, `vercel.json`, and `package.json` overrides to handle peer dependency resolutions automatically during Vercel builds.

Simply connect your Git repository to Vercel with:
- **Framework Preset**: Vite
- **Root Directory**: `codebase` (or project root if deploying codebase directory directly)
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

---

## 📝 Patch Notes

### 📦 `v0.2` — Loading Screen & Image Preloading (Current Version)
- **Interactive Themed Loading Screen**:
  - Preloads all high-definition character cutouts and background images (`Image()` promise cache).
  - Displays a dynamic `0%` to `100%` progress bar with smooth timing ticks.
- **Diagonal Shutter Reveal Animation**:
  - Custom dual diagonal shutter panels (`clip-path: polygon(0 0, 58% 0, 42% 100%, 0 100%)` and `polygon(58% 0, 100% 0, 100% 100%, 42% 100%)`).
  - Dual-toned MARVEL logo gradient matching theme colors (`linear-gradient(90deg, #ffffff 52%, #111520 52%)`).
  - Skew-tile "ENTER" button triggering a 900ms smooth cubic-bezier shutter exit (`cubic-bezier(0.85, 0, 0.15, 1)`).

### 📦 `v0.1` — Initial Release
- **Initial Showcase Architecture**:
  - Implemented 7-layer 3D spatial stage with real-time cursor parallax.
  - Added Spider-Man, Captain America, and Black Panther hero states.
- **Theme & Styling**:
  - Configured OKLCH theme tokens for Marvel Red, Sentinel Navy, and Wakandan Purple.
  - Added 700ms cubic-bezier transition for theme switching.
- **Visual Polish**:
  - Added dark atmospheric overlays (`bg-black/45 mix-blend-multiply` + gradient) over background photo slabs for crisp character cutout pop.
- **Architecture & Tooling**:
  - Configured asset pointer JSON architecture (`src/assets/*.asset.json`).
  - Added global keyboard shortcut navigation (`ArrowLeft` / `ArrowRight`).
  - Created standalone repository structure with `public/images/`.
  - Generated comprehensive design specifications ([design.md](file:///d:/Projects/superhero-dev/design.md)) and UI architecture rulebook ([ui_rules.md](file:///d:/Projects/superhero-dev/ui_rules.md)).
