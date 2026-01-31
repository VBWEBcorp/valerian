export type PageSchemaField =
  | { type: "text"; label: string }
  | { type: "textarea"; label: string }
  | { type: "stringList"; label: string }
  | { type: "cardList"; label: string }
  | { type: "image"; label: string }
  | { type: "imageList"; label: string };

export type PageSchema = Record<string, PageSchemaField>;

export const pageDefaults = {
  home: {
    hero_title: "Sites web qui convertissent + SEO qui attire des clients",
    hero_subtitle:
      "Nous aidons les TPE/PME à obtenir un site premium, rapide et clair, puis à le rendre visible avec un référencement naturel durable.",
    hero_image_url:
      "https://images.unsplash.com/photo-1471879832106-c7ab9e0cee23?auto=format&fit=crop&w=1600&q=80",
    hero_primary_label: "Demander un devis",
    hero_primary_href: "/contact",
    hero_secondary_label: "Planifier un appel",
    hero_secondary_href: "/contact#calendrier",
    hero_bullets: [
      "Positionnement clair et messages orientés décisions",
      "Architecture SEO pensée pour générer des leads",
      "Accompagnement simple, transparent, efficace",
    ],
    value_props: [
      {
        title: "Clarté stratégique",
        text: "Un message net, une offre lisible, des pages qui guident.",
      },
      {
        title: "Performance fluide",
        text: "Rapidité, mobile-first, expérience premium sans friction.",
      },
      {
        title: "Acquisition durable",
        text: "SEO structuré pour générer des leads qualifiés.",
      },
    ],
    method_steps: [
      {
        title: "1. Diagnostic",
        text: "Analyse de l’offre, du marché et des freins actuels.",
      },
      {
        title: "2. Structure",
        text: "Architecture des pages, messages et parcours clients.",
      },
      {
        title: "3. Production",
        text: "Design, développement, contenus et SEO technique.",
      },
      {
        title: "4. Pilotage",
        text: "Suivi des performances et itérations mensuelles.",
      },
    ],
    inspiration_images: [
      "https://images.unsplash.com/photo-1495567720989-cebdbdd97913?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=80",
    ],
    cta_title: "Prêt à améliorer votre acquisition ?",
    cta_subtitle:
      "Parlez-nous de votre projet et recevez un plan d’action clair sous 48h.",
    cta_primary_label: "Demander un devis",
    cta_primary_href: "/contact",
    cta_secondary_label: "Planifier un appel",
    cta_secondary_href: "/contact#calendrier",
  },
  creation: {
    hero_title:
      "Un site vitrine premium qui clarifie votre offre et convertit.",
    hero_subtitle:
      "Nous concevons des sites rapides, structurés et orientés conversion pour transformer vos visiteurs en prospects qualifiés.",
    hero_image_url: "/hero.svg",
    hero_primary_label: "Demander un devis",
    hero_primary_href: "/contact",
    hero_secondary_label: "Planifier un appel",
    hero_secondary_href: "/contact#calendrier",
    feature_cards: [
      {
        title: "Positionnement clair",
        text: "Votre promesse est visible dès la première seconde.",
      },
      {
        title: "Design premium",
        text: "Une interface élégante, alignée sur votre niveau de service.",
      },
      {
        title: "Parcours optimisé",
        text: "CTA, preuves, microcopies : tout pousse vers l’action.",
      },
    ],
    method_steps: [
      {
        title: "1. Audit & cadrage",
        text: "Objectifs, cibles, différenciation, structure des pages.",
      },
      {
        title: "2. Design & contenus",
        text: "Maquettes premium + rédaction orientée conversion.",
      },
      {
        title: "3. Développement",
        text: "Intégration Next.js, performance, responsive et SEO.",
      },
      {
        title: "4. Mise en ligne",
        text: "Tests, checklist qualité et accompagnement post-lancement.",
      },
    ],
    deliverables: [
      "Arborescence claire et pages clés",
      "Copywriting orienté conversion",
      "Design premium et responsive",
      "SEO technique complet",
      "Formulaires et tracking intégrés",
      "Documentation et transfert",
    ],
    packs: [
      {
        title: "Essentiel",
        text: "Site vitrine clair, 5 à 7 pages, SEO de base.",
      },
      {
        title: "Croissance",
        text: "Pages services détaillées + copywriting avancé.",
      },
      {
        title: "SEO-first",
        text: "Architecture optimisée, contenus stratégiques, suivi.",
      },
    ],
    faq: [
      {
        title: "Combien de temps faut-il pour créer un site ?",
        text: "La durée dépend du volume de pages et de la disponibilité des contenus. En moyenne, un site vitrine complet se livre en 4 à 6 semaines.",
      },
      {
        title: "Est-ce que le site est optimisé pour le SEO ?",
        text: "Oui, chaque page est structurée avec des balises optimisées, une architecture claire et des performances techniques solides.",
      },
      {
        title: "Puis-je modifier le contenu ensuite ?",
        text: "Oui, les contenus peuvent être mis à jour facilement et nous pouvons aussi gérer l’évolution en continu.",
      },
      {
        title: "Proposez-vous la rédaction des textes ?",
        text: "Oui, la rédaction est incluse pour des contenus orientés conversion et SEO.",
      },
      {
        title: "Le site est-il responsive ?",
        text: "Oui, l’ergonomie est pensée pour mobile, tablette et desktop dès le départ.",
      },
      {
        title: "Quels sont les livrables ?",
        text: "Vous recevez un site complet, les maquettes, une structure SEO, les contenus et un plan de suivi.",
      },
      {
        title: "Peut-on intégrer des formulaires et des outils ?",
        text: "Oui, formulaires, CRM, outils de tracking et automatisations peuvent être intégrés.",
      },
      {
        title: "Quel budget prévoir ?",
        text: "Chaque projet est cadré sur devis selon l’ambition, le contenu et les intégrations nécessaires.",
      },
    ],
    cta_title: "Un site qui reflète votre niveau de service.",
    cta_subtitle: "Partagez vos objectifs et recevez une proposition claire.",
    cta_primary_label: "Demander un devis",
    cta_primary_href: "/contact",
    cta_secondary_label: "Planifier un appel",
    cta_secondary_href: "/contact#calendrier",
  },
  seo: {
    hero_title:
      "Un SEO structuré pour attirer des clients, pas seulement du trafic.",
    hero_subtitle:
      "Nous activons les 3 piliers du SEO : technique, contenu et autorité. Objectif : des positions durables et des leads qualifiés.",
    hero_image_url: "/process.svg",
    hero_primary_label: "Demander un devis",
    hero_primary_href: "/contact",
    hero_secondary_label: "Planifier un appel",
    hero_secondary_href: "/contact#calendrier",
    pillars: [
      {
        title: "Technique solide",
        text: "Performance, structure, indexation et maillage interne.",
      },
      {
        title: "Contenu stratégique",
        text: "Pages piliers, réponses aux intentions et copywriting clair.",
      },
      {
        title: "Autorité durable",
        text: "Stratégie de liens et crédibilité éditoriale progressive.",
      },
    ],
    method_steps: [
      {
        title: "1. Audit",
        text: "Analyse technique, sémantique et concurrentielle.",
      },
      {
        title: "2. Stratégie",
        text: "Plan d’action, architecture et priorisation des pages.",
      },
      {
        title: "3. Production",
        text: "Optimisations techniques + création de contenus.",
      },
      {
        title: "4. Autorité",
        text: "Acquisition de signaux de confiance et liens utiles.",
      },
    ],
    results: [
      "Positionnement progressif sur vos requêtes prioritaires",
      "Trafic qualifié et mieux segmenté",
      "Pages services qui convertissent",
      "Diminution de la dépendance publicitaire",
      "Reporting lisible et pilotage mensuel",
    ],
    deliverables: [
      {
        title: "Audit complet",
        text: "Points techniques, sémantique et opportunités.",
      },
      {
        title: "Roadmap SEO",
        text: "Priorités mensuelles + plan éditorial réaliste.",
      },
      {
        title: "Optimisations",
        text: "Pages existantes, nouvelles pages, internal linking.",
      },
    ],
    faq: [
      {
        title: "Quand voit-on les premiers résultats SEO ?",
        text: "Le SEO est progressif. Les premiers signaux arrivent souvent en 2 à 3 mois, puis la visibilité se stabilise sur 6 à 9 mois.",
      },
      {
        title: "Faut-il publier du contenu chaque semaine ?",
        text: "Non, la priorité est la qualité et l’intention. Un plan réaliste suffit pour progresser durablement.",
      },
      {
        title: "Travaillez-vous le SEO local ?",
        text: "Oui, nous optimisons la présence locale : pages dédiées, signaux de confiance et maillage adapté.",
      },
      {
        title: "Le SEO est-il compatible avec la publicité ?",
        text: "Oui, les deux canaux sont complémentaires. Le SEO réduit votre dépendance à la publicité.",
      },
      {
        title: "Faites-vous l’optimisation technique ?",
        text: "Oui, performance, indexation, maillage, structure des pages et corrections prioritaires.",
      },
      {
        title: "Quels KPI suivez-vous ?",
        text: "Positionnement, trafic qualifié, conversions et pages performantes.",
      },
      {
        title: "Fournissez-vous des rapports ?",
        text: "Oui, un reporting mensuel clair avec actions et priorités.",
      },
      {
        title: "Peut-on commencer par un audit ?",
        text: "Oui, l’audit est souvent la première étape pour définir la stratégie.",
      },
    ],
    cta_title: "Prêt à structurer votre visibilité SEO ?",
    cta_subtitle: "Obtenez un plan d’action clair et priorisé.",
    cta_primary_label: "Demander un devis",
    cta_primary_href: "/contact",
    cta_secondary_label: "Planifier un appel",
    cta_secondary_href: "/contact#calendrier",
  },
  about: {
    hero_title: "Une agence boutique pour des décisions rapides et efficaces.",
    hero_subtitle:
      "Valérian Digital accompagne les entreprises françaises qui veulent un site propre, rapide et un référencement naturel qui génère des leads.",
    hero_image_url: "/about.svg",
    positioning_title:
      "L’interlocuteur senior qui relie design, tech et SEO.",
    positioning_text:
      "Vous gagnez en clarté grâce à un accompagnement pragmatique : une stratégie simple, des priorités business, des livrables concrets.",
    values: [
      "Exigence sur la qualité et la performance.",
      "Transparence sur les actions et les résultats.",
      "Simplicité dans la communication.",
      "Focus sur la conversion et les leads.",
    ],
    differentiators: [
      {
        title: "Méthode orientée business",
        text: "Chaque page doit servir un objectif de conversion.",
      },
      {
        title: "Production rapide",
        text: "Des cycles courts avec validation claire à chaque étape.",
      },
      {
        title: "SEO sans promesses",
        text: "Une stratégie durable, alignée sur vos priorités.",
      },
    ],
    cta_title: "Vous voulez travailler avec un partenaire fiable ?",
    cta_subtitle: "Présentez votre projet et recevez un retour précis.",
    cta_primary_label: "Demander un devis",
    cta_primary_href: "/contact",
    cta_secondary_label: "Planifier un appel",
    cta_secondary_href: "/contact#calendrier",
  },
  contact: {
    hero_title: "Parlez-nous de votre projet.",
    hero_subtitle:
      "Réponse rapide avec une proposition claire et un plan d’action.",
    info_title: "Informations de contact",
    call_title: "Planifier un appel",
    call_text: "Dites-nous vos créneaux et nous revenons vers vous sous 24h.",
  },
  blog: {
    hero_title:
      "Des contenus pour améliorer votre visibilité et vos conversions.",
    hero_subtitle: "Stratégie SEO, structure des pages, performance et acquisition.",
  },
  realisations: {
    hero_title: "Études de cas : sites et SEO qui servent la croissance.",
    hero_subtitle: "Quelques projets représentatifs pour des entreprises ambitieuses.",
    hero_image_url: "/case-study.svg",
  },
  mentions: {
    title: "Mentions légales",
    body: [
      "Éditeur du site : Valérian Digital. Contact : contact@valerian-digital.fr / 01 84 80 18 24.",
      "Adresse : 12 rue de la République, 75002 Paris, FR.",
      "Hébergeur : Netlify, Inc. (San Francisco, USA).",
      "Responsable de publication : Valérian Digital.",
    ],
  },
  privacy: {
    title: "Politique de confidentialité",
    body: [
      "Les données collectées via le formulaire de contact servent uniquement à répondre à votre demande. Elles ne sont ni revendues ni partagées.",
      "Vous pouvez demander la modification ou la suppression de vos données à tout moment en écrivant à contact@valerian-digital.fr.",
      "Les mesures techniques nécessaires sont mises en place pour protéger vos informations (sécurisation des accès, suivi des bonnes pratiques).",
    ],
  },
  thanks: {
    title: "Votre demande a bien été envoyée.",
    subtitle: "Nous revenons vers vous sous 24 à 48h avec une proposition claire.",
  },
} as const;

