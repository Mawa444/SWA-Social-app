
# 🧠 CORE Discussion Engine — Le Manifeste de Physique (v1.1)

Ce document est le "Grand Blueprint" pour reproduire le module de discussion de **socialX**. Il définit non seulement le code, mais l'intention physique derrière chaque mouvement.

---

## 1. La "Tension" Visuelle (Feedback States)
Le design CORE ne se contente pas de changer d'état ; il réagit à la force.
- **Le Squash & Stretch** : Lors d'un appui, la bulle ne se contente pas de rétrécir, elle subit une compression (`scale(0.98)`).
- **Le Danger Shaking** : La vibration de suppression n'est pas linéaire. Elle utilise un `ease-in-out` sur 0.4s pour simuler un objet qui tremble sous la pression avant d'exploser.

## 2. Chronométrie des Micro-Interactions (Timings)
Pour une reproduction identique, respectez ces délais :
- **Appui Long** : `450ms` (Seuil entre le clic et le mode réponse).
- **Explosion (Visual Only)** : `400ms` entre le déclenchement des particules et la disparition réelle du DOM.
- **Transition Picker** : `200ms` avec un `cubic-bezier(0.2, 0, 0, 1.2)` pour l'effet "rebond" à l'ouverture.
- **Alpha Decay Particules** : `~800ms` à `1200ms` (aléatoire par fragment).

## 3. Le Système de Déflagration "Shatter"
### Physique des Particules (Canvas)
- **Impulsion de Départ** : Vitesse radiale (`vx/vy`) entre `5` et `12` px/frame.
- **Gravité Inversée (Vent)** : Les débris ne tombent pas, ils s'envolent. 
    - `vy -= 0.05` (Accélération vers le haut).
    - `vx += 0.02` (Dérive légère vers la droite, simulant un courant d'air).
- **Rotation** : Chaque débris tourne sur lui-même (`vr`) pour simuler des fragments de plastique ou de verre.

## 4. Hiérarchie des Couleurs de Particules
| Origine du message | Couleur Particule | Couleur Bordure Particule |
| :--- | :--- | :--- |
| **Moi** | `#5B50FF` (Bleu CORE) | `#FFFFFF` (Éclats de texte) |
| **Autre** | `#FFFFFF` (Blanc) | `#EEEEEE` (Éclats de bordure) |
| **Main Post** | `#FFFFFF` | `#5B50FF` (Éclats de la bordure épaisse) |

## 5. Checklist des Fonctionnalités "Invisibles"
1.  **Vibration Haptique** : 
    - Trash Click : `vibrate(40)`
    - Explosion : `vibrate([40, 30, 100])`
2.  **Gestion du Focus** : Le textarea `focus()` doit être appelé automatiquement lors du passage en mode "Réponse".
3.  **Scroll Lock** : Empêcher le scroll du body quand le plein écran est actif pour éviter les "ghost scrolls".

---
*Ce module est conçu pour être une expérience tactile et émotionnelle. Ne négligez jamais le rebond des boutons.*
