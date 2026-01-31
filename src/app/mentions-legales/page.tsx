import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { createMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { getPageContent } from "@/lib/page-content";
import { pageDefaults } from "@/lib/page-defaults";

export const generateMetadata = () =>
  createMetadata({
    title: "Mentions légales",
    description: "Informations légales de Valérian Digital.",
    path: "/mentions-legales",
  });

export const dynamic = "force-dynamic";

export default async function MentionsLegalesPage() {
  const content = await getPageContent("mentions", pageDefaults.mentions);
  const breadcrumbs = [
    { label: "Accueil", href: "/" },
    { label: "Mentions légales", href: "/mentions-legales" },
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
              {content.title}
            </h1>
            <div className="mt-6 space-y-4 text-sm text-neutral-600">
              {content.body.map((item) => (
                <p key={item}>{item}</p>
              ))}
              <p>
                Éditeur du site : {site.legalName}. Contact : {site.email} /{" "}
                {site.phone}.
              </p>
              <p>
                Adresse : {site.address.street}, {site.address.postalCode}{" "}
                {site.address.city}, {site.address.country}.
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
