# CRADLES — Mathematical & Physical Sciences

A luxury black-and-gold knowledge platform for mathematics and physics.

## Features

- **Two Modes** — Mathematics & Physics with animated transitions
- **Formula Renderer** — Type any LaTeX and render it live with MathJax
- **Formula Library** — Curated, categorised equations for both disciplines
- **Physical Constants** — Reference panel for fundamental constants (Physics mode)
- **PDF Analysis** — Upload PDFs: pages rendered visually, text extracted, LaTeX typeset automatically
- **Animated Background** — Particle constellation canvas with geometric grid
- **Floating Symbols** — Mode-specific Greek/mathematical symbols drift through the hero
- **Scroll Reveal** — Sections animate in as you scroll

## Stack

- Vanilla HTML / CSS / JavaScript (zero build step)
- [MathJax 3](https://www.mathjax.org/) — LaTeX rendering
- [PDF.js](https://mozilla.github.io/pdf.js/) — PDF rendering & text extraction
- [Google Fonts](https://fonts.google.com/) — Cinzel · Cormorant Garamond · Crimson Pro
- [Vercel](https://vercel.com/) — Static hosting

## Deploy to Vercel

### Option A — Vercel CLI
```bash
npm i -g vercel
vercel
```

### Option B — Vercel Dashboard
1. Push this folder to a GitHub repository
2. Go to [vercel.com](https://vercel.com) → New Project
3. Import your repo — Vercel auto-detects it as a static site
4. Click **Deploy** — done ✦

### Option C — Drag & Drop
1. Zip the four project files
2. Go to [vercel.com/new](https://vercel.com/new)
3. Drag the zip onto the dashboard

## Project Structure

```
cradles/
├── index.html     # Structure & layout
├── styles.css     # Full design system
├── script.js      # All interactivity & data
├── vercel.json    # Deployment config
└── README.md
```

## Keyboard Shortcut

Inside the Formula Renderer: **Ctrl + Enter** renders the current expression.

---

*Built with intention. In pursuit of the absolute.*
