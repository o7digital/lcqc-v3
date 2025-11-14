# Guide éditeur – DatoCMS (LCQC)

Ce guide explique, pas à pas, comment modifier le contenu du site dans DatoCMS et prévisualiser les changements sur les environnements DEV et APPROVE, puis sur le site public (MAIN/prod).

---

## 1) Accès & principe

- Accès DatoCMS: https://lcqc-v2.admin.datocms.com
- Environnements (sélecteur en haut à gauche):
  - `dev` (Sandbox) – brouillon/test
  - `approve` – validation client (preview)
  - `main` – production (site public)
- Prévisualisation:
  - DEV: votre URL Vercel « dev » (ex: `https://lcqc-v3-git-dev-…vercel.app`)
  - APPROVE: votre URL Vercel « approve »
  - MAIN: `https://www.lacasaquecanta.com`

Important: le site est statique. Après chaque “Publish” dans Dato, un *build* s’exécute automatiquement (webhook) et met à jour l’environnement ciblé en ~1–3 minutes.

---

## 2) Où cliquer dans Dato

- Onglet `Contenu` (menu gauche) pour voir les modèles (Pages, Suites, …)
- Sélecteur de langue en haut du formulaire: `Anglais | Espagnol`
- Boutons: `Save` (enregistre), `Publish changes` (publie et déclenche un build)

---

## 3) Les modèles à éditer

### A. Pages (modèle `Page`)
Pages gérées: La Casa Que Canta, History, Pools, Activities, Spa, Gym, Mar y Cielo, Luxury Villas, Contact, Accomodations (listing).

Champs à remplir:
- `Title` (localisé EN/ES)
- `Subtitle` (localisé) – courte ligne sous le titre
- `Intro` (localisé) – texte de contenu; séparez les paragraphes par une ligne vide
- `Slug` – identifiant d’URL (ne pas changer une fois en ligne)
- `Hero` (facultatif) – image d’en-tête sur certaines pages

Procédure:
1. Ouvrez la page (ex. “La Casa Que Canta”).
2. Sélectionnez la langue (Anglais/Espagnol).
3. Modifiez `Title`, `Subtitle`, `Intro`.
4. Cliquez `Publish changes`.
5. Attendez ~1–3 min, puis vérifiez sur l’URL DEV/APPROVE.

### B. Suites (modèle `Accomodations Details`)
Suites gérées: Mexico Lindo Suite, Owner’s Pool Suite, Master(s) Pool Suite, Deluxe Grand Suites, Terrace Suite.

Champs à remplir (EN/ES):
- `Subtitle` – courte ligne (ex: métriques, lit, invités)
- `Intro` – texte de présentation (paragraphes = une ligne vide)
- `Room Features` – une *ligne* = une *puce*
- `Amenities` – une *ligne* = une *puce*
- `Internet Access` – texte libre, mis en évidence
- `Slug` – DOIT correspondre exactement à l’URL de la page (ex: `mexico-lindo-suite`). Utilisez la même valeur en EN et ES.

Procédure: identique aux pages (éditer → Publish → attendre le build → vérifier sur DEV/APPROVE).

Remarques:
- Les galeries d’images, liens “Book now”, métriques (surface/lit/guests) sont déjà en place côté site; on peut les piloter par Dato ultérieurement si souhaité.

### C. Offers (Offres)
La grille peut lire vos offres depuis Dato (ENV dev/approve) si le modèle `Offer` est présent.

Champs recommandés:
- `title` (localisé EN/ES)
- `subtitle` (localisé) — court texte affiché dans la carte (grille)
- `description` (localisé, optionnel) — texte long de la page détail
- `imagefront` (image de la carte)
- `slug` (unique, non localisé)
- `active` (booléen)
- `order` (entier) — tri ascendant dans la grille

Publiez (Publish) pour déclencher la mise à jour sur DEV/APPROVE.

---

## 4) Publier & voir le résultat

1. Dans Dato (bon environnement), cliquez `Publish changes`.
2. Le *webhook* déclenche un déploiement sur Vercel (branche correspondante).
3. Après ~1–3 min, rechargez la page DEV/APPROVE (Ctrl/Cmd + Shift + R pour forcer).

Si rien ne change:
- Vérifiez que vous éditez bien l’environnement voulu (`dev` ou `approve`).
- Assurez‑vous d’avoir cliqué `Publish changes` (et pas uniquement `Save`).
- Attendez la fin du build dans Vercel (onglet Deployments).

---

## 5) Trucs & astuces d’édition

- Paragraphes: laissez **une ligne vide** entre les paragraphes dans `Intro`.
- Slug: ne modifiez pas un slug existant (risque de 404). Pour les suites, respectez la liste de slugs fournie.
- Langues: éditez **Anglais et Espagnol**; le site affiche la langue de l’URL.
- Images: préférez des visuels optimisés (poids raisonnable). `Hero` est optionnel.

---

## 6) Environnements: quand utiliser quoi ?

- `dev` – travail interne et tests rapides (possibilité d’activer “Record updated” dans le webhook pour rebuilder à chaque sauvegarde si souhaité).
- `approve` – validation client (préviews propres, mêmes contenus que `dev` lorsque vous êtes prêts).
- `main` – publication officielle (ne pas pousser avant validation).

Workflow classique:
1. Éditer sur `dev` → vérifier sur l’URL DEV.
2. Copier ou promouvoir vos contenus sur `approve` → vérifier sur l’URL APPROVE.
3. Publier ensuite en `main`.

---

## 7) Liens utiles

- Admin Dato: https://lcqc-v2.admin.datocms.com
- Site DEV (Vercel): votre URL `…git-dev…vercel.app`
- Site APPROVE (Vercel): votre URL `…git-approve…vercel.app`
- Site public (MAIN): https://www.lacasaquecanta.com

Support: si besoin d’aide (nouveau champ, nouvelle page, bug d’affichage), pingez l’équipe avec l’URL de la page + la capture de l’enregistrement Dato.
