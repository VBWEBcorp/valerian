import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { CTASection } from "@/components/CTASection";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { createMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { getPageContent } from "@/lib/page-content";
import { pageDefaults } from "@/lib/page-defaults";

export const generateMetadata = () =>
  createMetadata({
    title: "À propos",
    description:
      "Valérian Digital accompagne les TPE/PME françaises avec des sites premium et un SEO durable.",
    path: "/a-propos",
  });

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  const content = await getPageContent("about", pageDefaults.about);
  const breadcrumbs = [
    { label: "Accueil", href: "/" },
    { label: "À propos", href: "/a-propos" },
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

      <Section className="bg-white">
        <Container className="space-y-6">
          <Breadcrumbs items={breadcrumbs} />
          <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">
                À propos
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
                alt="À propos de Valérian Digital"
                className="card card-hover rounded-3xl p-8"
              />
            ) : (
              <Image
                src={content.hero_image_url}
                alt="À propos de Valérian Digital"
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
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">
                Positionnement
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-neutral-900">
                {content.positioning_title}
              </h2>
              <p className="mt-4 text-neutral-600">
                {content.positioning_text}
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">
                Valeurs
              </p>
              <ul className="mt-6 space-y-3 text-sm text-slate-700">
                {content.values.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-indigo-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-white">
        <Container>
          <div className="grid gap-8 md:grid-cols-3">
            {content.differentiators.map((item) => (
              <div key={item.title} className="card card-hover rounded-2xl p-6">
                <p className="text-sm font-semibold text-neutral-900">
                  {item.title}
                </p>
                <p className="mt-2 text-sm text-neutral-600">{item.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <CTASection
        title={content.cta_title}
        subtitle={content.cta_subtitle}
        primaryLabel={content.cta_primary_label}
        primaryHref={content.cta_primary_href}
        secondaryLabel={content.cta_secondary_label}
        secondaryHref={content.cta_secondary_href}
      />
    </>
  );
}
