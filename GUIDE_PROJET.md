# PROJET ILY BEACH — Guide complet

---

## 1. RÉSUMÉ

### Ce qui est construit

Une application web mobile pour le bar/lounge **ILY BEACH** (Marrakech, Maroc).
Le client scanne un QR code sur sa table, l'application s'ouvre sur son téléphone, il consulte le menu, ajoute des articles à un panier, et la commande est envoyée au serveur.

### Fonctionnalités

- Menu digital interactif avec **photos réelles** des produits (chichas, boissons, cocktails)
- **Panier** avec ajout/suppression/quantités, calcul automatique du total
- **Assistant IA multilingue** propulsé par Claude (Anthropic) qui comprend les commandes en langage naturel ("2 chichas menthe et un Red Bull")
- **Sélecteur de langue à l'arrivée** : Français, Arabe marocain (Darija), Anglais, ou n'importe quelle autre langue (champ libre)
- **Drapeaux SVG haute qualité** via flagcdn.com
- **QR code par table** : le numéro de table est lu automatiquement depuis l'URL (`?table=5`)
- **Commande envoyée par WhatsApp** au serveur du bar (par défaut)
- Design lounge marocain : noir profond, accents dorés, polices Cinzel + Lato, animations douces

### Stack technique

- **React 18** + **Vite** (build rapide)
- **Tailwind CSS** pour le style
- **API Anthropic** (modèle `claude-sonnet-4-20250514`) pour le chat IA
- **Proxy serverless** sur Vercel pour protéger la clé API (le client ne voit jamais la clé)

### Où sont les fichiers

Tout est dans le dossier `D:\Claude\Agent resto\publicimages\` :

```
publicimages/
├── package.json              dépendances Node
├── vite.config.js            config build + proxy IA en dev
├── tailwind.config.js        config styles
├── postcss.config.js         config CSS
├── index.html                page HTML d'entrée
├── .gitignore                fichiers ignorés par Git
├── .env.example              modèle de fichier .env (à recopier en .env avec la vraie clé)
├── README.md                 doc déploiement
├── src/
│   ├── main.jsx              point d'entrée React
│   ├── index.css             styles Tailwind
│   └── IlyBeachApp.jsx       composant principal (≈1340 lignes, tout y est)
├── api/
│   └── chat.js               proxy IA serverless pour Vercel
└── public/
    └── images/               19 photos PNG des produits (eau et limonade en SVG fallback)
