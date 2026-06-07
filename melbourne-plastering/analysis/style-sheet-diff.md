# Style Sheet → Current Implementation Diff

**Date:** 2026-06-03  
**Style Sheet Image:** `media://inbound/d76c61af-f78f-4a5e-89ee-3959775c996c.png`  
**Live Site:** https://sylvgira.github.io/timberon-cabinets/  
**Repo:** `~/.openclaw/workspace/timberon-cabinets`

---

## 1. TOKEN-LEVEL DIFFERENCES

### 1.1 Colour Palette

| Token | Style Sheet | Current (`tokens.css`) | Match? | Action |
|-------|------------|------------------------|--------|--------|
| Near-black | `#111111` | `--color-ink: #111111` / `--brand-name-color: #111111` | ✅ | None |
| Warm off-white | `#F6F3EE` | `--brand-secondary: #F6F3EE` / `--color-soft: #F6F3EE` | ✅ | None |
| Pure white | `#FFFFFF` | `--color-white: #ffffff` | ✅ | None |
| Muted grey-brown | `#6E675F` | `--color-muted: #6E675F` | ✅ | None |
| Light beige-grey | `#DDD7CF` | `--color-border: #DDD7CF` | ✅ | None |
| Dark brown | `#2C1810` | `--brand-primary: #2C1810` | ✅ | None |

**Verdict:** Colour hex values are identical. No token-level colour changes needed. ✅

However, the **DESIGN.md** defines slightly different values (`--brand-accent: #1a1a1a`, `--color-text-muted: #6b6258`, `--color-border: #d4ccc4`) that were never reconciled with `tokens.css`. The style sheet aligns with `tokens.css`, not `DESIGN.md`. The DESIGN.md should be updated to match the style sheet's palette.

### 1.2 Typography

| Token | Style Sheet | Current (`tokens.css` + `theme.css`) | Match? | Action |
|-------|------------|--------------------------------------|--------|--------|
| **Display** | Inter 500, `clamp(4rem, 9vw, 8rem)` | `h1` weight 500, `--text-3xl: clamp(4rem, 9vw, 8rem)` | ✅ | None |
| **H1** | Inter **600**, **48px** / **56px** (1.167 line-height) | `h1` weight **500** (conflicts with Display), no separate H1 token | ❌ | **Add separate H1 token; hero uses Display (500), section headings use H1 (600, 48/56)** |
| **H2** | Inter **500**, **28px** / **36px** (~1.286 line-height) | `h2` weight **600**, `font-size: clamp(2rem, 4vw, var(--text-2xl))` = 32-36px | ❌ | **Change h2 weight to 500, add explicit 28px/1.75rem size token with 36px line-height** |
| **Body** | Inter 400, **16px** / **28px** (1.75 line-height) | body: `--text-base: 1rem` (16px), `--line-body: 1.65` (~26.4px) | ❌ | **Change `--line-body` from 1.65 to 1.75 to achieve 28px line-height** |
| **Eyebrow** | Inter **600**, **12px** / **20px** (1.667 line-height) | `.eyebrow`: weight **700**, `--text-xs: 0.78rem` (12.48px), `letter-spacing: 0.08em` | ❌ | **Change eyebrow to weight 600, size 12px/0.75rem, line-height 20px, keep tracking** |

**Summary of typography changes needed:**

```
--line-body: 1.75;              /* was 1.65 — achieve 28px at 16px */

/* New tokens to add: */
--text-h1: 3rem;               /* 48px */
--line-h1: 1.167;              /* 56px / 48px */

--text-h2: 1.75rem;            /* 28px */
--line-h2: 1.286;              /* 36px / 28px */
--weight-display: 500;         /* Display/hero */
--weight-h1: 600;              /* Section headings */
--weight-h2: 500;              /* Subsection headings */
--weight-eyebrow: 600;         /* was 700 */
```

### 1.3 Spacing Tokens

