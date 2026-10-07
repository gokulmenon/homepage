This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

This repo is inspired from https://codebushi.com/nextjs-website-starters/#getStarted
uses next v10 and newer versions of react

## Deploy

Production deploys on **Vercel** (project `homepage`). Every push to `master`
triggers a production build automatically — there is no manual deploy step.

```bash
npm run build        # what Vercel runs: next build (unmocked)
npm run build:local  # offline build with mocked external APIs (MOCK_EXTERNAL_APIS=1)
```

### Domain routing

- `www.gokulmenon.com` and the apex `gokulmenon.com` both route to Vercel
  (cut over from Google App Engine on Oct 5, 2026).
- Cloudflare sits in front as the DNS/proxy layer; mail (Zoho MX) is untouched.
- The old Google App Engine deployment no longer serves production traffic.
  It is retained as a rollback target; full decommission is still pending.

### Games Arcade

The `/games` hub reverse-proxies each game from its own deployment via
`next.config.js` rewrites (games keep their own repos and Vercel projects;
the homepage is only the router). Game metadata lives in `data/games.json`
and the Supabase `games` table (applied via migrations in
`supabase/migrations/`).