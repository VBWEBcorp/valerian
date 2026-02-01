import type { Metadata } from "next";
import { site } from "@/lib/site";

type MetadataInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  keywords?: string[];
  openGraphType?: "website" | "article";
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    authors?: string[];
  };
};

export function createMetadata({
  title,
  description,
  path,
  image = "/og-default.svg",
  keywords,
  openGraphType = "website",
  article,
}: MetadataInput): Metadata {
  const canonical = new URL(path, site.url).toString();
  const mergedKeywords = keywords?.length
    ? [...keywords, ...site.keywords]
    : [...site.keywords];

  return {
    title,
    description,
    keywords: mergedKeywords,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: site.name,
      locale: "fr_FR",
      type: openGraphType,
      images: [{ url: image }],
      article:
        openGraphType === "article"
          ? {
              publishedTime: article?.publishedTime,
              modifiedTime: article?.modifiedTime,
              authors: article?.authors,
            }
          : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export function absoluteUrl(path: string) {
  return new URL(path, site.url).toString();
}