| Context | Style Sheet (inferred) | Current | Match? | Action |
|---------|----------------------|---------|--------|--------|
| Section padding (page margins) | ~40-64px | `--section-y: clamp(4rem, 9vw, 7rem)` | ✅ | Good |
| Between-section gap | ~32-48px | Compressed for same-colour sections | ⚠️ | Style sheet shows uniform spacing with dividers; current collapses same-colour |
| Card internal padding | ~16-24px | `--space-5: 1.5rem` (24px) for service cards | ✅ | Good |
| Button height | ~48-56px | `.button`: `min-height: 2.9rem` (46.4px) | ❌ | **Increase min-height to 3rem (48px) minimum** |
| Input height | ~48-56px | No standalone input style | N/A | See form section |
| Divider thickness | 1px | `1px solid var(--color-rule)` | ✅ | Good |

### 1.4 Button Tokens

| Property | Style Sheet | Current | Match? | Action |
|----------|------------|---------|--------|--------|
| Primary fill | `#2C1810` | `var(--color-button)` = `var(--brand-primary)` = `#2C1810` | ✅ | None |
| Primary text | White | `var(--color-button-text)` = `#ffffff` | ✅ | None |
| Text case | **UPPERCASE** | Normal (sentence case) | ❌ | **Add `text-transform: uppercase` to `.button`** |
| Border-radius | **Very minimal (~0-2px)** | `var(--radius-sm)` = `4px` | ❌ | **Change button radius to `var(--radius-xs)` = 2px or none** |
| Height | ~48-56px | `min-height: 2.9rem` (46.4px) | ❌ | **Increase to 3rem (48px)** |
| Right arrow | **Yes, shown as inline element** | Uses `&rarr;` in HTML text | ⚠️ | Style sheet shows dedicated arrow icon, not HTML entity |
| Secondary style | White background, thin hairline border | `button--secondary`: transparent bg, `var(--color-rule)` border | ⚠️ | **Style sheet secondary is white bg, light border — current is transparent bg** |
| Icon style | Thin stroke, monochrome dark | N/A (uses HTML `&rarr;`) | ❌ | **Need arrow SVG icon component** |

---

## 2. COMPONENT-LEVEL DIFFERENCES

### 2.1 Navigation / Header

**Style Sheet:**  
- Wordmark "TIMBERON / CABINETS" stacked logo on the left
- Nav links on the right: **WORK** | **SERVICES** | **ABOUT** | **PROCESS** | **CONTACT**
- All links uppercase, small (~10-12px), evenly spaced
- Container has a thin border all around
- Background is light/white/warm off-white
- **No CTA button in nav**
- Height: ~56-72px

**Current Implementation (`Header.astro` + hero overlay):**  
- Site name as text, single line: "Timberon Cabinets"
- Nav links: About | Services | News | Contact (NOT "Work" or "Process")
- Has a "Get a quote" CTA button on the right
- No container border — just a bottom border
- On home page: transparent overlay over hero with white text

**Changes needed:**

1. **Nav link labels**: Change "News" → "Work" (or add "Work" and reorder), add "Process"
2. **Remove CTA button from nav** — the style sheet does not show a nav CTA
3. **Link styling**: Smaller (`--text-xs` or ~11px), uppercase, increased tracking
4. **Brand lockup**: Style sheet shows stacked "TIMBERON / CABINETS" wordmark — current is inline text. If the stacked logo exists as an asset, use it; otherwise add CSS stacked lockup.
5. **Hero overlay nav**: When on home page, the transparent overlay nav with white text needs to match the style sheet's aesthetic (the style sheet nav looks separate from hero in its own container, not overlaid)

**Exact changes in `Header.astro`:**

```diff
 const nav: NavItem[] = [
+  { label: 'Work', href: '/services/' },
   { label: 'Services', href: '/services/' },
   { label: 'About', href: '/about/' },
-  { label: 'News', href: '/blog/' },
+  { label: 'Process', href: '/#process' },    /* or /about/#process */
   { label: 'Contact', href: '/contact/' }
 ];
```

```diff
-    <a class="site-header__cta button" href={site.ctaUrl ?? '/contact/'}>
-      {site.ctaLabel ?? 'Enquire'}
-    </a>
+    <!-- No CTA button in nav per style sheet -->
```

CSS changes in `Header.astro` `<style>`:

```diff
   .site-header__nav a {
-    color: var(--color-text-muted);
-    font-size: var(--text-sm);
-    font-weight: 600;
+    color: var(--color-text-muted);
+    font-size: 0.75rem;           /* ~11-12px */
+    font-weight: 600;
+    text-transform: uppercase;
+    letter-spacing: 0.08em;
     text-decoration: none;
   }
```

