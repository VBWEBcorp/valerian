import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { CTASection } from "@/components/CTASection";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { createMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { blogPosts } from "@/content/blog";
import { getBlogPostBySlug } from "@/lib/blog";
import { renderMarkdown } from "@/lib/markdown";

type PageProps = {
  params: { slug: string };
};

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = params;
  const dbPost = await getBlogPostBySlug(slug);
  const post = dbPost ?? blogPosts.find((item) => item.slug === slug);

  if (!post) {
    return createMetadata({
      title: "Article",
      description: site.description,
      path: "/blog",
    });
  }

  return createMetadata({
    title: "meta_title" in post ? post.meta_title : post.title,
    description:
      "meta_description" in post ? post.meta_description : post.excerpt,
    path: `/blog/${post.slug}`,
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = params;
  const dbPost = await getBlogPostBySlug(slug);
  const post = dbPost ?? blogPosts.find((item) => item.slug === slug);

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

  return (
    <>
      <JsonLd data={breadcrumbSchema} />

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
