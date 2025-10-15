# 🏨 LCQC v2 - DevOps & Development Guide

## 🧩 CONTEXTE DU PROJET

**Site web :** [https://lcqc-v2.vercel.app/](https://lcqc-v2.vercel.app/)

**Stack technique :**
- **Astro** (frontend statique) - Version 5.3.0
- **DatoCMS** (CMS headless pour le contenu)
- **Vercel** (déploiement automatique via GitHub)
- **TailwindCSS** (design system) avec typography
- **Swiper.js** (slider interactif)
- **GitHub** (`o7digital/lcqc-v2`)

---

## 🧱 ARCHITECTURE ACTUELLE

### Structure des pages principales
```
src/pages/
├── index.astro                    → Page d'accueil + slider dynamique + Booking Engine
├── la-casa-que-canta.astro        → Page principale
├── accomodations.astro            → Liste des suites
├── accomodations/[suite].md       → Pages détail par suite
├── history.md                     → Page "Our History"
├── mar-y-cielo.md                 → Restaurant Mar y Cielo
├── pools.astro                    → Piscines
├── activities.md                  → Activités et spa
└── team.md                        → Équipe
```

### Composants clés
```
src/components/
└── BookingEngine.astro           → Moteur de réservation centralisé
```

### Configuration
- `astro.config.mjs` - Configuration Astro avec alias de routes
- `tailwind.config.mjs` - Configuration TailwindCSS
- `tina/config.ts` - Configuration DatoCMS/Tina
- `package.json` - Dépendances et scripts

---

## 🚀 ENVIRONNEMENT DE DÉVELOPPEMENT

### Prérequis
- Node.js 20.x
- npm/yarn
- Git

### Installation
```bash
npm install
```

### Commandes principales
```bash
# Démarrage en mode développement
npm run dev
# → http://localhost:4321

# Build de production
npm run build

# Preview du build
npm run preview

# Vérification TypeScript
npm run astro check
```

### Déploiement
- **Automatique** : Push sur la branche `main` → Déploiement Vercel
- **Manuel** : Via dashboard Vercel

---

## 🧠 TRAVAIL RÉALISÉ (Historique complet)

### 🔸 1. Restructuration du projet
- ✅ Migration depuis WordPress vers Astro
- ✅ Réorganisation des pages selon le modèle Château des Alpilles
- ✅ Nettoyage du code hérité et optimisation responsive

### 🔸 2. Slider dynamique (Page d'accueil)
- ✅ **Connexion DatoCMS** : Modèle `allSliders` avec tri `sortOrder_ASC`
- ✅ **Fix ordre d'affichage** : Ajout du champ personnalisé `sort_order`
- ✅ **Configuration Swiper.js** :
  - Autoplay (5 secondes)
  - Pagination cliquable
  - Version responsive (desktop/mobile)
  - Lazy loading optimisé

**Query GraphQL actuelle :**
```graphql
{
  allSliders(orderBy: sortOrder_ASC) {
    id
    media { url }
    description
    sortOrder
  }
}
```

### 🔸 3. BookingEngine
- ✅ **Centrage optimal** : Desktop et mobile
- ✅ **Transparence adaptée** : `bg-black/10` → `bg-black/40` au hover
- ✅ **Effet backdrop-blur** pour un rendu premium
- ✅ **Responsive** : Adaptation automatique selon l'écran

### 🔸 4. Optimisation contenu "Our History"
- ✅ **Révision éditoriale** : Suppression du gras excessif
- ✅ **Suppression références film** : *When a Man Loves a Woman*
- ✅ **Texte raccourci** : ~30% plus concis
- - ✅ **Ton institutionnel** et fluide

### 🔸 5. Page Mar y Cielo
- ✅ **Texte optimisé** et bouton "Book a Table"
- ✅ **Fix bug horaires** : "From 18:00 to 22:30"
- ✅ **Layout responsive** amélioré

### 🔸 6. Fix technique GitHub/Vercel
- ✅ **Correction nom fichier** : `index.atro` → `index.astro`
- ✅ **Build validé** après correction GraphQL
- ✅ **Déploiement stable** sur Vercel

---

## ⚙️ CONFIGURATION ACTUELLE

### index.astro (Page d'accueil)
```astro
---
import Layout from '@layouts/Layout.astro';
import BookingEngine from '@components/BookingEngine.astro';
import { fetchDatoCMS } from '@lib/datocms';

const query = `
{
  allSliders(orderBy: sortOrder_ASC) {
    id
    media { url }
    description
    sortOrder
  }
}
`;
const data = await fetchDatoCMS(query);
const slides = data?.allSliders || [];
---

<!-- Slider + Logo + BookingEngine centrés -->
```

### Fonctionnalités actives
- 🖼️ **Slider automatique** avec pagination responsive
- 🏨 **Logo LCQC** fixé en haut à droite
- 🎫 **BookingEngine** centré avec transparence hover
- 📱 **Responsive design** desktop/mobile
- ⚡ **Lazy loading** optimisé pour la performance

---

## 🎯 ROADMAP - PROCHAINES ACTIONS

### À court terme
1. **🖼️ Lightbox fullscreen** pour les galeries de suites
2. **📱 Optimisation mobile** avancée du BookingEngine
3. **⚡ Performance** : Optimisation temps de chargement Astro/DatoCMS
4. **🌅 Widget Instagram** comme Château des Alpilles

### À moyen terme
1. **SEO avancé** : Meta tags dynamiques via DatoCMS
2. **Multilangue** : FR/EN/ES
3. **Analytics** : Google Analytics 4 + Hotjar
4. **PWA** : Cache offline et notifications push

---

## 🛠️ AIDE-MÉMOIRE TECHNIQUE

### Commandes Git fréquentes
```bash
# Status du projet
git status

# Ajout et commit
git add .
git commit -m "Description du changement"

# Push vers Vercel (déploiement auto)
git push origin main

# Créer une branche
git checkout -b feature/nom-feature
```

### Debug fréquent
- **Erreur slider** → Vérifier la query DatoCMS `sortOrder_ASC`
- **Images manquantes** → Vérifier les URLs DatoCMS avec `?w=` pour responsive
- **Build failed** → `npm run build` en local pour identifier l'erreur
- **CSS non appliqué** → Vérifier les alias dans `astro.config.mjs`

### Variables d'environnement
```env
# .env (pour DatoCMS)
DATOCMS_API_TOKEN=your_token_here
```

---

## 📊 MÉTRIQUES & MONITORING

### Performance actuelle
- **Core Web Vitals** : À surveiller via Vercel Analytics
- **Temps de chargement** : ~2-3s (à optimiser)
- **Score Lighthouse** : À mesurer régulièrement

### Monitoring
- **Vercel Dashboard** : Builds et erreurs
- **DatoCMS Analytics** : Requêtes API
- **GitHub Actions** : CI/CD (si configuré)

---

## 👥 ÉQUIPE & CONTACTS

### Rôles
- **Développeur principal** : [Nom]
- **DevOps Copilot** : GitHub Copilot / Assistant IA
- **Content Manager** : Via DatoCMS
- **Designer** : Assets dans `/public/`

---

## 📋 CHECKLIST PRÉ-DÉPLOIEMENT

- [ ] `npm run build` passe sans erreur
- [ ] Images optimisées et responsive
- [ ] Contenu DatoCMS synchronisé
- [ ] Meta tags et SEO vérifiés
- [ ] Test responsive mobile/desktop
- [ ] Performance Lighthouse > 90
- [ ] Links internes fonctionnels

---

**Dernière mise à jour :** 7 octobre 2025
**Version :** 2.0.0
**Status :** ✅ Production ready