```

### État actuel

- ✅ Code complet et syntaxiquement valide
- ✅ Photos en place (19/21 — manquent eau.png et limonade.png, fallback SVG actif)
- ✅ Numéro WhatsApp à configurer (placeholder `212600000000` à remplacer)
- ✅ Clé API Anthropic à fournir (en local via `.env`, en prod via Vercel)
- ⏳ Pas encore déployé sur GitHub ni Vercel

---

## 2. CE QUE JE DOIS FAIRE

### Étape 1 — Installer Node.js (5 min, à faire une seule fois)

1. Va sur **https://nodejs.org**
2. Télécharge la version **LTS** (bouton vert de gauche)
3. Lance l'installation, clique "Suivant" partout
4. Pour vérifier : ouvre l'invite de commandes (touche Windows → tape `cmd`) et tape `node -v` → doit afficher `v20.xx.x` ou similaire

### Étape 2 — Récupérer une clé API Anthropic (5 min)

1. Va sur **https://console.anthropic.com**
2. Crée un compte (ou connecte-toi)
3. Ajoute du crédit (5-10€ suffisent pour des milliers de messages)
4. Va dans **Settings → API Keys** → **Create Key**
5. Copie la clé qui commence par `sk-ant-api03-...` (tu ne pourras plus la voir après, sauvegarde-la quelque part)

### Étape 3 — Tester en local (10 min)

1. Ouvre l'invite de commandes Windows (touche Windows → tape `cmd`)
2. Va dans le dossier du projet :
   ```
   cd "D:\Claude\Agent resto\publicimages"
   ```
3. Crée un fichier `.env` à côté de `package.json` (avec le Bloc-notes par exemple), contenu :
   ```
   ANTHROPIC_API_KEY=sk-ant-api03-LA-CLÉ-RÉCUPÉRÉE-À-L-ÉTAPE-2
   ```
4. Installe les dépendances (à faire une seule fois) :
   ```
   npm install
   ```
   (ça prend 1-2 min, télécharge ~100 MB dans `node_modules/`)
5. Lance le serveur de dev :
   ```
   npm run dev
   ```
6. Ouvre **http://localhost:5173** dans ton navigateur
7. Teste : sélectionne une langue, ajoute des articles, parle à l'assistant — tout doit marcher

### Étape 4 — Régler le numéro WhatsApp du bar (1 min)

1. Ouvre le fichier `src/IlyBeachApp.jsx` avec un éditeur de texte (VS Code, Bloc-notes...)
2. Cherche la ligne 8 :
   ```js
   WHATSAPP_NUMBER: "212600000000",
   ```
3. Remplace par le vrai numéro du bar **en format international, sans `+`, sans espaces** :
   - Exemple : `+212 6 61 23 45 67` → écrire `"212661234567"`
4. Sauvegarde

### Étape 5 — Mettre le projet sur GitHub (15 min)

1. Va sur **https://github.com** et crée un compte gratuit
2. Confirme ton email
3. Clique sur le **+** en haut à droite → **New repository**
4. Remplis :
   - Repository name : `ily-beach`
   - Visibilité : **Public** (obligatoire pour le free tier de Vercel)
   - Coche **Add a README file** : NON (on en a déjà un)
   - Coche **Add .gitignore** : NON
5. Clique **Create repository**
6. Sur la page du repo vide, clique le lien **uploading an existing file**
7. **Glisse-dépose tout le contenu** de `D:\Claude\Agent resto\publicimages\` dans la zone (sauf `node_modules` s'il existe)
   - Inclure : `src/`, `api/`, `public/`, `package.json`, `vite.config.js`, `index.html`, `tailwind.config.js`, `postcss.config.js`, `.gitignore`, `README.md`, `.env.example`
   - **NE PAS inclure** : `.env` (s'il existe — il contient ta clé secrète) et `node_modules/`
8. Tout en bas de la page, clique **Commit changes**

### Étape 6 — Déployer sur Vercel (10 min)

1. Va sur **https://vercel.com**
2. Clique **Sign Up** → **Continue with GitHub** (lie ton compte GitHub)
3. Sur le dashboard, clique **Add New… → Project**
4. Vercel liste tes repos GitHub → trouve `ily-beach` et clique **Import**
5. Sur la page de config :
   - **Framework Preset** : Vite (détecté automatiquement)
   - Ne touche à rien d'autre
6. Avant de déployer, ouvre la section **Environment Variables** :
   - Name : `ANTHROPIC_API_KEY`
   - Value : ta clé `sk-ant-api03-...`
   - Clique **Add**
7. Clique **Deploy**
8. Attends ~1 minute → Vercel te donne une URL du genre `https://ily-beach.vercel.app`
9. Clique cette URL → vérifie que ton site marche en ligne

### Étape 7 — Générer les QR codes pour chaque table (10 min)

Pour chaque table du bar, tu vas créer un QR code différent qui pointe vers ton site avec le bon numéro de table.

1. Va sur **https://www.qr-code-generator.com** (ou n'importe quel autre générateur de QR)
2. Sélectionne **URL**
3. Pour la **table 1**, colle :
   ```
   https://ily-beach.vercel.app/?table=1
   ```
4. Personnalise (optionnel) : couleur dorée, logo au centre…
5. Clique **Download** → tu obtiens un PNG
6. Imprime, plastifie, colle sur la table 1
7. **Répète** pour table 2 (`?table=2`), table 3 (`?table=3`)... jusqu'à ta dernière table

Dans l'application, le numéro de table apparaîtra automatiquement en haut, et sera inclus dans le message WhatsApp envoyé au serveur quand le client commande.

### Étape 8 — Pour modifier l'app plus tard

Quand tu veux changer un prix, ajouter un produit, modifier une photo :
1. Modifie le fichier sur ton ordi
2. Sur GitHub, va dans ton repo → **Add file → Upload files** → glisse les fichiers modifiés → **Commit changes**
3. Vercel **redéploie automatiquement** en ~1 minute

---

## 3. SOLUTIONS POUR RECEVOIR LES COMMANDES

Actuellement la commande part par WhatsApp. Voici toutes les options classées du plus simple au plus complet :

### A. WhatsApp Business (déjà en place)

**Avantages** : Gratuit, marche immédiatement, tous les serveurs ont WhatsApp au Maroc, message visible et parsable à l'œil.

**Inconvénients** : Mélange avec les messages perso du staff, pas de tableau de bord centralisé, pas de stats, le client doit appuyer une fois sur "Envoyer" dans WhatsApp.

**Idéal pour** : Petits bars, lancement rapide, tester le concept.

### B. Telegram Bot

**Avantages** : Notifications instantanées (sons distincts, alertes claires), gratuit, plus pro qu'un WhatsApp perso, peut être ouvert sur plusieurs téléphones simultanément (chef + serveur + manager), historique infini.

