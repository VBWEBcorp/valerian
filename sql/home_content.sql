CREATE TABLE IF NOT EXISTS home_content (
  id INTEGER PRIMARY KEY,
  hero_title TEXT NOT NULL,
  hero_subtitle TEXT NOT NULL,
  hero_bullets JSONB NOT NULL,
  value_props JSONB NOT NULL,
  method_steps JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

INSERT INTO home_content (
  id,
  hero_title,
  hero_subtitle,
  hero_bullets,
  value_props,
  method_steps
) VALUES (
  1,
  'Sites web qui convertissent + SEO qui attire des clients',
  'Nous aidons les TPE/PME à obtenir un site premium, rapide et clair, puis à le rendre visible avec un référencement naturel durable.',
  '["Positionnement clair et messages orientés décisions","Architecture SEO pensée pour générer des leads","Accompagnement simple, transparent, efficace"]',
  '[{"title":"Clarté stratégique","text":"Un message net, une offre lisible, des pages qui guident."},{"title":"Performance fluide","text":"Rapidité, mobile-first, expérience premium sans friction."},{"title":"Acquisition durable","text":"SEO structuré pour générer des leads qualifiés."}]',
  '[{"title":"1. Diagnostic","text":"Analyse de l’offre, du marché et des freins actuels."},{"title":"2. Structure","text":"Architecture des pages, messages et parcours clients."},{"title":"3. Production","text":"Design, développement, contenus et SEO technique."},{"title":"4. Pilotage","text":"Suivi des performances et itérations mensuelles."}]'
)
ON CONFLICT (id) DO NOTHING;
