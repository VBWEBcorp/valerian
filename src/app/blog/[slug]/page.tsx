import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { CTASection } from "@/components/CTASection";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { absoluteUrl, createMetadata } from "@/lib/seo";
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

function formatDate(value?: string | null) {
  if (!value) return null;
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return null;
  return parsed.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function getPostText(
  post: (typeof blogPosts)[number] | Awaited<ReturnType<typeof getBlogPosts>>[number]
) {
  if ("content_markdown" in post && post.content_markdown) {
    return post.content_markdown;
  }
  if ("content" in post) {
    return post.content
      .map((block) =>
        Array.isArray(block.value) ? block.value.join(" ") : block.value
      )
      .join(" ");
  }
  return "";
}

function estimateReadingTime(text: string) {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  if (!words) return null;
  return Math.max(1, Math.round(words / 200));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const rawSlug = decodeURIComponent(slug ?? "");
  const normalizedSlug = normalizeSlug(rawSlug);
  const dbPost = await getBlogPostBySlug(rawSlug);
  const dbPosts = await getBlogPosts();
  const list = dbPosts.length ? dbPosts : blogPosts;
  const post =
    dbPost ??
    list.find((item) => normalizeSlug(item.slug) === normalizedSlug) ??
    blogPosts.find((item) => normalizeSlug(item.slug) === normalizedSlug);

  if (!post) {
    return createMetadata({
      title: "Article",
      description: site.description,
      path: "/blog",
    });
  }

  const imagePath =
    ("og_image_url" in post && post.og_image_url) ||
    ("cover_image_url" in post && post.cover_image_url) ||
    undefined;
  const image = imagePath ? absoluteUrl(imagePath) : undefined;
  const canonicalPath =
    "canonical_url" in post && post.canonical_url
      ? post.canonical_url
      : `/blog/${post.slug}`;
  const authorName =
    ("author_name" in post && post.author_name) || site.legalName;
  const publishedTime =
    "created_at" in post && post.created_at ? post.created_at : undefined;
  const modifiedTime =
    "updated_at" in post && post.updated_at ? post.updated_at : undefined;
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
    openGraphType: "article",
    article: {
      publishedTime,
      modifiedTime,
      authors: authorName ? [authorName] : undefined,
    },
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const rawSlug = decodeURIComponent(slug ?? "");
  const normalizedSlug = normalizeSlug(rawSlug);
  const dbPost = await getBlogPostBySlug(rawSlug);
  const dbPosts = await getBlogPosts();
  const list = dbPosts.length ? dbPosts : blogPosts;
  const post =
    dbPost ??
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
  const canonicalPath =
    "canonical_url" in post && post.canonical_url
      ? post.canonical_url
      : `/blog/${post.slug}`;
  const canonicalUrl = absoluteUrl(canonicalPath);
  const authorName =
    ("author_name" in post && post.author_name) || site.legalName;
  const publishedDate =
    "created_at" in post ? formatDate(post.created_at) : null;
  const readingTime = estimateReadingTime(getPostText(post));
  const shareLinks = [
    {
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        canonicalUrl
      )}`,
    },
    {
      label: "X",
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        canonicalUrl
      )}&text=${encodeURIComponent(post.title)}`,
    },
    {
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        canonicalUrl
      )}`,
    },
    {
      label: "WhatsApp",
      href: `https://wa.me/?text=${encodeURIComponent(
        `${post.title} ${canonicalUrl}`
      )}`,
    },
  ];
  const related = list
    .filter((item) => item.slug !== post.slug)
    .slice(0, 3);

  const schemaImage =
    ("og_image_url" in post && post.og_image_url) ||
    ("cover_image_url" in post && post.cover_image_url) ||
    `${site.url}/og-default.svg`;
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: absoluteUrl(schemaImage),
    author: {
      "@type": "Person",
      name: authorName,
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
    mainEntityOfPage: canonicalUrl,
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={articleSchema} />

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
            {(publishedDate || authorName || readingTime) && (
              <div className="mt-4 flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                {publishedDate && <span>{publishedDate}</span>}
                {authorName && <span>{authorName}</span>}
                {readingTime && <span>{readingTime} min de lecture</span>}
              </div>
            )}
          </div>
          {"cover_image_url" in post && post.cover_image_url ? (
            <img
              src={post.cover_image_url}
              alt={post.title}
              className="w-full rounded-3xl object-cover"
              loading="lazy"
            />
          ) : (
            <div className="flex h-48 w-full items-center justify-center rounded-3xl bg-neutral-100 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">
              Image de couverture
            </div>
          )}
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
            <span>Partager</span>
            {shareLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-neutral-200 px-3 py-1 text-[11px] text-neutral-600 hover:border-neutral-300"
              >
                {item.label}
              </a>
            ))}
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


      {related.length > 0 && (
        <Section className="bg-white">
          <Container>
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-neutral-900">
                À lire aussi
              </h2>
            </div>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  href={`/blog/${item.slug}`}
                  className="card card-hover overflow-hidden rounded-2xl p-0"
                >
                  {item.cover_image_url ? (
                    <img
                      src={item.cover_image_url}
                      alt={item.title}
                      className="h-40 w-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex h-40 w-full items-center justify-center bg-neutral-100 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">
                      Image de couverture
                    </div>
                  )}
                  <div className="p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                      {item.intent}
                    </p>
                    <p className="mt-2 text-sm font-semibold text-neutral-900">
                      {item.title}
                    </p>
                    <p className="mt-2 text-sm text-neutral-600">
                      {item.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </Section>
      )}

      <CTASection
        title="Besoin d’un accompagnement SEO ?"
        subtitle="Parlons de votre stratégie et des actions prioritaires."
      />
    </>
  );
}
