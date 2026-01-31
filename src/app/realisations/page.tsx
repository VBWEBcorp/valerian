import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { CTASection } from "@/components/CTASection";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { createMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { getPageContent } from "@/lib/page-content";
import { pageDefaults } from "@/lib/page-defaults";
import { caseStudies } from "@/content/case-studies";

export const generateMetadata = () =>
  createMetadata({
    title: "Réalisations et études de cas",
    description:
      "Découvrez des projets de création de site et de SEO pour TPE/PME françaises.",
    path: "/realisations",
  });

export const dynamic = "force-dynamic";

export default async function RealisationsPage() {
  const content = await getPageContent("realisations", pageDefaults.realisations);
  const breadcrumbs = [
    { label: "Accueil", href: "/" },
    { label: "Réalisations", href: "/realisations" },
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

      <Section className="bg-white/60">
        <Container className="space-y-6">
          <Breadcrumbs items={breadcrumbs} />
          <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">
                Réalisations
              </p>
              <h1 className="mt-3 text-4xl font-semibold text-neutral-900">
              {content.hero_title}
              </h1>
              <p className="mt-4 text-lg text-neutral-600">
              {content.hero_subtitle}
              </p>
            </div>
            {content.hero_image_url.startsWith("http") ? (
              <img
                src={content.hero_image_url}
                alt="Études de cas Valérian Digital"
                className="card card-hover rounded-3xl p-8"
              />
            ) : (
              <Image
                src={content.hero_image_url}
                alt="Études de cas Valérian Digital"
                width={520}
                height={420}
                className="card card-hover rounded-3xl p-8"
              />
            )}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-6 md:grid-cols-3">
            {caseStudies.map((study) => (
              <Link
                key={study.slug}
                href={`/realisations/${study.slug}`}
                className="card card-hover rounded-2xl p-6"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                  {study.sector}
                </p>
                <p className="mt-3 text-lg font-semibold text-neutral-900">
                  {study.title}
                </p>
                <p className="mt-2 text-sm text-neutral-600">{study.goal}</p>
                <p className="mt-4 text-sm font-semibold text-neutral-900">
                  Voir l’étude →
                </p>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      <CTASection
        title="Vous voulez un projet similaire ?"
        subtitle="Parlez-nous de vos objectifs, on vous répond rapidement."
      />
    </>
  );
}
