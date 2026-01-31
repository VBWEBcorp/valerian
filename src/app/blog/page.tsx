import Link from "next/link";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { CTASection } from "@/components/CTASection";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { createMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { blogPosts } from "@/content/blog";

export const generateMetadata = () =>
  createMetadata({
    title: "Blog",
    description:
      "Conseils SEO, conversion et performance pour les TPE/PME françaises.",
    path: "/blog",
  });

export default function BlogPage() {
  const breadcrumbs = [
    { label: "Accueil", href: "/" },
    { label: "Blog", href: "/blog" },
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
              Blog
            </p>
            <h1 className="mt-3 text-4xl font-semibold text-neutral-900">
              Des contenus pour améliorer votre visibilité et vos conversions.
            </h1>
            <p className="mt-4 text-lg text-neutral-600">
              Stratégie SEO, structure des pages, performance et acquisition.
            </p>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-6 md:grid-cols-2">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="card card-hover rounded-2xl p-6"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                  {post.intent}
                </p>
                <p className="mt-3 text-lg font-semibold text-neutral-900">
                  {post.title}
                </p>
                <p className="mt-2 text-sm text-neutral-600">{post.excerpt}</p>
                <p className="mt-4 text-sm font-semibold text-neutral-900">
                  Lire l’article →
                </p>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      <CTASection
        title="Vous voulez accélérer votre SEO ?"
        subtitle="Recevez un plan d’action clair et priorisé."
      />
    </>
  );
}
