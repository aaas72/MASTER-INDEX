# Design Guidelines and Visual Identity for (THE HUB)

This document serves as the primary reference for maintaining the visual identity, layout consistency, and overall "vibe" of the project when adding any new components or pages. These rules must be strictly followed to ensure the design remains within the current artistic and technical framework of the site.

---

## 1. General Concept & Vibe (The Vibe ✨)
- **Overall Style:** A clean, technical style (Neo-Formalist/Cyber-Librarian), inspired by data center interfaces and High-Performance Computing (HPC) systems.
- **Impression:** Serious, precise, professional, and well-documented. There are no playful or random elements; everything has a data or informational purpose.
- **Sharp & Flat Design:** All corners are perfectly sharp (`0px Border Radius`). Rounded corners are **never** used on containers, cards, or buttons.

---

## 2. Typography ✒️
The site relies on 3 primary font families from Google Fonts to distinguish information hierarchy:

1. **Headings:**
   - **Font:** `IBM Plex Sans` (via `font-sans`).
   - **Usage:** Major section titles, prominent hero headings, and the header.
   - **Weight & Style:** Bold (`font-bold` or `font-extrabold`), tight letter spacing (`tracking-tighter`), and frequently `uppercase`.

2. **Body Text & Descriptions:**
   - **Font:** `IBM Plex Serif` (via `font-body` or `font-serif`).
   - **Usage:** Paragraphs, descriptive explanations, and long-form text.
   - **Weight & Style:** Normal weight (`font-normal`), sometimes `italic` for secondary descriptions.

3. **Data, Labels, and Code:**
   - **Font:** `JetBrains Mono` (via `font-mono`).
   - **Usage:** Badges, table headers, action buttons, and precise data metrics (like Complexities).
   - **Weight & Style:** Proportionally very small (`text-[10px]` or `text-xs`), `uppercase`, with very wide letter spacing (`tracking-widest`).

---

## 3. Color Palette 🎨
The color theme is built on bright, clean backgrounds with high contrast using deep blues and dark shades:

- **Surfaces (Backgrounds):**
  - `bg-surface` (`#f7fafe`): The primary interface and background color (for the Body or Sidebar), giving a clean and comfortable brightness.
  - `bg-surface-container-lowest` (`#ffffff`): For the canvas (Cards, Hero section) to create depth without gradients.
  - `bg-surface-container-low` (`#f1f4f8`): For highlighting containers like table headers.
  
- **Text Colors (On Surface):**
  - Black or `text-on-surface` (`#181c1f`): For primary, high-contrast text and headings.
  - `text-slate-500` or `text-slate-400`/`slate-600`: For secondary, less important, or reference text.

- **Primary Colors (Accents & Highlights):**
  - Deep Blue / Core Blue (`#001e73` / `#002FA7` / `primary`): Used for buttons, highlights, and borders of some containers.

- **Status Colors:**
  - Shades of Green (Code Ready), Purple (Simulation), and Dark Blue for algorithmic data depending on its status.

---

## 4. Components & Elements 🧩

- **Cards:**
  - White backgrounds (`bg-surface-container-lowest`) with very thin outlines (`border border-outline-variant`).
  - Right-angle, sharp corners (`rounded-none`).
  - Shadow: A warm, light shadow to lift the element above the background (`shadow-custom` in Tailwind config, or `box-shadow: 0 20px 40px rgba(0, 30, 115, 0.06)`).

- **Buttons:**
  - *Primary:* Solid (`bg-primary-container`) with white text.
  - *Outline:* Transparent background with a `border-[#002FA7]` border.
  - Typography inside buttons must always be: `font-mono text-xs uppercase tracking-widest`.
  - Hover Effects: Slight opacity change or color inversion.

- **Tables:**
  - Table Headers (Thead): `font-mono text-[10px] uppercase tracking-widest text-slate-500`.
  - Row borders are very light to neatly organize data without visual clutter.

---

## 5. Icons & Iconography 💡
- We exclusively use the **Material Symbols Outlined** library.
- Icon sizes are generally standardized (`text-lg` or `text-sm`) depending on context.
- The icons must remain outlined (not filled) to support the minimalist, technical feel.

---

## 6. Spacing & Layout 📏
- We rely on generous, comfortable spacing (`py-12`, `py-24`, `py-32`) to give a sense of grandeur and an extensive archive.
- The maximum width for content containers is typically `max-w-[1280px]` to ensure comfortable readability, with side margins (`px-12`).

---

## 7. Animations & Visual Effects 🎬
- **No** bounce, spring, or bubbly effects.
- Motion is slow, technical, and data-driven:
  - Very soft pulses (`animate-node-pulse`).
  - Data tree path drawing (`animate-path-draw`).
  - Randomly shifting binary numbers (`0` and `1`) in data streams.

**Daily TL;DR for Editing:**
> **Never change the corner radii; keep every shape perfectly sharp (0px).**
> **Maintain the strict contrast of the 3 fonts (Sans for headings, Serif for body, Mono for buttons/data).**
> **The site represents an "archive board"—simplicity and sharpness are fundamental.**