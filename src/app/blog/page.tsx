import Link from "next/link";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { CTASection } from "@/components/CTASection";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { createMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { getPageContent } from "@/lib/page-content";
import { pageDefaults } from "@/lib/page-defaults";
import { blogPosts } from "@/content/blog";
import { getBlogPosts } from "@/lib/blog";

export const generateMetadata = () =>
  createMetadata({
    title: "Blog",
    description:
      "Conseils SEO, conversion et performance pour les TPE/PME françaises.",
    path: "/blog",
  });

export const dynamic = "force-dynamic";

function cleanSlug(value: string) {
  return value.replace(/^\/+/, "");
}

function toAbsoluteUrl(path: string) {
  if (!path) return path;
  if (path.startsWith("http")) return path;
  return `${site.url}${path.startsWith("/") ? "" : "/"}${path}`;
}

export default async function BlogPage() {
  const content = await getPageContent("blog", pageDefaults.blog);
  const posts = await getBlogPosts();
  const list = posts.length
    ? posts.map((post) => ({
        slug: cleanSlug(post.slug),
        title: post.title,
        excerpt: post.excerpt,
        intent: post.intent,
      }))
    : blogPosts.map((post) => ({
        ...post,
        slug: cleanSlug(post.slug),
      }));
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
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: list.map((post, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: post.title,
      url: `${site.url}/blog/${post.slug}`,
      image:
        "cover_image_url" in post && post.cover_image_url
          ? toAbsoluteUrl(post.cover_image_url)
          : undefined,
    })),
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={itemListSchema} />

      <Section className="bg-white">
        <Container className="space-y-6">
          <Breadcrumbs items={breadcrumbs} />
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">
              Blog
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
          <div className="grid gap-6 md:grid-cols-2">
            {list.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="card card-hover overflow-hidden rounded-2xl p-0"
              >
                {"cover_image_url" in post && post.cover_image_url ? (
                  <img
                    src={post.cover_image_url}
                    alt={post.title}
                    className="h-48 w-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex h-48 w-full items-center justify-center bg-neutral-100 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">
                    Image de couverture
                  </div>
                )}
                <div className="p-6">
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
                </div>
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
