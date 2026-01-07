# 💎 LE MANUSCRIT SOUVERAIN : Spécifications socialX CORE v2.7

Ce document est la référence technique absolue. Aucun pixel n'est laissé au hasard.

---

## I. FONDATIONS ATOMIQUES (DESIGN TOKENS)

### 1.1 Palette Chromatique "High-Fidelity"
| Nom | Code Hex | RGBA | Usage |
| :--- | :--- | :--- | :--- |
| **CORE Blue** | `#5B50FF` | `rgba(91, 80, 255, 1)` | Identité, Actions Primaires, Liens |
| **CORE Blue Fade** | `#4A40D4` | `rgba(74, 64, 212, 1)` | État Hover/Active du bleu |
| **CORE Rose** | `#FF416C` | `rgba(255, 65, 108, 1)` | Repost, Alertes, Création, Premium |
| **Rose Glow** | `#FF1F4B` | `rgba(255, 31, 75, 1)` | État actif du bouton de création |
| **Trust Green** | `#10B981` | `rgba(16, 185, 129, 1)` | Badge de réputation Alpha |
| **Warning Red** | `#EF4444` | `rgba(239, 68, 68, 1)` | Signalement, Notifications non-lues |
| **Deep Black** | `#000000` | `rgba(0, 0, 0, 1)` | Fermeture, Titres Hero, Boutons Clôture |
| **Soft Gray** | `#F8F9FB` | `rgba(248, 249, 251, 1)` | Fond d'application (App Background) |
| **Surface White** | `#FFFFFF` | `rgba(255, 255, 255, 1)` | Fond des cartes, Inputs, Modales |
| **Border Soft** | `N/A` | `rgba(0, 0, 0, 0.05)` | Séparateurs secondaires |
| **CORE Overlay** | `N/A` | `rgba(91, 80, 255, 0.4)` | Bordure des posts (Opacité 40%) |

### 1.2 Typographie "Inter Variable"
- **Police** : `Inter`, Sans-Serif (Variable Font).
- **Font-Feature-Settings** : `"cv11"`, `"ss01"`, `"ss03"`, `"cv01"`.
- **Hiérarchie Spécifique** :
    - **TITRE HERO (H1)** :
        - Taille : `36px` (2.25rem).
        - Graisse : `1000` (Black Extra).
        - Interlettrage : `-0.05em`.
        - Hauteur de ligne : `1.1`.
    - **TITRE SECTION (H2)** :
        - Taille : `20px` (1.25rem).
        - Graisse : `900`.
        - Casse : `UPPERCASE`.
        - Interlettrage : `-0.02em`.
    - **LABEL UI (Badge)** :
        - Taille : `10px` (0.625rem).
        - Graisse : `900`.
        - Casse : `UPPERCASE`.
        - Interlettrage : `0.2em` (Large).
    - **BODY (Standard)** :
        - Taille : `16px` (1rem).
        - Graisse : `500` (Medium) ou `700` (Bold) pour l'emphase.
        - Hauteur de ligne : `1.4`.

### 1.3 Géométrie et Rayons (Radii)
- **Cartes Posts** : `rounded-[32px]` (32px).
- **Modales de Flux** : `rounded-t-[50px]` (Haut) | `rounded-b-none`.
- **Modales Flottantes** : `rounded-[44px]` (44px).
- **Boutons "Action"** : `rounded-[24px]` (24px).
- **Boutons Circulaires** : `rounded-full` (9999px).
- **Avatars** : `rounded-full`.
- **Inputs** : `rounded-[20px]`.

---

## II. PHYSIQUE ET ANIMATIONS (ENGINE SETTINGS)

### 2.1 Courbes Bézier Standards
- **Standard Ease** : `cubic-bezier(0.4, 0, 0.2, 1)` (300ms).
- **Outil "Pop" (Bounce)** : `cubic-bezier(0.34, 1.56, 0.64, 1)` (500ms).
- **Slide In (Modales)** : `duration-500` avec `ease-out`.

### 2.2 Système de Particules (Splash)
- **Quantité** : `120` particules.
- **Vitesse Initiale** : `Math.random() * 20 + 5` px/frame.
- **Friction (Decay)** : `0.95` (perte de 5% de vitesse par frame).
- **Durée de vie (Life)** : Décrément de `0.015` par frame (~66 frames).
- **Couleurs** : Alternance entre `#5B50FF`, `#8B5CF6`, `#FF416C`.

### 2.3 Micro-interactions Tactiles
- **Active State** : `scale-[0.95]` (réduction de 5%).
- **Hover Transitions** : `duration-200` pour la couleur, `duration-500` pour l'ombre.

---

## III. LE COMPOSANT `PostItem.tsx` (ANATOMIE DÉTAILLÉE)

### 3.1 Structure Verticale (Piles)
1. **Bandeau Repost (Si actif)** :
    - Hauteur : `auto` (Padding `Y: 10px`, `X: 32px`).
    - Couleur : `#FF416C`.
    - Police : Label UI (10px, Black, Uppercase).
    - Logique : `onClick` -> `setActiveThreadPost(originalPost)`.
2. **Header** :
    - Padding : `Top: 32px`, `X: 32px`.
    - Avatar : `48px x 48px`.
    - Follow Button : `40px` de large, `rounded-full`.
3. **Contenu (Body)** :
    - Texte : Margin Top `8px`, Padding X `8px` (indention visuelle).
    - Image : Ratio `16:9` fixe. `rounded-[28px]`.
