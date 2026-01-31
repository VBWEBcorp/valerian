import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { CTASection } from "@/components/CTASection";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { createMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { caseStudies } from "@/content/case-studies";

type PageProps = {
  params: { slug: string };
};

export async function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = params;
  const study = caseStudies.find((item) => item.slug === slug);

  if (!study) {
    return createMetadata({
      title: "Étude de cas",
      description: site.description,
      path: "/realisations",
    });
  }

  return createMetadata({
    title: study.title,
    description: study.goal,
    path: `/realisations/${study.slug}`,
  });
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = params;
  const study = caseStudies.find((item) => item.slug === slug);

  if (!study) {
    notFound();
  }

  const breadcrumbs = [
    { label: "Accueil", href: "/" },
    { label: "Réalisations", href: "/realisations" },
    { label: study.title, href: `/realisations/${study.slug}` },
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
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">
              {study.sector}
            </p>
            <h1 className="mt-3 text-4xl font-semibold text-neutral-900">
              {study.title}
            </h1>
            <p className="mt-4 text-lg text-neutral-600">{study.goal}</p>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="card card-hover rounded-2xl p-6">
              <p className="text-sm font-semibold text-neutral-900">Approche</p>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                {study.approach.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
            <div className="card card-hover rounded-2xl p-6">
              <p className="text-sm font-semibold text-neutral-900">Résultats</p>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                {study.results.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      <CTASection
        title="Vous voulez des résultats similaires ?"
        subtitle="Parlons de votre projet et construisons un plan clair."
      />
    </>
  );
}
