# Company Website

This repository now hosts a pure frontend static website built with Vite + React and Tailwind CSS. All backend code, environments, and integrations have been removed.

## Tech Stack
- React 18
- Vite
- Tailwind CSS
- Jest (unit tests)
- Playwright (E2E tests)

## Project Structure
- `frontend/` — Main React application
  - `src/` — Components, pages, hooks, assets, and test setup
  - `public/` — Static assets
  - `dist/` — Production build output

## Getting Started
1. Install dependencies:
   - `cd frontend`
   - `npm ci`
2. Run the dev server:
   - `npm run dev`
   - App runs at `http://localhost:5173`

## Build
- `cd frontend`
- `npm run build` — Produces production assets in `frontend/dist`
- `npm run preview` — Preview the production build locally

## Testing
- `cd frontend`
- `npm run test` — Run unit tests (Jest)
- `npm run test:e2e` — Run E2E tests (Playwright)

## Deployment
This site is deployed on Netlify as a static SPA.

### Option A — Drag & Drop
- Build locally: `cd frontend && npm run build` (outputs to `frontend/dist`)
- Drag and drop the `frontend/dist` folder into the Netlify dashboard.

### Option B — Connect GitHub
- In Netlify, set:
  - Base directory: `frontend`
  - Build command: `npm run build`
  - Publish directory: `dist`
- A basic Netlify configuration is included at `frontend/netlify.toml` with an SPA redirect.

### Notes
- No backend, databases, or server-side APIs are present.
- The site works as a pure static build.

## Notes
- All API helpers were removed (`frontend/src/api` deleted) and pages use local-only interactions.
- Image optimizer scripts remain under `scripts/` for frontend asset processing.

## License
Proprietary — internal use only.