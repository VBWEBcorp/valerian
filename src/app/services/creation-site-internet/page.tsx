import Image from "next/image";
import { CheckCircle2, Laptop2, Sparkles } from "lucide-react";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { CTASection } from "@/components/CTASection";
import { FAQAccordion } from "@/components/FAQAccordion";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ButtonLink } from "@/components/ButtonLink";
import { JsonLd } from "@/components/JsonLd";
import { createMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { getPageContent } from "@/lib/page-content";
import { pageDefaults } from "@/lib/page-defaults";

export const generateMetadata = () =>
  createMetadata({
    title: "Création de site internet",
    description:
      "Site vitrine premium, rapide et orienté conversion. Messages clairs, structure SEO et parcours client fluide pour TPE/PME.",
    path: "/services/creation-site-internet",
  });

export const dynamic = "force-dynamic";

export default async function CreationSitePage() {
  const content = await getPageContent("creation", pageDefaults.creation);
  const faqItems = content.faq.map((item) => ({
    question: item.title,
    answer: item.text,
  }));
  const breadcrumbs = [
    { label: "Accueil", href: "/" },
    { label: "Services", href: "/services/creation-site-internet" },
    { label: "Création de site internet", href: "/services/creation-site-internet" },
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

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Création de site internet",
    provider: {
      "@type": "Organization",
      name: site.legalName,
      url: site.url,
    },
    areaServed: "France",
    description:
      "Conception de sites vitrines premium, rapides et orientés conversion pour TPE/PME.",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={serviceSchema} />
      <JsonLd data={faqSchema} />

      <Section className="bg-white/60">
        <Container className="space-y-6">
          <Breadcrumbs items={breadcrumbs} />
          <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">
                Création de site internet
              </p>
              <h1 className="mt-3 text-4xl font-semibold text-neutral-900">
                {content.hero_title}
              </h1>
              <p className="mt-4 text-lg text-neutral-600">
                {content.hero_subtitle}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <ButtonLink href="/contact">Demander un devis</ButtonLink>
                <ButtonLink href="/contact#calendrier" variant="outline">
                  Planifier un appel
                </ButtonLink>
              </div>
            </div>
            <Image
              src="/hero.svg"
              alt="Création de site internet"
              width={520}
              height={420}
              className="card card-hover rounded-3xl p-8"
            />
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-8 md:grid-cols-3">
            {content.feature_cards.map((item, index) => (
              <div key={item.title} className="card card-hover rounded-2xl p-6">
                {index % 3 === 0 && <Laptop2 className="h-5 w-5 text-neutral-900" />}
                {index % 3 === 1 && <Sparkles className="h-5 w-5 text-neutral-900" />}
                {index % 3 === 2 && (
                  <CheckCircle2 className="h-5 w-5 text-neutral-900" />
                )}
                <p className="mt-3 text-sm font-semibold text-neutral-900">
                  {item.title}
                </p>
                <p className="mt-2 text-sm text-neutral-600">{item.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-white/60">
        <Container>
          <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">
                Méthode en 4 étapes
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-neutral-900">
                Un process cadré pour un site livré sans stress.
              </h2>
              <p className="mt-4 text-neutral-600">
                Chaque étape est validée avec vous pour garantir un site fidèle à
                votre offre et à vos objectifs business.
              </p>
            </div>
            <div className="grid gap-4">
              {content.method_steps.map((step) => (
                <div key={step.title} className="card card-hover rounded-2xl p-6">
                  <p className="text-sm font-semibold text-neutral-900">
                    {step.title}
                  </p>
                  <p className="mt-2 text-sm text-neutral-600">{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-8 md:grid-cols-[1fr_1fr] md:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">
                Ce que vous obtenez
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-neutral-900">
                Des livrables concrets pour un site fiable et efficace.
              </h2>
              <ul className="mt-6 space-y-2 text-sm text-slate-700">
                {content.deliverables.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-indigo-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card rounded-3xl p-8">
              <p className="text-sm font-semibold text-neutral-900">
                Packs disponibles (sur devis)
              </p>
              <div className="mt-6 space-y-4">
                {content.packs.map((item) => (
                  <div key={item.title} className="card card-hover rounded-2xl p-5">
                    <p className="text-sm font-semibold text-neutral-900">
                      {item.title}
                    </p>
                    <p className="mt-1 text-sm text-neutral-600">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-neutral-50">
        <Container>
          <div className="grid gap-6 md:grid-cols-[1fr_1.1fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">
                FAQ
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-neutral-900">
                Les questions fréquentes sur la création de site.
              </h2>
            </div>
            <FAQAccordion items={faqItems} />
          </div>
        </Container>
      </Section>

      <CTASection
        title={content.cta_title}
        subtitle={content.cta_subtitle}
      />
    </>
  );
}
