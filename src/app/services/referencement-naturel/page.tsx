import Image from "next/image";
import { BarChart3, CheckCircle2, Search, ShieldCheck } from "lucide-react";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { CTASection } from "@/components/CTASection";
import { FAQAccordion } from "@/components/FAQAccordion";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ButtonLink } from "@/components/ButtonLink";
import { JsonLd } from "@/components/JsonLd";
import { createMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const generateMetadata = () =>
  createMetadata({
    title: "Référencement naturel (SEO)",
    description:
      "Audit, stratégie et production SEO pour générer des leads. Technique, contenu et autorité pour des résultats durables.",
    path: "/services/referencement-naturel",
  });

const faqItems = [
  {
    question: "Quand voit-on les premiers résultats SEO ?",
    answer:
      "Le SEO est progressif. Les premiers signaux arrivent souvent en 2 à 3 mois, puis la visibilité se stabilise sur 6 à 9 mois.",
  },
  {
    question: "Faut-il publier du contenu chaque semaine ?",
    answer:
      "Non, la priorité est la qualité et l’intention. Un plan réaliste suffit pour progresser durablement.",
  },
  {
    question: "Travaillez-vous le SEO local ?",
    answer:
      "Oui, nous optimisons la présence locale : pages dédiées, signaux de confiance et maillage adapté.",
  },
  {
    question: "Le SEO est-il compatible avec la publicité ?",
    answer:
      "Oui, les deux canaux sont complémentaires. Le SEO réduit votre dépendance à la publicité.",
  },
  {
    question: "Faites-vous l’optimisation technique ?",
    answer:
      "Oui, performance, indexation, maillage, structure des pages et corrections prioritaires.",
  },
  {
    question: "Quels KPI suivez-vous ?",
    answer:
      "Positionnement, trafic qualifié, conversions et pages performantes.",
  },
  {
    question: "Fournissez-vous des rapports ?",
    answer:
      "Oui, un reporting mensuel clair avec actions et priorités.",
  },
  {
    question: "Peut-on commencer par un audit ?",
    answer:
      "Oui, l’audit est souvent la première étape pour définir la stratégie.",
  },
];

export default function SeoServicePage() {
  const breadcrumbs = [
    { label: "Accueil", href: "/" },
    { label: "Services", href: "/services/referencement-naturel" },
    { label: "Référencement naturel", href: "/services/referencement-naturel" },
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
    serviceType: "Référencement naturel",
    provider: {
      "@type": "Organization",
      name: site.legalName,
      url: site.url,
    },
    areaServed: "France",
    description:
      "Stratégie SEO complète : technique, contenu et autorité pour générer des leads.",
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
                Référencement naturel
              </p>
              <h1 className="mt-3 text-4xl font-semibold text-neutral-900">
                Un SEO structuré pour attirer des clients, pas seulement du trafic.
              </h1>
              <p className="mt-4 text-lg text-neutral-600">
                Nous activons les 3 piliers du SEO : technique, contenu et autorité.
                Objectif : des positions durables et des leads qualifiés.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <ButtonLink href="/contact">Demander un devis</ButtonLink>
                <ButtonLink href="/contact#calendrier" variant="outline">
                  Planifier un appel
                </ButtonLink>
              </div>
            </div>
            <Image
              src="/process.svg"
              alt="Stratégie SEO"
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
            {[
              {
                icon: Search,
                title: "Technique solide",
                text: "Performance, structure, indexation et maillage interne.",
              },
              {
                icon: BarChart3,
                title: "Contenu stratégique",
                text: "Pages piliers, réponses aux intentions et copywriting clair.",
              },
              {
                icon: ShieldCheck,
                title: "Autorité durable",
                text: "Stratégie de liens et crédibilité éditoriale progressive.",
              },
            ].map((item) => (
              <div key={item.title} className="card card-hover rounded-2xl p-6">
                <item.icon className="h-5 w-5 text-neutral-900" />
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
                Une stratégie SEO réaliste et mesurable.
              </h2>
              <p className="mt-4 text-neutral-600">
                Chaque mois, vous savez ce que nous faisons, pourquoi, et les
                actions prioritaires à mener.
              </p>
            </div>
            <div className="grid gap-4">
              {[
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
              ].map((step) => (
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
                Résultats attendus
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-neutral-900">
                Une visibilité durable et des demandes qualifiées.
              </h2>
              <ul className="mt-6 space-y-2 text-sm text-slate-700">
                {[
                  "Positionnement progressif sur vos requêtes prioritaires",
                  "Trafic qualifié et mieux segmenté",
                  "Pages services qui convertissent",
                  "Diminution de la dépendance publicitaire",
                  "Reporting lisible et pilotage mensuel",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-indigo-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card rounded-3xl p-8">
              <p className="text-sm font-semibold text-neutral-900">
                Ce que vous obtenez
              </p>
              <div className="mt-6 space-y-4">
                {[
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
                ].map((item) => (
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
                Les questions fréquentes sur le SEO.
              </h2>
            </div>
            <FAQAccordion items={faqItems} />
          </div>
        </Container>
      </Section>

      <CTASection
        title="Prêt à structurer votre visibilité SEO ?"
        subtitle="Obtenez un plan d’action clair et priorisé."
      />
    </>
  );
}
