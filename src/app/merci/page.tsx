import Link from "next/link";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { createMetadata } from "@/lib/seo";

export const generateMetadata = () =>
  createMetadata({
    title: "Merci",
    description: "Merci pour votre message. Nous revenons vers vous rapidement.",
    path: "/merci",
  });

export default function MerciPage() {
  return (
    <Section className="bg-neutral-50">
      <Container>
        <div className="rounded-3xl border border-neutral-200 bg-white p-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">
            Merci
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-neutral-900">
            Votre demande a bien été envoyée.
          </h1>
          <p className="mt-4 text-neutral-600">
            Nous revenons vers vous sous 24 à 48h avec une proposition claire.
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
