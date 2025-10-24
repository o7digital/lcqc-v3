# Effet Zoom Plein Écran sur les Images du Slider

## Objectif
Reproduire l’effet de lightbox/zoom plein écran sur les images du slider, comme sur le site chateaudesalpilles.com, pour le projet LCQC-v2. L’utilisateur peut cliquer sur une image du slider pour l’agrandir en plein écran, avec navigation entre les images.

## Fonctionnement
- **Desktop** : Clic sur une image du slider → ouverture en plein écran (overlay sombre, navigation flèches/thumbnails, fermeture par croix ou clic extérieur).
- **Mobile** : En mode paysage, la photo zoomée s’adapte à tout l’écran.
- **Navigation** : Possibilité de passer d’une image à l’autre dans l’overlay.

## Librairie recommandée
- [PhotoSwipe](https://photoswipe.com/) (effet moderne, responsive, proche du site inspirant)
- Alternatives : LightGallery, Fancybox

## Étapes d’implémentation
1. Installer la librairie (npm install photoswipe)
2. Intégrer la librairie dans le composant slider (Astro/JS)
3. Relier le clic sur une image à l’ouverture de la lightbox
4. Adapter le responsive pour mobile (plein écran en paysage)
5. Personnaliser le style si besoin
6. Tester sur la branche dev avant fusion

## Sécurité
- Toutes les modifications sont faites sur la branche `dev` pour éviter tout impact sur la production.
- Validation sur desktop et mobile avant fusion sur `main`.

## Dossier de documentation
Ce dossier contient toutes les étapes, choix techniques, et instructions pour l’équipe.

---

*Document généré le 23/10/2025 par GitHub Copilot.*
