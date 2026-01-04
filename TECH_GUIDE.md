# 📄 Fiche Technique - SWA. Social App

## 1. Architecture Globale
L'application est une Single Page Application (SPA) développée en **React 19** avec **Tailwind CSS**. Elle suit une architecture modulaire centrée sur les composants.

## 2. Structure Modulaire des Médias
Pour garantir une maintenance optimale, la gestion des médias est divisée :
- `PostMedia.tsx` : Orchestrateur principal des médias (Images, Vidéos, Carrousels).
- `ImageCarousel.tsx` : Gestion du carrousel compact dans le flux (16:9).
- `FullscreenCarousel.tsx` : Composant isolé pour la vue plein écran, gérant sa propre physique de swipe.

## 3. Standard Média (Règle d'Or)
- **Flux (Feed)** : Ratio **16:9** fixe (`aspect-video`) avec `object-cover`.
- **Plein Écran** : Respect de l'aspect ratio original avec `object-contain` sur fond noir immersif.

## 4. Navigation et UX
- **Swipe Hybride** : Support natif du tactile sur mobile et émulation de "drag" à la souris sur desktop.
- **Synchronisation** : L'index du carrousel de flux est transmis au carrousel plein écran lors de l'ouverture pour une continuité parfaite.

## 5. Accessibilité (A11y)
- Utilisation de rôles ARIA (`role="dialog"`, `aria-modal="true"`).
- Tabular-nums pour les compteurs de pages.
- Libellés explicites sur les boutons de contrôle.
