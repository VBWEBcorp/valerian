import Link from "next/link";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";

export default function NotFound() {
  return (
    <Section className="bg-neutral-50">
      <Container>
        <div className="rounded-3xl border border-neutral-200 bg-white p-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">
            404
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-neutral-900">
            Page introuvable
          </h1>
          <p className="mt-4 text-neutral-600">
            La page demandée n’existe pas ou a été déplacée.
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
