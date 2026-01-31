export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  intent: string;
  content: {
    type: "p" | "h2" | "ul";
    value: string | string[];
  }[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "site-vitrine-qui-convertit",
    title: "Site vitrine qui convertit : les 7 éléments indispensables",
    excerpt:
      "Structure, messages, preuves et microcopies : les fondamentaux pour transformer vos visiteurs en prospects.",
    intent: "Conversion / UX",
    content: [
      {
        type: "p",
        value:
          "Un bon site vitrine ne se contente pas d’être joli. Il guide le visiteur, répond aux objections et oriente vers l’action.",
      },
      { type: "h2", value: "1. Une proposition de valeur claire" },
      {
        type: "p",
        value:
          "Expliquez immédiatement pour qui vous travaillez, quel problème vous résolvez et quel bénéfice concret vous apportez.",
      },
      { type: "h2", value: "2. Des preuves visibles" },
      {
        type: "p",
        value:
          "Avis clients, logos, études de cas : ce sont vos meilleurs leviers pour rassurer.",
      },
      {
        type: "h2",
        value: "3. Un parcours vers l’action",
      },
      {
        type: "ul",
        value: [
          "CTA répétés et explicites",
          "Formulaire simple",
          "Pages services structurées",
        ],
      },
    ],
  },
  {
    slug: "seo-pour-tpe-pme",
    title: "SEO pour TPE/PME : par où commencer sans perdre de temps",
    excerpt:
      "La méthode en 4 étapes pour lancer un référencement naturel rentable, même avec une petite équipe.",
    intent: "SEO stratégique",
    content: [
      {
        type: "p",
        value:
          "Le SEO n’est pas une check-list magique. Il faut une méthode claire, des priorités et des objectifs réalistes.",
      },
      {
        type: "h2",
        value: "Étape 1 : audit et priorités",
      },
      {
        type: "p",
        value:
          "Identifiez les pages à fort potentiel, les freins techniques et les mots-clés transactionnels.",
      },
      {
        type: "h2",
        value: "Étape 2 : architecture et contenus",
      },
      {
        type: "p",
        value:
          "Organisez votre site en silos clairs et produisez du contenu qui répond aux intentions de recherche.",
      },
    ],
  },
  {
    slug: "refonte-site-web",
    title: "Refonte de site web : comment éviter la perte de trafic SEO",
    excerpt:
      "Checklist simple pour sécuriser votre visibilité lors d’une refonte ou d’un changement de CMS.",
    intent: "SEO technique",
    content: [
      {
        type: "p",
        value:
          "Une refonte mal gérée peut faire chuter votre visibilité. Anticiper la migration est indispensable.",
      },
      {
        type: "h2",
        value: "Redirections 301 propres",
      },
      {
        type: "p",
        value:
          "Chaque ancienne URL doit rediriger vers la page la plus pertinente pour préserver l’historique.",
      },
      {
        type: "h2",
        value: "Tests avant mise en ligne",
      },
      {
        type: "p",
        value:
          "Vérifiez les balises, la vitesse, les liens internes et l’indexation avant la bascule.",
      },
    ],
  },
  {
    slug: "contenu-seo-qui-attire",
    title: "Contenu SEO qui attire des clients (pas seulement des visiteurs)",
    excerpt:
      "Aligner vos contenus sur la demande réelle du marché pour générer des leads.",
    intent: "Content marketing",
    content: [
      {
        type: "p",
        value:
          "Le contenu doit répondre à une intention précise et préparer la décision d’achat.",
      },
      {
        type: "h2",
        value: "Cartographier les intentions",
      },
      {
        type: "p",
        value:
          "Information, comparaison, transaction : chaque page a un rôle dans le parcours.",
      },
      {
        type: "h2",
        value: "CTA contextuels",
      },
      {
        type: "p",
        value:
          "Un CTA pertinent augmente les conversions sans rendre la page agressive.",
      },
    ],
  },
  {
    slug: "optimisation-vitesse-nextjs",
    title: "Optimiser la vitesse d’un site Next.js pour le SEO",
    excerpt:
      "Les réglages simples pour obtenir un site rapide et Lighthouse-friendly.",
    intent: "Performance",
    content: [
      {
        type: "p",
        value:
          "La performance est un levier direct de conversion et de visibilité. Chaque seconde compte.",
      },
      {
        type: "h2",
        value: "Images optimisées",
      },
      {
        type: "p",
        value:
          "Utilisez next/image, des formats légers et un dimensionnement précis.",
      },
      {
        type: "h2",
        value: "CSS minimal",
      },
      {
        type: "p",
        value:
          "Un design sobre avec Tailwind réduit la charge CSS et améliore le temps de rendu.",
      },
    ],
  },
  {
    slug: "audit-seo-rapide",
    title: "Audit SEO rapide : 10 points à vérifier avant d’investir",
    excerpt:
      "Une vue d’ensemble pour repérer les opportunités et définir les priorités.",
    intent: "Audit",
    content: [
      {
        type: "p",
        value:
          "Avant d’investir, il faut savoir où vous en êtes : technique, contenu et autorité.",
      },
      {
        type: "h2",
        value: "Technique",
      },
      {
        type: "p",
        value:
          "Indexation, performance, maillage interne et structure des pages.",
      },
      {
        type: "h2",
        value: "Contenu et autorité",
      },
      {
        type: "p",
        value:
          "Pertinence des mots-clés et qualité des liens entrants.",
      },
    ],
  },
];
