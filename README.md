# 📄 socialX CORE — Documentation Technique (v2.7)

Bienvenue dans le dépôt de **socialX**, une plateforme sociale de partage d'informations à haute fidélité. Ce document a pour but de détailler l'architecture, la philosophie de design et les mécanismes techniques de l'application pour permettre une continuité de développement fluide.

---

## 1. Vision et Philosophie du Produit
**socialX** n'est pas un réseau social classique. Il est basé sur le protocole (fictif) **CORE**, axé sur la souveraineté numérique et la clarté de l'information.
- **Identité Visuelle :** Esthétique "Brutaliste-Élégante", typographies massives (`Inter` 900), contrastes élevés et coins très arrondis (`rounded-[44px]`).
- **Expérience Utilisateur :** Rapidité d'exécution, transitions fluides et focus sur le contenu original.

---

## 2. Pile Technique (Stack)
- **Framework :** React 19 (Hooks, Transitions, Suspense-ready).
- **Stylisation :** Tailwind CSS (Configuration JIT).
- **Gestion d'État :** Architecture "Top-Down" (État centralisé dans `App.tsx`).
- **Médias :** Système de secours (fallbacks) intelligent via `XYImage.tsx`.

---

## 3. Architecture des Fichiers
```text
/
├── App.tsx                 # Orchestrateur central : Navigation & États globaux
├── types.ts                # Contrats de données (Interfaces Post, User, Poll)
├── constants/
│   └── mockData.ts         # Données d'initialisation et structures d'exemple
├── components/
│   ├── Feed.tsx            # Gestion du flux infini et de l'Intersection Observer
│   ├── PostItem.tsx        # Composant atomique de la publication (Logiciel clé)
│   ├── ThreadView.tsx      # Vue "Plein Écran" / Focus Publication & Discussion
│   ├── ProfileView.tsx     # Gestion des profils citoyens et archives
│   ├── XYImage.tsx         # Gestionnaire d'images avec Skeletons et Fallbacks
│   └── post/               # Sous-composants modulaires (Header, Actions, Polls)
```

---

## 4. Mécanismes Critiques

### A. Navigation par État (State Routing)
L'application n'utilise pas de routeur externe pour garantir une performance maximale sur mobile.
- La vue principale est gérée par `activeView` (`home`, `explore`, etc.).
- La vue détaillée est déclenchée par `activeThreadPost`. Si cet état est rempli, l'application affiche la `ThreadView` par-dessus le reste.

### B. Le Système de Redirection "Source Originale"
C'est l'un des points les plus importants de l'application :
1.  **Contexte :** Un utilisateur voit un repost (bandeau rouge/rose).
2.  **Action :** Le clic sur le bandeau doit remonter à la **source initiale immuable**.
3.  **Logique :** 
    - Le `PostItem` détecte `post.isRepost`.
    - Le clic sur le bandeau appelle `onComment(sourceId)`.
    - `App.tsx` intercepte l'ID, trouve l'objet `Post` correspondant dans le registre global et l'injecte dans `activeThreadPost`.
    - La `ThreadView` affiche alors la publication **entière** au sommet, laissant l'utilisateur choisir de scroller vers la discussion ou non.

### C. Types de Sondages (Polls)
Le moteur CORE supporte plusieurs modes de consultation :
- `BINARY` : Duel vertical massif (OUI/NON).
- `AWARD` : Grille d'images pour les compétitions.
- `PETITION` : Engagement avec barre de progression vers un objectif numérique.
- `RATING` : Échelle de sentiment de 1 à 5.

---

## 5. Guide de Style (Design Tokens)
Pour maintenir l'identité, chaque nouveau composant doit suivre :
- **Typographie Titre :** `font-[1000] uppercase tracking-tighter`.
- **Typographie Label :** `font-black uppercase tracking-[0.2em] text-[10px]`.
- **Couleurs Clés :**
    - `#5B50FF` (Bleu CORE - Primaire)
    - `#FF416C` (Rose/Rouge Repost - Alertes)
    - `#F8F9FB` (Gris Fond - Immersion)
- **Bordures :** Toujours visibles sur fond blanc (`border-gray-100`).

---

## 6. Maintenance et Évolutions
### Ajouter une nouvelle fonctionnalité :
1. Définir le type dans `types.ts`.
2. Ajouter les données dans `mockData.ts`.
3. Créer le composant dans `components/`.
4. Brancher les actions dans `App.tsx` pour assurer la persistence de l'état (ex: suppression, archivage).

### Performance :
- Utilisez `useMemo` pour les filtrages de listes complexes (comme dans `ProfileView.tsx`).
- Préférez `XYImage` à la balise `<img>` native pour éviter les Layout Shifts (sauts de page au chargement).

---
*Ce document est une pièce maîtresse du projet socialX. Tout contributeur doit en prendre connaissance avant de modifier le protocole CORE.*