Grid layout change (remove CTA column):

```diff
   .site-header__inner {
     display: grid;
-    grid-template-columns: 1fr auto auto;
+    grid-template-columns: 1fr auto;
     gap: var(--space-5);
     align-items: center;
     min-height: 4.75rem;
   }
```

Remove the responsive CTA rules:

```diff
-    .site-header__cta {
-      justify-self: end;
-    }
```

Remove the home-hero overlay CTA style from `index.astro`:

```diff
-  body:has(.home-hero) .site-header__cta {
-    background: transparent;
-    color: #ffffff;
-    border-color: rgba(255, 255, 255, 0.35);
-  }
- 
-  body:has(.home-hero) .site-header__cta:hover {
-    border-color: #ffffff;
-  }
```

### 2.2 Hero (Home Page)

**Style Sheet:**  
- Full-bleed background image with minimal overlay  
- Large Display headline (Inter 500, `clamp(4rem, 9vw, 8rem)`)  
- Subtitle below, narrower width  
- Two CTAs: primary (filled dark brown) and secondary (outline)  
- Subtle scroll indicator arrow at bottom  

**Current Implementation (`index.astro` `.home-hero`):**  
- Full-bleed background ✅  
- Display headline with `var(--text-3xl)` ✅  
- Intro paragraph ✅  
- **Only ONE CTA button** (`home-hero__button`: dark brown `#2C1810` fill, white text)  
- No secondary CTA  
- No rule/divider between headline and body  
- Scroll indicator ✅  

**Changes needed:**

1. **Add secondary (outline) CTA** alongside primary. Style sheet shows filled primary + outline secondary.
2. **Add a thin horizontal rule** between headline and intro text (4rem wide, 1px, white at 35% opacity — the `Hero.astro` `image-full` variant already has this; `index.astro` does its own custom hero that lacks it)
3. **Button styling**: Primary button should be `#2C1810` with uppercase white text and arrow; secondary should be transparent outline with white border and white text

**Exact changes in `index.astro` hero section:**

```diff
         <p class="home-hero__intro reveal">{hero?.intro}</p>
+        <hr class="home-hero__rule" aria-hidden="true" />
         <div class="reveal">
           <a class="home-hero__button" href={hero?.primaryUrl ?? '/contact/'}>
             {hero?.primaryLabel ?? 'Get a quote'} &rarr;
           </a>
+          <a class="home-hero__button-secondary" href="/services/">
+            View our work &rarr;
+          </a>
         </div>
```

Add CSS:

```css
  .home-hero__rule {
    width: 4rem;
    height: 1px;
    margin: var(--space-5) 0 var(--space-6);
    border: none;
    background: rgba(255, 255, 255, 0.35);
  }

  .home-hero__button-secondary {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.85rem 1.5rem;
    background: transparent;
    color: #ffffff;
    font-weight: 600;
    font-size: var(--text-base);
    text-transform: uppercase;
    text-decoration: none;
    border: 1px solid rgba(255, 255, 255, 0.35);
    line-height: 1;
    transition: border-color 0.2s ease;
  }

  .home-hero__button-secondary:hover {
    border-color: #ffffff;
  }
```

### 2.3 Services Section

**Style Sheet (TARGET):**  
- 5 image tiles in a row: **Kitchens**, **Wardrobes**, **Bathrooms**, **Laundries**, **Custom Joinery**
- Each tile: photo thumbnail on top, label text below
- Label background: warm off-white (`#F6F3EE`)
- Label text: simple, no icons, no gold accents
- Tight spacing between tiles
- Section heading: "OUR SERVICES" as uppercase eyebrow

**Current Implementation (`index.astro` `.services-inline`):**  
- Already uses 5-column image+label grid ✅
- Labels in `#F6F3EE` (`var(--color-soft)`) blocks ✅
- Grid gap: `var(--space-4)` = 1rem (16px)  
- Image aspect ratio: 4/5 (portrait) ✅
- Heading: "OUR SERVICES" ✅

**Current `ServiceGrid.astro` (`icon-grid` variant):**  
- This is a **COMPLETELY DIFFERENT COMPONENT** that is NOT being used on the live page
- It uses a dark `#111111` background with gold SVG icons — **this does NOT match the style sheet at all**
- This component is referenced in `home.json` as `"servicesVariant": "icon-grid"` but is not rendered on the actual `index.astro` page

