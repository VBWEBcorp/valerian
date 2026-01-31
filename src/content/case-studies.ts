export type CaseStudy = {
  slug: string;
  title: string;
  sector: string;
  goal: string;
  approach: string[];
  results: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "atelier-studio-architecture",
    title: "Atelier Studio Architecture",
    sector: "Architecture & design",
    goal: "Valoriser un positionnement premium et générer des demandes qualifiées.",
    approach: [
      "Refonte UX avec messages orientés décisions",
      "Mise en avant de projets emblématiques",
      "Optimisation technique et performance",
    ],
    results: [
      "Plus de demandes entrantes ciblées",
      "Meilleure lisibilité de l’offre",
      "Site perçu comme haut de gamme",
    ],
  },
  {
    slug: "nova-solutions-b2b",
    title: "Nova Solutions B2B",
    sector: "Conseil & services B2B",
    goal: "Structurer l’offre et capter des leads via le SEO.",
    approach: [
      "Architecture SEO par lignes de services",
      "Pages piliers + contenus d’expertise",
      "Plan éditorial orienté intention",
    ],
    results: [
      "Visibilité accrue sur les requêtes clés",
      "Cycle de vente raccourci grâce aux contenus",
      "Formulaire mieux qualifié",
    ],
  },
  {
    slug: "atelier-vert-amenagement",
    title: "Atelier Vert Aménagement",
    sector: "Paysagisme & aménagement",
    goal: "Moderniser l’image et générer des devis localement.",
    approach: [
      "Nouveau site vitrine responsive",
      "SEO local optimisé",
      "Pages services avec preuves visuelles",
    ],
    results: [
      "Prises de contact plus régulières",
      "Meilleur taux de conversion mobile",
      "Positionnement local renforcé",
    ],
  },
];
