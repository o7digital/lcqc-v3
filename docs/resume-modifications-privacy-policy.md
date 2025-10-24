# Résumé des modifications apportées à la page Privacy Policy

## Objectif
Améliorer la lisibilité et l’élégance de la page de politique de confidentialité en ajoutant un logo de fond fixe et en élargissant la zone de texte.

## Modifications réalisées

1. **Ajout du logo en fond fixe**
   - Le logo grisé et transparent de La Casa Que Canta est affiché en arrière-plan, centré et fixe, sur la page de confidentialité.
   - Utilisation de la classe `.privacy-bg` pour gérer le fond.

2. **Élargissement du container texte**
   - Création d’une classe personnalisée `.privacy-container` pour remplacer la classe Tailwind `max-w-4xl`.
   - Ajout de marges internes de 4cm à gauche et à droite pour une lecture plus confortable.
   - Suppression de la largeur maximale pour permettre au texte d’occuper toute la largeur centrale.

3. **Ajustement de la taille du texte**
   - Augmentation de la taille du texte principal et des titres pour une meilleure lisibilité.

4. **Sécurité des modifications**
   - Les changements sont isolés à la page de confidentialité et n’impactent pas les autres pages du site.
   - Instructions fournies pour travailler sur une branche `dev` avant toute fusion sur `main`.

## Fichiers modifiés
- `src/styles/global.css`
- `src/pages/privacy-policy.astro`

## Prochaines étapes
- Tester le rendu sur la branche de développement.
- Valider avec le client avant fusion sur la branche principale.

---
*Document généré le 23/10/2025 par GitHub Copilot.*
