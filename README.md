# Valérian Digital — Site vitrine SEO

Site vitrine multipage ultra performant pour Valérian Digital (création de sites internet et référencement naturel).

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS
- lucide-react (icônes)
- Sitemap/robots via App Router
- JSON-LD (Organization, WebSite, Service, BreadcrumbList, FAQPage)

## Lancer le projet

```bash
npm install
npm run dev
```

Accédez à `http://localhost:3000`.

## Build

```bash
npm run build
npm run start
```

## Déploiement Netlify

1. Connectez le dépôt à Netlify.
2. Configurez :
   - Build command : `npm run build`
   - Publish directory : `.next`
   - Node version : `20`
3. Déployez.

Le fichier `netlify.toml` est prêt pour ces réglages.

## Contenu

Le contenu est géré dans `src/content` :
- `blog.ts`
- `case-studies.ts`

## SEO technique

- Metadata unique par page via `generateMetadata`
- Canonical par page
- OpenGraph/Twitter cards
- Sitemap + robots
- JSON-LD : Organization, WebSite, Service, FAQ, Breadcrumbs

## Mini CMS (Neon)

Ce projet inclut un mini CMS pour modifier le contenu de l’accueil via `/admin`.

### 1) Créer la base Neon

- Crée une base sur https://neon.tech
- Récupère `DATABASE_URL`
- Exécute le script `sql/page_content.sql` dans l’éditeur SQL Neon
- Exécute le script `sql/blog_posts.sql` pour les articles
- Si la table existe déjà, exécute `sql/blog_posts_update.sql` pour ajouter les champs SEO

### 2) Variables d’environnement (Netlify ou .env.local)

```
DATABASE_URL=postgresql://...
ADMIN_EMAIL=contact@valerian-digital.fr
ADMIN_PASSWORD_SALT=change-me
ADMIN_PASSWORD_HASH=...
SESSION_SECRET=change-me-long
```

### 3) Générer le hash du mot de passe

```
node -e "const crypto=require('crypto');const salt='change-me';const pass='mon-mot-de-passe';console.log(crypto.createHmac('sha256', salt).update(pass).digest('hex'));"
```

### 4) Accès

- Login : `/admin`
- Édition pages : `/admin/content/{slug}`

## Blog CMS

Le blog est entièrement géré via le CMS admin. Tu peux créer, modifier et supprimer des articles.

### Pages admin du blog :

- **Liste des articles** : `/admin/blog`
- **Créer un article** : `/admin/blog/new`
- **Modifier un article** : `/admin/blog/{slug}`

### Champs SEO disponibles :

- `slug` : URL de l'article (ex: `seo-pour-tpe-pme`)
- `title` : Titre affiché sur la page
- `meta_title` : Titre SEO (max 60 caractères recommandé)
- `meta_description` : Description SEO (max 160 caractères recommandé)
- `excerpt` : Résumé court pour la carte sur la page `/blog`
- `intent` : Catégorie affichée (ex: "SEO stratégique", "Article")
- `focus_keyword` : Mot-clé principal (RankMath)
- `canonical_url` : URL canonique (optionnel)
- `og_image_url` : Image OpenGraph (optionnel)
- `author_name` : Auteur (optionnel)
- `cover_image_url` : URL de l'image de couverture (optionnel)
- `content_markdown` : Contenu de l'article en Markdown (avec liens internes/externes)
- `published` : Si coché, l'article est visible publiquement

### Liens internes et externes dans le Markdown :

```markdown
[Lien interne](/contact)
[Lien externe](https://example.com)
```

Slugs disponibles :
- `home` (Accueil)
- `creation` (Création de site)
- `seo` (SEO)
- `realisations`
- `blog`
- `about`
- `contact`
- `mentions`
- `privacy`
- `thanks`

## Scripts utiles

```bash
npm run dev
npm run build
npm run start
npm run lint
```
