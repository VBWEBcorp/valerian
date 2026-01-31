import Link from "next/link";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { createMetadata } from "@/lib/seo";
import { getPageContent } from "@/lib/page-content";
import { pageDefaults } from "@/lib/page-defaults";

export const generateMetadata = () =>
  createMetadata({
    title: "Merci",
    description: "Merci pour votre message. Nous revenons vers vous rapidement.",
    path: "/merci",
  });

export const dynamic = "force-dynamic";

export default async function MerciPage() {
  const content = await getPageContent("thanks", pageDefaults.thanks);
  return (
    <Section className="bg-neutral-50">
      <Container>
        <div className="rounded-3xl border border-neutral-200 bg-white p-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">
            Merci
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-neutral-900">
            {content.title}
          </h1>
          <p className="mt-4 text-neutral-600">
            {content.subtitle}
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex items-center justify-center rounded-full border border-neutral-300 px-6 py-3 text-sm font-semibold text-neutral-900 transition hover:border-neutral-400"
          >
            Retour à l’accueil
          </Link>
        </div>
      </Container>
    </Section>
  );
}
