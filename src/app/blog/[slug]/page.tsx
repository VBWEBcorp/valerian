import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { CTASection } from "@/components/CTASection";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { createMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { blogPosts } from "@/content/blog";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/blog";
import { renderMarkdown } from "@/lib/markdown";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";
export const dynamicParams = true;
export const revalidate = 0;

function normalizeSlug(value: string) {
  return decodeURIComponent(value)
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const rawSlug = decodeURIComponent(slug ?? "");
  const normalizedSlug = normalizeSlug(rawSlug);
  const dbPost = await getBlogPostBySlug(rawSlug);
  const list = dbPost ? [dbPost] : await getBlogPosts();
  const post =
    list.find((item) => normalizeSlug(item.slug) === normalizedSlug) ??
    blogPosts.find((item) => normalizeSlug(item.slug) === normalizedSlug);

  if (!post) {
    return createMetadata({
      title: "Article",
      description: site.description,
      path: "/blog",
    });
  }

  const image =
    ("og_image_url" in post && post.og_image_url) ||
    ("cover_image_url" in post && post.cover_image_url) ||
    undefined;
  const canonicalPath =
    "canonical_url" in post && post.canonical_url
      ? post.canonical_url
      : `/blog/${post.slug}`;
  const focusKeyword =
    "focus_keyword" in post && post.focus_keyword
      ? [post.focus_keyword]
      : undefined;

  return createMetadata({
    title: "meta_title" in post ? post.meta_title : post.title,
    description:
      "meta_description" in post ? post.meta_description : post.excerpt,
    path: canonicalPath,
    image,
    keywords: focusKeyword,
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const rawSlug = decodeURIComponent(slug ?? "");
  const normalizedSlug = normalizeSlug(rawSlug);
  const dbPost = await getBlogPostBySlug(rawSlug);
  const list = dbPost ? [dbPost] : await getBlogPosts();
  const post =
    list.find((item) => normalizeSlug(item.slug) === normalizedSlug) ??
    blogPosts.find((item) => normalizeSlug(item.slug) === normalizedSlug);

  if (!post) {
    notFound();
  }

  const breadcrumbs = [
    { label: "Accueil", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: post.title, href: `/blog/${post.slug}` },
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

  const articleSchema =
    "content_markdown" in post
      ? {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.excerpt,
          image:
            ("og_image_url" in post && post.og_image_url) ||
            ("cover_image_url" in post && post.cover_image_url) ||
            `${site.url}/og-default.svg`,
          author: {
            "@type": "Person",
            name:
              ("author_name" in post && post.author_name) || site.legalName,
          },
          publisher: {
            "@type": "Organization",
            name: site.legalName,
            logo: {
              "@type": "ImageObject",
              url: `${site.url}/og-default.svg`,
            },
          },
          datePublished:
            "created_at" in post && post.created_at ? post.created_at : undefined,
          dateModified:
            "updated_at" in post && post.updated_at ? post.updated_at : undefined,
          mainEntityOfPage: `${site.url}/blog/${post.slug}`,
        }
      : null;

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      {articleSchema && <JsonLd data={articleSchema} />}

      <Section className="bg-white">
        <Container className="space-y-6">
          <Breadcrumbs items={breadcrumbs} />
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
              {post.intent}
            </p>
            <h1 className="mt-3 text-4xl font-semibold text-neutral-900">
              {post.title}
            </h1>
            <p className="mt-4 text-lg text-neutral-600">{post.excerpt}</p>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          {"content_markdown" in post ? (
            <article
              className="prose prose-neutral max-w-none"
              dangerouslySetInnerHTML={{
                __html: renderMarkdown(post.content_markdown),
              }}
            />
          ) : (
            <article className="space-y-6 text-neutral-700">
              {post.content.map((block, index) => {
                if (block.type === "h2") {
                  return (
                    <h2
                      key={`${block.type}-${index}`}
                      className="pt-6 text-2xl font-semibold text-neutral-900"
                    >
                      {block.value as string}
                    </h2>
                  );
                }
                if (block.type === "ul") {
                  return (
                    <ul
                      key={`${block.type}-${index}`}
                      className="list-disc space-y-2 pl-6"
                    >
                      {(block.value as string[]).map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  );
                }
                return (
                  <p key={`${block.type}-${index}`}>
                    {block.value as string}
                  </p>
                );
              })}
            </article>
          )}
        </Container>
      </Section>

      <CTASection
        title="Besoin d’un accompagnement SEO ?"
        subtitle="Parlons de votre stratégie et des actions prioritaires."
      />
    </>
  );
}
