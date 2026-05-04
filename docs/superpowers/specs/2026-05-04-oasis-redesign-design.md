# The Oasis Group — Editorial Redesign

**Status:** Approved 2026-05-04 · Ready for implementation planning
**Branch:** `redesign/editorial` (PR-merged to `main` at completion)
**Source design package:** `Oasis Group Site.zip` → `design_handoff_oasis_redesign/`

## 1. Goal

Replace the existing dark-mode + teal/orange treatment with an **editorial / institutional-authority** aesthetic — deep navy + warm cream + gold accent, Fraunces serif + Inter sans + JetBrains Mono pairing, bracket motif drawn from the logo. Single-page marketing site for a boutique consultancy and venture studio. The audience is government officials, central bank advisors, and institutional decision-makers; every choice prioritizes credibility, restraint, and craft.

The handoff README in the design package is the canonical visual spec. This document captures the **deltas, decisions, and execution plan** required to recreate it inside the existing React 19 + TypeScript + Tailwind v4 + Vite codebase.

## 2. In scope

- Full UI rewrite of every section (Navigation, Hero, About, Practice, Work, Press, Contact, Footer).
- Replacement of the entire Tailwind `@theme` palette and font stack in `src/index.css`.
- Removal of `CredibilityBar.tsx` and `ServiceCard.tsx`.
- Rename `Services.tsx` → `Practice.tsx` (and update App.tsx + section anchor).
- Three new shared components: `BracketWordmark`, `Reveal`, `GlobeArt`.
- Favicon + OpenGraph image upgrade using the existing logo asset.
- Accessibility tightening: `prefers-reduced-motion` guard for animations, `aria-expanded` on nav burger, proper `<label>` elements on form fields.

## 3. Out of scope

- Backend/API work — Netlify Forms wiring is already correct and stays.
- Routing or multi-page expansion (still single-page).
- CMS migration; copy is hard-coded.
- New copy or messaging beyond what the design package specifies.
- A dedicated `/case-studies/artisand` route (the handoff calls this out as a future possibility — not now).

## 4. Confirmed decisions (from brainstorming, 2026-05-04)

| # | Question | Decision |
|---|---|---|
| 1 | Artisand featured case study CTA — keep "Coming Soon" (current production state) or restore active link? | **Active link.** `Visit Artisand ↗` → `https://www.artisand.art` (`target="_blank" rel="noopener noreferrer"`). The "disabled link as `<span>`" branch added to `WorkCard.tsx` on 2026-02-11 is no longer needed and will be removed. |
| 2 | Hero stats — handoff specifies a `12+ / Sovereign & institutional clients` figure that's not accurate. | **Repurpose middle stat as non-numeric editorial label.** Big slot reads `Trusted by` (Fraunces 350, gold), label reads `Sovereign & Institutional Clients` (mono uppercase). Other two stats unchanged: `2017 / Advising on digital currency` and `3 / Live ventures in production`. |
| 3 | Existing PNG/WebP logo at `public/images/oasis-logo.{png,webp}` — keep, drop, or repurpose? | **Repurpose as favicon + og:image only.** Visible nav and footer use the new CSS-drawn `[ THE OASIS GROUP ]` bracket wordmark. The bitmap finally pulls weight as `<link rel="icon">` and `<meta property="og:image">` (the site currently ships the default `vite.svg` favicon and no og image). |
| 4 | Branch / rollout strategy. | **Feature branch `redesign/editorial`, PR-merged to `main` at completion.** Live site stays on the current design until merge; Netlify deploy preview on the branch is the review surface. |

## 5. Design tokens

Replace the entire `@theme` block in `src/index.css` (currently at src/index.css:3–18) with the palette from the handoff README §Design Tokens. Summary:

- **Navy scale** (primary surface): `--color-navy-900: #0A1B33` through `--color-navy-600: #25406A`, plus helper `--color-navy-line: rgba(255,255,255,0.08)`.
- **Cream scale** (light surface): `--color-cream-50: #F7F3E8` through `--color-cream-300: #D4CCB4`.
- **Ink scale** (text on light): `--color-ink-900: #0A1B33` through `--color-ink-400: #7A8094`.
- **Gold accent**: `--color-gold-500: #C9A961`, `--color-gold-400: #D9BC78`, `--color-gold-300: #E4CC95`.
- **Secondary teal**: `--color-teal-500: #5B8B95`, `--color-teal-400: #7BA8B0`.
- **Coral** (form errors only): `--color-coral-500: #D9764A`.
- **Fonts**: `--font-serif: 'Fraunces', ...; --font-sans: 'Inter', ...; --font-mono: 'JetBrains Mono', ...`.

