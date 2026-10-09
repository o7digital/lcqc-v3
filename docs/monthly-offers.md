# Monthly offers — dev preview

The preview is isolated from production. Private Vercel Blob store `lcqc-offers-preview` is connected to Preview only. Production continues using the October 2026 dates until this feature is approved and enabled.

## Client workflow

Open `/gestion-ofertas/` using the signed link supplied in the reminder (token in the URL fragment, removed immediately and kept in tab session storage). Links are scoped to the month being reviewed and expire after that month. The preview reviewer link can access the current and next month; calendar simulation is read-only.

The manager imports the complete DatoCMS catalog automatically, including inactive records, using the same CMS environment and preview mode as the site. It fetches both languages and paginates beyond 100 records. Source reads are coalesced and cached for 60 seconds. Untouched source fields refresh automatically; saved monthly edits and form-created offers are preserved. If DatoCMS is unavailable, the last stored catalog is retained and the manager displays a warning. Inactive incomplete records can be retained; activating an offer requires complete bilingual text.

Choose the current or next month. Maintain the existing offers, switch an offer off, edit its Spanish and English texts, or add a bilingual offer with an existing image. Saving the current month takes effect immediately on the preview. Saving next month takes effect on the 1st at midnight in `America/Mexico_City`. Subsequent months inherit the most recent saved offers. Disabled offers remain disabled until reactivated.

All dates cover the 1st through the actual last day of the month, including leap years. The public pages fetch live offers on load, when the tab becomes visible and every minute. A tab left open at midnight updates within a minute. No rebuild is needed for form changes or month rollover. Text is rendered as plain text, not HTML. The hotel logo is reused from `/images/logo/logo.jpg`, the same asset used on the hotel homepage.

Original static content is retained as a fallback during API outages; fallback dates are updated by the calendar script. Live content and additions require JavaScript; generated static HTML/SEO content is not updated by the form.

The preview supports three existing detail routes in each language. Added offers have a shared detail page `/savings/promotion/?offer=ID` or `/es/savings/promotion/?offer=ID`. Curated offers grids display active offers from storage. Imported archived/inactive CMS offers are visible in the manager and remain inactive until explicitly enabled; their live details use the shared promotion route.

## Reminder

A daily Vercel cron at 15:00 UTC (09:00 Mexico City) checks whether the last Monday of the month has arrived. October 2026: Monday the 26th. It sends one reminder about the following month. If an attempt fails, it retries on the next daily execution within that month. A five-minute lease and a sent marker prevent concurrent/daily duplicates; Formspree does not provide a transactional send-and-store operation, so an interrupted send after acceptance can still produce a duplicate on retry.

Preview deployments are hard-blocked from sending automatic reminder emails. The preview form shows the reminder text, planned send date and calendar simulations. Vercel runs scheduled jobs on production deployments only.

Recipients requested:

- sales.reservations@lacasaquecanta.com
- director@lacasaquecanta.com
- olivier.steineur@gmail.com

**Formspree recipient setup remains to be verified.** The user supplied `https://formspree.io/f/xkjorkgl`; this endpoint is configured on Preview for branch `dev`. Configure and verify all three notification recipients in its dashboard before enabling delivery. Adding `to` or `cc` JSON fields does not configure recipients. Depending on the Formspree plan, notification rules send separate copies rather than a literal CC header. Verify this in Formspree before activation. Disable CAPTCHA for this server-to-server reminder form and restrict it appropriately in Formspree; never reuse the public spa/contact form.

## Configuration

Preview variables are configured for branch `dev`:

- `PUBLIC_OFFERS_AUTOMATION_ENABLED=true` — build-time public page integration.
- `OFFERS_AUTOMATION_ENABLED=true` — API enabled.
- `OFFERS_SIGNING_SECRET` — generated private signing key.
- `OFFERS_REMINDERS_ENABLED=false` — no automatic reminder email.
- `OFFERS_FORMSPREE_ENDPOINT=https://formspree.io/f/xkjorkgl` — user-supplied dedicated reminder form.
- `BLOB_READ_WRITE_TOKEN` — provided by the dedicated private preview store.

After user approval, production needs a **separate private Blob store**, its own signing secret, `CRON_SECRET`, `OFFERS_FORMSPREE_ENDPOINT`, `OFFERS_SITE_URL=https://www.lacasaquecanta.com`, both automation flags, and `OFFERS_REMINDERS_ENABLED=true`. Seed and test the production store before activation. Do not connect the preview store to Production. Production activation and actual reminder delivery are outside the current preview request.

`GET /api/offers` returns only active public offers for the current month. `GET /api/offers?admin=1&month=YYYY-MM` requires a signed bearer token. `PUT /api/offers` requires a valid token, the selected month, current revision and complete bilingual offer list. Optimistic revisions and Blob ETags reject concurrent edits instead of silently overwriting them. Never put secrets in source control, query strings or browser bundles.

## Validation

Run `node --test tests/*.test.js` and `PUBLIC_OFFERS_AUTOMATION_ENABLED=true npm run build`. Test signed access, persistent saves, stale revision rejection, additions/removals, current/next month separation and both public languages on the deployed preview. The production build with the public flag omitted leaves live automation disabled.

Sources: https://vercel.com/docs/cron-jobs/manage-cron-jobs, https://vercel.com/docs/vercel-blob/using-blob-sdk, https://help.formspree.io/articles/advanced-features/form-rules/

## Dedicated preview hostname

`lcqc-offers.o7digitalgroup.com` tracks `dev`. A host-specific redirect sends the root and website-page paths to `/gestion-ofertas/`. Only the management page, offers API, JavaScript/CSS and required image paths bypass this redirect. The rule does not match the hotel production domain or other preview hostnames. This changes no production branch or production deployment.

## Access by email

The landing page now has an email field and a “Solicitar enlace por correo” button. `/api/offers-access` accepts requests only for the three authorized team addresses, checks same-origin requests and a honeypot, and uses a private Blob-backed 60-second resend delay plus five accepted requests per UTC day per address. Unknown email addresses receive a generic acknowledgment without sending mail. Bearer links expire after 30 minutes and are never included in public API responses.

`OFFERS_ACCESS_EMAIL_ENABLED=true` enables user-requested access email in the dev preview. Automatic monthly reminders remain disabled. No real emails are sent by automated tests.

Access requests use the supplied Formspree form. **Formspree sends notifications to its verified dashboard recipients, not automatically to the address typed in the field.** The complete access link is delivered in the notification message. With the three requested recipients configured, the authorized team receives access requests. For individual delivery, configure Formspree notification rules on `notification=offers_access` and the `email` field, selecting the matching verified recipient. Keep reminder notification rules on `notification=monthly_offers`. The app does not claim that Formspree recipient rules have been verified.

Access delivery checks the Formspree JSON `ok` flag as well as HTTP status. Failed sends release their reservation and daily quota. Accepted repeated requests keep a success message and return the remaining resend delay; the browser shows a countdown and prevents double submission. Formspree acceptance is not mailbox delivery confirmation. The user confirmed that the current Formspree notification recipient is `olivier.steineur@gmail.com`; the two hotel recipients still need configuration before client rollout.

## Open browser demo

`PUBLIC_OFFERS_DEMO_ENABLED=true` on dev Preview opens the manager directly, without email or access code. The build imports the full CMS catalog as a demo snapshot (including disabled offers); only offer content is embedded, never CMS credentials. The browser simulates current/next month edits, calendar and reminder preview. Saves use only the `lcqc-offers-demo-v1` localStorage key. No management or email API is called in demo mode. Existing signed server access and write protection remain in place; this flag is not configured on Production.
