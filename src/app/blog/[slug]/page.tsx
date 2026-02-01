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
  params: { slug: string };
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
  const rawSlug = decodeURIComponent(params.slug);
  const normalizedSlug = normalizeSlug(rawSlug);
  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/94ae9cb7-fbb9-4936-b0d5-31a7a1327391',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({sessionId:'debug-session',runId:'pre-fix',hypothesisId:'H3',location:'src/app/blog/[slug]/page.tsx:generateMetadata',message:'metadata lookup',data:{rawSlug,normalizedSlug},timestamp:Date.now()})}).catch(()=>{});
  // #endregion
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

  return createMetadata({
    title: "meta_title" in post ? post.meta_title : post.title,
    description:
      "meta_description" in post ? post.meta_description : post.excerpt,
    path: `/blog/${post.slug}`,
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const rawSlug = decodeURIComponent(params.slug);
  const normalizedSlug = normalizeSlug(rawSlug);
  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/94ae9cb7-fbb9-4936-b0d5-31a7a1327391',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({sessionId:'debug-session',runId:'pre-fix',hypothesisId:'H3',location:'src/app/blog/[slug]/page.tsx:BlogPostPage:entry',message:'page entry',data:{rawSlug,normalizedSlug},timestamp:Date.now()})}).catch(()=>{});
  // #endregion
  const dbPost = await getBlogPostBySlug(rawSlug);
  const list = dbPost ? [dbPost] : await getBlogPosts();
  const post =
    list.find((item) => normalizeSlug(item.slug) === normalizedSlug) ??
    blogPosts.find((item) => normalizeSlug(item.slug) === normalizedSlug);

  if (!post) {
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/94ae9cb7-fbb9-4936-b0d5-31a7a1327391',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({sessionId:'debug-session',runId:'pre-fix',hypothesisId:'H4',location:'src/app/blog/[slug]/page.tsx:BlogPostPage:notFound',message:'post not found',data:{rawSlug,normalizedSlug,dbPost:!!dbPost,listCount:list.length,hasFallback:blogPosts.some((item)=>normalizeSlug(item.slug)===normalizedSlug)},timestamp:Date.now()})}).catch(()=>{});
    // #endregion
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
