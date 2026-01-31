import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { CTASection } from "@/components/CTASection";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { createMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const generateMetadata = () =>
  createMetadata({
    title: "À propos",
    description:
      "Valérian Digital accompagne les TPE/PME françaises avec des sites premium et un SEO durable.",
    path: "/a-propos",
  });

export default function AboutPage() {
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

      <Section className="bg-white/60">
        <Container className="space-y-6">
          <Breadcrumbs items={breadcrumbs} />
          <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">
                À propos
              </p>
              <h1 className="mt-3 text-4xl font-semibold text-neutral-900">
                Une agence boutique pour des décisions rapides et efficaces.
              </h1>
              <p className="mt-4 text-lg text-neutral-600">
                Valérian Digital accompagne les entreprises françaises qui veulent
                un site propre, rapide et un référencement naturel qui génère des leads.
              </p>
            </div>
            <Image
              src="/about.svg"
              alt="À propos de Valérian Digital"
              width={520}
              height={420}
              className="card card-hover rounded-3xl p-8"
            />
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
                L’interlocuteur senior qui relie design, tech et SEO.
              </h2>
              <p className="mt-4 text-neutral-600">
                Vous gagnez en clarté grâce à un accompagnement pragmatique : une
                stratégie simple, des priorités business, des livrables concrets.
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">
                Valeurs
              </p>
              <ul className="mt-6 space-y-3 text-sm text-slate-700">
                {[
                  "Exigence sur la qualité et la performance.",
                  "Transparence sur les actions et les résultats.",
                  "Simplicité dans la communication.",
                  "Focus sur la conversion et les leads.",
                ].map((item) => (
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

      <Section className="bg-white/60">
        <Container>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                title: "Méthode orientée business",
                text: "Chaque page doit servir un objectif de conversion.",
              },
              {
                title: "Production rapide",
                text: "Des cycles courts avec validation claire à chaque étape.",
              },
              {
                title: "SEO sans promesses",
                text: "Une stratégie durable, alignée sur vos priorités.",
              },
            ].map((item) => (
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
        title="Vous voulez travailler avec un partenaire fiable ?"
        subtitle="Présentez votre projet et recevez un retour précis."
      />
    </>
  );
}
