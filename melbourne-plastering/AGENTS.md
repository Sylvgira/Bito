# Agent Guide

This repository is designed for AI-assisted client build-outs. Preserve the template’s simplicity unless the client brief clearly requires more.

## Default Workflow

1. Read `CLIENT_BRIEF.example.md` and the actual client brief supplied for the build.
2. Update `src/content/settings/site.json`.
3. Replace content in `src/content/services`, `src/content/posts`, `src/content/testimonials`, and `src/content/faqs`.
4. Adjust `src/styles/tokens.css` for brand primitives.
5. Visit `/blocks/` during local preview to compare available component variants.
6. Compose pages from existing components before creating new ones.
7. **Take a full-page screenshot and visually review each section before handing work back.** Do not ship blind.
8. Run `npm run build` before handing work back.

## Rules

- Keep brand changes concentrated in `src/styles/tokens.css`, `src/styles/theme.css`, and site settings.
- Do not add UI libraries unless explicitly requested.
- Do not add client-side JavaScript for static presentation sections.
- Prefer plain Astro components with clear props.
- Keep copy specific to the client. Remove placeholder explanations from public pages before launch.
- Keep pages small and direct. Small-business visitors usually need clarity, proof, and contact paths.
- Preserve accessibility basics: one `h1`, labelled controls, useful alt text, visible focus states, and semantic landmarks.

## Component Guidance

- Use `Hero` only on the home page unless the client needs a campaign-style landing page.
- Use `PageIntro` for inner pages.
- Use `Section` for layout rhythm and background variants.
- Use collection-driven components for services, posts, testimonials, and FAQs.
- Create new components only when a repeated pattern appears or a page becomes hard to scan.
- Prefer existing variants before building new components: hero variants, service layouts, testimonial layouts, gallery layouts, and CTA layouts are documented on `/blocks/`.
- Keep client-editable variant controls limited to safe layout choices in `src/content/pages/home.json`.

## Decap Guidance

- Any field added to a content schema should also be added to `public/admin/config.yml`.
- Any new collection should be documented in `README.md`.
- Keep filenames slug-friendly and content portable.

## Stock Photography

Source photos without a browser. Workflow:

1. **Search** — find an Unsplash photo page via web_search
   ```
   web_search("unsplash.com interior wood floor living room")
   ```
2. **Extract the photo ID** — photo page URLs contain the ID, e.g. `Kq8uV6tZM20` from `.../photo-Kq8uV6tZM20`
3. **Download direct** — build the download URL and curl it:
   ```
   curl -sL -o public/uploads/filename.jpg \
     "https://images.unsplash.com/photo-{ID}?w=2000&q=85"
   ```
   Add `&fit=crop&h={height}` for specific aspect ratios.
4. **Wire it in** — reference `/uploads/filename.jpg` in the component or page.
5. **Keep it lean** — hero images ~500-700KB fine; resize gallery images to `w=800&h=1100`.

No browser, no API key, no page rendering.

## Visual Review Protocol

Before sharing any build back to the user:

1. **Build the site** — `npm run build`
2. **Serve locally** — `python3 -m http.server 8888` from `dist/`
3. **Take a full-page screenshot** — using Playwright or similar
4. **Review each section** — check headings, spacing, image loading, button styles, colours, mobile layout
5. **Fix issues found** before reporting back

Do not rely on code correctness alone. The rendered page is what matters.

## Button Convention

Use a clear three-tier hierarchy:

| Level | Style | Class | Usage |
|---|---|---|---|
| Primary | Filled background | `.button--primary` | Main CTAs, conversion actions |
| Secondary | Ghost/outlined | `.button--secondary` | Alternative actions on same surface |
| Tertiary | Link/underline | `.button--tertiary` | Lowest emphasis, supplementary links |

Light variants (`.button--primary-light`, `.button--secondary-light`, `.button--tertiary-light`) for dark backgrounds. Add gold outline (`.button--outline-gold`) for accent CTAs when the brand uses a gold accent.

## Section Spacing

Adjacent sections with the same background colour should compress their gap (remove the second section's top padding). Sections with different background colours keep full spacing so the colour change has room to breathe. This is handled via CSS:

```css
.section:not(.section--surface) + .section:not(.section--surface),
.section--surface + .section--surface {
  padding-top: 0;
}
```

## FAQ Accordion Pattern

For smooth open/close transitions on FAQ items, use `grid-template-rows` with `overflow: hidden`:

```css
.faq-answer {
  display: grid;
  grid-template-rows: 0fr;
  overflow: hidden;
  transition: grid-template-rows 0.3s ease;
}
details[open] .faq-answer {
  grid-template-rows: 1fr;
}
```

Key rules:
- `overflow: hidden` goes on the grid container, not a child
- Inner `<p>` must have `margin: 0`
- Use a spacer `<div>` for bottom gap (no padding/margin on animated elements)
- The inner track collapses to zero because `overflow: hidden` clips the content