**Changes needed:**

1. **Remove the `icon-grid` variant from `ServiceGrid.astro`** — it contradicts the style sheet's warm, photo-driven direction
2. **The current `services-inline` in `index.astro` is largely correct** but needs:
   - Slightly tighter gap: `var(--space-3)` (0.75rem/12px) instead of `var(--space-4)` (16px)
   - Label font: confirm Inter 500, ~17.6px, `#111111` on `#F6F3EE`
   - The style sheet shows the labels as flat, minimal — no uppercase, no tracking
3. **Update `home.json`**: Remove `servicesVariant: "icon-grid"` or change to match

### 2.4 Selected Work / Projects Section

**Style Sheet (TARGET):**  
The style sheet shows a **split-card horizontal layout** for project showcases:

```
┌──────────────────────────────────────────────────────┐
│  ┌──────────────────┐  ┌─────────────────────────┐   │
│  │                  │  │ Armadale Residence      │   │
│  │                  │  │ ARMADALE, VIC            │   │
│  │   LARGE PHOTO    │  │ Description text here    │   │
│  │                  │  │                          │   │
│  │                  │  │          VIEW PROJECT →  │   │
│  └──────────────────┘  └─────────────────────────┘   │
└──────────────────────────────────────────────────────┘
```

- Image on the left (~60-65% width)
- Content panel on the right (~35-40% width) with warm cream background (`#F6F3EE`)
- Project title (large)
- Location in small uppercase eyebrow
- Description body text
- "VIEW PROJECT" CTA with arrow, aligned bottom-right
- Content panel background: `#F6F3EE`

**Current Implementation (`SelectedWork.astro`):**  
```
┌─────────┐ ┌─────────┐ ┌─────────┐
│  PHOTO  │ │  PHOTO  │ │  PHOTO  │
│         │ │         │ │         │
├─────────┤ ├─────────┤ ├─────────┤
│ Title   │ │ Title   │ │ Title   │
│ Suburb  │ │ Suburb  │ │ Suburb  │
│ T'stown │ │ T'stown │ │ T'stown │
└─────────┘ └─────────┘ └─────────┘
```

- 3-column grid of photo-above-text cards
- Image: 4/3 aspect ratio
- Text below: title + description inline + "Thomastown, VIC" location
- No split-panel layout, no cream panel background
- No "VIEW PROJECT" CTA
- Shows 6 projects in 3x2 grid

**Changes needed (MAJOR RESTRUCTURE):**

The style sheet shows a fundamentally different project card pattern. Need to:

1. **Replace 3-column grid with single-column split-card stack** — each project is its own horizontal split card
2. **Each card structure**: image (left, ~60%) + content panel (right, ~40%, `#F6F3EE` bg)
3. **Content panel**: project title (h3), location eyebrow (small uppercase), description, CTA link
4. **Remove the inline title+description row pattern**
5. **Add "VIEW PROJECT" CTA** in each card
6. **Image aspect ratio**: style sheet seems to show ~16:9 or wider for the project cards

**New `ProjectCard.astro` component or rewrite `SelectedWork.astro`:**

```css
/* New split-card layout replacing the grid */
.selected-work__card {
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: 0;
  margin-bottom: var(--space-6);
  text-decoration: none;
  color: inherit;
}

.selected-work__image-wrap {
  overflow: hidden;
  aspect-ratio: 16 / 10;
}

.selected-work__panel {
  padding: var(--space-6);
  background: var(--color-soft);   /* #F6F3EE */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.selected-work__title {
  font-family: var(--font-display);
  font-size: var(--text-xl);       /* ~1.75rem / 28px */
  font-weight: 500;
  line-height: var(--line-h2);
  color: var(--color-heading);
  margin-bottom: var(--space-3);
}

.selected-work__location {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  margin-bottom: var(--space-4);
}

.selected-work__body {
  font-size: var(--text-base);
  line-height: var(--line-body);
  color: var(--color-text-muted);
  margin-bottom: var(--space-5);
  flex: 1;
}

.selected-work__cta {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  align-self: flex-end;
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-text);
  text-transform: uppercase;
  text-decoration: none;
}
```

### 2.5 Process Steps Section

