---
version: "alpha"
name: "Timberon Cabinets"
description: "Warm, material-focused, and trade-direct. A cabinet maker's brand that leads with craftsmanship, local roots, and a clear quote path."
colors:
  primary: "#2C1810"
  on-primary: "#ffffff"
  secondary: "#F6F3EE"
  accent: "#111111"
  neutral: "#ffffff"
  surface: "#F6F3EE"
  text: "#111111"
  text-muted: "#6E675F"
  border: "#DDD7CF"
typography:
  h1:
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "clamp(4rem, 9vw, 8rem)"
    fontWeight: 500
    lineHeight: 1.02
    letterSpacing: "0em"
  h2:
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "1.75rem"
    fontWeight: 500
    lineHeight: 1.286
    letterSpacing: "0em"
  body:
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.75
    letterSpacing: "0em"
  eyebrow:
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.667
    letterSpacing: "0.08em"
rounded:
  xs: "2px"
  sm: "4px"
  md: "8px"
  pill: "999px"
spacing:
  xs: "0.25rem"
  sm: "0.5rem"
  md: "1rem"
  lg: "1.5rem"
  xl: "2rem"
  section: "clamp(4rem, 9vw, 7rem)"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.xs}"
    padding: "0.75rem 1.1rem"
    textTransform: "uppercase"
  button-secondary:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.text}"
    rounded: "{rounded.xs}"
    padding: "0.75rem 1.1rem"
  link:
    textColor: "{colors.accent}"
  muted-text:
    textColor: "{colors.text-muted}"
  divider:
    backgroundColor: "{colors.border}"
  section-surface:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
  card:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.text}"
    rounded: "{rounded.md}"
---

## Overview

Timberon Cabinets is a Thomastown-based cabinet maker serving northern Melbourne. Their current site is Squarespace 7.0 — clean enough, but template-driven and stagnant. The concept homepage should feel like an upgrade their current brand deserves, not a replacement or rebrand.

The design language is warm, material-conscious, and professional without being luxury. Think "your trusted local cabinet maker" not "bespoke design studio." Photography carries the emotional weight; the layout stays out of the way.

## Colors

The palette is grounded, warm, and trade-direct. It replaces the template's default blue with a warm dark brown that reads as solid and crafted.

