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

## Scripts utiles

```bash
npm run dev
npm run build
npm run start
npm run lint
```
