# ILY BEACH — Menu digital avec assistant IA

Application web mobile pour bar/lounge — menu interactif et chat IA multilingue propulsé par **Gemini (gratuit jusqu'à 1500 messages/jour)**.

> **Note V1** : la prise de commande en ligne est désactivée pour cette version. Le client consulte la carte et peut poser des questions à l'assistant. Pour commander, il fait simplement signe au serveur.

---

## STRUCTURE DU PROJET

```
publicimages/
├── package.json          → dépendances
├── vite.config.js        → config build + proxy IA dev
├── tailwind.config.js    → config styles
├── postcss.config.js     → config CSS
├── index.html            → page HTML
├── .gitignore            → fichiers à ignorer par Git
├── .env.example          → modèle pour la clé Gemini
├── README.md             → ce fichier
├── src/
│   ├── main.jsx          → point d'entrée React
│   ├── index.css         → styles Tailwind
│   └── IlyBeachApp.jsx   → composant principal
├── api/
│   └── chat.js           → proxy IA Gemini serverless (Vercel)
└── public/
    └── images/           → photos des produits
```

---

## TESTER EN LOCAL

1. Installe Node.js depuis https://nodejs.org (version 18+)
2. Ouvre un terminal dans le dossier du projet
3. Récupère ta clé GRATUITE sur https://aistudio.google.com/app/apikey (compte Google requis)
4. Crée un fichier `.env` à la racine (à côté de `package.json`) :
   ```
   GEMINI_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
   ```
5. Lance :
   ```
   npm install
   npm run dev
   ```
6. Ouvre http://localhost:5173 dans ton navigateur

Le chat IA marche en local grâce à un proxy intégré au serveur Vite. Le fichier `.env` est ignoré par Git (ta clé reste secrète sur ton ordi).

---

## DÉPLOIEMENT — GITHUB + VERCEL + QR CODE

### ÉTAPE 1 — METTRE LE CODE SUR GITHUB

1. Crée un compte gratuit sur https://github.com
2. Clique sur le bouton vert **"New"** pour créer un repository
3. Nom : `ily-beach` (ou ce que tu veux)
4. Visibilité : **Public** (obligatoire pour Vercel gratuit)
5. Clique **"Create repository"**

**Sur ton ordinateur** :

Méthode simple (sans terminal) :
- Sur la page de ton repo GitHub, clique **"uploading an existing file"**
- Glisse-dépose **TOUS** les fichiers et dossiers du projet (sauf `node_modules` et `.env` s'ils existent)
- En bas, clique **"Commit changes"**

Méthode terminal (si tu connais Git) :
```
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/TON_PSEUDO/ily-beach.git
git push -u origin main
```

### ÉTAPE 2 — DÉPLOYER SUR VERCEL

1. Va sur https://vercel.com et crée un compte avec ton compte GitHub
2. Clique **"Add New..." → "Project"**
3. Sélectionne ton repo `ily-beach`
4. Vercel détecte automatiquement Vite/React → clique **"Deploy"**
5. Attends ~1 minute → tu obtiens une URL du genre `https://ily-beach.vercel.app`

### ÉTAPE 3 — AJOUTER LA CLÉ API GEMINI

Pour que le chat IA fonctionne :

1. Va sur https://aistudio.google.com/app/apikey et crée une clé API gratuite (commence par `AIza...`)
2. Sur Vercel, va dans ton projet → **Settings → Environment Variables**
3. Ajoute :
   - **Name** : `GEMINI_API_KEY`
   - **Value** : ta clé `AIza...`
4. Onglet **Deployments** → clique sur les 3 points du dernier déploiement → **Redeploy**

### ÉTAPE 4 — GÉNÉRER LES QR CODES

Tu auras un QR code différent **par table** pour que l'app sache quelle table consulte la carte.

1. Va sur https://www.qr-code-generator.com (ou n'importe quel autre)
2. Pour la table 1, génère un QR code avec l'URL :
   ```
   https://ily-beach.vercel.app/?table=1
   ```
3. Télécharge le PNG, imprime-le, plastifie-le, mets-le sur la table
4. Répète pour table 2, 3, 4... (juste change `?table=N`)

Le numéro de table apparaît automatiquement dans l'en-tête de l'app.

---

## LES DRAPEAUX — EXPLICATION

L'app charge les drapeaux depuis **flagcdn.com**, un service gratuit qui fournit les drapeaux de tous les pays en PNG haute qualité.

Concrètement, dans le code on a des `<img>` qui pointent vers :
- `https://flagcdn.com/w160/fr.png` → drapeau français
- `https://flagcdn.com/w160/ma.png` → drapeau marocain
- `https://flagcdn.com/w160/gb.png` → drapeau anglais

Ce sont de vraies images de drapeaux, pas des emojis. Aucune installation, aucun fichier à télécharger — ça marche tout seul dès que ton site est en ligne.

---

## MODIFIER LES PRIX OU AJOUTER DES PRODUITS

Ouvre `src/IlyBeachApp.jsx` :
- **Prix/produits** : objet `MENU` (ligne ~334)
- **Photos** : dépose le PNG dans `public/images/{id_du_produit}.png`
- **Couleurs** : objet `COLORS` (ligne ~12)
- **Configuration générale** : objet `CONFIG` (ligne ~7)
- **Prompt IA / connaissance du bot** : fonction `buildSystemPrompt` (ligne ~459)

Après modification, push sur GitHub → Vercel redéploie tout seul.

---

## COÛTS — POURQUOI C'EST GRATUIT

| Service     | Coût                                                  |
|-------------|-------------------------------------------------------|
| Vercel      | Gratuit (jusqu'à 100 GB de bande passante/mois)       |
| GitHub      | Gratuit                                               |
| flagcdn.com | Gratuit                                               |
| Gemini API  | **Gratuit jusqu'à 1500 messages/jour** (Gemini Flash) |
| **Total**   | **0 €/mois** dans la limite des quotas gratuits        |

Largement suffisant pour un bar normal — au-delà de 1500 conversations/jour, tu serais déjà en train de chercher comment recruter du staff supplémentaire.

---

## ROADMAP

V1 (actuelle) : menu digital + chat info gratuit
V2 (prévue) : ajout panier + envoi commande au serveur (WhatsApp / Telegram / dashboard)
V3 (prévue) : paiement en ligne (Stripe ou CMI Maroc)

---

## EN CAS DE PROBLÈME

- **L'app charge mais pas les images** : vérifie que `public/images/` contient bien les PNG des produits
- **Le chat IA ne répond pas** : vérifie que `GEMINI_API_KEY` est bien définie (en local dans `.env`, en prod dans Vercel) et que le projet a été redéployé
- **"GEMINI_API_KEY manquante"** : tu as oublié de créer le fichier `.env` ou de redémarrer `npm run dev` après l'avoir créé
