# DatoCMS — Configuration & Workflow

This project already integrates DatoCMS via GraphQL (`src/lib/datocms.js`) and powers the homepage slider (`allSliders`). Follow these steps to configure your admin and align with the Dev → Aprove → Main workflow.

## 1) Create project and models
- Create a DatoCMS project (or open existing).
- Create model `Slider` (api key: `slider`):
  - Field `media` (File, required) — api key: `media`.
  - Field `description` (Text, optional) — api key: `description`.
  - Field `sort_order` (Integer, optional) — api key: `sort_order` (GraphQL will expose it as `sortOrder`).
- Add a few `Slider` records, upload images in Media Area, and Publish.

GraphQL used by the site:
```
{
  allSliders(orderBy: sortOrder_ASC) {
    id
    media { url }
    description
    sortOrder
  }
}
```

> Note: If your integer field is named differently, update either the field api key (`sort_order`) or the query accordingly.

## 2) API tokens
- In DatoCMS → Settings → API tokens:
  - Create a Content Delivery API (read-only) token for production.
  - Optionally create a separate token for development/preview.

## 3) Environments in DatoCMS (optional but recommended)
Use DatoCMS Environments to mirror your Git branches:
- Create sandbox environments `dev` and `approve` cloned from `main`.
- Editors can test content safely in `dev`/`approve` before merging to `main`.

In code we support selecting the environment via header `X-Environment` controlled by `DATOCMS_ENVIRONMENT`.

## 4) Preview vs Delivery
- Delivery (published only): endpoint `https://graphql.datocms.com/` with `DATOCMS_API_TOKEN`.
- Preview (includes drafts): endpoint `https://graphql.datocms.com/preview` with `DATOCMS_PREVIEW_TOKEN` and header `X-Include-Drafts: true`.

Configuration via env vars:
```
DATOCMS_USE_PREVIEW=true
DATOCMS_PREVIEW_TOKEN=...
DATOCMS_ENVIRONMENT=dev | approve | main
```

## 5) Environment variables
Create/update env vars:
- Local: duplicate `.env.example` to `.env` and fill values.
  - `DATOCMS_API_TOKEN=...`
  - `DATOCMS_ENVIRONMENT=dev` (or omit for `main`)
- Vercel → Project Settings → Environment Variables:
  - Development: `DATOCMS_API_TOKEN`, `DATOCMS_PREVIEW_TOKEN`, `DATOCMS_USE_PREVIEW=true`, `DATOCMS_ENVIRONMENT=dev`
  - Preview (branch: `approve`): `DATOCMS_API_TOKEN`, `DATOCMS_PREVIEW_TOKEN`, `DATOCMS_USE_PREVIEW=true`, `DATOCMS_ENVIRONMENT=approve`
  - Production (branch: `main`): `DATOCMS_API_TOKEN`, `DATOCMS_USE_PREVIEW=false`, `DATOCMS_ENVIRONMENT=main` (or leave unset)

## 6) Rebuilds on content changes (webhooks)
As the site is statically generated, you must trigger redeploys on publish/unpublish:
- In Vercel: Settings → Deploy Hooks → create one hook per target (Preview, Production), scoping to `approve`/`main`.
- In DatoCMS: Settings → Webhooks → add webhooks for “Record published/unpublished” that call the corresponding Vercel hook URL(s).

## 7) Local run and validation
```bash
npm install
npm run dev
# open http://localhost:4321
```
If you see the slider images on `/` and `/es/`, Dato is correctly wired.

## 8) Branch workflow (recommendation)
- Work on `dev` branch → Vercel preview (uses Dato env `dev`).
- Open PR to `approve` for client validation → Vercel preview (uses env `approve`).
- Merge to `main` when approved → Production (uses env `main`).

This keeps code, deployments, and content perfectly aligned per stage.

## 9) Extending content admin (beyond slider)
To move more content into DatoCMS, we suggest next models (in order you requested):
- Page (api key: `page`) — generic page content used for:
  - La Casa Que Canta, Activities, Spa, Gym, Mar y Cielo, Contact & Find Us
  - Fields:
    - `title` (Localized string)
    - `subtitle` (Localized string)
    - `slug` (Slug, unique; examples: `la-casa-que-canta`, `activities`, `spa`, `gym`, `mar-y-cielo`, `contact`)
    - `heroImage` (File)
    - `intro` (Text long or Rich text)
  - Start minimal (above fields). Blocks/galleries can be added later.
- Offer (api key: `offer`): `title` (string, localized), `subtitle` (string, localized — used in grid), `travel_date` (string, localized — shown in grid; GraphQL: `travelDate`), `description` (rich text, optional), `imagefront` (file), `ctaLabel` (string), `ctaUrl` (string), `slug` (string, unique), `active` (boolean), `order` (integer for sorting).
- Suite (api key: `suite`): `title`, `slug`, `gallery` (gallery of files), `shortDescription`, `longDescription`, `size`, `view`, `priceFrom`.

You can then replace markdown-based listings (e.g. Savings) with GraphQL queries (`allOffers(filter: { active: { eq: true } })`).

Example query used by La Casa Que Canta pages (EN/ES):
```
query PageBySlug($slug: String, $locale: SiteLocale) {
  page(filter: { slug: { eq: $slug } }, locale: $locale) {
    title
    subtitle
    heroImage { url }
    intro
  }
}
```
