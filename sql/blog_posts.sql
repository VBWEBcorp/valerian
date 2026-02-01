CREATE TABLE IF NOT EXISTS blog_posts (
  id SERIAL PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  meta_title TEXT NOT NULL,
  meta_description TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  intent TEXT NOT NULL DEFAULT 'Article',
  focus_keyword TEXT,
  canonical_url TEXT,
  og_image_url TEXT,
  author_name TEXT,
  cover_image_url TEXT,
  content_markdown TEXT NOT NULL,
  published BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

INSERT INTO blog_posts (
  slug,
  title,
  meta_title,
  meta_description,
  excerpt,
  intent,
  focus_keyword,
  canonical_url,
  og_image_url,
  author_name,
  cover_image_url,
  content_markdown,
  published
) VALUES
(
  'site-vitrine-qui-convertit',
  'Site vitrine qui convertit : les 7 éléments indispensables',
  'Site vitrine qui convertit : 7 éléments clés',
  'Structure, messages et preuves : les fondamentaux pour transformer vos visiteurs en prospects.',
  'Structure, messages, preuves et microcopies : les fondamentaux pour transformer vos visiteurs en prospects.',
  'Conversion / UX',
  'site vitrine qui convertit',
  NULL,
  NULL,
  'Valérian Digital',
  NULL,
  $$
Un bon site vitrine ne se contente pas d’être joli. Il guide le visiteur, répond aux objections et oriente vers l’action.

## 1. Une proposition de valeur claire
Expliquez immédiatement pour qui vous travaillez, quel problème vous résolvez et quel bénéfice concret vous apportez.

## 2. Des preuves visibles
Avis clients, logos, études de cas : ce sont vos meilleurs leviers pour rassurer.

## 3. Un parcours vers l’action
- CTA répétés et explicites
- Formulaire simple
- Pages services structurées
  $$,
  TRUE
),
(
  'seo-pour-tpe-pme',
  'SEO pour TPE/PME : par où commencer sans perdre de temps',
  'SEO pour TPE/PME : méthode simple',
  'La méthode en 4 étapes pour lancer un référencement naturel rentable.',
  'La méthode en 4 étapes pour lancer un référencement naturel rentable, même avec une petite équipe.',
  'SEO stratégique',
  'seo pour tpe pme',
  NULL,
  NULL,
  'Valérian Digital',
  NULL,
  $$
Le SEO n’est pas une check-list magique. Il faut une méthode claire, des priorités et des objectifs réalistes.

## Étape 1 : audit et priorités
Identifiez les pages à fort potentiel, les freins techniques et les mots-clés transactionnels.

## Étape 2 : architecture et contenus
Organisez votre site en silos clairs et produisez du contenu qui répond aux intentions de recherche.
  $$,
  TRUE
),
(
  'refonte-site-web',
  'Refonte de site web : comment éviter la perte de trafic SEO',
  'Refonte site web : sécuriser le SEO',
  'Checklist simple pour sécuriser votre visibilité lors d’une refonte.',
  'Checklist simple pour sécuriser votre visibilité lors d’une refonte ou d’un changement de CMS.',
  'SEO technique',
  'refonte site web',
  NULL,
  NULL,
  'Valérian Digital',
  NULL,
  $$
Une refonte mal gérée peut faire chuter votre visibilité. Anticiper la migration est indispensable.

## Redirections 301 propres
Chaque ancienne URL doit rediriger vers la page la plus pertinente pour préserver l’historique.

## Tests avant mise en ligne
Vérifiez les balises, la vitesse, les liens internes et l’indexation avant la bascule.
  $$,
  TRUE
)
ON CONFLICT (slug) DO NOTHING;
