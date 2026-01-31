import { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { blogPosts } from "@/content/blog";
import { caseStudies } from "@/content/case-studies";

export default function sitemap(): MetadataRoute.Sitemap {
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

  const blogRoutes = blogPosts.map((post) => ({
    url: `${site.url}/blog/${post.slug}`,
    lastModified: new Date(),
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
