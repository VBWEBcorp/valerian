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
  content_markdown: string;
  published: boolean;
  created_at: string;
  updated_at: string;
};

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
    const result = await query<BlogPost>(
      "SELECT * FROM blog_posts WHERE slug = $1 LIMIT 1",
      [slug]
    );
    return result.rows[0] ?? null;
  } catch {
    return null;
  }
}