**Style Sheet (TARGET):**  
```
┌────────────┬────────────┬────────────┬────────────┐
│    01      │    02      │    03      │    04      │
│Consultation│   Design   │Manufacture │Installation│
│  We visit  │ CAD drawings│ Built in  │ Fitted by  │
│  your home │   ...      │  our ...   │  our team  │
└────────────┴────────────┴────────────┴────────────┘
```

- 4 equal columns across the full width
- **Thin vertical dividers between columns**
- Large step number (01, 02, 03, 04) — lighter weight, large
- Step title — mid-sized heading
- Short description — body text
- Very open spacing, editorial rhythm
- No side image

**Current Implementation (`ProcessStrip.astro`):**  
```
┌──────────────────┬──┬──────────┐
│  01 Consultation │  │          │
│  02 Design       │  │  PHOTO   │
│  03 Manufacture  │  │          │
│  04 Installation │  │          │
└──────────────────┴──┴──────────┘
```

- Split layout: steps on the left (~50%), thin vertical divider, image on the right (~50%)
- Steps are stacked vertically, not horizontally
- Numbers use `var(--brand-primary)` colour

**Changes needed (MAJOR RESTRUCTURE):**

1. **Change from vertical stack + side image to 4-column horizontal grid**
2. **Add thin vertical dividers between each step column**
3. **Remove the side image** — the style sheet's process section is text-only, editorial
4. **Numbers should be lighter/subtle**, not bold primary colour
5. **Step title and description remain same content**
6. **Add section heading "OUR PROCESS"** (style sheet shows this as a section label)

**New `ProcessStrip.astro` structure:**

```css
.process-strip__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;
}

.process-strip__step {
  padding: 0 var(--space-5);
  position: relative;
}

.process-strip__step + .process-strip__step {
  border-left: 1px solid var(--color-border);
}

.process-strip__number {
  display: block;
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 300;
  color: var(--color-text-muted);
  line-height: 1;
  margin-bottom: var(--space-4);
  opacity: 0.4;
}
```

### 2.6 Testimonial / Quote Section

**Style Sheet (TARGET):**  
```
┌──────┬──────────────────────────────────────┬──────────────┐
│      │  "Timberon's attention to detail     │  SAM & ALEX  │
│  ❝  │   and commitment to quality is        │  KOYONG, VIC │
│      │   evident in every aspect of         │              │
│      │   their work."                       │              │
└──────┴──────────────────────────────────────┴──────────────┘
```

- Three-part horizontal layout:
  - **Left**: dark brown (`#2C1810`) quote marker block with large quotation glyph
  - **Center**: quote text in readable body type
  - **Right**: author block **separated by a thin vertical divider**
- Quote marker is tall/narrow, not square
- Author area: name in bold, location below
- Center panel background: very light warm neutral
- Strong contrast between dark quote marker and pale quote field

**Current Implementation (`FeatureQuote.astro`):**  
```
┌──────┬──────────────────────────────────┬────────────┐
│      │  "We renovated our entire        │ Sarah Chen │
│  ❝  │   kitchen and Timberon built..."  │ Kitchen... │
└──────┴──────────────────────────────────┴────────────┘
```

- Same 3-column layout ✅
- Square quote marker (5rem × 5rem) with `#2C1810` background ✅
- Quote text in center ✅
- Attribution on right ✅
- **Missing: vertical divider between quote body and attribution!**

**Changes needed:**

1. **Add vertical divider** between `.feature-quote__body` and `.feature-quote__attribution`
2. **Quote marker dimensions**: Style sheet shows a taller/narrower block — current is square. Change to rectangle (~4rem wide × 5-6rem tall)
3. **Font**: The style sheet's quote glyph appears to use a serif "❝" which is already there (Georgia, serif) ✅
4. **Background**: `.feature-quote` uses `var(--color-section)` = `#F6F3EE`. Style sheet shows lighter quote area. ✅

**Exact CSS changes in `FeatureQuote.astro`:**

```diff
   .feature-quote__mark {
     display: flex;
     align-items: center;
     justify-content: center;
-    width: 5rem;
+    width: 4rem;
-    height: 5rem;
+    height: 7rem;
     background: var(--brand-primary);
     color: var(--brand-primary-contrast);
     flex-shrink: 0;
   }
```

