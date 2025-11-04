# DatoCMS — Intégration et branche Dev (3 nov)

## Objectif
- Rendre éditables les pages du site via DatoCMS sans impacter la prod.
- Workflow: Dev (sandbox) → Approve (validation) → Main (prod).
- Maintenir un fallback statique si Dato est vide/absent.

## Environnements & variables
- Dato: `dev` (sandbox) actif. `approve` recommandé ensuite (clone de `main`).
- Vercel Dev/Preview: `DATOCMS_ENVIRONMENT=dev` (puis `approve`). Prod: `main`.
- Variables (.env / Vercel):
  - `DATOCMS_API_TOKEN` (obligatoire, Delivery)
  - `DATOCMS_USE_PREVIEW=true|false` (optionnel, drafts)
  - `DATOCMS_PREVIEW_TOKEN` (optionnel)
  - `DATOCMS_ENVIRONMENT=dev|approve|main`

## Modèles Dato utilisés
- `page` (générique, localisé EN/ES)
  - Champs: `title`, `subtitle`, `intro`, `slug`, (`hero_image` optionnel)
  - Slugs utilisés: `la-casa-que-canta`, `history`, `pools`, `activities`, `spa`, `gym`, `mar-y-cielo`, `luxury-villas`, `contact`, `accomodations` (orthographe conservée)
- `Accomodations Details` (section spéciale suites, localisé EN/ES)
  - Champs: `subtitle`, `intro`, `room_features`, `amenities`, `internet_access`, `slug`
  - Slugs à respecter (routes):
    - `mexico-lindo-suite`
    - `owners-pool-suite`
    - `masters-pool-suite` (avec s)
    - `deluxe-grand-suites`
    - `terrace-suite` (singulier)
- `slider` (existant) — page d’accueil.

## Code: fetcher & configs
- `src/lib/datocms.js`
  - Ajout Preview API: `DATOCMS_USE_PREVIEW`, `DATOCMS_PREVIEW_TOKEN`.
  - En-tête `X-Environment` (dev/approve/main) via `DATOCMS_ENVIRONMENT`.
  - Sécurité: suppression du log du token.
- Fichiers de support créés/mis à jour:
  - `.env.example`
  - `docs/datocms-setup.md` (setup + Preview + webhooks + workflow)
  - `README_DEVOPS.md` (références Dato)

## Pages branchées sur Dato (EN/ES)
Chaque page lit `title`, `subtitle`, `intro`. Si `intro` est vide, fallback statique conservé.

- La Casa Que Canta: `src/pages/la-casa-que-canta.astro`, `src/pages/es/la-casa-que-canta.astro`
- History: `src/pages/history.astro`, `src/pages/es/history.astro`
  - Slider conservé via LayoutTwoCol; MD remplacé par .astro.
- Pools (listing): `src/pages/pools.astro`, `src/pages/es/pools.astro`
- Pools (détails): `src/pages/pools/ocean-water-pool.astro`, `src/pages/pools/infinity-pool.astro`, `src/pages/es/pools/...`
  - Lisent `page` (slugs: `ocean-water-pool`, `infinity-pool`).
  - MD remplacé par .astro.
- Activities: `src/pages/activities.astro`, `src/pages/es/activities.astro`
- Spa: `src/pages/activities/spa.astro`, `src/pages/es/activities/spa.astro`
  - UI réservations conservée (popup).
- Gym: `src/pages/activities/gym.astro`, `src/pages/es/activities/gym.astro`
- Mar y Cielo: `src/pages/mar-y-cielo.astro`, `src/pages/es/mar-y-cielo.astro` (MD remplacé)
- Luxury Villas: `src/pages/luxury-villas.astro`
- Contact & Find Us: `src/pages/contact.astro`, `src/pages/es/contact.astro`
- Accomodations (listing): `src/pages/accomodations.astro`, `src/pages/es/accomodations.astro`
  - Lit `page` (slug: `accomodations`), grille inchangée.

## Suites: détails (Accomodations Details)
Pages remplacées (.md → .astro) et branchées sur le modèle `Accomodations Details`.
Champs lus: `subtitle` (→ description sous H1), `intro` (paragraphe), `room_features` (liste), `amenities` (liste, +`internet_access` injecté si manquant).
Gallerie/images/CTA (book/floorplan/mesures/lits/guests) conservés en fallback.

- EN: `src/pages/accomodations/{mexico-lindo-suite, owners-pool-suite, masters-pool-suite, deluxe-grand-suites, terrace-suite}.astro`
- ES: `src/pages/es/accomodations/{...}.astro`

Important: slugs Dato doivent correspondre EXACTEMENT aux routes (voir section Slugs ci‑dessus). Sinon la page retombe sur fallback.

## “Our Other Suites” (cartes de fin de page)
- Contexte: les `.md` supprimés faisaient planter `Astro.glob` et la section disparaissait.
- Correctif: `src/layouts/LayoutAccomo.astro`
  - `Astro.glob` protégé (try/catch) + fallback statique 4 cartes (mêmes images/titres/liens) si aucun `.md`.
  - Apparence identique à l’existant.
  - Possibilité d’évoluer plus tard: lire la liste depuis Dato et/ou via `import.meta.glob`.

## Approve & Offers (préparé)
- Renommage global `aprove` → `approve` (routes/docs/header/layout).
- `SavingsSection.astro` sait lire un modèle `offer` (si configuré) via prop `useDato` (fallback markdown sinon). Pages de preview EN/ES dans `/approve` prêtes.

## À faire / Points d’attention
- Dato — vérifs:
  - `page`: champs localisés activés (EN/ES) pour `title`, `subtitle`, `intro`.
  - `Accomodations Details`: slugs non localisés; API key modèle = `accomodations_details` (1 seul `m`).
  - Si API key différente (ex. `accommodations_details`), adapter les requêtes (`allAccommodationsDetails`).
- Approve: créer l’environnement Dato `approve` + env vars Vercel (Preview) + webhooks.
- Token: éviter de committer `.env`; envisager une rotation.
- Slider/hero: si besoin de piloter depuis Dato (ex. History), ajouter un champ `hero_gallery` (Gallery) et lier dans le code.
- “Other suites”: option Dato propre pour remplacer le fallback statique.

## Fichiers principaux modifiés/ajoutés
- Fetcher/config: `src/lib/datocms.js`, `.env.example`, `docs/datocms-setup.md`, `README_DEVOPS.md`.
- Pages Astro listées plus haut (.astro ajoutés, .md supprimés quand nécessaire).
- Layouts: `src/layouts/LayoutAccomo.astro` (fallback + fix Astro.glob).

## Utilisation
1) Remplir/publier les records dans Dato (env `dev`).
2) Lancer `npm run dev` et vérifier EN/ES.
3) Ouvrir PR `dev` → `approve`; configurer Vercel Preview avec `DATOCMS_ENVIRONMENT=approve` (+ Preview API si brouillons).
4) Merge `approve` → `main` après validation.

— Trigger redeploy dev: commit technique pour lancer le build Vercel (3 nov, 20:xx).
