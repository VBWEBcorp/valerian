import Link from "next/link";
import Image from "next/image";
import {
  BarChart3,
  CheckCircle2,
  Globe2,
  Search,
  ShieldCheck,
} from "lucide-react";
import { Hero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { Container } from "@/components/Container";
import { CTASection } from "@/components/CTASection";
import { Testimonials } from "@/components/Testimonials";
import { ButtonLink } from "@/components/ButtonLink";
import { JsonLd } from "@/components/JsonLd";
import { ctas, site } from "@/lib/site";
import { createMetadata } from "@/lib/seo";
import { getHomeContent } from "@/lib/home-content";

export const generateMetadata = () =>
  createMetadata({
    title: "Sites web qui convertissent + SEO qui attire des clients",
    description:
      "Valérian Digital crée des sites rapides et un SEO durable pour TPE/PME. Positionnement clair, pages qui convertissent et acquisition organique.",
    path: "/",
  });

export const dynamic = "force-dynamic";

export default async function Home() {
  const fallbackContent = {
    hero_title: "Sites web qui convertissent + SEO qui attire des clients",
    hero_subtitle:
      "Nous aidons les TPE/PME à obtenir un site premium, rapide et clair, puis à le rendre visible avec un référencement naturel durable.",
    hero_bullets: [
      "Positionnement clair et messages orientés décisions",
      "Architecture SEO pensée pour générer des leads",
      "Accompagnement simple, transparent, efficace",
    ],
    value_props: [
      {
        title: "Clarté stratégique",
        text: "Un message net, une offre lisible, des pages qui guident.",
      },
      {
        title: "Performance fluide",
        text: "Rapidité, mobile-first, expérience premium sans friction.",
      },
      {
        title: "Acquisition durable",
        text: "SEO structuré pour générer des leads qualifiés.",
      },
    ],
    method_steps: [
      {
        title: "1. Diagnostic",
        text: "Analyse de l’offre, du marché et des freins actuels.",
      },
      {
        title: "2. Structure",
        text: "Architecture des pages, messages et parcours clients.",
      },
      {
        title: "3. Production",
        text: "Design, développement, contenus et SEO technique.",
      },
      {
        title: "4. Pilotage",
        text: "Suivi des performances et itérations mensuelles.",
      },
    ],
  };
  const content = (await getHomeContent()) ?? fallbackContent;
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.legalName,
    url: site.url,
    email: site.email,
    telephone: site.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    sameAs: [site.socials.linkedin],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
    potentialAction: {
      "@type": "SearchAction",
      target: `${site.url}/blog?query={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: site.legalName,
    url: site.url,
    image: `${site.url}/og-default.svg`,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    areaServed: "France",
    serviceType: ["Création de site internet", "Référencement naturel"],
  };

  return (
    <>
      <JsonLd data={organizationSchema} />
      <JsonLd data={websiteSchema} />
      <JsonLd data={localBusinessSchema} />

      <Hero
        title={content.hero_title}
        subtitle={content.hero_subtitle}
        bullets={content.hero_bullets}
        imageSrc="https://images.unsplash.com/photo-1471879832106-c7ab9e0cee23?auto=format&fit=crop&w=1600&q=80"
        imageAlt="Textures abstraites violettes"
      />

      <Section className="pt-6">
        <Container>
          <div className="grid gap-6 md:grid-cols-3">
            {content.value_props.map((item) => (
              <div key={item.title} className="card card-hover rounded-2xl p-6">
                <p className="text-sm font-semibold text-slate-900">
                  {item.title}
                </p>
                <p className="mt-2 text-sm text-slate-600">{item.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-white/60">
        <Container>
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              All round digital solution
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-slate-900">
              Les leviers qui font la différence.
            </h2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Search,
                title: "Recherche de mots-clés",
                text: "Identifier les requêtes qui génèrent des leads qualifiés.",
              },
              {
                icon: Globe2,
                title: "On-page SEO",
                text: "Optimiser chaque page pour la pertinence et la conversion.",
              },
              {
                icon: ShieldCheck,
                title: "Email & nurturing",
                text: "Réactiver les prospects et structurer le suivi.",
              },
              {
                icon: BarChart3,
                title: "Tracking & analytics",
                text: "Mesurer ce qui compte et prioriser les actions.",
              },
              {
                icon: CheckCircle2,
                title: "Copywriting clair",
                text: "Messages précis qui répondent aux objections.",
              },
              {
                icon: Search,
                title: "Growth SEO",
                text: "Contenus stratégiques pour une visibilité durable.",
              },
            ].map((item) => (
              <div key={item.title} className="ticket-card">
                <item.icon className="h-6 w-6 text-violet-500" />
                <p className="mt-6 text-lg font-semibold text-slate-900">
                  {item.title}
                </p>
                <p className="mt-2 text-sm text-slate-600">{item.text}</p>
                <button className="mt-6 text-sm font-semibold text-slate-900 underline">
                  Voir le détail
                </button>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="flex flex-col items-center gap-4 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Inspiration visuelle
            </p>
            <h2 className="text-3xl font-semibold text-slate-900">
              Des visuels abstraits pour une identité premium.
            </h2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                src: "https://images.unsplash.com/photo-1495567720989-cebdbdd97913?auto=format&fit=crop&w=900&q=80",
                alt: "Dégradé lumineux mauve",
              },
              {
                src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
                alt: "Jeu de lumière abstrait",
              },
              {
                src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=80",
                alt: "Texture lumineuse abstraite",
              },
            ].map((image) => (
              <div key={image.src} className="card card-hover overflow-hidden rounded-3xl p-3">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={900}
                  height={600}
                  sizes="(min-width: 1024px) 320px, 100vw"
                  className="h-64 w-full rounded-2xl object-cover"
                />
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-white/60">
        <Container>
          <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">
                Ce que vous obtenez
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-slate-900">
                Un site web solide, un SEO piloté, un parcours client fluide.
              </h2>
              <p className="mt-4 text-slate-600">
                Nous concevons des sites qui structurent votre offre, rassurent et
                convertissent. Puis nous activons le SEO pour attirer des clients
                ciblés, sans dépendre de la publicité.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <ButtonLink href="/services/creation-site-internet" variant="outline">
                  Créer mon site
                </ButtonLink>
                <ButtonLink href="/services/referencement-naturel" variant="outline">
                  Booster mon SEO
                </ButtonLink>
              </div>
            </div>
            <div className="grid gap-4">
              {[
                {
                  icon: Globe2,
                  title: "Sites rapides et premium",
                  text: "Design sobre, performance Lighthouse et expérience claire.",
                },
                {
                  icon: Search,
                  title: "SEO méthodique",
                  text: "Technique, contenu, autorité : tout est priorisé.",
                },
                {
                  icon: ShieldCheck,
                  title: "Accompagnement transparent",
                  text: "Process lisible, livrables concrets, décision rapide.",
                },
              ].map((item) => (
                <div key={item.title} className="card card-hover rounded-2xl p-5">
                  <item.icon className="h-5 w-5 text-violet-600" />
                  <p className="mt-3 text-sm font-semibold text-slate-900">
                    {item.title}
                  </p>
                  <p className="mt-2 text-sm text-slate-600">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">
                Méthode en 4 étapes
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-slate-900">
                Une approche claire pour décider vite et avancer sans friction.
              </h2>
            </div>
            <ButtonLink href={ctas.primary.href}>{ctas.primary.label}</ButtonLink>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-4">
            {content.method_steps.map((step) => (
              <div key={step.title} className="card card-hover rounded-2xl p-6">
                <p className="text-sm font-semibold text-slate-900">
                  {step.title}
                </p>
                <p className="mt-2 text-sm text-slate-600">{step.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-white/60">
        <Container>
          <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-center">
            <Image
              src="/process.svg"
              alt="Processus de création et SEO"
              width={520}
              height={420}
              className="card card-hover rounded-3xl p-8"
            />
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">
                Pourquoi Valérian Digital
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-slate-900">
                Un partenaire senior pour vos enjeux web et SEO.
              </h2>
              <p className="mt-4 text-slate-600">
                Vous échangez avec un interlocuteur unique, capable de cadrer la
                stratégie, de produire le site et d’activer le référencement. Pas
                de perte d’informations, pas de compromis.
              </p>
              <ul className="mt-6 space-y-2 text-sm text-slate-700">
                {[
                  "Positionnement premium et messages orientés conversion",
                  "Technicité SEO sans jargon inutile",
                  "Livrables clairs, délais respectés",
                  "Décisions guidées par vos objectifs business",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-violet-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">
                Services
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-slate-900">
                Deux offres complémentaires pour générer des leads.
              </h2>
              <p className="mt-4 text-slate-600">
                Choisissez une création de site premium ou un accompagnement SEO
                complet. L’objectif reste le même : des clients qualifiés.
              </p>
            </div>
            <div className="grid gap-4">
              {[
                {
                  title: "Création de site internet",
                  text: "Site vitrine rapide, messages convaincants, structure SEO.",
                  href: "/services/creation-site-internet",
                },
                {
                  title: "Référencement naturel (SEO)",
                  text: "Audit, stratégie, contenu et autorité pour gagner en visibilité.",
                  href: "/services/referencement-naturel",
                },
              ].map((service) => (
                <Link
                  key={service.title}
                  href={service.href}
                  className="card card-hover rounded-2xl p-6"
                >
                  <p className="text-sm font-semibold text-slate-900">
                    {service.title}
                  </p>
                  <p className="mt-2 text-sm text-slate-600">{service.text}</p>
                  <p className="mt-4 text-sm font-semibold text-slate-900">
                    Découvrir →
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-white/60">
        <Container>
          <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">
                Preuves
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-slate-900">
                Des résultats concrets sans promesses exagérées.
              </h2>
              <p className="mt-4 text-slate-600">
                Nous misons sur la clarté de l’offre, la performance et un SEO
                qui s’inscrit dans la durée. Les retours clients le confirment.
              </p>
              <div className="mt-6 grid gap-4">
                {[
                  {
                    icon: BarChart3,
                    title: "Visibilité stable",
                    text: "Une stratégie éditoriale qui nourrit votre pipeline.",
                  },
                  {
                    icon: CheckCircle2,
                    title: "Conversion améliorée",
                    text: "Pages clés optimisées pour la prise de contact.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="card card-hover flex items-start gap-3 rounded-2xl p-5"
                  >
                    <item.icon className="mt-1 h-5 w-5 text-violet-500" />
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        {item.title}
                      </p>
                      <p className="mt-1 text-sm text-slate-600">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <Testimonials />
          </div>
        </Container>
      </Section>

      <CTASection
        title="Prêt à améliorer votre acquisition ?"
        subtitle="Parlez-nous de votre projet et recevez un plan d’action clair sous 48h."
      />
    </>
  );
}