```diff
+  .feature-quote__body {
+    position: relative;
+    padding-right: var(--space-6);
+  }
+
+  .feature-quote__body::after {
+    content: '';
+    position: absolute;
+    right: 0;
+    top: 0;
+    bottom: 0;
+    width: 1px;
+    background: var(--color-border);
+  }
```

### 2.7 CTA Section

**Style Sheet (TARGET):**  
The style sheet shows an **inline form row** CTA, not a standalone section:
```
┌──────────────┬──────────────┬──────────────────┐
│  Your name   │Email address │  SEND ENQUIRY →  │
└──────────────┴──────────────┴──────────────────┘
```

- Two text inputs + dark brown submit button in one row
- Inputs: white/off-white background, 1px light neutral border, ~48-56px height
- Button: `#2C1810` fill, white uppercase text, arrow

**Current Implementation (`index.astro` `.cta-split`):**  
```
┌──────────────────────────┬──────────┐
│ Let's create something   │          │
│ exceptional.             │  PHOTO   │
│                          │          │
│ Description text         │          │
│                          │          │
│ [Get a quote →]          │          │
└──────────────────────────┴──────────┘
```

- Two-column split: text left, image right
- Uses `#F6F3EE` background
- Single CTA button, no form

**DESIGN.md says:** "Use `CTABand`: `band` variant for the footer CTA. Should feel substantial without being aggressive." This aligns more with the style sheet, which shows a compact inline CTA rather than a large split section.

**Changes needed:**

1. **Replace `.cta-split` with an inline form/CTA band** matching the style sheet
2. **Add a horizontal form row**: two inputs + submit button
3. **OR:** If a full form is too complex for initial update, use the `CTABand` component with `band` variant — a horizontal text + button bar (less visual weight than the current split section)
4. **Heading**: Style sheet likely uses a smaller section heading, not the large split-block headline
5. **Remove the side image** — style sheet's CTA is compact, text/form focused

**Option A (minimal change — use CTABand):**
Replace the `.cta-split` with a `<CTABand>` component call, using a smaller heading and secondary tone.

**Option B (style sheet accurate — add form):**
Create a new inline form component matching the style sheet's 3-column input+input+button row.

### 2.8 Footer

**Style Sheet:**  
Footer detail is limited but the overall aesthetic suggests:
- Minimal footer
- Thin top border divider
- Brand name left, nav links center, copyright right
- Clean, warm off-white background

**Current Implementation (`Footer.astro`):**  
- 3-column grid: brand | nav | copyright ✅
- `--color-page` background ✅
- Has a `dark` variant with `#111111` bg — not used on homepage

**Changes needed:** Minimal. Current footer structure is appropriate. Consider:
- The `dark` variant is not shown in the style sheet — may want to remove or only use on inner pages
- Footer nav should match header nav links (WORK, SERVICES, ABOUT, PROCESS, CONTACT)

---

## 3. LAYOUT-LEVEL DIFFERENCES

### 3.1 Page Structure & Section Order

**Style Sheet (top to bottom):**
1. Navigation bar (self-contained, bordered)
2. Hero (full-bleed image)
3. Introduction/About statement (not clearly shown, but implied by brand copy)
4. Photography is primary — image tiles
5. Selected Work (split cards)
6. Services (5 image tiles)
7. Process (4-column horizontal)
8. Testimonial (split quote block)
9. CTA / Contact form (inline form row)
10. Footer

**Current `index.astro` order:**
1. Hero (full-bleed image, nav overlaid) ✅
2. Introduction (two-column text) ✅
3. Selected Work (3-column grid) ❌ wrong layout
4. Divider ✅
5. Services (5 image tiles) ✅ layout is correct
6. Process (split with image) ❌ wrong layout
7. Testimonial (close, missing divider) ⚠️
8. CTA split (text + image) ❌ wrong component
9. Footer ✅

### 3.2 Page Margins / Container

**Style Sheet:** Wide margins, generous whitespace. Content appears well-spaced from edges.  
**Current:** `--container: 1120px; --gutter: clamp(1rem, 4vw, 2rem)` — reasonable.

### 3.3 Grid Structure

