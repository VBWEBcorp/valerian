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
    title: "Contact",
    description:
      "Demandez un devis ou planifiez un appel pour votre site ou votre SEO.",
    path: "/contact",
  });

export const dynamic = "force-dynamic";

export default async function ContactPage() {
  const content = await getPageContent("contact", pageDefaults.contact);
  const breadcrumbs = [
    { label: "Accueil", href: "/" },
    { label: "Contact", href: "/contact" },
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
              Contact
            </p>
            <h1 className="mt-3 text-4xl font-semibold text-neutral-900">
              {content.hero_title}
            </h1>
            <p className="mt-4 text-lg text-neutral-600">
              {content.hero_subtitle}
            </p>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr]">
            <form
              action="/merci"
              method="get"
              className="card rounded-3xl p-8"
            >
              <div className="grid gap-5 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-sm font-semibold">
                    Nom complet
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm font-semibold">
                    Email professionnel
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="phone" className="text-sm font-semibold">
                    Téléphone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    className="rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="need" className="text-sm font-semibold">
                    Besoin principal
                  </label>
                  <select
                    id="need"
                    name="need"
                    className="rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="site">Création de site</option>
                    <option value="seo">Référencement naturel</option>
                    <option value="both">Site + SEO</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="budget" className="text-sm font-semibold">
                    Budget (optionnel)
                  </label>
                  <input
                    id="budget"
                    name="budget"
                    type="text"
                    placeholder="Ex : 5k - 10k"
                    className="rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label htmlFor="message" className="text-sm font-semibold">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    className="rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="mt-6 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-6 py-3 text-sm font-semibold text-white transition hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Demander un devis
              </button>
              <p className="mt-3 text-xs text-slate-500">
                En envoyant ce formulaire, vous acceptez d’être recontacté pour
                votre projet.
              </p>
            </form>
            <div className="space-y-6">
              <div className="card rounded-3xl p-8">
                <p className="text-sm font-semibold text-neutral-900">
                  {content.info_title}
                </p>
                <p className="mt-3 text-sm text-slate-600">
                  {site.legalName}
                  <br />
                  {site.address.street}
                  <br />
                  {site.address.postalCode} {site.address.city}
                </p>
                <p className="mt-4 text-sm text-slate-600">{site.email}</p>
                <p className="text-sm text-slate-600">{site.phone}</p>
              </div>
              <div id="calendrier" className="card rounded-3xl p-8">
                <p className="text-sm font-semibold text-neutral-900">
                  {content.call_title}
                </p>
                <p className="mt-3 text-sm text-slate-600">
                  {content.call_text}
                </p>
                <a
                  href="mailto:contact@valerian-digital.fr"
                  className="mt-4 inline-flex items-center justify-center rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-300"
                >
                  Proposer un créneau
                </a>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