Old tokens (`--color-obsidian`, `--color-electric-teal`, `--color-cantaloupe`, `--color-cool-white`, `--color-slate-dark`, `--color-slate-card`, `--color-oasisDeep`, `--color-oasisAction`, `--color-oasisSunset`, `--color-oasisLight`, `--font-family-inter`) are removed.

The `@layer components` helpers in src/index.css:32–55 (`.btn-primary`, `.btn-secondary`, `.link-teal`, `.section-light`, `.section-dark`, `.container-main`) are also removed — the new design uses Tailwind utilities directly plus a small set of section-scoped CSS rules for the bracket pseudo-elements, marquee, float/pulse keyframes, accordion `max-height` transition, and Reveal opacity/transform.

**Update `index.html` `<link>` for fonts** (currently index.html:11) to:

```html
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,350;0,9..144,400;0,9..144,500;1,9..144,300;1,9..144,400&family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
```

## 6. Component map

| File | Action | Notes |
|---|---|---|
| `src/index.css` | Rewrite | New `@theme` tokens; new section-scoped CSS for bracket motifs, marquee, float, pulse, Reveal, accordion expand. Keep `html { scroll-behavior: smooth }`. |
| `index.html` | Update | New Google Fonts link; favicon + og:image meta tags pointing at `/images/oasis-logo.png`. Keep hidden Netlify form. |
| `src/App.tsx` | Update | Drop `CredibilityBar` import; rename `Services` import to `Practice`. |
| `src/components/Navigation.tsx` | Full rewrite | Fixed nav, scrollspy (active link based on `getBoundingClientRect`), mobile burger with `aria-expanded`, `BracketWordmark` as the visible mark. Anchor list: `about`, `practice`, `work`, `contact`. |
| `src/components/Hero.tsx` | Full rewrite | Two-column grid 1.1fr/0.9fr; eyebrow + headline + sub + buttons + stats row (with edit per decision #2); `GlobeArt` framed by four corner brackets and an inner hairline frame, top-right meta label "Reach Caribbean → East Africa", `float-slow` 6s animation. Bottom marquee absolute-positioned with the eight client/venture names, duplicated for seamless loop, 40s linear infinite. |
| `src/components/About.tsx` | Full rewrite | Section header pattern (eyebrow `[ 01 ] Our Mission`, serif title `Builders, not just advisors.` italic gold word) + 2-col grid: 3 paragraphs left, navy founder pull-quote card right with gold corner brackets. Copy verbatim from `prototype/components/sections-1.jsx → About`. |
| `src/components/Services.tsx` → **rename to `src/components/Practice.tsx`** | Full rewrite | Section header `[ 02 ] What we do` / `Expertise at the edge.` + accordion list of three rows. First row open by default. Each row: `[ 0n ]` mono gold + tag/title column + desc column + meta + `+` toggle. Hover: indent 12px right and gold gradient sweep. Open: `max-height` expand to 600px over 520ms, toggle icon rotates 45° to ×. Detail panel has capabilities list with gold `→` bullets and italic proof points. Three rows: Digital Currency & Financial Infrastructure (Primary Focus), Applied AI & Emerging Tech (Growing Practice), Digital Coordination & Governance (Supporting Practice). Copy verbatim from `prototype/components/sections-1.jsx → practiceAreas`. Mobile: 2-col, hide desc/meta. |
| `src/components/ServiceCard.tsx` | **Delete** | No longer used. |
| `src/components/Work.tsx` | Full rewrite | Section header `[ 03 ] Our Work` / `Theory meets practice.` + featured Artisand case study + 3-card portfolio grid. Featured: 2-col, navy bg spanning both halves, left half is `artisand-screen2.png` cover-fitted, right half is body with primary CTA `Visit Artisand ↗` (active per decision #1). Grid: DARE Advisor (text card), Oasis Onchain (image-bg variant using `oasis-onchain-event.jpeg`), Frontier Founders (text card). All open in new tab. |
| `src/components/WorkCard.tsx` | Refactor | Accept `img?: string` prop for image-bg variant. The image-bg variant overlays a `linear-gradient(rgba(10,27,51,0.35) → rgba(10,27,51,0.82))` and stays white-text always (no hover flip). Remove the "disabled link as `<span>`" branch added 2026-02-11 — no longer needed. |
| `src/components/CredibilityBar.tsx` | **Delete** | Replaced by hero marquee. Remove from `App.tsx`. |
| `src/components/Press.tsx` | Full rewrite | Standalone band between Work and Contact. `cream-100` bg, hairline borders top/bottom, 56px vertical padding. 3-col grid: mono `In the press` / serif italic 22px quote / large serif "Forbes ↗" link to the Forbes article. |
| `src/components/Contact.tsx` | Full rewrite | `cream-100` section, centered card with navy shadow. Left half navy with concentric gold circles decoration, eyebrow `Editorial`, title `Join us at the frontier.`, blurb, meta rows for email + LinkedIn. Right half white form. Fields: name + email (2-col), organization, interest area select (5 options), message textarea. Validation: name/email/org/message required, email regex `^[^@\s]+@[^@\s]+\.[^@\s]+$`. On 2xx submit: swap form for gold-circle checkmark badge + "Inquiry received." + "We'll be in touch within two business days." **Keep existing Netlify Forms wiring** (`data-netlify="true"`, hidden form-name input — the prototype's `setTimeout` is design-time-only). |
| `src/components/Footer.tsx` | Full rewrite | Navy bg, 4-col grid (1.4 / 0.8 / 0.8 / 0.8): brand wordmark + tagline / Practice anchors / Ventures anchors / Connect (Email, LinkedIn, YouTube). Bottom bar with copyright + tagline. Mobile: 2-col grid. |
| `src/components/Reveal.tsx` *(new)* | Create | IntersectionObserver wrapper, `threshold: 0.12`, `rootMargin: '0px 0px -8% 0px'`. Optional `delay` prop for stagger. Adds `reveal in` class when intersecting. Animations gated behind `@media (prefers-reduced-motion: no-preference)`. |
| `src/components/BracketWordmark.tsx` *(new)* | Create | Reusable text wordmark "THE OASIS GROUP" with CSS-drawn brackets via `::before`/`::after` pseudo-elements (8px wide, 1.5px borders, three sides only). Props: `size` (`sm`/`md`/`lg`) and `light` (boolean for color). Used in nav and footer. |
| `src/components/GlobeArt.tsx` *(new)* | Create | Inline SVG from `prototype/components/shared.jsx → GlobeArt`. Nested ellipses for latitudes/longitudes, gold connection arcs between Caribbean/Caribbean→East Africa nodes, pulsing rings at each node (`pulse-ring 3s ease-out infinite`, staggered by 0.5s per node). |

## 7. Asset migration

Copy from `design_handoff_oasis_redesign/prototype/assets/` into `public/images/`:

- `artisand-screen2.png` — featured case study image (Artisand homepage, used cover-fitted top-center).
- `oasis-onchain-event.jpeg` — Oasis Onchain card background.

Keep but reposition:
- `public/images/oasis-logo.png` and `.webp` — now favicon + og:image only, not rendered visibly.

Delete:
- `public/vite.svg` — no longer the favicon.
- `Oasis Group logo.png` (3.2 MB original at repo root) — leave for now, decision #3 only governs `public/images/`. Optional cleanup: move to `assets/` outside the public dir, or delete entirely if no future use.

Skip:
- `artisand-screen.jpg` — alternate Artisand crop kept for reference, not used in the final design.
- `prototype/styles.css`, `prototype/components/*.jsx`, `prototype/index.html`, `prototype/tweaks-panel.jsx` — design references, do not port verbatim. Translate to Tailwind + targeted custom CSS.

## 8. Open questions raised by prototype inconsistencies

The prototype has two minor inconsistencies that need a one-line decision before implementation. These are small enough to ratify in code review rather than block here, but recording them so they're not forgotten:

| # | Inconsistency | Default to ship | Override? |
|---|---|---|---|
| OQ-1 | Footer email link uses `inquiry@theoasisgroup.xyz`; contact section meta row uses `hello@theoasisgroup.xyz`. | Use `hello@theoasisgroup.xyz` everywhere (contact section is the canonical place users will read it; consistency wins over the footer's variant). | If you'd rather route footer "Email" link to a different address, say so during review. |
| OQ-2 | Footer "Connect" column has a YouTube link with `href="#"` (placeholder). | Point it at `https://www.youtube.com/@OasisFrontierFounders` (same URL as the Frontier Founders work card). | If a different channel is correct, say so during review. |

## 9. Interactions & animations (faithful to handoff)

| Element | Animation | Spec |
|---|---|---|
| Reveal-on-scroll | Fade + translate-y | `opacity: 0 → 1`, `translateY(24px) → 0`, `800ms ease`. IntersectionObserver, threshold 0.12, rootMargin -8% bottom. Optional `delay` for stagger. |
| Nav scroll state | bg + padding transition | `320ms ease`. Triggers at `scrollY > 40`. Background `rgba(10,27,51,0.92)` with `backdrop-filter: blur(14px) saturate(140%)`, padding collapses 18px→12px, hairline border appears. |
| Nav scrollspy | Active link underline | `::after` pseudo-element animates `right: 100% → 0` over 320ms cubic-bezier(.4,0,.2,1) on hover or active. |
| Hero art | Float | `translateY(0 → -8px → 0)` over 6s ease-in-out infinite. |
| Globe nodes | Pulse | `scale(1) → scale(1.6); opacity 0.4 → 0` over 3s ease-out infinite. Stagger each node by 0.5s. |
| Marquee | Linear scroll | `translateX(0 → -50%)` over 40s linear infinite. Track is content × 2 (eight names duplicated). |
| Practice row hover | Indent + gradient sweep | Padding-left `0 → 12px` (320ms), `::before` gradient pseudo-element width `0 → 100%` (480ms). |
| Practice row open | Detail expand | `max-height: 0 → 600px` over 520ms cubic-bezier(.4,0,.2,1). Toggle icon rotates 45° (320ms). |
| Work card hover | Color flip + lift | Bg cream-100 → navy-900, all text colors swap to white, `translateY(-4px)`. 320ms cubic-bezier(.4,0,.2,1). Image-bg variant skips this — stays white-text always. |
| CTA button hover | Lift + shadow | `translateY(-1px)` + `box-shadow: 0 14px 28px -12px rgba(201,169,97,0.5)`. Arrow translates 4px right. |
| Selection | Highlight | `::selection { background: gold-500; color: navy-900 }`. |

All animations gated behind `@media (prefers-reduced-motion: no-preference)`.

## 10. Accessibility

- All form inputs have visible `<label>` elements above each field (already in the prototype design — keep).
- Nav burger toggles `aria-expanded` matching the `mobileOpen` state.
- All animations skip when `prefers-reduced-motion: reduce`.
- All interactive elements are keyboard-accessible — anchors are real `<a>` tags, the burger and toggle are real `<button>` tags.
- Color contrast: gold (#C9A961) on navy passes AA for large text only. Use it for headings/eyebrows/icons; never for sustained body copy on dark backgrounds. (Body copy on dark uses `rgba(255,255,255,0.66)` / `0.72` / `0.78`.)

## 11. Implementation phases (for writing-plans)

This is a sketch of the phasing the implementation plan should follow. Each phase ends with a clean build and visual sanity check before moving on.

1. **Cut branch + theme swap.** Create `redesign/editorial`. Replace `@theme` block in `src/index.css`, swap fonts in `index.html`, add favicon + og meta. Build should still compile (existing components will look broken in the old palette — that's expected; phase 2 fixes them).
2. **Shared primitives.** Add `Reveal.tsx`, `BracketWordmark.tsx`, `GlobeArt.tsx`. Add the section-scoped CSS rules (bracket motifs, marquee/float/pulse keyframes, accordion `max-height` transition, Reveal opacity/transform) to `src/index.css`.
3. **Hero + Navigation.** Rewrite both. Drop `CredibilityBar` from App.tsx and delete the file. Verify scrollspy, marquee, float, pulse, mobile burger.
4. **About + Practice.** Rewrite About (founder card with corner brackets). Rename Services.tsx → Practice.tsx, rewrite as accordion list with first row open by default. Update App.tsx import + section anchor `#services` → `#practice`.
5. **Work + Press.** Rewrite Work with featured case study + 3-card grid. Refactor WorkCard to accept `img` prop and remove the disabled-link branch. Delete ServiceCard.tsx. Rewrite Press as horizontal strip. Copy assets into `public/images/`.
6. **Contact + Footer.** Rewrite Contact with split card, validation, success state — keep Netlify Forms wiring intact. Rewrite Footer as 4-col grid + bottom bar.
7. **Verification + cleanup.** Run `npm run build` and `npm run lint`. Walk each section against the prototype screenshots in browser. Test interactions, mobile breakpoints, and reduced-motion. Push branch, click through Netlify deploy preview, submit a real form to confirm Netlify Forms received it. Open PR to `main`.

## 12. Verification plan

1. **TypeScript & lint clean** — `npm run build` (runs `tsc -b` first) and `npm run lint`.
2. **Per-section visual check** — `npm run dev` and walk each section against `design_handoff_oasis_redesign/screenshots/01..07`. Confirm spacing, color, typography weights, and bracket motifs match.
3. **Interaction smoke tests:**
   - Scrollspy activates the right nav link; gold underline animates right → 0.
   - Practice accordion: first row opens by default; clicking another row toggles cleanly with the 520ms expand; toggle icon rotates 45°.
   - Work cards: hover flips card from cream-100 to navy-900 with 4px lift; Oasis Onchain card stays white-text always (no flip).
   - Marquee: seamless loop (no gap when track resets at -50%).
   - Hero art: float animation runs; globe nodes pulse with 0.5s stagger.
   - Form: submit valid + invalid inputs, confirm coral error states + success state render.
4. **Mobile** — resize to 375px and to 880px breakpoint. Confirm nav collapses to burger, practice accordion collapses to 2-col, work grid stacks, contact card stacks.
5. **Reduced motion** — toggle OS setting and confirm Reveal/marquee/float/pulse stop animating.
6. **Netlify deploy preview** — push branch, click through deploy preview URL, submit a real form to confirm Netlify Forms received it.

## 13. Risks & mitigations

| Risk | Mitigation |
|---|---|
| Old Tailwind tokens (e.g., `bg-oasisDeep`, `text-electric-teal`) referenced in JSX `className` strings won't error — Tailwind v4 silently drops unknown classes and the build succeeds with missing styles. | Before phase 1, grep the codebase for every old token name (`oasisDeep`, `oasisAction`, `oasisSunset`, `oasisLight`, `obsidian`, `electric-teal`, `cantaloupe`, `cool-white`, `slate-dark`, `slate-card`) and record every hit. Each component rewrite in phases 3–6 must remove all hits in that file. After phase 7, re-run the grep and confirm zero matches. (`@apply` directives in `src/index.css` *will* error if they reference removed tokens — that's a useful tripwire during phase 1, since the old `@layer components` block uses several.) |
| Netlify Forms wiring breaks during the Contact rewrite. | The hidden detector form in `index.html` (index.html:14–20) and the `data-netlify="true"` + `<input name="form-name" hidden value="contact">` pattern are independent of the visible JSX. Preserve those exact attributes verbatim during the rewrite; submit a real test inquiry through the Netlify deploy preview before merging. |
| The CSS-drawn bracket wordmark doesn't render correctly in Safari (older `border` + pseudo-element layouts can drift). | Test on Safari (desktop + iOS) during phase 2 sanity check. Falls back gracefully to text-only if pseudo-elements fail (the brackets are decorative, not load-bearing). |
| Custom fonts FOUT/FOIT during slow loads ruins editorial feel. | `&display=swap` in the Google Fonts link keeps text legible during load; Inter is the body fallback for Fraunces (similar metrics enough that swap is non-jarring). |
| Memory note about Artisand link being deactivated will go stale after this redesign. | Update the project memory entry after merge (Artisand link is once again active per decision #1). |

## 14. References

- Design package: `Oasis Group Site.zip` → `design_handoff_oasis_redesign/`
  - `README.md` — full handoff (canonical visual spec)
  - `prototype/components/header.jsx` — Navigation + Hero source
  - `prototype/components/sections-1.jsx` — About + Practice source (with verbatim copy)
  - `prototype/components/sections-2.jsx` — Work + Press source
  - `prototype/components/sections-3.jsx` — Contact + Footer source
  - `prototype/components/shared.jsx` — BracketWordmark, Reveal, GlobeArt, TopoArt source
  - `prototype/styles.css` — design CSS reference
  - `screenshots/01-hero.png` … `07-footer.png` — desktop reference renders
- Existing codebase entry points: `src/App.tsx`, `src/index.css`, `index.html`, `src/components/`.
