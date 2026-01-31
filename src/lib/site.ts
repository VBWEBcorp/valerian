export const site = {
  name: "Valérian Digital",
  legalName: "Valérian Digital",
  url: "https://www.valerian-digital.fr",
  description:
    "Création de sites internet rapides et SEO pour TPE/PME françaises. Sites web qui convertissent et référencement naturel qui attire des clients.",
  email: "contact@valerian-digital.fr",
  phone: "01 84 80 18 24",
  address: {
    street: "12 rue de la République",
    city: "Paris",
    postalCode: "75002",
    country: "FR",
  },
  socials: {
    linkedin: "https://www.linkedin.com/company/valerian-digital",
  },
  keywords: [
    "création site internet",
    "agence web",
    "référencement naturel",
    "SEO",
    "TPE PME",
    "France",
  ],
} as const;

export const navigation = [
  { label: "Accueil", href: "/" },
  { label: "Création de site", href: "/services/creation-site-internet" },
  { label: "Référencement naturel", href: "/services/referencement-naturel" },
  { label: "Réalisations", href: "/realisations" },
  { label: "Blog", href: "/blog" },
  { label: "À propos", href: "/a-propos" },
  { label: "Contact", href: "/contact" },
] as const;

export const ctas = {
  primary: { label: "Demander un devis", href: "/contact" },
  secondary: { label: "Planifier un appel", href: "/contact#calendrier" },
} as const;
