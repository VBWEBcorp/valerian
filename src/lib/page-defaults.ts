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
    hero_title: "Sites web modernes qui convertissent",
    hero_subtitle:
      "Nous créons des sites rapides, élégants et clairs, adaptés à votre secteur, avec une structure pensée pour générer des opportunités.",
    hero_image_url:
      "https://images.unsplash.com/photo-1471879832106-c7ab9e0cee23?auto=format&fit=crop&w=1600&q=80",
    hero_primary_label: "Demander un devis",
    hero_primary_href: "/contact",
    hero_secondary_label: "Planifier un appel",
    hero_secondary_href: "/contact#calendrier",
    hero_bullets: [
      "Message clair et structuré dès la première lecture",
      "Design premium et expérience fluide sur tous supports",
      "Parcours orienté contact, devis ou réservation",
    ],
    value_props: [
      {
        title: "Clarté du message",
        text: "Une proposition simple à comprendre, qui rassure et convainc.",
      },
      {
        title: "Expérience premium",
        text: "Design moderne, mobile-first et performances solides.",
      },
      {
        title: "Conversion maîtrisée",
        text: "Des pages conçues pour générer des contacts qualifiés.",
      },
    ],
    method_steps: [
      {
        title: "1. Cadrage",
        text: "Objectifs, positionnement, messages et structure.",
      },
      {
        title: "2. Design",
        text: "Maquettes modernes et parcours optimisés.",
      },
      {
        title: "3. Production",
        text: "Intégration responsive et contenus calibrés.",
      },
      {
        title: "4. Mise en ligne",
        text: "Tests, lancement et suivi des performances.",
      },
    ],
    inspiration_images: [
      "https://images.unsplash.com/photo-1495567720989-cebdbdd97913?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=80",
    ],
    cta_title: "Prêt à accélérer votre présence en ligne ?",
    cta_subtitle:
      "Parlez-nous de votre projet et recevez une proposition claire.",
    cta_primary_label: "Demander un devis",
    cta_primary_href: "/contact",
    cta_secondary_label: "Planifier un appel",
    cta_secondary_href: "/contact#calendrier",
  },
  creation: {
    hero_title: "Un site vitrine premium qui valorise votre activité.",
    hero_subtitle:
      "Nous concevons des sites rapides, structurés et orientés action pour transformer vos visiteurs en clients.",
    hero_image_url: "/hero.svg",
    hero_primary_label: "Demander un devis",
    hero_primary_href: "/contact",
    hero_secondary_label: "Planifier un appel",
    hero_secondary_href: "/contact#calendrier",
    feature_cards: [
      {
        title: "Message clair",
        text: "Votre valeur se comprend dès la première seconde.",
      },
      {
        title: "Design premium",
        text: "Une interface moderne, crédible et différenciante.",
      },
      {
        title: "Parcours optimisé",
        text: "CTA, preuves et contenus qui guident vers l’action.",
      },
    ],
    method_steps: [
      {
        title: "1. Cadrage",
        text: "Objectifs, cibles, messages et structure des pages.",
      },
      {
        title: "2. Design & contenus",
        text: "Maquettes modernes + rédaction orientée action.",
      },
      {
        title: "3. Développement",
        text: "Intégration responsive et performances optimisées.",
      },
      {
        title: "4. Mise en ligne",
        text: "Tests, checklist qualité et accompagnement post-lancement.",
      },
    ],
    deliverables: [
      "Arborescence claire et pages clés",
      "Textes clairs et orientés conversion",
      "Design premium et responsive",
      "Optimisations techniques de base",
      "Formulaires et tracking intégrés",
      "Documentation et transfert",
    ],
    packs: [
      {
        title: "Essentiel",
        text: "Site vitrine clair, 5 à 7 pages, optimisation de base.",
      },
      {
        title: "Croissance",
        text: "Pages services détaillées + contenus renforcés.",
      },
      {
        title: "Performance",
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
        text: "Oui, chaque page est structurée avec des balises propres, une architecture claire et de bonnes performances techniques.",
      },
      {
        title: "Puis-je modifier le contenu ensuite ?",
        text: "Oui, les contenus peuvent être mis à jour facilement et nous pouvons aussi gérer l’évolution en continu.",
      },
      {
        title: "Proposez-vous la rédaction des textes ?",
        text: "Oui, la rédaction est incluse pour des contenus clairs et efficaces.",
      },
      {
        title: "Le site est-il responsive ?",
        text: "Oui, l’ergonomie est pensée pour mobile, tablette et desktop dès le départ.",
      },
      {
        title: "Quels sont les livrables ?",
        text: "Vous recevez un site complet, les maquettes, les contenus et un plan de suivi.",
      },
      {
        title: "Peut-on intégrer des formulaires et des outils ?",
        text: "Oui, formulaires, CRM, outils de tracking et automatisations peuvent être intégrés.",
      },
      {
        title: "Quel budget prévoir ?",
        text: "Chaque projet est cadré sur devis selon l’ambition et les intégrations nécessaires.",
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
    hero_title: "Une visibilité durable pour attirer les bons clients.",
    hero_subtitle:
      "Nous activons les piliers essentiels : technique, contenu et autorité. Objectif : visibilité durable et contacts qualifiés.",
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
        text: "Pages utiles, réponses aux intentions et messages clairs.",
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
        title: "Quand voit-on les premiers résultats ?",
        text: "La visibilité progresse sur la durée. Les premiers signaux arrivent souvent en 2 à 3 mois.",
      },
      {
        title: "Faut-il publier du contenu chaque semaine ?",
        text: "Non, la priorité est la qualité et l’intention. Un plan réaliste suffit pour progresser durablement.",
      },
      {
        title: "Travaillez-vous le SEO local ?",
        text: "Oui, nous optimisons la présence locale : pages dédiées et signaux de confiance.",
      },
      {
        title: "Le SEO est-il compatible avec la publicité ?",
        text: "Oui, les deux canaux sont complémentaires.",
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
    cta_title: "Prêt à structurer votre visibilité ?",
    cta_subtitle: "Obtenez un plan d’action clair et priorisé.",
    cta_primary_label: "Demander un devis",
    cta_primary_href: "/contact",
    cta_secondary_label: "Planifier un appel",
    cta_secondary_href: "/contact#calendrier",
  },
  about: {
    hero_title: "Un studio digital pour des décisions rapides et efficaces.",
    hero_subtitle:
      "Nous accompagnons les entreprises qui veulent un site propre, rapide et une visibilité durable.",
    hero_image_url: "/about.svg",
    positioning_title:
      "Un interlocuteur senior qui relie design, tech et contenu.",
    positioning_text:
      "Vous gagnez en clarté grâce à un accompagnement pragmatique : une stratégie simple, des priorités business, des livrables concrets.",
    values: [
      "Exigence sur la qualité et la performance.",
      "Transparence sur les actions et les résultats.",
      "Simplicité dans la communication.",
      "Focus sur la conversion et la clarté.",
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
        title: "Vision long terme",
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
    hero_title: "Des contenus pour améliorer votre présence en ligne.",
    hero_subtitle: "Conseils, méthodes et retours d’expérience pour progresser.",
  },
  realisations: {
    hero_title: "Études de cas : des projets conçus pour performer.",
    hero_subtitle: "Quelques réalisations représentatives dans divers secteurs.",
    hero_image_url: "/case-study.svg",
  },
  mentions: {
    title: "Mentions légales",
    body: [
      "Éditeur du site : [Nom de l’entreprise].",
      "Contact : [email] / [téléphone].",
      "Adresse : [adresse complète].",
      "Hébergeur : Netlify, Inc. (San Francisco, USA).",
      "Responsable de publication : [nom].",
    ],
  },
  privacy: {
    title: "Politique de confidentialité",
    body: [
      "Les données collectées via le formulaire de contact servent uniquement à répondre à votre demande.",
      "Vous pouvez demander la modification ou la suppression de vos données à tout moment en écrivant à [email].",
      "Les mesures techniques nécessaires sont mises en place pour protéger vos informations.",
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
