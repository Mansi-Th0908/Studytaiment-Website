# Studytainment — React Application

A production-quality React + Vite + TypeScript build of the Studytainment editorial landing
experience, converted from the original `design.html` with its warm Material-3-inspired
palette, Plus Jakarta Sans / Inter typography, Three.js hero scene and kinetic animations
preserved in full.

## Stack

- **React 19 + TypeScript + Vite** — strict typing end to end, no `any`, no unsafe casts.
- **Tailwind CSS v4** (`@tailwindcss/vite`) — the original design system lives in
  `src/styles/tokens.css` as theme tokens (colors, spacing scale, typography, keyframes),
  generating the exact utility names used across the site.
- **Framer Motion** — DOM animations (section reveals, hero entrance, tab/carousel/modal
  transitions), reduced-motion aware.
- **Three.js** — the interactive "Floating Learning Sculpture & Particle Nebula" hero scene,
  lifecycle-managed in `src/components/animations/ThreeScene.tsx` with full resource
  disposal, rAF cancellation, visibility pausing, DPR limiting, mobile particle reduction,
  WebGL failure fallback and reduced-motion support. Includes working **Wireframe**
  (toggles real material wireframe state) and **Reset Pivot** (smooth pointer-orientation
  reset) controls.

## Commands

```bash
npm install     # install dependencies
npm run dev     # start the dev server
npm run build   # typecheck (tsc -b) + production build
npm run preview # preview the production build
npm run lint    # eslint
npm run typecheck
```

Optional deeper verification (uses the locally installed Chrome):

```bash
npm i --no-save puppeteer-core   # test-only driver, kept out of package.json
node scripts/verify-interactions.mjs
```

## Structure

```
scripts/verify-interactions.mjs  scripted browser checks (test-only)
src/
  app/App.tsx               page composition
  components/
    animations/             ThreeScene, FloatingCursor, TiltCard, AnimatedSection
    cards/                  LearningModeCard, TestimonialCard
    common/                 Button(+ButtonLink), Container, SectionHeading, MaterialIcon
    layout/                 Header, MobileNavigation, Footer
    modals/                 ArtifactModal (accessible dialog w/ focus management)
  data/                     learningStages, learningModes, testimonials, navigation
  hooks/                    useReducedMotion, useMediaQuery, useActiveSection, useAmbientSound
  sections/                 Hero, Marquee, LearningModes, Continuum, Impact, Testimonials, FinalCta
  styles/                   tokens.css (Tailwind v4 theme), global.css, animations.css
  types/                    shared domain types
  utils/                    cn, subscribe (isolated, backend-ready)
```

## Deliberate non-fabrications

There is no enrollment / mailing backend in this build, so related controls respond with
honest, clearly scoped local behavior instead of faking success:

- **Subscribe** (footer) — validates the address; a valid submit reports that the mailing
  backend is not connected yet and no address was stored. Wire a real API inside
  `src/utils/subscribe.ts` — no caller changes needed.
- **Start Free Journey** (final CTA) — reveals an honest status message; no fake auth or
  payment flow.
- **Launch Full 3D Sandbox** (artifact modal) — set the `SANDBOX_URL` constant in
  `ArtifactModal.tsx` to a real destination; with none configured it focuses the site's own
  interactive 3D hero scene.
- The header **Focus Sound** toggle is a real Web Audio ambience (generated noise pad).
