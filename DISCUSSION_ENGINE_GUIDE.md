
# 🧠 CORE Discussion Engine — Spécifications Techniques (v1.0)

Ce document détaille l'architecture et les mécaniques du module de discussion de **socialX**. Ce module est le cœur de l'interaction sociale du protocole CORE, alliant une physique de particules avancée à une interface "Brutaliste-Épurée".

---

## 1. Philosophie du Design (UX/UI)
Le module suit une hiérarchie stricte :
- **Immersion** : Fond gris neutre (`#F1F3F5`) pour faire ressortir les bulles de discussion.
- **Identité** : Utilisation massive de la typographie `Inter` (900/Black) pour les en-têtes.
- **Feedback Sensoriel** : Chaque action (suppression, réaction, appui long) est accompagnée d'un retour visuel ou haptique (vibration).

---

## 2. Anatomie du Module

### 2.1 Le Header "Direct"
- **Composants** : Bouton retour (`active:scale-90`), Titre "DISCUSSION" (`font-[1000]`), Badge "Actif" (Noir avec point vert pulsant).
- **Position** : `sticky top-0` avec un `backdrop-blur` pour assurer la lisibilité lors du scroll.

### 2.2 Système de Bulles (Messaging Bubbles)
- **Bulle "Autrui"** : 
    - Couleur : Fond Blanc (`#FFFFFF`), Bordure grise (`#EEE`).
    - Forme : `rounded-[28px 28px 28px 6px]` (Coin inférieur gauche pointu).
- **Bulle "Moi"** : 
    - Couleur : Bleu CORE (`#5B50FF`), Texte blanc.
    - Forme : `rounded-[28px 28px 6px 28px]` (Coin inférieur droit pointu).
- **Micro-réactions** : Les émojis flottent à l'intersection du bord inférieur de la bulle, avec une bordure blanche épaisse (`border-2 border-white`) pour le contraste.

---

## 3. Mécaniques d'Interaction (Logic Engine)

### 3.1 Détection Hybride (Click vs Long Press)
Pour éviter les conflits d'interface, le système utilise un `timer` sur les événements `onMouseDown` :
- **Clic Simple (< 450ms)** : Ouvre ou ferme le **Reaction Picker** (le dock d'émojis).
- **Appui Long (> 450ms)** : Active le mode **"Réponse à"** (Reply mode). L'input bar se met à jour avec le nom de l'auteur ciblé.

### 3.2 Le Reaction Picker (Dock)
- **Largeur Fixe** : `460px` pour garantir une symétrie parfaite.
- **Alignement** : `justify-center` avec un `gap-1` entre les éléments.
- **Séparateur** : Un diviseur vertical (`1.5px`) sépare les 8 émojis de l'action système (Poubelle).

---

## 4. Protocole de Suppression "Danger"

C'est la fonctionnalité la plus complexe du module. Elle se décompose en deux phases :

### Phase 1 : Confirmation (Tension Visuelle)
1. **L'élément cible** reçoit la classe `.danger-target` :
    - Bordure rouge vive (`#EF4444`).
    - Animation de vibration (`danger-shake`) simulant une instabilité moléculaire.
    - Lueur externe (glow) rouge pulsante.
2. **Le Dock** passe en mode "Danger" :
    - Fond rouge (`#EF4444`).
    - Animation de scintillement "Glass Shimmer" (dégradé de lumière qui traverse le bouton).

### Phase 2 : Déflagration (Shattering Effect)
Lors de la confirmation, le message est supprimé via un système de particules Canvas :
- **Positionnement** : Les particules sont générées à partir du `getBoundingClientRect()` exact de l'élément.
- **Physique des Particules** :
    - **Vitesse (Impulsion)** : Explosion radiale initiale.
    - **Vent Virtuel** : Une force `vx += 0.02` et `vy -= 0.05` emporte les particules vers le haut et vers la droite.
    - **Couleur** : Les particules héritent de la couleur de la bulle supprimée (Bleu ou Blanc).
    - **Alpha Decay** : Les fragments disparaissent progressivement (`alpha -= 0.01`).

---

## 5. Spécifications Techniques (Code)

### Système de Particules (Canvas)
```typescript
// Exemple de configuration des particules CORE
const p = {
  vx: (Math.random() - 0.5) * 12, // Impulsion X
  vy: (Math.random() - 0.5) * 12, // Impulsion Y
  size: Math.random() * 8 + 2,    // Taille variable
  life: Math.random() * 0.8 + 0.4 // Durée de vie
};
```

### Grille de Statistique Globales
Le composant `useMemo` calcule en temps réel :
- Le nombre total de messages.
- La somme de toutes les réactions.
- La distribution par type d'émoji (affichée sous forme de pilules horizontales).

---

## 6. Guide de Reproduction (Règles d'Or)
1. **Z-Index** : Le Canvas de déflagration doit être en `fixed inset-0` avec un `z-[1000]` pour survoler toute l'interface.
2. **Vibrations** : Utiliser `window.navigator.vibrate([40, 30, 100])` pour l'explosion.
3. **Scroll** : Utiliser la classe `.hide-scrollbar` sur le conteneur principal pour maintenir l'esthétique épurée.
4. **Input** : Le `textarea` doit être auto-extensible jusqu'à un certain seuil (`max-h-40`).

---
*Document certifié par le protocole socialX CORE v2.7*