**Inconvénients** : Le staff doit installer Telegram (rare au Maroc), ~10 min de setup pour créer le bot.

**Mise en place** : Créer un bot via `@BotFather` sur Telegram, récupérer un token, modifier le fichier `api/chat.js` pour qu'il ping le bot avec la commande au lieu d'ouvrir WhatsApp côté client.

**Idéal pour** : Bars qui veulent une réception pro sans investir dans du matériel.

### C. Email automatique via EmailJS

**Avantages** : Gratuit jusqu'à 200 emails/mois, le bar reçoit chaque commande dans sa boîte mail, archivage automatique.

**Inconvénients** : Pas de notification sonore immédiate (un email peut être lu 10 min plus tard), pas adapté aux bars très chargés.

**Mise en place** : Créer un compte sur emailjs.com, configurer un template, ajouter 5 lignes de code dans le bouton "Envoyer".

**Idéal pour** : Lieux où la commande n'est pas urgente, restaurants avec service à table classique.

### D. Tablette tableau de bord à la caisse (Supabase + Vercel)

**Avantages** : Vue temps réel de **toutes** les commandes, statuts (reçue / en préparation / servie), historique complet, statistiques (CA, articles populaires, heures de pointe), multi-utilisateurs (chef voit tout, serveur ne voit que sa zone).

**Inconvénients** : ~1 journée de dev en plus pour brancher Supabase (base de données gratuite jusqu'à 500 MB), nécessite une tablette dédiée à la caisse.

**Mise en place** : Compte Supabase, table `orders`, page `/admin` protégée par mot de passe, polling toutes les 3 secondes pour les nouvelles commandes.

**Idéal pour** : Lounges qui veulent passer au niveau pro avec data et analytics.

### E. Impression directe sur ticket thermique

**Avantages** : Le ticket sort tout seul à la cuisine/au bar dès qu'une commande arrive, expérience pro identique aux gros restaurants.

**Inconvénients** : Demande une imprimante thermique réseau (~80-150€), un mini-PC ou Raspberry Pi à 50€, ~2 jours de mise en place avec ESC/POS, plus de complexité.

**Mise en place** : Imprimante Epson TM-T20 (ou équivalent), middleware Node.js qui écoute les nouvelles commandes et envoie au format ESC/POS.

**Idéal pour** : Lounges qui veulent du sérieux et qui ont déjà une cuisine séparée.

### F. Intégration POS (caisse enregistreuse Lightspeed, Square, Toast...)

**Avantages** : Tout passe par le système existant du bar (TVA, comptes journaliers, stocks), commandes intégrées au workflow officiel.

**Inconvénients** : Demande une API du POS (souvent payante, parfois bloquée par le fabricant), 1-2 semaines de dev, dépendance forte au fournisseur.

**Idéal pour** : Bars en chaîne qui ont déjà un POS pro et veulent intégrer le QR code dedans.

### Recommandation

Démarre avec **WhatsApp (A)** pour valider le concept en quelques jours.
Si l'usage décolle, passe à **Telegram (B)** ou directement au **dashboard Supabase (D)** selon le volume.
Garde **l'impression thermique (E)** et **le POS (F)** pour plus tard, quand le projet est mature.

---

## QUESTIONS COURANTES

**"Combien ça coûte par mois ?"**
- Vercel : gratuit jusqu'à 100 GB de bande passante/mois (largement assez)
- GitHub : gratuit
- flagcdn.com (drapeaux) : gratuit
- API Anthropic : ~$3 par 1000 messages (le client moyen envoie 2-3 messages par commande, donc ~$1 pour 100 commandes)
- Domaine custom (`ilybeach.ma`) : optionnel, ~10€/an

**"Et si je veux mon propre domaine au lieu de `ily-beach.vercel.app` ?"**
Achète le domaine sur Gandi/OVH/Namecheap, ajoute-le dans Vercel → Settings → Domains, suis les instructions DNS.

**"Comment ajouter un nouveau produit ?"**
Dans `src/IlyBeachApp.jsx`, cherche l'objet `MENU` (ligne ~370). Ajoute un objet dans la bonne section, dépose une photo nommée `id_du_produit.png` dans `public/images/`, push sur GitHub, Vercel redéploie.

**"Le client peut-il payer en ligne ?"**
Pas pour l'instant — l'app envoie la commande au serveur qui apporte la facture en fin de service. Si tu veux paiement en ligne, on peut intégrer Stripe ou CMI Maroc (~1 journée de dev en plus).
