import { query } from "@/lib/db";

export type BlogPost = {
  id: number;
  slug: string;
  title: string;
  meta_title: string;
  meta_description: string;
  excerpt: string;
  intent: string;
  cover_image_url: string | null;
  og_image_url?: string | null;
  canonical_url?: string | null;
  focus_keyword?: string | null;
  author_name?: string | null;
  content_markdown: string;
  published: boolean;
  created_at: string;
  updated_at: string;
};

function normalizeSlug(value: string) {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function getBlogPosts(limit?: number): Promise<BlogPost[]> {
  if (!process.env.DATABASE_URL) return [];
  try {
    const result = limit
      ? await query<BlogPost>(
          "SELECT * FROM blog_posts WHERE published = TRUE ORDER BY created_at DESC LIMIT $1",
          [limit]
        )
      : await query<BlogPost>(
          "SELECT * FROM blog_posts WHERE published = TRUE ORDER BY created_at DESC"
        );
    return result.rows;
  } catch {
    return [];
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!process.env.DATABASE_URL) return null;
  try {
    const normalizedSlug = normalizeSlug(slug);
    const withSlash = `/${normalizedSlug}`;
    const result = await query<BlogPost>(
      "SELECT * FROM blog_posts WHERE LOWER(slug) IN (LOWER($1), LOWER($2), LOWER($3)) LIMIT 1",
      [slug, normalizedSlug, withSlash]
    );
    if (result.rows[0]) {
      return result.rows[0];
    }
    const fallback = await query<BlogPost>("SELECT * FROM blog_posts");
    return (
      fallback.rows.find(
        (post) => normalizeSlug(post.slug) === normalizedSlug
      ) ?? null
    );
  } catch {
    return null;
  }
}