| Section | Style Sheet | Current | Match? |
|---------|------------|---------|--------|
| Hero | Full-width bleed | Full-width bleed | ✅ |
| Introduction | Not clearly split in sheet; text implied | 2-column grid | ⚠️ |
| Selected Work | Single-column stack of split-cards | 3-column grid | ❌ |
| Services | 5-column row of image+label | 5-column row of image+label | ✅ |
| Process | 4-column row with dividers | 2-column split (steps+image) | ❌ |
| Testimonial | 3-column (mark, quote, author) | 3-column (mark, quote, author) | ✅ |
| CTA | 3-column inline (input, input, button) | 2-column split (text+image) | ❌ |

### 3.4 Image Ratios

| Context | Style Sheet | Current | Match? |
|---------|------------|---------|--------|
| Hero | Full bleed, ~75vh | Full bleed, 100vh | ⚠️ Style sheet suggests shorter hero |
| Service tiles | Portrait (~4:5) | `aspect-ratio: 4/5` | ✅ |
| Selected Work | Wider landscape (~16:10 or 3:2) | `aspect-ratio: 4/3` | ❌ Wider needed |
| Process | No image | `aspect-ratio: 4/5` side image | ❌ Remove image |
| CTA | No image | `aspect-ratio: 4/3` | ❌ Remove image |

### 3.5 Dividers & Visual Rhythm

**Style Sheet:** Heavy use of thin hairline dividers between major sections. Sections feel like editorial blocks separated by rules.

**Current:** Uses dividers sparingly — one divider between Selected Work and Services sections. Some sections compress padding when adjacent.

**Changes needed:**
- Add dividers between more sections
- Remove the section-compression logic that collapses same-colour adjacent sections
- Style sheet shows uniform section spacing, not compressed

---

## 4. "WHAT TO CHANGE" — ACTION PLAN

### Priority 1: Token Updates (`src/styles/tokens.css` + `src/styles/theme.css`)

```diff
# tokens.css

+  /* New typography tokens */
+  --text-h1: 3rem;               /* 48px for section headings */
+  --text-h2: 1.75rem;            /* 28px for subsection headings */
+  --line-h1: 1.167;              /* 56px / 48px */
+  --line-h2: 1.286;              /* 36px / 28px */
+  --weight-display: 500;
+  --weight-h1: 600;
+  --weight-h2: 500;
+  --weight-eyebrow: 600;

   /* Updated tokens */
-  --line-body: 1.65;
+  --line-body: 1.75;             /* 28px at 16px — match style sheet */
```

```diff
# theme.css

   h1 {
     font-size: var(--text-3xl);
-    font-weight: 500;
+    font-weight: var(--weight-display);     /* 500 for hero/display use */
     line-height: var(--line-tight);
   }

+  /* Section headings use the H1 token (600 weight) */
+  .section__header h2,
+  h2 {
+    font-weight: var(--weight-h2);    /* 500 — was 600 */
+    font-size: clamp(1.5rem, 3vw, var(--text-h2));  /* 28px target */
+    line-height: var(--line-h2);       /* 36px */
+  }

   h2 {
     font-weight: 600;
   }

   h2 {
     font-size: clamp(2rem, 4vw, var(--text-2xl));
   }

-  .eyebrow {
-    font-weight: 700;
+  .eyebrow {
+    font-weight: var(--weight-eyebrow);  /* 600 — was 700 */
+    font-size: 0.75rem;                  /* 12px — was 0.78rem */
+    line-height: 1.667;                  /* 20px */
   }

   .button {
     display: inline-flex;
     align-items: center;
     justify-content: center;
-    min-height: 2.9rem;
+    min-height: 3rem;                    /* 48px */
     padding: 0.75rem 1.1rem;
     border: 1px solid var(--color-button);
-    border-radius: var(--radius-sm);
+    border-radius: var(--radius-xs);    /* 2px — was 4px */
     background: var(--color-button);
     color: var(--color-button-text);
-    font-weight: 700;
+    font-weight: 600;
+    text-transform: uppercase;           /* NEW */
+    letter-spacing: 0.04em;             /* NEW */
     line-height: 1;
     text-decoration: none;
   }
```

### Priority 2: Navigation (`src/components/Header.astro`)

1. Change nav items to: **Work | Services | About | Process | Contact**
2. Remove CTA button from nav
3. Smaller uppercase link styling (~0.75rem, tracking 0.08em)
4. On homepage: transparent overlay nav → keep but remove CTA styles
5. Add stacked brand lockup (CSS-only if no logo asset)

