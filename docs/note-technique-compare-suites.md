# Note technique — Fonctionnalité «Comparer les Suites» (DEV)

## Objectif
Mettre en place une fonctionnalité de comparaison des suites de l’hôtel, inspirée du site Château des Alpilles, accessible uniquement en environnement de développement (DEV) et non visible pour les clients.

## Emplacement et structure
- **Composant principal** : `src/components/CompareSuites.astro`
- **Page de test** : `src/pages/compare-suites.astro` (URL directe `/compare-suites`, non liée à la navigation)
- **Données** : Les informations des suites sont codées en dur dans le composant pour la phase de test (nom, capacité, surface, type de lit, image, description).

## Fonctionnement
- La page `/compare-suites` affiche une grille de cartes présentant les suites principales (Owner Suite, Mexico Lindo Suite, Terrace Suite, Master Pool Suite, Deluxe Suite).
- Chaque carte affiche :
  - Photo (image statique, à remplacer par les vraies images si besoin)
  - Nom de la suite
  - Capacité, surface, type de lit
  - Description courte
- La section est masquée par défaut dans le composant (`display:none`), mais visible sur la page de test.
- Aucune intégration à la navigation ou au menu public.

## Usage
- Accès uniquement en DEV via `/compare-suites`.
- Pour rendre la fonctionnalité visible au public, il suffira d’intégrer le composant dans une page existante ou d’ajouter un lien dans la navigation.

## Prochaines étapes possibles
- Remplacer les données statiques par une source dynamique (API, CMS, fichier JSON).
- Ajouter la gestion de la disponibilité en fonction des dates.
- Améliorer le design et l’ergonomie (filtres, sélection multiple, etc.).
- Traduction multilingue si besoin.

---

Pour toute question ou évolution, contacter l’équipe technique.
