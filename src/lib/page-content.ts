import { QueryResultRow } from "pg";
import { query } from "@/lib/db";

type PageContentRow = QueryResultRow & {
  content: Record<string, unknown>;
};

function mergeContent(
  fallback: Record<string, unknown>,
  override: Record<string, unknown>
) {
  const result: Record<string, unknown> = { ...fallback };
  Object.entries(override).forEach(([key, value]) => {
    if (value === undefined || value === null) return;
    result[key] = value;
  });
  return result;
}

export async function getPageContent<T extends Record<string, unknown>>(
  slug: string,
  fallback: T
): Promise<T> {
  if (!process.env.DATABASE_URL) {
    return fallback;
  }

  try {
    const result = await query<PageContentRow>(
      "SELECT content FROM page_content WHERE slug = $1",
      [slug]
    );
    const row = result.rows[0];
    if (!row?.content) return fallback;
    return mergeContent(fallback, row.content as Record<string, unknown>) as T;
  } catch {
    return fallback;
  }
}