### Priority 3: Hero (`src/pages/index.astro`)

1. Add secondary outline CTA button ("View our work")
2. Add thin horizontal rule between headline and body
3. Hero buttons should use uppercase text
4. Consider reducing hero height from 100vh to ~85vh (style sheet shows shorter hero)
5. Button: `--radius-xs` (2px), more rectangular

### Priority 4: Services (`src/pages/index.astro`)

1. Current `.services-inline` layout is largely correct — reduce gap to 12px
2. Remove the unused `ServiceGrid` `icon-grid` variant or archive it (it contradicts the style sheet's warm photo-driven direction completely)

### Priority 5: Selected Work (`src/components/SelectedWork.astro`) — MAJOR RESTRUCTURE

1. Replace 3-column photo-below-text grid with single-column **split-card stack**
2. Each card: image (left, ~60%) + cream content panel (right, ~40%, `#F6F3EE`)
3. Content panel: project title → location eyebrow → description → "VIEW PROJECT" CTA
4. Image aspect ratio: 16:10 (wider than current 4:3)

### Priority 6: Process (`src/components/ProcessStrip.astro`) — MAJOR RESTRUCTURE

1. Change from vertical stack + side image to **4-column horizontal grid**
2. Add thin vertical dividers between each column
3. Remove side image entirely
4. Numbers: light weight (300), large, muted, low opacity
5. Section heading: "OUR PROCESS" with eyebrow

### Priority 7: Testimonial (`src/components/FeatureQuote.astro`)

1. Add vertical divider between quote body and attribution
2. Change quote marker from square (5rem×5rem) to tall rectangle (4rem×7rem)
3. Attribution font style is correct ✅

### Priority 8: CTA Section (`src/pages/index.astro`)

1. Replace `.cta-split` with either:
   - **Preferred**: Inline form row (2 inputs + button) matching style sheet
   - **Fallback**: `CTABand` `band` variant (horizontal text + button)
2. Remove side image
3. Compact section, not full split block

### Priority 9: Footer (`src/components/Footer.astro`)

1. Update footer nav to match header: Work | Services | About | Process | Contact
2. Minimal spacing, thin top border — current structure is fine

### Priority 10: DESIGN.md Reconciliation

The `DESIGN.md` specifies colour values that differ from both the style sheet and `tokens.css`:

| Token | DESIGN.md | tokens.css / Style Sheet |
|-------|-----------|------------------------|
| `--brand-accent` | `#1a1a1a` | `#111111` |
| `--color-text-muted` | `#6b6258` | `#6E675F` |
| `--color-border` | `#d4ccc4` | `#DDD7CF` |
| `--color-surface` | `#f7f5f0` | `#F6F3EE` |

**Action:** Update DESIGN.md to match the style sheet's actual values (which align with `tokens.css`).

Also DESIGN.md specifies `h1` weight 800 with Inter Tight condensed — the style sheet shows Display as Inter 500 (regular Inter, not condensed). DESIGN.md should be corrected.

---

## 5. SUMMARY OF FILE CHANGES

| File | Change Type | Effort |
|------|------------|--------|
| `src/styles/tokens.css` | Token additions (typography) | Small |
| `src/styles/theme.css` | h1/h2/body/eyebrow/button overrides | Medium |
| `src/components/Header.astro` | Nav items, remove CTA, link styling | Medium |
| `src/components/Hero.astro` | (unused on homepage, but update for consistency) | Small |
| `src/pages/index.astro` | Hero secondary CTA + rule, CTA section replacement, services gap | Medium |
| `src/components/SelectedWork.astro` | Full restructure to split-card layout | **Large** |
| `src/components/ProcessStrip.astro` | Full restructure to 4-column grid | **Large** |
| `src/components/FeatureQuote.astro` | Divider + marker dimensions | Small |
| `src/components/CTABand.astro` | May need new variant for inline form | Medium |
| `src/components/ServiceGrid.astro` | Remove/deprecate `icon-grid` variant | Small |
| `src/content/pages/home.json` | Remove `servicesVariant: "icon-grid"` | Trivial |
| `DESIGN.md` | Reconcile colour + typography values | Small |
| `src/components/Footer.astro` | Nav link update | Trivial |
| `src/components/Introduction.astro` | Typography alignment | Small |
