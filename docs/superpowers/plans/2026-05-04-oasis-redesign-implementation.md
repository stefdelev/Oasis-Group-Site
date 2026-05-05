# Oasis Group Editorial Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Oasis Group site's current dark/teal UI with the editorial navy + cream + gold design, faithful to the design package in `Oasis Group Site.zip` and the spec at `docs/superpowers/specs/2026-05-04-oasis-redesign-design.md`.

**Architecture:** Single-page React 19 + TypeScript + Vite + Tailwind v4 site. Theme tokens live in `src/index.css` `@theme`. Components in `src/components/*.tsx` are full rewrites that consume both Tailwind utilities and section-scoped CSS classes (ported from `prototype/styles.css`) for things Tailwind can't express cleanly (CSS-drawn brackets, marquee/float/pulse keyframes, accordion `max-height` transition, custom focus rings).

**Tech Stack:** React 19, TypeScript (strict, `noUnusedLocals`, `noUnusedParameters`), Tailwind CSS v4 (`@theme` in CSS, no `tailwind.config.js`), Vite 7, Netlify Forms (existing wiring preserved). No test framework is installed; verification is `npm run build` + `npm run lint` + manual browser walkthrough against `design_handoff_oasis_redesign/screenshots/01..07`.

**Spec reference:** `docs/superpowers/specs/2026-05-04-oasis-redesign-design.md` (commit `bd51f5f`).

**Source design assets** (already extracted to `/tmp/oasis_redesign/design_handoff_oasis_redesign/`; if missing, re-extract via `python3 -c "import zipfile; zipfile.ZipFile('Oasis Group Site.zip').extractall('/tmp/oasis_redesign')"`):

- `prototype/styles.css` — design CSS reference; we port most of it.
- `prototype/components/header.jsx` — Navigation + Hero source.
- `prototype/components/sections-1.jsx` — About + Practice source (verbatim copy).
- `prototype/components/sections-2.jsx` — Work + Press source.
- `prototype/components/sections-3.jsx` — Contact + Footer source.
- `prototype/components/shared.jsx` — BracketWordmark, Reveal, GlobeArt source.
- `prototype/assets/artisand-screen2.png`, `prototype/assets/oasis-onchain-event.jpeg` — image assets.
- `screenshots/01-hero.png` … `07-footer.png` — desktop reference renders.

---

## Task 0: Cut feature branch

**Files:** none (git operation only)

- [ ] **Step 1: Create and switch to the feature branch**

```bash
git checkout -b redesign/editorial
```

Expected: `Switched to a new branch 'redesign/editorial'`

- [ ] **Step 2: Confirm clean working tree (other than the long-lived untracked design assets)**

```bash
git status --short
```

Expected: only `??` lines for `Oasis Group Site.zip`, `Screenshot 2026-02-05 191049.jpg`, `testerror.jpg`, and `*:Zone.Identifier` cruft. No `M` (modified) lines.

---

## Task 1: Theme swap (palette + fonts + index.html)

**Files:**
- Replace: `src/index.css`
- Modify: `index.html`

This task replaces the old `oasisDeep`/`electric-teal` palette with the navy/cream/ink/gold tokens, and points the favicon + og:image at the existing logo bitmap. The `@layer components` helpers (which `@apply` removed tokens) are deleted in the same edit so the build stays green. Components that still reference old class names will simply render unstyled until later tasks rewrite them — that's expected.

- [ ] **Step 1: Replace `src/index.css` entirely with the new theme block**

Write `src/index.css`:

```css
@import "tailwindcss";

@theme {
  /* Navy scale (primary surface) */
  --color-navy-900: #0A1B33;
  --color-navy-800: #0F2542;
  --color-navy-700: #1A3252;
  --color-navy-600: #25406A;

  /* Cream scale (light surface) */
  --color-cream-50:  #F7F3E8;
  --color-cream-100: #F1ECDD;
  --color-cream-200: #E8E1CE;
  --color-cream-300: #D4CCB4;

  /* Ink scale (text on light) */
  --color-ink-900: #0A1B33;
  --color-ink-700: #2B3A52;
  --color-ink-500: #5B6377;
  --color-ink-400: #7A8094;

  /* Gold accent (primary) */
  --color-gold-500: #C9A961;
  --color-gold-400: #D9BC78;
  --color-gold-300: #E4CC95;

  /* Secondary teal (light decoration only) */
  --color-teal-500: #5B8B95;
  --color-teal-400: #7BA8B0;

  /* Coral (form validation only) */
  --color-coral-500: #D9764A;

  /* Border helper for dark sections */
  --color-navy-line: rgba(255, 255, 255, 0.08);

  /* Fonts */
  --font-serif: 'Fraunces', 'Times New Roman', Georgia, serif;
  --font-sans:  'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-mono:  'JetBrains Mono', ui-monospace, 'SFMono-Regular', Menlo, monospace;
}

/* Plain CSS aliases for the gold accent — used widely in section-scoped rules.
   Defined outside @theme so they don't generate utility classes. */
:root {
  --accent: var(--color-gold-500);
  --accent-soft: var(--color-gold-300);
}

@layer base {
  *, *::before, *::after { box-sizing: border-box; }

  html {
    scroll-behavior: smooth;
  }

  body {
    margin: 0;
    background: var(--color-cream-50);
    color: var(--color-ink-900);
    font-family: var(--font-sans);
    -webkit-font-smoothing: antialiased;
    font-feature-settings: 'ss01', 'cv11';
  }

  img { max-width: 100%; display: block; }

  a { color: inherit; text-decoration: none; }

  button {
    font: inherit;
    cursor: pointer;
    border: none;
    background: none;
    color: inherit;
  }

  ::selection {
    background: var(--color-gold-500);
    color: var(--color-navy-900);
  }
}
```

(Section-scoped CSS — nav, hero, about, practice, work, press, contact, footer, marquee/float/pulse keyframes, Reveal — is added in Task 2.)

- [ ] **Step 2: Modify `index.html` to swap fonts and add favicon + og:image**

Read `index.html` (currently 26 lines) and replace its full content with:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/png" href="/images/oasis-logo.png" />
    <link rel="apple-touch-icon" href="/images/oasis-logo.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="The Oasis Group - A boutique advisory and venture studio building the digital frontier from the Caribbean to the Global South." />
    <meta property="og:title" content="The Oasis Group | Bringing Frontier Tech Home" />
    <meta property="og:description" content="Boutique advisory and venture studio building the digital frontier — from the Caribbean to the Global South." />
    <meta property="og:image" content="/images/oasis-logo.png" />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content="/images/oasis-logo.png" />
    <title>The Oasis Group | Bringing Frontier Tech Home</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,350;0,9..144,400;0,9..144,500;1,9..144,300;1,9..144,400&family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
  </head>
  <body>
    <!-- Hidden form for Netlify to detect at build time -->
    <form name="contact" netlify netlify-honeypot="bot-field" hidden>
      <input type="text" name="name" />
      <input type="text" name="organization" />
      <input type="email" name="email" />
      <textarea name="message"></textarea>
    </form>

    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 3: Run TypeScript build to confirm no compile errors**

```bash
npm run build
```