4. **Actions Bar** :
    - Hauteur : `56px` (14rem).
    - Bouton Discussion : Largeur `flex-1`. Fond `#5B50FF`. Border-radius `full`.
    - Actions (Like/Repost) : Padding `8px`. Transition de couleur `150ms`.

### 3.2 Logique de Like (Cœur)
- **Action** : Toggle Boolean `isLiked`.
- **Effet Visuel** : `animate-bounce-short` (Keyframes : 0% scale 1, 50% scale 1.3, 100% scale 1).
- **Couleur** : Remplissage `#FF415B` (Rouge Cerise).

---

## IV. MOTEUR DE SONDAGES (POLLS DEEP-DIVE)

### 4.1 Type : AWARD (Grille de Duel)
- **Grille** : `grid-cols-2`, `gap-4`.
- **Cartes** : Aspect Ratio `3:4`.
- **Filtre Post-Vote** : Overlay `rgba(91, 80, 255, 0.8)` avec `backdrop-blur(12px)`.
- **Affichage Pourcentage** : `font-[1000]`, `text-4xl`, Centré.

### 4.2 Type : BINARY (Contraste Maximal)
- **Boutons** : `w-full`, `py-8` (Padding vertical massif).
- **Feedback** : Barre de progression de fond avec `opacity-10`.
- **Animation Barre** : `transition-all duration-1000 ease-out`.

### 4.3 Type : PETITION (Engagement)
- **UI** : Fond `#000000`, Texte `#FFFFFF`.
- **Barre de Goal** : Gradient `from-[#5B50FF] to-[#8B5CF6]`.
- **Logique** : `progress = (votes / goal) * 100`.

---

## V. LA VUE `ThreadView.tsx` (OVERLORD LOGIC)

### 5.1 Routage et Transition
- **Entrée** : `slide-in-from-right` (300ms).
- **Sortie** : `slide-out-to-right` (300ms).
- **Scroll Lock** : `document.body.style.overflow = 'hidden'` à l'ouverture.

### 5.2 Système de Bulles de Discussion
- **Autres (Gris/Blanc)** : 
    - Fond : `rgba(255, 255, 255, 1)`.
    - Bordure : `1px solid rgba(0, 0, 0, 0.05)`.
    - Radius : `24px 24px 24px 4px`.
- **Moi (CORE Blue)** : 
    - Fond : `#5B50FF`.
    - Texte : `#FFFFFF`.
    - Radius : `24px 24px 4px 24px`.

---

## VI. LE HUB DE COMPÉTITION (DASHBOARD)

### 6.1 Le Leaderboard Live
- **Rafraîchissement** : `setInterval(2000ms)`.
- **Calcul Momentum** : `Math.random() * 10`. Si > 7, badge "🔥 Ultra-Rapide".
- **Gap Calculation** : `next.votes - current.votes`. Affiché en rouge si l'écart est < 1000.

### 6.2 Système de Tokens
- **Initial** : `50 Tokens`.
- **Consommation** : `1 vote = 1 token` (standard) | `Boost = 10 tokens`.
- **Persistence** : État local `voteTokens`.

---

## VII. GESTION DES ÉTATS ET FILTRAGE (CORE LOGIC)

### 7.1 Algorithme du Flux (App.tsx)
```typescript
const filteredPosts = useMemo(() => {
  return posts
    .filter(p => !p.isArchived)                   // Exclure archives
    .filter(p => !hiddenAuthorIds.has(p.author.id)) // Exclure auteurs masqués
    .filter(p => {                                // Filtrage par onglet
       if (activeTab === 'VOIX') return !!p.poll;
       if (activeTab === 'SOCIAL') return !p.poll;
       return true;
    })
    .sort((a, b) => b.timestamp - a.timestamp);   // Chronologie inverse
}, [posts, hiddenAuthorIds, activeTab]);
```

### 7.2 Score de Réputation (Citizen Score)
- **Composants** :
    1. `ActivityScore` (0-100) : Fréquence de postage.
    2. `TrustFactor` (0-1) : Ratio Likes/Reports.
- **Calcul** : `reputation = (Activity * 0.3) + (Trust * 70)`.
- **Badges** : 
    - `ALPHA+` : Score > 90.
    - `BETA` : Score > 70.
    - `SUSPICIOUS` : Score < 30.

---

## VIII. PROTOCOLE SÉCURITÉ (SIGNATURE CORE)

### 8.1 Simulation de Hachage (Modale Édition)
- **Étape 1** : "Hachage SHA-256..." (450ms).
- **Étape 2** : "Signature Numérique..." (450ms).
- **Étape 3** : "Synchronisation Registre..." (450ms).
- **Feedback** : Spinner de `80px`, épaisseur `8px`, rotation `linear` (1s).

---

## IX. NAVIGATION BASSE (BOTTOM NAV)

### 9.1 Dimensions et Contraintes
- **Hauteur** : `80px` (fixes).
- **Padding X** : `32px`.
- **Icônes** : Taille `32px x 32px`, Épaisseur trait `2.5px`.
- **Active State** : Couleur `#5B50FF`, `scale-110`.
- **Z-Index** : `100`.

---

## X. MODALE PREMIUM (XY+)

### 10.1 Esthétique "Dark Excellence"
- **Fond** : `#000000` (Noir Pur).
- **Bordure** : `1px solid rgba(255, 255, 255, 0.1)`.
- **Logo** : Dégradé `linear-gradient(45deg, #5B50FF, #FF416C)`.
- **Bouton** : `#5B50FF`, Shadow `0 20px 40px rgba(91, 80, 255, 0.3)`.

---
*Fin du document de spécifications socialX CORE. Toute modification doit être validée par le conseil CORE.*