- **Primary (#2C1810):** Default action color. A warm dark brown — button fills, links, accent elements. Reads as reliable, not trendy.
- **On Primary (#ffffff):** Text on primary backgrounds. Preserves WCAG AA contrast.
- **Accent (#111111):** Strong near-black for headings and brand marks. Keeps sharp definition against warm backgrounds.
- **Surface (#F6F3EE):** Warm off-white section background for separating content bands. The warmth should be barely perceptible — just enough to avoid the coolness of pure #f7f7f7.
- **Text (#111111):** Main readable foreground.
- **Text Muted (#6E675F):** Paragraphs, captions, metadata, and secondary labels. A warm mid-grey.
- **Border (#DDD7CF):** Warm-toned border. Avoids the sterile blue-grey of typical web borders.
- **Neutral (#ffffff):** Page background and card surfaces. Clean, open, lets photography do the work.

Update colors in this order: `--brand-primary`, `--brand-primary-contrast`, `--brand-name-color`, `--brand-secondary`, then `--brand-accent`. Component-specific color overrides should come only after semantic aliases are insufficient.

## Typography

The system uses Inter by default through `--font-sans`, with system fallbacks. Typography stays direct and trade-confident. No decorative flourishes — the confidence is in the words, not the font choice.

Use one `h1` per page. The hero/display heading uses Inter at 500 weight with tight line-height — this reads solid and crafted, matching the "built to last" message. Inner pages use `PageIntro` and tighter hierarchy. Keep letter spacing at `0` for normal headings and body text. Reserve uppercase tracking for small eyebrow labels and navigation only.

Change `--font-body` and `--font-display` only if a clear brand direction emerges. Avoid adding web font dependencies unless they materially improve the finished comp.

## Layout

Use `Section` for vertical rhythm and background variants. Use `.container` and `.container--narrow` for readable line lengths. Pages should be small and direct: cabinet buyers need clarity, proof of quality, and a clear contact path.

### 12-Column Grid

The template provides a `.grid-12` utility class backed by `--grid-columns` and `--grid-gap` tokens in `tokens.css`. Use it for section-level layouts that need precise column placement:

```css
/* Defined in theme.css */
.grid-12 {
  display: grid;
  grid-template-columns: repeat(var(--grid-columns, 12), 1fr);
  gap: var(--grid-gap);
}
```

Component children place themselves with `grid-column: span N` or `grid-column: M / span N`. On viewports ≤720px the grid collapses to a single column. This is the only grid utility in the template — avoid adding opinionated 6-column or other variants.

### Animation Approach

**Simple entrances:** Use CSS `.reveal` / `.reveal--visible` classes (defined in `theme.css`) paired with the IntersectionObserver utility in `src/lib/reveal.ts`. This is zero-dependency and sufficient for most fade-in/slide-up content reveals.

```ts
// In any page <script>:
import { observeReveal } from '../lib/reveal';
observeReveal(document);
```

**Image reveals:** Add `.reveal-image` instead of `.reveal` for a clip-path wipe-from-bottom entrance.

**Complex animations:** When you need sequenced staggers, parallax, scroll-driven timelines, or text-splitting effects, use GSAP + ScrollTrigger + SplitText (all three are already dependencies in `package.json`). The homepage provides working examples of:
- Hero h1 line-by-line blur-in stagger
- Per-character h2/h3 blur-to-clear reveals on scroll
- Staggered grid-item entrances

Prefer CSS reveals for simple cases; reach for GSAP only when the animation complexity warrants it, or when CSS-only approaches feel clunky.

**Homepage order:**
1. Hero (image-full) — detail or process shot, headline, two CTAs
2. Service grid (icon-grid) — room categories: kitchens, bathrooms, laundries, wardrobes, cabinetry
3. Testimonials (grid) — real client quotes
4. Logo trust strip — subtle trade association credibility
5. Gallery (portfolio) — 6 project shots with suburb-based descriptions
6. FAQs — process, timeline, materials, pricing
7. CTA band — quote contact prompt

For a new client, change in this order:
1. `src/content/settings/site.json`: name, description, URL, contact details, CTA.
2. Brand color primitives in `src/styles/tokens.css`.
3. Font variables if the brand has a clear type direction.
4. Section rhythm and radii only if the client needs a sharper, softer, denser, or more editorial style.
5. Component-specific CSS only after the global tokens are insufficient.

Visit `/blocks/` during local preview to compare available component variants before creating new components.

## Elevation & Depth

The system favors borders, spacing, and surface changes over heavy shadows. Use `--shadow-subtle` only for small lifts where a component needs separation. Avoid gradient-heavy backgrounds, decorative blobs, nested card layouts, and default stock-like visual effects.

Real client photography (85 images pulled from their current site across kitchens, bathrooms, laundries, and joinery) should replace all placeholders. The images are the decoration.

## Shapes

Radii are restrained: `2px`, `4px`, and `8px` cover most UI needs. Buttons default to `2px` (nearly square, warm/editorial). Cards and repeated content items may use `8px`. Gallery images have no radius — let them bleed full. Pill radius is reserved for compact tags or controls where the shape is expected.

For Timberon (trade / local service): preserve simple radii and strengthen CTA clarity. Warm neutrals, straightforward shapes, photography as the hero.

## Components

Compose pages from existing components before creating new ones. Prefer collection-driven components for services, posts, testimonials, and FAQs.

Use `Hero` only on the home page. Use `PageIntro` for inner pages.

Current variant surface:

- `Hero`: `image-full` is the right choice for Timberon. Full-bleed background photo with a dark overlay gradient, condensed uppercase heading, solid-light and outline-light buttons.
- `ServiceGrid`: `icon-grid`. Each room type gets an icon and a short description. The fallback icons in `ServiceGrid.astro` map well to cabinet-making (tool, grid, cross-section, wrench).
- `Testimonials`: `grid` layout.
- `GalleryBlock`: `portfolio` variant with horizontal scrolling track. Project images with suburb-based descriptions.
- `CTABand`: `band` variant for the footer CTA. Should feel substantial without being aggressive.

Client-editable homepage variant controls live in `src/content/pages/home.json` and Decap's Pages collection. Keep client-editable variant controls limited to safe layout choices. Do not expose raw spacing, color, typography, or arbitrary component controls to clients.

## Do's and Don'ts

Do keep copy specific to Timberon: real service details, real client quotes (Jane Gorman Interior Decorators, Sarah Chen, Mark & Lisa D'Amico), real suburbs, real contact info.

Do lead with the quote path — that is the gap their current site has (0 forms, no quote flow).

Do use their real project photography. It is the strongest brand asset they have.

Do write copy that sounds like a cabinet maker talking to a homeowner. Direct, benefit-led, material-conscious.

Don't use stock imagery of cabinetry.

Don't cool-blue the palette. Timberon is a warm-material brand.

Don't add decorative CSS effects — no parallax, no particle backgrounds, no animated counters.

Don't over-design the form. Make it functional and obvious.

Don't call attention to the fact that it is a concept. No mockup labels, no disclaimers in the UI.

Don't introduce a second accent colour until the primary palette is settled.

Don't let the template's neutral defaults become the final brand direction.
