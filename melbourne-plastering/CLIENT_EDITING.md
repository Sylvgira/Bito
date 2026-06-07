# Client Editing Workflow

This template uses Decap CMS as a Git-backed editor. It is not a database CMS like WordPress; edits become file changes in the repository.

## What Clients See

Clients edit content at `/admin/`.

The panel on the right is Decap's editor preview. This starter registers custom preview templates in `public/admin/previews.js`, so the preview is useful for checking text, hierarchy, and basic layout choices. It is still an approximation, not the exact Astro-rendered page.

For exact visual review, clients should open the live site or a deploy preview after saving.

## Local Testing Flow

Use this when testing as the builder:

```sh
npm run dev
```

In another terminal:

```sh
npx decap-server
```

Then open:

```txt
http://localhost:4321/admin/
```

When an entry is saved locally, Decap writes to the files in `src/content`. Astro dev then reloads the site from those files. Use the CMS preview pane for quick checks, and open the actual page in another tab for final visual review.

Do not use `npm run preview` for content-edit testing. Preview serves the already-built `dist` folder, so CMS edits will not appear there until another build runs.

## Production Flow

For a deployed client site:

1. Client logs in at `https://client-site.com/admin/`.
2. Client edits an entry in Decap.
3. Client uses the right preview pane for a quick content/layout check.
4. Client saves/publishes.
5. Decap commits the content change to GitHub.
6. Cloudflare Pages detects the commit and rebuilds the static site.
7. The live site updates after the Cloudflare deployment completes.

This is usually a short delay, not instant publishing.

## Optional Draft Review Flow

If a client needs approvals before publishing, enable Decap editorial workflow:

```yml
publish_mode: editorial_workflow
```

With GitHub, Decap creates pull requests for draft entries. Cloudflare Pages can then provide preview deployments for those branches, giving clients and builders a real rendered URL before merge.

Keep editorial workflow disabled for simple small-business sites unless review/approval is actually needed.
