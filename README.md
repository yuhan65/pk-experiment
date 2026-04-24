# Peako — iPhone 15 Web Prototype

A React + Tailwind + Framer Motion prototype of **Peako**, your snarky fitness frenemy. The app is rendered inside a pixel-accurate 393×852 iPhone 15 shell with a Dynamic Island and home indicator.

## Quick start

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually http://localhost:5173).

## What's inside

- `src/PeakoPrototype.js` — the single-file component you can drop into any React project.
- `src/App.jsx` — mounts `PeakoPrototype` centered on a dark page.
- Tailwind 3 + PostCSS preconfigured.
- Framer Motion for the slide-down feed animation and tap-bounce on action buttons.
- Lucide icons for status bar + feed actions.

## The "Peako brain"

`PEAKO_SCRIPTS` inside `PeakoPrototype.js` maps each log type (`salad`, `pizza`, `gym`) to a snarky post. Extend it to add more behaviors.

## Scripts

- `npm run dev` — start Vite dev server
- `npm run build` — production build
- `npm run preview` — preview the production build
