import type { Metadata } from "next";
import { site } from "@/lib/site";

type MetadataInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  keywords?: string[];
};

export function createMetadata({
  title,
  description,
  path,
  image = "/og-default.svg",
  keywords,
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
      type: "website",
      images: [{ url: image }],
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
