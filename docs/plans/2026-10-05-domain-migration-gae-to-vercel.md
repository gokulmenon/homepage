# Domain migration plan: GAE → Vercel

**Status:** Approved by Gokul on 2026-10-05. Decisions: (a) keep Cloudflare proxy (orange cloud) in front of Vercel; (b) keep both apex (`gokulmenon.com`) and `www` serving directly, no canonical redirect.

## Current state (verified 2026-10-05)

- `gokulmenon.com` and `www.gokulmenon.com` serve the GAE bundle (same build hash as `nextjs-homepage.uc.r.appspot.com`).
- DNS hosted on Cloudflare (`maya`/`morgan.ns.cloudflare.com`), web records proxied.
- GAE: `nextjs-homepage.uc.r.appspot.com`, `app.yaml` = nodejs22 standard, `min_instances: 1` (always-on instance = ongoing cost).
- Vercel: `homepage-chi-pearl.vercel.app`, Next.js 15.5.27, contact form verified working end to end (2026-10-05).
- Mail: Zoho (`admin@gokulmenon.com`). **MX records must not be touched.**
- No hardcoded appspot URLs in code. Footer links to `www.gokulmenon.com` (unchanged by this migration).

## Phase 0 — Pre-flight (zero downtime risk)

1. **reCAPTCHA** (Gokul, admin console): add `gokulmenon.com` and `www.gokulmenon.com` to the site key's allowed domains. Without this the contact form shows "Invalid domain for site key" after cutover (hit this before on the Vercel URL).
2. **Vercel** (Gokul, dashboard → project → Settings → Environment Variables): confirm all 15 `NEXT_PUBLIC_*` vars are set on Production — 4 EmailJS, `NEXT_PUBLIC_RECAPTCHA_V`, 9 game URLs, `NEXT_PUBLIC_CLARITY_ID`, `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID`, `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`. Contact 4 confirmed 2026-10-05; verify the rest.
3. **Vercel** (Gokul, dashboard → project → Settings → Domains): add `gokulmenon.com` and `www.gokulmenon.com`; record the exact DNS instructions Vercel shows.
4. **Cloudflare** (Gokul): note/screenshot the current `@` and `www` records (rollback reference).

## Phase 1 — Cutover (Cloudflare DNS)

5. In Cloudflare DNS, repoint `@` and `www` per Vercel's instructions (CNAME to `cname.vercel-dns.com`), keeping the proxy ON. Change nothing else.
6. Wait for Vercel to auto-issue SSL certs (usually minutes). Verify `https://gokulmenon.com/contact` now serves the **Vercel** bundle hash (not the GAE one).

## Phase 2 — Validation (GAE stays up as rollback)

7. Route check on the live domain: `/`, `/intro`, `/games`, `/contact`, `/blog`, plus one game through the `/games/<slug>` proxy.
8. Contact-form end-to-end test on `gokulmenon.com/contact` (EmailJS + reCAPTCHA on the real domain).
9. 24–48h observation. **Rollback** = revert the two Cloudflare records to the GAE origin (Phase 0 step 4 notes).

## Phase 3 — Cleanup (requires separate explicit approval)

10. Decommission GAE (scale to 0 / delete the service) to stop the always-on instance cost. Do NOT do this without Gokul's go-ahead.

## Notes

- Games proxy (`/games/<slug>/*` rewrites to external Vercel/GitHub-Pages URLs) is domain-independent; no changes needed.
- Sanity/YouTube fetches happen at build time; no domain dependency.
- The `deprecated.gokulmenon.com` link in Intro.js is historical content; untouched.
