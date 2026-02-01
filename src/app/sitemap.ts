import { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { blogPosts } from "@/content/blog";
import { caseStudies } from "@/content/case-studies";
import { getBlogPosts } from "@/lib/blog";

type BlogLike = {
  slug: string;
  created_at?: string;
  updated_at?: string;
};

function cleanSlug(value: string) {
  return value.replace(/^\/+/, "");
}

function toDate(value?: string) {
  if (!value) return undefined;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? undefined : parsed;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = [
    "",
    "/services/creation-site-internet",
    "/services/referencement-naturel",
    "/realisations",
    "/a-propos",
    "/blog",
    "/contact",
    "/mentions-legales",
    "/politique-de-confidentialite",
  ];

  const routes = staticPages.map((path) => ({
    url: `${site.url}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const dbPosts = await getBlogPosts();
  const sourcePosts: BlogLike[] = dbPosts.length ? dbPosts : blogPosts;
  const blogRoutes = sourcePosts.map((post) => ({
    url: `${site.url}/blog/${cleanSlug(post.slug)}`,
    lastModified:
      toDate(post.updated_at) || toDate(post.created_at) || new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const caseRoutes = caseStudies.map((study) => ({
    url: `${site.url}/realisations/${study.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...routes, ...blogRoutes, ...caseRoutes];
}