Expected: build succeeds. (Components will render unstyled because they reference removed Tailwind classes — that's fine; later tasks rewrite them. The CSS edit removed the `@layer components` block that previously `@apply`-ed `bg-oasisDeep` etc., so there are no remaining `@apply` references to dropped tokens.)

If you see "Cannot apply unknown utility class" — it means an `@apply` directive somewhere still references an old token. Run `grep -nE "@apply.*(oasisDeep|oasisAction|oasisSunset|oasisLight|obsidian|electric-teal|cantaloupe|cool-white|slate-dark|slate-card)" src/` and remove those lines (they're only in `src/index.css`, which Step 1 already replaced — but double-check).

- [ ] **Step 4: Commit**

```bash
git add src/index.css index.html
git commit -m "feat(redesign): swap theme tokens to navy/cream/gold + new font stack"
```

---

## Task 2: Section-scoped CSS (port prototype styles.css)

**Files:**
- Modify: `src/index.css` (append after the existing content)

This task ports the rest of `prototype/styles.css` into our `src/index.css`. Most of the prototype's class system (`.shell`, `.section`, `.nav`, `.hero`, `.about-grid`, `.practice-row`, `.work-card`, etc.) gets carried over because the design relies on CSS that Tailwind utilities can't express cleanly: `clamp()` font sizes, `cubic-bezier` easings, custom keyframes, `::before`/`::after` decorations, `backdrop-filter`, layered radial gradients, and the accordion `max-height` transition.

**Variable rename rules** while porting (most done for you — copy the block below verbatim):
- `var(--navy-XXX)` → `var(--color-navy-XXX)`
- `var(--cream-XXX)` → `var(--color-cream-XXX)`
- `var(--ink-XXX)` → `var(--color-ink-XXX)`
- `var(--gold-XXX)` → `var(--color-gold-XXX)`
- `var(--teal-XXX)` → `var(--color-teal-XXX)`
- `var(--coral-XXX)` → `var(--color-coral-XXX)`
- `var(--navy-line)` → `var(--color-navy-line)`
- `var(--serif)` → `var(--font-serif)`
- `var(--sans)` → `var(--font-sans)`
- `var(--mono)` → `var(--font-mono)`
- `var(--accent)` and `var(--accent-soft)` — kept as-is (defined in Task 1's `:root`).

The original `:root` block from prototype, the `* { box-sizing }`, `body`, `a`, `button`, `::selection` rules, and the `[data-accent]` theme variant block are **dropped** — they're replaced by Task 1's `@theme` and `@layer base`.

- [ ] **Step 1: Append the section-scoped CSS to `src/index.css`**

Append everything below to the end of `src/index.css` (after the `@layer base` block from Task 1):

```css
/* ============================================================
   Layout primitives
   ============================================================ */
.shell {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 32px;
}
.shell-narrow { max-width: 1080px; }

@media (max-width: 720px) {
  .shell { padding: 0 20px; }
}

/* ============================================================
   Navigation
   ============================================================ */
.nav {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 50;
  padding: 18px 0;
  transition: background 320ms ease, padding 320ms ease, border-color 320ms ease;
  border-bottom: 1px solid transparent;
}
.nav.scrolled {
  background: rgba(10, 27, 51, 0.92);
  backdrop-filter: blur(14px) saturate(140%);
  -webkit-backdrop-filter: blur(14px) saturate(140%);
  padding: 12px 0;
  border-bottom-color: var(--color-navy-line);
}
.nav-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}
.nav-mark {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #fff;
  font-family: var(--font-sans);
  font-weight: 700;
  font-size: 15px;
  letter-spacing: 0.02em;
}
.nav-links {
  display: flex;
  align-items: center;
  gap: 36px;
}
.nav-link {
  position: relative;
  color: rgba(255,255,255,0.78);
  font-size: 13.5px;
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 6px 0;
  transition: color 220ms ease;
}
.nav-link::after {
  content: '';
  position: absolute;
  left: 0; right: 100%;
  bottom: 0;
  height: 1px;
  background: var(--accent);
  transition: right 320ms cubic-bezier(.4,0,.2,1);
}
.nav-link:hover { color: #fff; }
.nav-link:hover::after,
.nav-link.active::after { right: 0; }
.nav-link.active { color: #fff; }
.nav-cta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: 1px solid var(--accent);
  color: #fff;
  padding: 9px 16px;
  font-size: 12.5px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  transition: background 240ms ease, color 240ms ease;
}
.nav-cta:hover {
  background: var(--accent);
  color: var(--color-navy-900);
}
.nav-burger { display: none; color: #fff; padding: 8px; }
@media (max-width: 880px) {
  .nav-links { display: none; }
  .nav-burger { display: inline-flex; }
  .nav-mobile {
    display: none;
    flex-direction: column;
    gap: 0;
    border-top: 1px solid var(--color-navy-line);
    margin-top: 12px;
  }
  .nav-mobile.open { display: flex; background: var(--color-navy-900); }
  .nav-mobile a {
    padding: 16px 0;
    color: #fff;
    border-bottom: 1px solid var(--color-navy-line);
    font-size: 14px;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }
}

/* ============================================================
   Bracket wordmark
   ============================================================ */
.bracket-wordmark {
  display: inline-flex;
  align-items: center;
  gap: 10px;
}
.bracket-wordmark .bracket {
  display: inline-block;
  width: 8px;
  border-top: 1.5px solid currentColor;
  border-bottom: 1.5px solid currentColor;
}
.bracket-wordmark .bracket.left  { border-left: 1.5px solid currentColor; }
.bracket-wordmark .bracket.right { border-right: 1.5px solid currentColor; }
.bracket-wordmark .text {
  font-family: var(--font-sans);
  font-weight: 400;
  letter-spacing: 0.04em;
  white-space: nowrap;
}
.bracket-wordmark .text strong {
  font-weight: 800;
  letter-spacing: 0.02em;
}

/* ============================================================
   Hero
   ============================================================ */
.hero {
  position: relative;
  background: var(--color-navy-900);
  color: #fff;
  min-height: 100vh;
  padding: 140px 0 80px;
  overflow: hidden;
  isolation: isolate;
}
.hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    radial-gradient(60% 60% at 80% 20%, rgba(201, 169, 97, 0.10), transparent 60%),
    radial-gradient(50% 50% at 10% 90%, rgba(91, 139, 149, 0.10), transparent 70%);
  z-index: 0;
}
.hero-grid {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 64px;
  align-items: center;
  padding-top: 20px;
}
@media (max-width: 980px) {
  .hero-grid { grid-template-columns: 1fr; gap: 48px; }
}
.hero-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 32px;
}
.hero-eyebrow::before {
  content: '';
  width: 28px; height: 1px;
  background: var(--accent);
}
.hero-title {
  font-family: var(--font-serif);
  font-weight: 350;
  font-size: clamp(48px, 7vw, 96px);
  line-height: 0.96;
  letter-spacing: -0.02em;
  margin: 0 0 28px;
  color: #fff;
}
.hero-title em {
  font-style: italic;
  font-weight: 350;
  color: var(--accent-soft);
}
.hero-sub {
  font-size: 18px;
  line-height: 1.6;
  color: rgba(255,255,255,0.72);
  max-width: 520px;
  margin: 0 0 40px;
}
.hero-actions {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 56px;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 14px 24px;
  font-size: 13.5px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  transition: all 280ms cubic-bezier(.4,0,.2,1);
  border: 1px solid transparent;
}
.btn-primary {
  background: var(--accent);
  color: var(--color-navy-900);
}
.btn-primary:hover {
  background: var(--accent-soft);
  transform: translateY(-1px);
  box-shadow: 0 14px 28px -12px rgba(201,169,97,0.5);
}
.btn-ghost {
  border-color: rgba(255,255,255,0.25);
  color: #fff;
}
.btn-ghost:hover {
  border-color: #fff;
  background: rgba(255,255,255,0.06);
}
.btn-dark {
  background: var(--color-navy-900);
  color: #fff;
}
.btn-dark:hover {
  background: var(--color-navy-800);
  transform: translateY(-1px);
}
.btn .arrow {
  display: inline-block;
  transition: transform 280ms ease;
}
.btn:hover .arrow { transform: translateX(4px); }

.hero-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  border-top: 1px solid var(--color-navy-line);
  padding-top: 32px;
  max-width: 560px;
}
.hero-stat .num {
  font-family: var(--font-serif);
  font-weight: 350;
  font-size: 32px;
  letter-spacing: -0.02em;
  color: var(--accent);
  line-height: 1;
  margin-bottom: 6px;
}
.hero-stat .lbl {
  font-size: 11.5px;
  font-family: var(--font-mono);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.55);
  line-height: 1.4;
}

.hero-art {
  position: relative;
  aspect-ratio: 1;
  width: 100%;
  max-width: 480px;
  margin-left: auto;
}
.hero-art-frame {
  position: absolute;
  inset: 0;
  border: 1px solid rgba(255,255,255,0.10);
}
.hero-art-svg {
  position: absolute;
  inset: 0;
  width: 100%; height: 100%;
}
.hero-art-bracket {
  position: absolute;
  width: 28px; height: 28px;
  border: 2px solid var(--accent);
}
.hero-art-bracket.tl { top: -2px; left: -2px; border-right: none; border-bottom: none; }
.hero-art-bracket.tr { top: -2px; right: -2px; border-left: none; border-bottom: none; }
.hero-art-bracket.bl { bottom: -2px; left: -2px; border-right: none; border-top: none; }
.hero-art-bracket.br { bottom: -2px; right: -2px; border-left: none; border-top: none; }
.hero-art-meta {
  position: absolute;
  inset: 16px 16px auto auto;
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.4);
  text-align: right;
}
.hero-art-meta strong {
  display: block;
  color: var(--accent);
  font-weight: 600;
  margin-top: 4px;
}

.hero-marquee {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  border-top: 1px solid var(--color-navy-line);
  background: rgba(10, 27, 51, 0.6);
  padding: 18px 0;
  overflow: hidden;
  z-index: 2;
}
.marquee-track {
  display: flex;
  gap: 56px;
  animation: marquee 40s linear infinite;
  white-space: nowrap;
  width: max-content;
}
.marquee-item {
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.55);
  display: inline-flex;
  align-items: center;
  gap: 18px;
}
.marquee-item::after {
  content: '';
  width: 6px; height: 6px;
  background: var(--accent);
  border-radius: 50%;
}

/* ============================================================
   Section header pattern
   ============================================================ */
.section {
  padding: 120px 0;
  position: relative;
}
.section-light { background: var(--color-cream-50); color: var(--color-ink-900); }
.section-dark  { background: var(--color-navy-900); color: #fff; }
.section-cream { background: var(--color-cream-100); color: var(--color-ink-900); }

.section-head {
  display: grid;
  grid-template-columns: 0.8fr 1.2fr;
  gap: 64px;
  align-items: end;
  margin-bottom: 64px;
}
@media (max-width: 880px) {
  .section-head { grid-template-columns: 1fr; gap: 24px; }
  .section { padding: 80px 0; }
}
.section-tag {
  font-family: var(--font-mono);
  font-size: 11.5px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--accent);
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 18px;
}
.section-tag::before {
  content: '';
  width: 28px; height: 1px;
  background: var(--accent);
}
.section-title {
  font-family: var(--font-serif);
  font-weight: 350;
  font-size: clamp(36px, 5vw, 64px);
  line-height: 1.02;
  letter-spacing: -0.02em;
  margin: 0;
}
.section-title em { font-style: italic; color: var(--accent); font-weight: 350; }
.section-dark .section-title em { color: var(--accent); }
.section-lead {
  font-size: 17px;
  line-height: 1.6;
  color: var(--color-ink-500);
  max-width: 540px;
  margin: 0;
  align-self: end;
}
.section-dark .section-lead { color: rgba(255,255,255,0.66); }

/* ============================================================
   About
   ============================================================ */
.about-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: start;
}
@media (max-width: 880px) {
  .about-grid { grid-template-columns: 1fr; gap: 40px; }
}
.about-copy p {
  font-size: 17px;
  line-height: 1.7;
  margin: 0 0 18px;
  color: var(--color-ink-700);
}
.about-copy strong { color: var(--color-ink-900); font-weight: 600; }

.about-side {
  background: var(--color-navy-900);
  color: #fff;
  padding: 48px 40px;
  position: relative;
}
.about-side::before {
  content: '';
  position: absolute;
  top: 0; left: 0;
  width: 32px; height: 32px;
  border-top: 2px solid var(--accent);
  border-left: 2px solid var(--accent);
}
.about-side::after {
  content: '';
  position: absolute;
  bottom: 0; right: 0;
  width: 32px; height: 32px;
  border-bottom: 2px solid var(--accent);
  border-right: 2px solid var(--accent);
}
.about-side .pull {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 26px;
  line-height: 1.35;
  letter-spacing: -0.01em;
  color: #fff;
  margin: 12px 0 24px;
  font-weight: 300;
}
.about-side .pull-tag {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--accent);
}
.about-side hr {
  border: 0;
  border-top: 1px solid var(--color-navy-line);
  margin: 28px 0 22px;
}
.about-side .signoff {
  font-size: 13px;
  color: rgba(255,255,255,0.66);
  line-height: 1.5;
}
.about-side .signoff strong { color: #fff; font-weight: 600; }

/* ============================================================
   Practice (accordion)
   ============================================================ */
.practice-list {
  display: flex;
  flex-direction: column;
  border-top: 1px solid rgba(255,255,255,0.10);
}
.practice-row {
  display: grid;
  grid-template-columns: 80px 1.5fr 2fr 1fr;
  gap: 32px;
  padding: 36px 0;
  border-bottom: 1px solid rgba(255,255,255,0.10);
  align-items: start;
  cursor: pointer;
  position: relative;
  transition: padding 320ms cubic-bezier(.4,0,.2,1);
  background: transparent;
  text-align: left;
  width: 100%;
  color: inherit;
  font: inherit;
}
.practice-row::before {
  content: '';
  position: absolute;
  top: 0; left: 0;
  width: 0;
  height: 100%;
  background: linear-gradient(90deg, rgba(201,169,97,0.06), transparent 60%);
  transition: width 480ms cubic-bezier(.4,0,.2,1);
  pointer-events: none;
}
.practice-row:hover::before,
.practice-row.open::before { width: 100%; }
.practice-row:hover,
.practice-row.open { padding-left: 12px; }

.practice-num {
  font-family: var(--font-mono);
  font-size: 13px;
  letter-spacing: 0.16em;
  color: var(--accent);
  padding-top: 8px;
}
.practice-title-wrap {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.practice-title {
  font-family: var(--font-serif);
  font-weight: 350;
  font-size: 32px;
  line-height: 1.1;
  letter-spacing: -0.01em;
  color: #fff;
}
.practice-tag {
  font-family: var(--font-mono);
  font-size: 10.5px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.48);
}
.practice-desc {
  font-size: 15px;
  line-height: 1.55;
  color: rgba(255,255,255,0.66);
  max-width: 560px;
}
.practice-meta {
  text-align: right;
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.48);
  padding-top: 8px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 12px;
}
.practice-toggle {
  width: 36px; height: 36px;
  border: 1px solid rgba(255,255,255,0.18);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 240ms ease;
  color: rgba(255,255,255,0.7);
}
.practice-row:hover .practice-toggle,
.practice-row.open .practice-toggle {
  border-color: var(--accent);
  color: var(--accent);
}
.practice-row.open .practice-toggle svg { transform: rotate(45deg); }
.practice-toggle svg { transition: transform 320ms ease; }

.practice-detail {
  grid-column: 2 / -1;
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 48px;
  padding: 0 0 12px;
  max-height: 0;
  overflow: hidden;
  transition: max-height 520ms cubic-bezier(.4,0,.2,1), padding 520ms ease;
}
.practice-row.open .practice-detail {
  max-height: 600px;
  padding: 12px 0 24px;
}
.practice-cap-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin: 0;
  padding: 0;
  list-style: none;
}
.practice-cap-list li {
  display: flex;
  gap: 14px;
  font-size: 14.5px;
  color: rgba(255,255,255,0.78);
  padding: 6px 0;
  border-bottom: 1px dashed rgba(255,255,255,0.08);
}
.practice-cap-list li::before {
  content: '→';
  color: var(--accent);
  flex-shrink: 0;
}
.practice-proof {
  font-size: 13px;
  line-height: 1.55;
  color: rgba(255,255,255,0.56);
  padding-left: 24px;
  border-left: 1px solid rgba(255,255,255,0.10);
  font-style: italic;
}
.practice-proof .label {
  display: block;
  font-family: var(--font-mono);
  font-style: normal;
  font-size: 10.5px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 12px;
}
@media (max-width: 880px) {
  .practice-row {
    grid-template-columns: 50px 1fr;
    gap: 16px;
  }
  .practice-desc, .practice-meta { display: none; }
  .practice-title { font-size: 22px; }
  .practice-detail { grid-template-columns: 1fr; gap: 24px; grid-column: 2; }
}

/* ============================================================
   Work
   ============================================================ */
.work-feature {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  background: var(--color-navy-900);
  color: #fff;
  margin-bottom: 32px;
  position: relative;
  overflow: hidden;
}
@media (max-width: 880px) {
  .work-feature { grid-template-columns: 1fr; }
}
.work-feature-art {
  position: relative;
  min-height: 460px;
  background: linear-gradient(135deg, #1a3a52 0%, #0a1b33 70%);
  overflow: hidden;
}
.work-feature-art img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  display: block;
}
.work-feature-body {
  padding: 56px 48px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 16px;
  position: relative;
}
.work-label {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 8px;
}
.work-label::before {
  content: '';
  width: 22px; height: 1px;
  background: var(--accent);
}
.work-feature-title {
  font-family: var(--font-serif);
  font-weight: 350;
  font-size: clamp(28px, 3.6vw, 44px);
  line-height: 1.06;
  letter-spacing: -0.015em;
  color: #fff;
  margin: 0;
}
.work-feature-desc {
  font-size: 15.5px;
  line-height: 1.65;
  color: rgba(255,255,255,0.72);
  max-width: 480px;
}
.work-feature-link { margin-top: 24px; }

.work-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}
@media (max-width: 880px) {
  .work-grid { grid-template-columns: 1fr; }
}
.work-card {
  background: var(--color-cream-100);
  border: 1px solid var(--color-cream-200);
  padding: 32px 28px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: relative;
  transition: all 320ms cubic-bezier(.4,0,.2,1);
  min-height: 320px;
  color: inherit;
}
.work-card:hover {
  background: var(--color-navy-900);
  color: #fff;
  border-color: var(--color-navy-900);
  transform: translateY(-4px);
}
.work-card .work-label {
  color: var(--accent);
  margin-bottom: 0;
}
.work-card-title {
  font-family: var(--font-serif);
  font-weight: 400;
  font-size: 24px;
  line-height: 1.15;
  letter-spacing: -0.01em;
  color: var(--color-ink-900);
  margin: 0;
  transition: color 320ms ease;
}
.work-card:hover .work-card-title { color: #fff; }
.work-card-desc {
  font-size: 14px;
  line-height: 1.55;
  color: var(--color-ink-500);
  flex: 1;
  transition: color 320ms ease;
}
.work-card:hover .work-card-desc { color: rgba(255,255,255,0.72); }
.work-card-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-mono);
  font-size: 11.5px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--accent);
  margin-top: auto;
}
.work-card-link .arrow { transition: transform 280ms ease; }
.work-card:hover .work-card-link .arrow { transform: translateX(4px); }

.work-card.work-card-img {
  border: none;
  color: #fff;
  background-size: cover;
  background-position: center;
}
.work-card.work-card-img .work-card-title { color: #fff; }
.work-card.work-card-img .work-card-desc  { color: rgba(255,255,255,0.78); }
.work-card.work-card-img:hover {
  background-color: transparent;
  border: none;
}

/* ============================================================
   Press strip
   ============================================================ */
.press {
  background: var(--color-cream-100);
  padding: 56px 0;
  border-top: 1px solid var(--color-cream-200);
  border-bottom: 1px solid var(--color-cream-200);
}
.press-row {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 32px;
  align-items: center;
}
@media (max-width: 720px) {
  .press-row { grid-template-columns: 1fr; gap: 16px; }
}
.press-tag {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--color-ink-500);
  display: flex;
  align-items: center;
  gap: 14px;
}
.press-tag::before {
  content: '';
  width: 22px; height: 1px;
  background: var(--color-ink-500);
}
.press-quote {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 22px;
  line-height: 1.3;
  color: var(--color-ink-900);
  font-weight: 300;
  margin: 0;
}
.press-source {
  font-family: var(--font-serif);
  font-size: 32px;
  font-weight: 400;
  color: var(--color-ink-900);
  letter-spacing: -0.01em;
  transition: color 240ms ease;
  display: inline-flex;
  align-items: baseline;
  gap: 8px;
}
.press-source .arrow {
  font-family: var(--font-sans);
  font-size: 18px;
  color: var(--accent);
}
.press-source:hover { color: var(--accent); }

/* ============================================================
   Contact
   ============================================================ */
.contact {
  background: var(--color-cream-100);
  padding: 100px 0;
}
.contact-card {
  display: grid;
  grid-template-columns: 1fr 1fr;
  background: #fff;
  box-shadow: 0 28px 60px -28px rgba(10,27,51,0.18);
  overflow: hidden;
}
@media (max-width: 880px) {
  .contact-card { grid-template-columns: 1fr; }
}
.contact-left {
  background: var(--color-navy-900);
  color: #fff;
  padding: 56px 48px;
  position: relative;
  overflow: hidden;
}
.contact-left::after {
  content: '';
  position: absolute;
  bottom: -120px; right: -120px;
  width: 280px; height: 280px;
  border: 1px solid rgba(201,169,97,0.18);
  border-radius: 50%;
}
.contact-left::before {
  content: '';
  position: absolute;
  bottom: -60px; right: -60px;
  width: 160px; height: 160px;
  border: 1px solid rgba(201,169,97,0.08);
  border-radius: 50%;
}
.contact-eyebrow {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 28px;
}
.contact-title {
  font-family: var(--font-serif);
  font-weight: 350;
  font-size: 44px;
  line-height: 1.05;
  letter-spacing: -0.02em;
  margin: 0 0 24px;
  color: #fff;
}
.contact-title em { font-style: italic; color: var(--accent-soft); font-weight: 350; }
.contact-blurb {
  font-size: 15.5px;
  line-height: 1.65;
  color: rgba(255,255,255,0.72);
  margin: 0 0 36px;
  max-width: 420px;
}
.contact-meta {
  display: flex;
  flex-direction: column;
  gap: 12px;
  position: relative;
  z-index: 2;
}
.contact-meta-row {
  display: flex;
  align-items: center;
  gap: 14px;
  font-size: 14px;
  color: rgba(255,255,255,0.78);
}
.contact-meta-row svg { color: var(--accent); flex-shrink: 0; }
.contact-meta-row a { transition: color 240ms ease; }
.contact-meta-row a:hover { color: var(--accent); }

.contact-right { padding: 56px 48px; }
.contact-form-title {
  font-family: var(--font-serif);
  font-weight: 400;
  font-size: 28px;
  letter-spacing: -0.01em;
  color: var(--color-ink-900);
  margin: 0 0 28px;
}
.field { display: block; margin-bottom: 20px; }
.field label {
  display: block;
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-ink-500);
  margin-bottom: 8px;
}
.field input,
.field textarea,
.field select {
  width: 100%;
  padding: 12px 14px;
  border: 1px solid var(--color-cream-300);
  background: #fff;
  font: inherit;
  font-size: 14.5px;
  color: var(--color-ink-900);
  border-radius: 0;
  transition: border-color 220ms ease, box-shadow 220ms ease;
  outline: none;
}
.field input:focus,
.field textarea:focus,
.field select:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px rgba(201,169,97,0.18);
}
.field input.error,
.field textarea.error,
.field select.error {
  border-color: var(--color-coral-500);
}
.field-error {
  display: block;
  font-family: var(--font-mono);
  font-size: 10.5px;
  letter-spacing: 0.06em;
  color: var(--color-coral-500);
  margin-top: 6px;
  text-transform: uppercase;
}
.field-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
@media (max-width: 600px) {
  .field-row { grid-template-columns: 1fr; }
}
.contact-submit {
  width: 100%;
  background: var(--color-navy-900);
  color: #fff;
  padding: 16px 24px;
  font-family: var(--font-sans);
  font-size: 13.5px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-top: 8px;
  transition: all 280ms ease;
  border: 1px solid var(--color-navy-900);
}
.contact-submit:hover:not(:disabled) {
  background: var(--accent);
  border-color: var(--accent);
  color: var(--color-navy-900);
}
.contact-submit:disabled { opacity: 0.6; cursor: not-allowed; }

.contact-success { text-align: center; padding: 40px 20px; }
.contact-success-icon {
  width: 56px; height: 56px;
  margin: 0 auto 20px;
  background: var(--accent);
  color: var(--color-navy-900);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}
.contact-success h3 {
  font-family: var(--font-serif);
  font-weight: 400;
  font-size: 24px;
  margin: 0 0 12px;
}
.contact-success p { color: var(--color-ink-500); margin: 0; }

/* ============================================================
   Footer
   ============================================================ */
.footer {
  background: var(--color-navy-900);
  color: rgba(255,255,255,0.7);
  padding: 80px 0 40px;
  border-top: 1px solid var(--color-navy-line);
}
.footer-grid {
  display: grid;
  grid-template-columns: 1.4fr 0.8fr 0.8fr 0.8fr;
  gap: 48px;
  margin-bottom: 56px;
}
@media (max-width: 880px) {
  .footer-grid { grid-template-columns: 1fr 1fr; gap: 40px; }
}
.footer-brand p {
  font-size: 14px;
  line-height: 1.6;
  margin: 18px 0 0;
  max-width: 320px;
}
.footer-col h4 {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--accent);
  margin: 0 0 18px;
  font-weight: 600;
}
.footer-col ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.footer-col a {
  font-size: 14px;
  color: rgba(255,255,255,0.68);
  transition: color 220ms ease;
}
.footer-col a:hover { color: var(--accent); }
.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 28px;
  border-top: 1px solid var(--color-navy-line);
  font-size: 12.5px;
  color: rgba(255,255,255,0.48);
  font-family: var(--font-mono);
  letter-spacing: 0.06em;
}
@media (max-width: 600px) {
  .footer-bottom { flex-direction: column; gap: 12px; text-align: center; }
}

/* ============================================================
   Reveal-on-scroll + animations
   ============================================================ */
.reveal {
  opacity: 0;
  transform: translateY(24px);
}
.reveal.in {
  opacity: 1;
  transform: translateY(0);
}

@keyframes marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
@keyframes pulse-ring {
  0%   { transform: scale(1);   opacity: 0.4; }
  100% { transform: scale(1.6); opacity: 0;   }
}
@keyframes float-slow {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-8px); }
}

.globe-pulse { transform-origin: center; }
.float-slow  { transform: translateY(0); }

@media (prefers-reduced-motion: no-preference) {
  .reveal       { transition: opacity 800ms ease, transform 800ms cubic-bezier(.4,0,.2,1); }
  .marquee-track { animation: marquee 40s linear infinite; }
  .globe-pulse  { animation: pulse-ring 3s ease-out infinite; }
  .float-slow   { animation: float-slow 6s ease-in-out infinite; }
}
@media (prefers-reduced-motion: reduce) {
  .reveal { opacity: 1; transform: none; }
  .marquee-track { animation: none; }
}
```

- [ ] **Step 2: Run TypeScript build**

```bash
npm run build
```

Expected: build succeeds (no `@apply` references to dropped tokens; the new CSS uses `var(--color-...)` and `var(--font-...)` directly).

- [ ] **Step 3: Commit**

```bash
git add src/index.css
git commit -m "feat(redesign): port section-scoped CSS for nav/hero/sections/practice/work/press/contact/footer + animations"
```

---

## Task 3: Shared primitives — Reveal, BracketWordmark, GlobeArt

**Files:**
- Create: `src/components/Reveal.tsx`
- Create: `src/components/BracketWordmark.tsx`
- Create: `src/components/GlobeArt.tsx`

These three are consumed by every section in later tasks. None render anything visible by themselves yet — they're verified at use site in Tasks 4–8.

- [ ] **Step 1: Create `src/components/Reveal.tsx`**

```tsx
import { useEffect, useRef, useState, type ReactNode } from 'react';

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

export default function Reveal({
  children,
  delay = 0,
  className = '',
}: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          window.setTimeout(() => setShown(true), delay);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  const cls = `reveal ${shown ? 'in' : ''} ${className}`.trim();
  return (
    <div ref={ref} className={cls}>
      {children}
    </div>
  );
}
```

(Polymorphic `as` prop dropped — every call site in this plan uses the default `<div>`. If a future caller needs `<section>` or `<article>` semantics, use a named child element instead of trying to retype the wrapper.)

- [ ] **Step 2: Create `src/components/BracketWordmark.tsx`**

```tsx
type Size = 'sm' | 'md' | 'lg';
type BracketWordmarkProps = {
  size?: Size;
  light?: boolean;
};

export default function BracketWordmark({
  size = 'md',
  light = true,
}: BracketWordmarkProps) {
  const fontSize = size === 'sm' ? 14 : size === 'lg' ? 24 : 16;
  const bracketHeight = fontSize * 1.5;
  const color = light ? '#ffffff' : 'var(--color-ink-900)';

  return (
    <span className="bracket-wordmark" style={{ color }}>
      <span
        className="bracket left"
        style={{ height: bracketHeight }}
        aria-hidden
      />
      <span className="text" style={{ fontSize }}>
        THE <strong>OASIS</strong> GROUP
      </span>
      <span
        className="bracket right"
        style={{ height: bracketHeight }}
        aria-hidden
      />
    </span>
  );
}
```

- [ ] **Step 3: Create `src/components/GlobeArt.tsx`**

```tsx
const NODES: Array<[number, number]> = [
  [180, 180],
  [310, 200],
  [200, 300],
  [330, 320],
  [150, 260],
  [285, 145],
];

export default function GlobeArt() {
  return (
    <svg
      viewBox="0 0 480 480"
      xmlns="http://www.w3.org/2000/svg"
      className="hero-art-svg"
      aria-hidden
    >
      <defs>
        <radialGradient id="globeGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="rgba(201,169,97,0.18)" />
          <stop offset="60%"  stopColor="rgba(201,169,97,0.04)" />
          <stop offset="100%" stopColor="rgba(201,169,97,0)" />
        </radialGradient>
        <linearGradient id="meridian" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="rgba(201,169,97,0)" />
          <stop offset="50%"  stopColor="rgba(201,169,97,0.55)" />
          <stop offset="100%" stopColor="rgba(201,169,97,0)" />
        </linearGradient>
      </defs>

      <circle cx="240" cy="240" r="220" fill="url(#globeGlow)" />

      <circle cx="240" cy="240" r="180" fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth="1" />
      <circle cx="240" cy="240" r="140" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="2 6" />
      <circle cx="240" cy="240" r="100" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />

      <ellipse cx="240" cy="240" rx="180" ry="60"  fill="none" stroke="rgba(91,139,149,0.30)" strokeWidth="0.8" />
      <ellipse cx="240" cy="240" rx="180" ry="100" fill="none" stroke="rgba(91,139,149,0.22)" strokeWidth="0.8" />
      <ellipse cx="240" cy="240" rx="180" ry="140" fill="none" stroke="rgba(91,139,149,0.16)" strokeWidth="0.8" />

      <ellipse cx="240" cy="240" rx="60"  ry="180" fill="none" stroke="url(#meridian)" strokeWidth="1" />
      <ellipse cx="240" cy="240" rx="100" ry="180" fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth="0.8" />
      <ellipse cx="240" cy="240" rx="140" ry="180" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8" />

      <line x1="60"  y1="240" x2="420" y2="240" stroke="rgba(255,255,255,0.14)" strokeWidth="1" />
      <line x1="240" y1="60"  x2="240" y2="420" stroke="rgba(255,255,255,0.10)" strokeWidth="1" />

      {NODES.map(([cx, cy], i) => (
        <g key={i}>
          <circle
            cx={cx}
            cy={cy}
            r="14"
            fill="rgba(201,169,97,0.12)"
            className="globe-pulse"
            style={{ animationDelay: `${i * 0.5}s`, transformOrigin: `${cx}px ${cy}px` }}
          />
          <circle cx={cx} cy={cy} r="3.5" fill="#C9A961" />
        </g>
      ))}

      <g stroke="rgba(201,169,97,0.35)" strokeWidth="0.8" fill="none">
        <path d="M 180 180 Q 240 130 310 200" />
        <path d="M 180 180 Q 220 240 200 300" />
        <path d="M 310 200 Q 360 250 330 320" />
        <path d="M 200 300 Q 270 310 330 320" />
        <path d="M 150 260 Q 180 220 180 180" />
      </g>

      <g stroke="rgba(255,255,255,0.4)" strokeWidth="1">
        <line x1="60"  y1="60"  x2="80"  y2="60" /><line x1="60"  y1="60"  x2="60"  y2="80" />
        <line x1="420" y1="60"  x2="400" y2="60" /><line x1="420" y1="60"  x2="420" y2="80" />
        <line x1="60"  y1="420" x2="80"  y2="420" /><line x1="60"  y1="420" x2="60"  y2="400" />
        <line x1="420" y1="420" x2="400" y2="420" /><line x1="420" y1="420" x2="420" y2="400" />
      </g>
    </svg>
  );
}
```

- [ ] **Step 4: Build to confirm no TypeScript errors**

```bash
npm run build
```

Expected: build succeeds.

- [ ] **Step 5: Commit**

```bash
git add src/components/Reveal.tsx src/components/BracketWordmark.tsx src/components/GlobeArt.tsx
git commit -m "feat(redesign): add shared Reveal, BracketWordmark, and GlobeArt primitives"
```

---

## Task 4: Hero + Navigation rewrites; delete CredibilityBar

**Files:**
- Replace: `src/components/Navigation.tsx`
- Replace: `src/components/Hero.tsx`
- Delete: `src/components/CredibilityBar.tsx`
- Modify: `src/App.tsx` (remove `CredibilityBar` import and usage)

- [ ] **Step 1: Replace `src/components/Navigation.tsx` entirely**

```tsx
import { useEffect, useState, type MouseEvent } from 'react';
import BracketWordmark from './BracketWordmark';

const NAV_ITEMS = [
  { id: 'about',    label: 'About'    },
  { id: 'practice', label: 'Practice' },
  { id: 'work',     label: 'Work'     },
  { id: 'contact',  label: 'Contact'  },
] as const;

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>('');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      let current = '';
      for (const { id } of NAV_ITEMS) {
        const el = document.getElementById(id);
        if (el) {
          const r = el.getBoundingClientRect();
          if (r.top <= 120 && r.bottom > 200) current = id;
        }
      }
      setActive(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const goTo = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 60;
      window.scrollTo({ top, behavior: 'smooth' });
    }
    setMobileOpen(false);
  };

  const goTop = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="shell nav-row">
        <a href="#top" onClick={goTop} className="nav-mark" aria-label="The Oasis Group home">
          <BracketWordmark size="sm" light />
        </a>

        <div className="nav-links">
          {NAV_ITEMS.map((it) => (
            <a
              key={it.id}
              href={`#${it.id}`}
              className={`nav-link ${active === it.id ? 'active' : ''}`}
              onClick={(e) => goTo(e, it.id)}
            >
              {it.label}
            </a>
          ))}
          <a
            href="#contact"
            className="nav-cta"
            onClick={(e) => goTo(e, 'contact')}
          >
            Partner with us
            <span className="arrow" aria-hidden>→</span>
          </a>
        </div>

        <button
          type="button"
          className="nav-burger"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Menu"
          aria-expanded={mobileOpen}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {mobileOpen ? (
              <path d="M6 6L18 18M6 18L18 6" />
            ) : (
              <>
                <path d="M4 7h16" />
                <path d="M4 12h16" />
                <path d="M4 17h16" />
              </>
            )}
          </svg>
        </button>
      </div>

      <div className={`nav-mobile shell ${mobileOpen ? 'open' : ''}`}>
        {NAV_ITEMS.map((it) => (
          <a key={it.id} href={`#${it.id}`} onClick={(e) => goTo(e, it.id)}>
            {it.label}
          </a>
        ))}
        <a href="#contact" onClick={(e) => goTo(e, 'contact')}>
          Partner with us →
        </a>
      </div>
    </nav>
  );
}
```

- [ ] **Step 2: Replace `src/components/Hero.tsx` entirely**

```tsx
import { type MouseEvent } from 'react';
import GlobeArt from './GlobeArt';

