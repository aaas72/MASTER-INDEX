# THE HUB — Master Index

An interactive algorithm reference and simulation lab. Browse algorithms by category, read their formal analysis, step through animated executions in a playground, and compare two algorithms head to head.

**Live demo:** [aaas72.github.io/MASTER-INDEX](https://aaas72.github.io/MASTER-INDEX/)

![Next.js](https://img.shields.io/badge/Next.js_14-000000?style=flat-square&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=flat-square&logo=framer&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-3E67B1?style=flat-square&logo=zod&logoColor=white)
![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-222222?style=flat-square&logo=githubpages&logoColor=white)

## Features

- **Algorithm catalog** — searchable gallery and table views, filtered by category (sorting, searching, graphs, dynamic programming, data structures)
- **Detail pages** — complexity analysis and formal notation rendered with KaTeX
- **Playground** — step-by-step execution with play/pause controls, a history slider, a live console and the code being executed
- **Visualizers** — bars, arrays, graphs, trees, matrices, linked lists and geometry on an infinite canvas
- **Versus mode** — compare two algorithms side by side on a performance radar
- **Dashboard** — manage the algorithm dataset (JSON) with schema validation
- **PDF export** — download an algorithm sheet or a versus comparison as a PDF

## Architecture

The simulation engine is centralized and modular: a dispatcher routes each algorithm to a category simulator, which records the run as a sequence of state snapshots that every visualizer — and the history slider — can replay.

```text
data/algorithms.json ──▶ lib/schemas (Zod validation)
                              │
                              ▼
                     lib/engine/simulator.ts   ← dispatcher
                              │
        ┌──────────┬──────────┼──────────┬─────────────┐
     sorting   searching    graph       dp       structures   (lib/engine/simulators)
        └──────────┴──────────┼──────────┴─────────────┘
                              ▼
                  snapshots ─▶ components/visualizer/*  ─▶ playground · detail · versus
```

```text
app/            # Routes: algorithms, categories, playground, versus, archive, dashboard, documentation
components/     # algorithms · playground · visualizer · versus · dashboard · shared
lib/engine/     # Simulation engine, simulators and validator
lib/schemas/    # Zod schemas for algorithm data
locales/en/     # UI strings
utils/          # Benchmark engine, PDF export, simulation defaults
```

Engine rules and the visual design system are documented in [SIMULATION_ENGINE_RULES.txt](SIMULATION_ENGINE_RULES.txt) and [design-guidelines.md](design-guidelines.md).

## Getting Started

**Requirements:** Node.js 20+

```bash
npm install
npm run dev          # http://localhost:3000/MASTER-INDEX
```

Production build (static export to `out/`):

```bash
npm run build
```

## Deployment

Every push to `main` builds the site as a static export and publishes it to GitHub Pages through [GitHub Actions](.github/workflows/deploy.yml). A self-hosted setup with Nginx and PM2 is described in [SERVER_SETUP.md](SERVER_SETUP.md).

## Related

- [MASTER-INDEX-REP](https://github.com/aaas72/MASTER-INDEX-REP) — the reference implementations of the algorithms in TypeScript, Python and C++

## Author

**Abdellah Sheikh** — [abdellahsheikh.dev](https://abdellahsheikh.dev) · [LinkedIn](https://www.linkedin.com/in/abdellahsheikh)
