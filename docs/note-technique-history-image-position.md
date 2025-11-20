# Note technique - Ajustement position image section History

**Date:** 20 novembre 2025  
**Branche:** dev → main  
**Commits:** 
- `0f49153` - fix: increase History section image offset to -200px to show pool
- `ecc1da7` - Merge branch 'dev' - fix History section image position to show pool

## Problème
La piscine n'était pas visible dans la section "History" de la page `/la-casa-que-canta` car l'image était positionnée trop bas (centrée par défaut, puis avec un offset de -80px).

## Solution appliquée
Modification du `background-position` de l'image dans la section History :

**Fichiers modifiés:**
- `src/pages/la-casa-que-canta.astro`
- `src/pages/es/la-casa-que-canta.astro` (version espagnole)
- `src/layouts/LayoutTwoCol.astro` (nettoyage des tests avec transform)

**Changement:**
```css
/* Avant */
background-position: center -80px;

/* Après */
background-position: center -200px;
```

Cette modification décale l'image de 200px vers le haut, permettant de montrer la piscine infinity qui se trouve dans la partie supérieure de la photo `welcome-lacasa-optimized.webp/jpg`.

## Résultat
La piscine est maintenant visible dans la section History de la page La Casa Que Canta, améliorant l'impact visuel et la cohérence avec le hero principal du site.

## Notes
- Le changement affecte uniquement la section History sur la page la-casa-que-canta
- Les autres sections (Pools, Our Team) ne sont pas impactées
- Le layout LayoutTwoCol a été nettoyé des tests de transform qui affectaient toutes les images