const MARQUEE_ITEMS = [
  'Central Bank of The Bahamas',
  'Sand Dollar CBDC',
  'Bank of Tanzania',
  'Inter-American Development Bank',
  'Forbes',
  'Oasis Onchain',
  'Artisand',
  'Frontier Founders',
];

export default function Hero() {
  const goTo = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 60;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section className="hero" id="top">
      <div className="shell hero-grid">
        <div>
          <div className="hero-eyebrow">Boutique advisory · Frontier technology</div>
          <h1 className="hero-title">
            Architects of the<br />
            <em>Digital Frontier.</em>
          </h1>
          <p className="hero-sub">
            We help governments, central banks, and institutions implement digital
            currency, applied AI, and emerging-tech infrastructure — with the
            practitioner depth that theory alone can't deliver.
          </p>
          <div className="hero-actions">
            <a href="#contact" className="btn btn-primary" onClick={(e) => goTo(e, 'contact')}>
              Start a conversation
              <span className="arrow" aria-hidden>→</span>
            </a>
            <a href="#work" className="btn btn-ghost" onClick={(e) => goTo(e, 'work')}>
              See our work
            </a>
          </div>
          <div className="hero-stats">
            <div className="hero-stat">
              <div className="num">2017</div>
              <div className="lbl">Advising on<br />digital currency</div>
            </div>
            <div className="hero-stat">
              <div className="num">Trusted by</div>
              <div className="lbl">Sovereign &amp; Institutional<br />Clients</div>
            </div>
            <div className="hero-stat">
              <div className="num">3</div>
              <div className="lbl">Live ventures<br />in production</div>
            </div>
          </div>
        </div>

        <div className="hero-art float-slow">
          <div className="hero-art-frame" aria-hidden />
          <span className="hero-art-bracket tl" aria-hidden />
          <span className="hero-art-bracket tr" aria-hidden />
          <span className="hero-art-bracket bl" aria-hidden />
          <span className="hero-art-bracket br" aria-hidden />
          <GlobeArt />
          <div className="hero-art-meta">
            Reach<br />
            <strong>Caribbean → East Africa</strong>
          </div>
        </div>
      </div>

      <div className="hero-marquee" aria-hidden>
        <div className="marquee-track">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((t, i) => (
            <span key={i} className="marquee-item">{t}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Delete `src/components/CredibilityBar.tsx`**

```bash
rm src/components/CredibilityBar.tsx
```

- [ ] **Step 4: Update `src/App.tsx` to remove the CredibilityBar import**

Replace `src/App.tsx` entirely with:

```tsx
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Work from './components/Work';
import Press from './components/Press';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <Hero />
        <About />
        <Services />
        <Work />
        <Press />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
```

(Note: `Services` import stays for now — Task 5 renames the file to `Practice.tsx` and updates this import in the same task to keep the build green.)

- [ ] **Step 5: Run dev server and visually verify hero + nav**

```bash
npm run dev
```

Open `http://localhost:5173` and confirm:

- Hero: navy background; gold "Boutique advisory · Frontier technology" eyebrow with leading hairline; "Architects of the / *Digital Frontier.*" headline (italic word in lighter gold); two buttons; three stats with `2017` / `Trusted by` / `3` in serif gold.
- Globe SVG renders right side, framed by four gold corner brackets and a hairline frame; "Reach **Caribbean → East Africa**" in mono at top-right of the frame.
- Block floats up/down (~8px every 6s); gold node rings pulse, staggered.
- Bottom marquee scrolls right→left with mono client names separated by gold dots.
- Nav: at top, transparent background; on scroll past 40px, navy bg with backdrop blur appears, padding shrinks, hairline appears below.
- Hover any nav link → gold underline animates from right to left.
- Resize to <880px wide: nav links collapse into a burger; clicking burger reveals stacked menu under the nav row; clicking again closes it.

Compare against `design_handoff_oasis_redesign/screenshots/01-hero.png`.

If anything looks off, fix it now before continuing.

- [ ] **Step 6: Run build + lint**

```bash
npm run build && npm run lint
```

Expected: both succeed. About/Services/Work/Press/Contact/Footer still reference old tokens and will look broken — that's fine; they get rewritten in tasks 5–7. The build doesn't fail because Tailwind v4 silently drops unknown classes.

- [ ] **Step 7: Commit**

```bash
git add src/components/Navigation.tsx src/components/Hero.tsx src/App.tsx
git rm src/components/CredibilityBar.tsx
git commit -m "feat(redesign): rewrite Hero + Navigation with bracket wordmark, scrollspy, marquee; remove CredibilityBar"
```

---

## Task 5: About + Practice (rename Services.tsx)

**Files:**
- Replace: `src/components/About.tsx`
- Rename + replace: `src/components/Services.tsx` → `src/components/Practice.tsx`
- Modify: `src/App.tsx` (rename import)

- [ ] **Step 1: Replace `src/components/About.tsx` entirely**

```tsx
import Reveal from './Reveal';

export default function About() {
  return (
    <section id="about" className="section section-light">
      <div className="shell">
        <Reveal className="section-head">
          <div>
            <div className="section-tag">[ 01 ] Our Mission</div>
            <h2 className="section-title">
              Builders, not<br />
              just <em>advisors.</em>
            </h2>
          </div>
          <p className="section-lead">
            The Oasis Group is a boutique consultancy and venture studio
            headquartered in The Bahamas — pioneering collaborations in frontier
            technology and governance across the Global South.
          </p>
        </Reveal>

        <div className="about-grid">
          <Reveal className="about-copy">
            <p>
              Most frontier technology is designed in Western markets and exported
              as an afterthought. The result? Frameworks that don't fit local
              realities, implementations that stall, and missed opportunities for
              the regions that could benefit most.
            </p>
            <p>
              <strong>The Oasis Group exists to change that equation.</strong> We
              combine deep technical expertise with direct experience inside central
              banks, regulatory bodies, and development institutions.
            </p>
            <p>
              Our founder, Stefen Deleveaux, has advised on digital currency
              strategy since 2017 — years before most nations had CBDC on their
              agenda. That practitioner knowledge, paired with a network of
              specialist partners, allows us to move from policy to production at
              the speed institutions actually need.
            </p>
          </Reveal>

          <Reveal delay={140} className="about-side">
            <div className="pull-tag">A note from the founder</div>
            <p className="pull">
              "Big consultancies deliver frameworks. We deliver implementation —
              at the speed and flexibility institutions actually need."
            </p>
            <hr />
            <div className="signoff">
              <strong>Stefen Deleveaux</strong><br />
              Founder · The Oasis Group<br />
              Nassau, The Bahamas
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Rename `Services.tsx` to `Practice.tsx` (preserve git history)**

```bash
git mv src/components/Services.tsx src/components/Practice.tsx
```

- [ ] **Step 3: Replace the renamed `src/components/Practice.tsx` entirely**

```tsx
import { useState } from 'react';
import Reveal from './Reveal';

type PracticeArea = {
  num: string;
  tag: string;
  title: string;
  desc: string;
  meta: string;
  capabilities: string[];
  proof: string;
};

const PRACTICE_AREAS: PracticeArea[] = [
  {
    num: '01',
    tag: 'Primary Focus',
    title: 'Digital Currency & Financial Infrastructure',
    desc: 'From policy design to technical implementation, we navigate the full lifecycle of digital currency and blockchain adoption for governments and financial institutions.',
    meta: 'Primary practice',
    capabilities: [
      'CBDC strategy & implementation advisory',
      'Blockchain integration (public + private sector)',
      'Regulatory framework development',
      'Financial inclusion infrastructure',
      'Cross-border payment systems',
    ],
    proof:
      'Advisor to the early Sand Dollar CBDC team in The Bahamas. Consulted with the Bank of Tanzania on digital assets and crypto policy. Multiple engagements with the Inter-American Development Bank.',
  },
  {
    num: '02',
    tag: 'Growing Practice',
    title: 'Applied AI & Emerging Tech',
    desc: "AI is reshaping how institutions operate. We help organizations move beyond the hype to practical, deployable solutions that respect local context.",
    meta: 'Growing practice',
    capabilities: [
      'AI implementation strategy',
      'Infrastructure & tooling assessment',
      'Deployment roadmaps for institutional contexts',
      'AI-assisted product development',
    ],
    proof:
      'Our venture Artisand — a full e-commerce platform built with AI-assisted development — demonstrates what is possible when emerging tools meet real-world institutional needs.',
  },
  {
    num: '03',
    tag: 'Supporting Practice',
    title: 'Digital Coordination & Governance',
    desc: 'New organizational models require new infrastructure. We design systems for transparent contribution tracking, distributed governance, and digital-native coordination.',
    meta: 'Supporting practice',
    capabilities: [
      'DAO architecture & governance design',
      'Contribution tracking systems',
      'Tooling for distributed teams',
      'Public-private coordination frameworks',
    ],
    proof:
      'Experience with Govrn, The DAOist, and pioneering contribution-based governance frameworks for institutions and ecosystems.',
  },
];

export default function Practice() {
  const [open, setOpen] = useState<number>(0);
  const toggle = (i: number) => setOpen(open === i ? -1 : i);

  return (
    <section id="practice" className="section section-dark">
      <div className="shell">
        <Reveal className="section-head">
          <div>
            <div className="section-tag">[ 02 ] What we do</div>
            <h2 className="section-title">
              Expertise at<br />
              the <em>edge.</em>
            </h2>
          </div>
          <p className="section-lead">
            We work at the intersection of policy, technology, and practical
            deployment — across three interconnected verticals.
          </p>
        </Reveal>

        <Reveal className="practice-list">
          {PRACTICE_AREAS.map((p, i) => (
            <button
              key={p.num}
              type="button"
              className={`practice-row ${open === i ? 'open' : ''}`}
              onClick={() => toggle(i)}
              aria-expanded={open === i}
            >
              <div className="practice-num">[ {p.num} ]</div>
              <div className="practice-title-wrap">
                <span className="practice-tag">{p.tag}</span>
                <div className="practice-title">{p.title}</div>
              </div>
              <div className="practice-desc">{p.desc}</div>
              <div className="practice-meta">
                <span>{p.meta}</span>
                <span className="practice-toggle" aria-hidden>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </span>
              </div>
              <div className="practice-detail">
                <ul className="practice-cap-list">
                  {p.capabilities.map((c, j) => (
                    <li key={j}>{c}</li>
                  ))}
                </ul>
                <div className="practice-proof">
                  <span className="label">Proof points</span>
                  {p.proof}
                </div>
              </div>
            </button>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Update `src/App.tsx` to import `Practice` instead of `Services`**

Replace `src/App.tsx` entirely with:

```tsx
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Practice from './components/Practice';
import Work from './components/Work';
import Press from './components/Press';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <Hero />
        <About />
        <Practice />
        <Work />
        <Press />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
```

- [ ] **Step 5: Run dev server and visually verify**

```bash
npm run dev
```

Confirm in browser:

- About: cream background; eyebrow `[ 01 ] Our Mission` (mono gold with leading hairline); serif headline "Builders, not / just *advisors.*"; right-aligned section lead; below, a 2-col grid with 3 paragraphs left and a navy founder card right with gold corner brackets at top-left and bottom-right.
- Reveal animation: scrolling toward each section fades content in with a 24px upward translate.
- Practice: navy background; eyebrow `[ 02 ] What we do`; serif headline "Expertise at / the *edge.*"; 3 rows; first row open by default with capabilities list (gold `→` bullets) and proof points (italic, mono gold "Proof points" label).
- Hover a closed row → row indents 12px right and a faint gold gradient sweeps in from the left.
- Click a closed row → it expands smoothly (~520ms), the `+` icon rotates 45° to ×; clicking again collapses it.
- Mobile (resize to <880px): rows show only num + title; description and meta hidden; first row still open by default.

Compare against `design_handoff_oasis_redesign/screenshots/02-about.png` and `03-practice.png`.

- [ ] **Step 6: Run build + lint**

```bash
npm run build && npm run lint
```

Expected: both succeed.

- [ ] **Step 7: Commit**

```bash
git add src/components/About.tsx src/components/Practice.tsx src/App.tsx
git commit -m "feat(redesign): rewrite About; rename Services to Practice as accordion"
```

---

## Task 6: Work + Press; refactor WorkCard; delete ServiceCard; copy assets

**Files:**
- Copy: `/tmp/oasis_redesign/design_handoff_oasis_redesign/prototype/assets/artisand-screen2.png` → `public/images/artisand-screen2.png`
- Copy: `/tmp/oasis_redesign/design_handoff_oasis_redesign/prototype/assets/oasis-onchain-event.jpeg` → `public/images/oasis-onchain-event.jpeg`
- Replace: `src/components/Work.tsx`
- Replace: `src/components/WorkCard.tsx`
- Replace: `src/components/Press.tsx`
- Delete: `src/components/ServiceCard.tsx`

- [ ] **Step 1: Copy image assets into `public/images/`**

```bash
cp /tmp/oasis_redesign/design_handoff_oasis_redesign/prototype/assets/artisand-screen2.png public/images/artisand-screen2.png
cp /tmp/oasis_redesign/design_handoff_oasis_redesign/prototype/assets/oasis-onchain-event.jpeg public/images/oasis-onchain-event.jpeg
ls -la public/images/
```

Expected: `public/images/` now contains `artisand-screen2.png`, `oasis-logo.png`, `oasis-logo.webp`, `oasis-onchain-event.jpeg`.

(If `/tmp/oasis_redesign/...` is missing: re-extract the zip with `python3 -c "import zipfile; zipfile.ZipFile('Oasis Group Site.zip').extractall('/tmp/oasis_redesign')"` then retry the `cp` commands.)

- [ ] **Step 2: Replace `src/components/WorkCard.tsx` entirely**

```tsx
type WorkCardProps = {
  label: string;
  title: string;
  desc: string;
  link: string;
  href: string;
  img?: string;
};

export default function WorkCard({ label, title, desc, link, href, img }: WorkCardProps) {
  const isImg = Boolean(img);
  const cls = `work-card${isImg ? ' work-card-img' : ''}`;
  const style = img
    ? {
        backgroundImage: `linear-gradient(to bottom, rgba(10,27,51,0.35) 0%, rgba(10,27,51,0.82) 60%), url(/images/${img})`,
      }
    : undefined;

  return (
    <article className={cls} style={style}>
      <span className="work-label">{label}</span>
      <h4 className="work-card-title">{title}</h4>
      <p className="work-card-desc">{desc}</p>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="work-card-link"
      >
        {link} <span className="arrow" aria-hidden>↗</span>
      </a>
    </article>
  );
}
```

- [ ] **Step 3: Replace `src/components/Work.tsx` entirely**

```tsx
import Reveal from './Reveal';
import WorkCard from './WorkCard';

type WorkItem = {
  label: string;
  title: string;
  desc: string;
  link: string;
  href: string;
  img?: string;
};

const WORK_ITEMS: WorkItem[] = [
  {
    label: 'Venture · Bahamas',
    title: 'DARE Advisor',
    desc: 'AI-driven advisor that guides digital-asset businesses through the entire DARE Act registration process — from path selection to document generation.',
    link: 'Visit DARE Advisor',
    href: 'https://dare-advisor.vercel.app',
  },
  {
    label: 'Portfolio · Caribbean',
    title: 'Oasis Onchain',
    desc: 'Our flagship summit bringing together builders, policymakers, and investors focused on the Global South. Featured in Forbes.',
    link: 'Visit Oasis Onchain',
    href: 'https://www.oasisonchain.xyz',
    img: 'oasis-onchain-event.jpeg',
  },
  {
    label: 'Portfolio · Media',
    title: 'Frontier Founders',
    desc: 'A podcast exploring frontier technology through the lens of founders actually doing the work — long-form conversations with builders shaping the future.',
    link: 'Watch on YouTube',
    href: 'https://www.youtube.com/@OasisFrontierFounders',
  },
];

export default function Work() {
  return (
    <section id="work" className="section section-light">
      <div className="shell">
        <Reveal className="section-head">
          <div>
            <div className="section-tag">[ 03 ] Our Work</div>
            <h2 className="section-title">
              Theory meets<br />
              <em>practice.</em>
            </h2>
          </div>
          <p className="section-lead">
            As a venture studio, we don't just consult — we build. Each engagement
            ships infrastructure, ventures, or policy frameworks that operate at
            real-world scale.
          </p>
        </Reveal>

        <Reveal>
          <article className="work-feature">
            <div className="work-feature-art">
              <img
                src="/images/artisand-screen2.png"
                alt="Artisand Marketplace — Discover Island Wonders"
              />
            </div>
            <div className="work-feature-body">
              <span className="work-label">Featured Case Study · Artisand</span>
              <h3 className="work-feature-title">
                Scaling the artisanal economy through AI &amp; Web3.
              </h3>
              <p className="work-feature-desc">
                Artisand is a live e-commerce marketplace connecting Bahamian
                artisans directly with global customers. Built ground-up with
                AI-assisted development on a decentralized platform — production
                infrastructure that creates real economic opportunity.
              </p>
              <a
                href="https://www.artisand.art"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary work-feature-link"
              >
                Visit Artisand
                <span className="arrow" aria-hidden>↗</span>
              </a>
            </div>
          </article>
        </Reveal>

        <div className="work-grid">
          {WORK_ITEMS.map((w, i) => (
            <Reveal key={w.title} delay={i * 80}>
              <WorkCard {...w} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Replace `src/components/Press.tsx` entirely**

```tsx
export default function Press() {
  return (
    <section className="press">
      <div className="shell">
        <div className="press-row">
          <span className="press-tag">In the press</span>
          <p className="press-quote">
            "Crypto Carib: Hotter Than Davos" — coverage of the Caribbean's
            emerging position in the global crypto landscape, featuring Oasis Onchain.
          </p>
          <a
            href="https://www.forbes.com/sites/digital-assets/2024/01/26/crypto-carib-hotter-than-davos/"
            target="_blank"
            rel="noopener noreferrer"
            className="press-source"
          >
            Forbes <span className="arrow" aria-hidden>↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Delete `src/components/ServiceCard.tsx`**

```bash
rm src/components/ServiceCard.tsx
```

- [ ] **Step 6: Run dev server and visually verify**

```bash
npm run dev
```

Confirm in browser:

- Work: cream background; eyebrow `[ 03 ] Our Work`; serif headline "Theory meets / *practice.*".
- Featured Artisand block: 2-col, navy background, left half is the Artisand homepage screenshot (cover-fitted, top-aligned), right half has gold mono "Featured Case Study · Artisand" label, large serif headline, body copy, gold primary button "Visit Artisand ↗" linking to `https://www.artisand.art` opening in a new tab.
- 3-card grid below: DARE Advisor (text card), Oasis Onchain (event photo background with navy gradient overlay; stays white-text on hover, no card flip), Frontier Founders (text card).
- Hover DARE/Frontier cards → flip from cream to navy, white text, lift 4px.
- Hover Oasis Onchain card → no color flip (image stays as background).
- Press strip (between Work and Contact): cream background, hairline borders top/bottom, mono "In the press" + italic serif quote + large serif "Forbes ↗" link.

Compare against screenshots `04-work-featured.png`, `05-work-grid.png`.

- [ ] **Step 7: Run build + lint**

```bash
npm run build && npm run lint
```

Expected: both succeed.

- [ ] **Step 8: Commit**

```bash
git add public/images/artisand-screen2.png public/images/oasis-onchain-event.jpeg \
  src/components/Work.tsx src/components/WorkCard.tsx src/components/Press.tsx
git rm src/components/ServiceCard.tsx
git commit -m "feat(redesign): rewrite Work + Press; refactor WorkCard for image-bg variant; remove ServiceCard"
```

---

## Task 7: Contact + Footer (preserve Netlify wiring)

**Files:**
- Replace: `src/components/Contact.tsx`
- Replace: `src/components/Footer.tsx`

The Contact form keeps its existing Netlify Forms wiring: the visible form has `name="contact"`, `data-netlify="true"`, and a hidden `<input name="form-name" value="contact" />`. The Netlify build-time detector form already lives in `index.html` (preserved by Task 1). On submit, post the form via `fetch` with `application/x-www-form-urlencoded` body to `/`, then swap the form for the success state on a 2xx response.

- [ ] **Step 1: Replace `src/components/Contact.tsx` entirely**

```tsx
import { useState, type ChangeEvent, type FormEvent } from 'react';
import Reveal from './Reveal';

type FormState = {
  name: string;
  email: string;
  org: string;
  interest: string;
  message: string;
};

type Errors = Partial<Record<keyof FormState, string>>;
type Status = 'idle' | 'sending' | 'success' | 'error';

const INITIAL: FormState = {
  name: '',
  email: '',
  org: '',
  interest: 'Digital Currency & Financial Infrastructure',
  message: '',
};

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

function encode(data: Record<string, string>): string {
  return Object.entries(data)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join('&');
}

export default function Contact() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>('idle');

  const upd = (k: keyof FormState) =>
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setForm((f) => ({ ...f, [k]: e.target.value }));
      if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
    };

  const validate = (): Errors => {
    const er: Errors = {};
    if (!form.name.trim())    er.name = 'Required';
    if (!form.email.trim())   er.email = 'Required';
    else if (!EMAIL_RE.test(form.email)) er.email = 'Invalid email';
    if (!form.org.trim())     er.org = 'Required';
    if (!form.message.trim()) er.message = 'Required';
    return er;
  };

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const er = validate();
    if (Object.keys(er).length) {
      setErrors(er);
      return;
    }
    setStatus('sending');
    try {
      const body = encode({
        'form-name': 'contact',
        name: form.name,
        email: form.email,
        organization: form.org,
        interest: form.interest,
        message: form.message,
      });
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body,
      });
      if (!res.ok) throw new Error(`Netlify Forms returned ${res.status}`);
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="contact">
      <div className="shell">
        <Reveal>
          <div className="contact-card">
            <div className="contact-left">
              <div className="contact-eyebrow">Editorial</div>
              <h2 className="contact-title">
                Join us at<br />
                the <em>frontier.</em>
              </h2>
              <p className="contact-blurb">
                The Oasis Group is a boutique advisory firm dedicated to
                pioneering collaborations in frontier technology and governance.
                We invite visionary governments, founders, and investors to
                explore strategic partnerships and shape the future of applied
                AI, digital assets, and policy.
              </p>
              <div className="contact-meta">
                <div className="contact-meta-row">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
                    <path d="M4 4h16v16H4z" />
                    <path d="M4 8l8 6 8-6" />
                  </svg>
                  <a href="mailto:hello@theoasisgroup.xyz">hello@theoasisgroup.xyz</a>
                </div>
                <div className="contact-meta-row">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
                    <rect x="3" y="4" width="18" height="16" />
                    <circle cx="8" cy="11" r="1" />
                    <path d="M11 11h7M8 16h10" />
                  </svg>
                  <a
                    href="https://linkedin.com/company/theoasisgroup"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    linkedin.com/company/theoasisgroup
                  </a>
                </div>
              </div>
            </div>

            <div className="contact-right">
              {status === 'success' ? (
                <div className="contact-success">
                  <div className="contact-success-icon" aria-hidden>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12l5 5L20 7" />
                    </svg>
                  </div>
                  <h3>Inquiry received.</h3>
                  <p>We'll be in touch within two business days.</p>
                </div>
              ) : (
                <form
                  name="contact"
                  method="POST"
                  data-netlify="true"
                  data-netlify-honeypot="bot-field"
                  onSubmit={submit}
                  noValidate
                >
                  <input type="hidden" name="form-name" value="contact" />
                  <p hidden>
                    <label>
                      Don't fill this out: <input name="bot-field" />
                    </label>
                  </p>
                  <h3 className="contact-form-title">Partnership Inquiry</h3>

                  <div className="field-row">
                    <div className="field">
                      <label htmlFor="contact-name">Name</label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        value={form.name}
                        onChange={upd('name')}
                        className={errors.name ? 'error' : ''}
                        placeholder="Full name"
                      />
                      {errors.name && <span className="field-error">{errors.name}</span>}
                    </div>
                    <div className="field">
                      <label htmlFor="contact-email">Email</label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={upd('email')}
                        className={errors.email ? 'error' : ''}
                        placeholder="you@org.com"
                      />
                      {errors.email && <span className="field-error">{errors.email}</span>}
                    </div>
                  </div>

                  <div className="field">
                    <label htmlFor="contact-org">Organization</label>
                    <input
                      id="contact-org"
                      name="organization"
                      type="text"
                      value={form.org}
                      onChange={upd('org')}
                      className={errors.org ? 'error' : ''}
                      placeholder="Central bank, ministry, fund, firm…"
                    />
                    {errors.org && <span className="field-error">{errors.org}</span>}
                  </div>

                  <div className="field">
                    <label htmlFor="contact-interest">Interest area</label>
                    <select
                      id="contact-interest"
                      name="interest"
                      value={form.interest}
                      onChange={upd('interest')}
                    >
                      <option>Digital Currency &amp; Financial Infrastructure</option>
                      <option>Applied AI &amp; Emerging Tech</option>
                      <option>Digital Coordination &amp; Governance</option>
                      <option>Venture Studio Partnership</option>
                      <option>Speaking / Press</option>
                    </select>
                  </div>

                  <div className="field">
                    <label htmlFor="contact-message">Tell us about your project</label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={4}
                      value={form.message}
                      onChange={upd('message')}
                      className={errors.message ? 'error' : ''}
                      placeholder="The institutional context, the outcome you're after, any constraints we should know about."
                    />
                    {errors.message && <span className="field-error">{errors.message}</span>}
                  </div>

                  <button
                    type="submit"
                    className="contact-submit"
                    disabled={status === 'sending'}
                  >
                    {status === 'sending' ? 'Sending…' : 'Send Inquiry →'}
                  </button>

                  {status === 'error' && (
                    <span className="field-error" style={{ marginTop: 12 }}>
                      Something went wrong. Please email hello@theoasisgroup.xyz directly.
                    </span>
                  )}
                </form>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Replace `src/components/Footer.tsx` entirely**

```tsx
import BracketWordmark from './BracketWordmark';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="shell">
        <div className="footer-grid">
          <div className="footer-brand">
            <BracketWordmark size="md" light />
            <p>
              Boutique advisory and venture studio building the digital
              frontier — from the Caribbean to the Global South.
            </p>
          </div>
          <div className="footer-col">
            <h4>Practice</h4>
            <ul>
              <li><a href="#practice">Digital Currency</a></li>
              <li><a href="#practice">Applied AI</a></li>
              <li><a href="#practice">Coordination &amp; Governance</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Ventures</h4>
            <ul>
              <li><a href="#work">Artisand</a></li>
              <li><a href="#work">DARE Advisor</a></li>
              <li><a href="#work">Oasis Onchain</a></li>
              <li><a href="#work">Frontier Founders</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Connect</h4>
            <ul>
              <li><a href="mailto:hello@theoasisgroup.xyz">Email</a></li>
              <li>
                <a
                  href="https://linkedin.com/company/theoasisgroup"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/@OasisFrontierFounders"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  YouTube
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 The Oasis Group · Nassau, The Bahamas</span>
          <span>Bringing frontier tech home</span>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 3: Run dev server and visually verify**

```bash
npm run dev
```

Confirm in browser:

- Contact: cream-100 section with centered card, large soft navy shadow under the card.
- Left half navy: gold "Editorial" eyebrow, serif headline "Join us at / the *frontier.*", blurb, two meta rows with gold envelope icon → `hello@theoasisgroup.xyz` (mailto) and gold building icon → LinkedIn URL (new tab). Concentric gold circles in the bottom-right corner.
- Right half white: serif "Partnership Inquiry" title, fields with mono uppercase labels, square-cornered inputs, gold focus ring on click, navy submit button that turns gold on hover.
- Submit empty form → coral borders + mono uppercase "Required" errors below each empty required field.
- Submit valid form → button shows "Sending…", then form swaps for centered gold-circle checkmark + "Inquiry received." + "We'll be in touch within two business days." (Note: real Netlify response only happens on the deploy preview; in `vite dev` the `fetch('/')` will likely 404 and show the error message — that's expected. Form behavior is verified end-to-end in Task 8.)
- Footer: navy bg; 4-col grid (brand wordmark + tagline / Practice / Ventures / Connect); column headers in mono gold uppercase; links in muted white that turn gold on hover; bottom bar with hairline above containing "© 2026 The Oasis Group · Nassau, The Bahamas" left and "Bringing frontier tech home" right.
- Mobile (resize to <880px): footer collapses to 2-col; contact card stacks left over right.

Compare against screenshots `06-contact.png`, `07-footer.png`.

- [ ] **Step 4: Run build + lint**

```bash
npm run build && npm run lint
```

Expected: both succeed.

- [ ] **Step 5: Commit**

```bash
git add src/components/Contact.tsx src/components/Footer.tsx
git commit -m "feat(redesign): rewrite Contact (validation + Netlify fetch + success state) and Footer (4-col + bracket wordmark)"
```

---

## Task 8: Verification, cleanup, push, PR

**Files:**
- Delete: `public/vite.svg`
- Push: branch `redesign/editorial`
- Open: PR to `main`

- [ ] **Step 1: Confirm zero remaining references to old token names**

```bash
grep -rnE "oasisDeep|oasisAction|oasisSunset|oasisLight|obsidian|electric-teal|cantaloupe|cool-white|slate-dark|slate-card" src/ index.html
```

Expected: no output (exit code 1). If any hits remain, edit those files to remove the old class names before continuing.

- [ ] **Step 2: Delete `public/vite.svg` (no longer used as favicon)**

```bash
rm public/vite.svg
```

- [ ] **Step 3: Final clean build**

```bash
npm run build && npm run lint
```

Expected: both succeed.

- [ ] **Step 4: Browser walkthrough (full site)**

```bash
npm run dev
```

Walk every section in order against the matching reference render in `design_handoff_oasis_redesign/screenshots/`:

1. Hero (`01-hero.png`): headline, italic gold "Digital Frontier.", buttons, stats `2017` / `Trusted by` / `3`, globe with brackets and pulsing nodes, scrolling marquee.
2. About (`02-about.png`): mission eyebrow + headline, 3-paragraph copy, founder card with corner brackets and pull quote.
3. Practice (`03-practice.png`): three rows, first open by default; click row 2 → row 1 collapses, row 2 expands with capabilities + proof; toggle icon rotates.
4. Work featured (`04-work-featured.png`): Artisand image + body + "Visit Artisand ↗" gold button → opens `https://www.artisand.art` in new tab.
5. Work grid (`05-work-grid.png`): DARE/Onchain/Frontier Founders cards. Hover DARE → flips navy with 4px lift. Hover Onchain → no flip (image bg stays). Hover Frontier → flips navy with 4px lift.
6. Press: "In the press" + Forbes quote + Forbes ↗ link → opens article in new tab.
7. Contact (`06-contact.png`): card layout, fill form, submit valid → success state.
8. Footer (`07-footer.png`): 4-col, bottom bar; click any nav link in footer → smooth-scrolls to corresponding section.

Also smoke-test:

- Scrollspy: scroll the page → active nav link tracks About → Practice → Work → Contact.
- Marquee: confirm seamless loop (no visible gap when track resets at -50%).
- Reduced motion: enable OS "Reduce motion" setting (Linux: GNOME Settings → Accessibility → "Reduce animations"; macOS: System Settings → Accessibility → Display → Reduce motion). Refresh. Confirm Reveal/marquee/float/pulse stop animating; site renders with content visible.
- Mobile: DevTools → 375px viewport. Confirm nav burger works (`aria-expanded` toggles correctly), hero stacks, practice rows collapse to 2-col, work grid stacks, contact card stacks, footer is 2-col.

If you find any visual regression, fix it now and commit before the next step.

- [ ] **Step 5: Commit cleanup if needed**

```bash
git add public/ src/
git status --short
# If anything is staged from Step 4 fixes:
git commit -m "fix(redesign): final visual cleanup from full-site walkthrough"
# If only vite.svg deletion:
git rm public/vite.svg
git commit -m "chore(redesign): remove unused vite.svg favicon"
```

(If both apply, do them in sequence as two commits.)

- [ ] **Step 6: Push the branch**

```bash
git push -u origin redesign/editorial
```

Expected: branch created on origin; output includes a PR-creation URL.

- [ ] **Step 7: Open PR to `main`**

```bash
gh pr create --title "Editorial redesign: navy + cream + gold theme" --body "$(cat <<'EOF'
## Summary

- Full UI rewrite of every section — Navigation, Hero, About, Practice, Work, Press, Contact, Footer — to the editorial navy + cream + gold design from the design package.
- Replaced the entire Tailwind v4 `@theme` palette and font stack (Fraunces + Inter + JetBrains Mono); ported section-scoped CSS for things Tailwind can't express cleanly (CSS-drawn brackets, marquee/float/pulse, accordion expand).
- Removed `CredibilityBar` and `ServiceCard`; renamed `Services` → `Practice` (accordion list); refactored `WorkCard` for image-bg variant.
- Hero stat 2 ratified as `Trusted by / Sovereign & Institutional Clients` (the `12+` figure was inaccurate).
- Logo bitmap repurposed as favicon + og:image; visible mark is now the CSS-drawn bracket wordmark.
- Footer email canonicalized to `hello@theoasisgroup.xyz` and YouTube link wired to `@OasisFrontierFounders`.
- Spec: `docs/superpowers/specs/2026-05-04-oasis-redesign-design.md`.

## Test plan

- [ ] Click through Netlify deploy preview URL.
- [ ] Walk every section against `design_handoff_oasis_redesign/screenshots/01..07`.
- [ ] Submit a real form via the deploy preview; confirm Netlify Forms received the inquiry in the dashboard.
- [ ] Test on mobile (375px) and the 880px breakpoint.
- [ ] Test with reduced motion enabled.
- [ ] Test on Safari (desktop + iOS) — bracket pseudo-elements + backdrop-filter.

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```

Expected: returns a PR URL.

- [ ] **Step 8: Click through Netlify deploy preview and submit a real inquiry**

When the PR's Netlify deploy preview comment appears (~2 min), open the deploy preview URL. Submit a test inquiry through the contact form. Then check the Netlify site dashboard → Forms → Submissions to confirm the inquiry arrived. If it didn't, the `data-netlify="true"` / hidden form-name input in `src/components/Contact.tsx` or the detector form in `index.html` is wrong; debug and push a fix commit.

- [ ] **Step 9: Update memory note (after merge, optional)**

After the PR is merged, update `/home/stef/.claude/projects/-home-stef-Oasis-Group-Site/memory/MEMORY.md` (and the underlying file referenced) so the "Artisand link is deactivated" note no longer reflects production. The link is once again active per spec decision #1.

(This step is not blocking the PR — it's housekeeping for the next conversation.)

---

## Spec coverage check

Run this against the spec at `docs/superpowers/specs/2026-05-04-oasis-redesign-design.md`:

| Spec section | Implemented in |
|---|---|
| §2 In scope: full UI rewrite of every section | Tasks 4–7 |
| §2 In scope: replace `@theme` palette + font stack | Task 1 |
| §2 In scope: remove `CredibilityBar`, `ServiceCard` | Task 4 step 3, Task 6 step 5 |
| §2 In scope: rename `Services.tsx → Practice.tsx` | Task 5 step 2 |
| §2 In scope: new `Reveal`, `BracketWordmark`, `GlobeArt` | Task 3 |
| §2 In scope: favicon + og:image | Task 1 step 2 |
| §2 In scope: `prefers-reduced-motion`, `aria-expanded`, form labels | Task 2 (CSS), Task 4 (nav burger), Task 7 (form labels) |
| §4 Decision 1: Artisand link active | Task 6 step 3 (`href="https://www.artisand.art"` in featured) |
| §4 Decision 2: hero stat 2 = `Trusted by / Sovereign & Institutional Clients` | Task 4 step 2 |
| §4 Decision 3: PNG logo as favicon + og:image | Task 1 step 2 |
| §4 Decision 4: branch `redesign/editorial` PR-merged | Task 0, Task 8 step 7 |
| §5 Design tokens: full palette + fonts | Task 1 step 1 |
| §6 Component map: every row | Tasks 1–7 |
| §7 Asset migration | Task 6 step 1, Task 8 step 2 |
| §8 OQ-1: footer email = `hello@theoasisgroup.xyz` | Task 7 step 2 (footer "Connect" Email) |
| §8 OQ-2: YouTube → `@OasisFrontierFounders` | Task 7 step 2 (footer "Connect" YouTube) |
| §9 Animations: Reveal, scroll, scrollspy underline, hero float, globe pulse, marquee, practice hover/open, work hover, button hover, selection | Task 2 (all keyframes + transitions); Task 3 (Reveal hook); Task 4 (scroll listener + scrollspy class); Task 5 (`open` state on practice rows) |
| §10 Accessibility | Task 4 step 1 (nav burger `aria-expanded`); Task 7 step 1 (form `<label htmlFor>`); Task 2 (reduced-motion media queries) |
| §12 Verification plan | Task 8 step 4 + step 8 |
| §13 Risks: old token cleanup | Task 8 step 1 (grep) |

If any row above can't be satisfied by the listed task, add the missing step before starting execution.