export const pageSchemas: Record<string, PageSchema> = {
  home: {
    hero_title: { type: "text", label: "Titre principal" },
    hero_subtitle: { type: "textarea", label: "Sous-titre" },
    hero_image_url: { type: "image", label: "Image principale (URL)" },
    hero_primary_label: { type: "text", label: "Bouton principal - texte" },
    hero_primary_href: { type: "text", label: "Bouton principal - lien" },
    hero_secondary_label: { type: "text", label: "Bouton secondaire - texte" },
    hero_secondary_href: { type: "text", label: "Bouton secondaire - lien" },
    hero_bullets: { type: "stringList", label: "Bullets (1 par ligne)" },
    value_props: { type: "cardList", label: "Cartes “Ce que vous obtenez”" },
    method_steps: { type: "cardList", label: "Méthode en 4 étapes" },
    inspiration_images: { type: "imageList", label: "Images inspiration (URLs)" },
    cta_title: { type: "text", label: "CTA titre" },
    cta_subtitle: { type: "textarea", label: "CTA sous-titre" },
    cta_primary_label: { type: "text", label: "CTA bouton principal - texte" },
    cta_primary_href: { type: "text", label: "CTA bouton principal - lien" },
    cta_secondary_label: { type: "text", label: "CTA bouton secondaire - texte" },
    cta_secondary_href: { type: "text", label: "CTA bouton secondaire - lien" },
  },
  creation: {
    hero_title: { type: "text", label: "Titre principal" },
    hero_subtitle: { type: "textarea", label: "Sous-titre" },
    hero_image_url: { type: "image", label: "Image principale (URL)" },
    hero_primary_label: { type: "text", label: "Bouton principal - texte" },
    hero_primary_href: { type: "text", label: "Bouton principal - lien" },
    hero_secondary_label: { type: "text", label: "Bouton secondaire - texte" },
    hero_secondary_href: { type: "text", label: "Bouton secondaire - lien" },
    feature_cards: { type: "cardList", label: "Cartes bénéfices" },
    method_steps: { type: "cardList", label: "Méthode en 4 étapes" },
    deliverables: { type: "stringList", label: "Livrables" },
    packs: { type: "cardList", label: "Packs" },
    faq: { type: "cardList", label: "FAQ" },
    cta_title: { type: "text", label: "CTA titre" },
    cta_subtitle: { type: "textarea", label: "CTA sous-titre" },
    cta_primary_label: { type: "text", label: "CTA bouton principal - texte" },
    cta_primary_href: { type: "text", label: "CTA bouton principal - lien" },
    cta_secondary_label: { type: "text", label: "CTA bouton secondaire - texte" },
    cta_secondary_href: { type: "text", label: "CTA bouton secondaire - lien" },
  },
  seo: {
    hero_title: { type: "text", label: "Titre principal" },
    hero_subtitle: { type: "textarea", label: "Sous-titre" },
    hero_image_url: { type: "image", label: "Image principale (URL)" },
    hero_primary_label: { type: "text", label: "Bouton principal - texte" },
    hero_primary_href: { type: "text", label: "Bouton principal - lien" },
    hero_secondary_label: { type: "text", label: "Bouton secondaire - texte" },
    hero_secondary_href: { type: "text", label: "Bouton secondaire - lien" },
    pillars: { type: "cardList", label: "Piliers SEO" },
    method_steps: { type: "cardList", label: "Méthode en 4 étapes" },
    results: { type: "stringList", label: "Résultats attendus" },
    deliverables: { type: "cardList", label: "Ce que vous obtenez" },
    faq: { type: "cardList", label: "FAQ" },
    cta_title: { type: "text", label: "CTA titre" },
    cta_subtitle: { type: "textarea", label: "CTA sous-titre" },
    cta_primary_label: { type: "text", label: "CTA bouton principal - texte" },
    cta_primary_href: { type: "text", label: "CTA bouton principal - lien" },
    cta_secondary_label: { type: "text", label: "CTA bouton secondaire - texte" },
    cta_secondary_href: { type: "text", label: "CTA bouton secondaire - lien" },
  },
  about: {
    hero_title: { type: "text", label: "Titre principal" },
    hero_subtitle: { type: "textarea", label: "Sous-titre" },
    hero_image_url: { type: "image", label: "Image principale (URL)" },
    positioning_title: { type: "text", label: "Titre positionnement" },
    positioning_text: { type: "textarea", label: "Texte positionnement" },
    values: { type: "stringList", label: "Valeurs" },
    differentiators: { type: "cardList", label: "Différenciants" },
    cta_title: { type: "text", label: "CTA titre" },
    cta_subtitle: { type: "textarea", label: "CTA sous-titre" },
    cta_primary_label: { type: "text", label: "CTA bouton principal - texte" },
    cta_primary_href: { type: "text", label: "CTA bouton principal - lien" },
    cta_secondary_label: { type: "text", label: "CTA bouton secondaire - texte" },
    cta_secondary_href: { type: "text", label: "CTA bouton secondaire - lien" },
  },
  contact: {
    hero_title: { type: "text", label: "Titre principal" },
    hero_subtitle: { type: "textarea", label: "Sous-titre" },
    info_title: { type: "text", label: "Titre informations" },
    call_title: { type: "text", label: "Titre appel" },
    call_text: { type: "textarea", label: "Texte appel" },
  },
  blog: {
    hero_title: { type: "text", label: "Titre principal" },
    hero_subtitle: { type: "textarea", label: "Sous-titre" },
  },
  realisations: {
    hero_title: { type: "text", label: "Titre principal" },
    hero_subtitle: { type: "textarea", label: "Sous-titre" },
    hero_image_url: { type: "image", label: "Image principale (URL)" },
  },
  mentions: {
    title: { type: "text", label: "Titre" },
    body: { type: "stringList", label: "Paragraphes (1 par ligne)" },
  },
  privacy: {
    title: { type: "text", label: "Titre" },
    body: { type: "stringList", label: "Paragraphes (1 par ligne)" },
  },
  thanks: {
    title: { type: "text", label: "Titre" },
    subtitle: { type: "textarea", label: "Sous-titre" },
  },
};
