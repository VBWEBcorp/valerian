import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { createMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const generateMetadata = () =>
  createMetadata({
    title: "Politique de confidentialité",
    description: "Données personnelles et confidentialité chez Valérian Digital.",
    path: "/politique-de-confidentialite",
  });

export default function PolitiqueConfidentialitePage() {
  const breadcrumbs = [
    { label: "Accueil", href: "/" },
    { label: "Politique de confidentialité", href: "/politique-de-confidentialite" },
  ];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: `${site.url}${item.href}`,
    })),
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <Section className="bg-neutral-50">
        <Container className="space-y-6">
          <Breadcrumbs items={breadcrumbs} />
          <div className="rounded-3xl border border-neutral-200 bg-white p-8">
            <h1 className="text-3xl font-semibold text-neutral-900">
              Politique de confidentialité
            </h1>
            <div className="mt-6 space-y-4 text-sm text-neutral-600">
              <p>
                Les données collectées via le formulaire de contact servent uniquement
                à répondre à votre demande. Elles ne sont ni revendues ni partagées.
              </p>
              <p>
                Vous pouvez demander la modification ou la suppression de vos données
                à tout moment en écrivant à contact@valerian-digital.fr.
              </p>
              <p>
                Les mesures techniques nécessaires sont mises en place pour protéger
                vos informations (sécurisation des accès, suivi des bonnes pratiques).
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
