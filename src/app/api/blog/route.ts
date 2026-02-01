import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { query } from "@/lib/db";
import { verifySessionToken } from "@/lib/auth";

type CreatePayload = {
  slug?: string;
  title?: string;
  meta_title?: string;
  meta_description?: string;
  excerpt?: string;
  intent?: string;
  focus_keyword?: string;
  canonical_url?: string;
  og_image_url?: string;
  author_name?: string;
  cover_image_url?: string;
  content_markdown?: string;
  published?: boolean;
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

export async function GET() {
  const token = (await cookies()).get("vd_session")?.value;
  if (!verifySessionToken(token)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const result = await query(
    "SELECT id, slug, title, meta_title, meta_description, excerpt, intent, cover_image_url, published, created_at, updated_at FROM blog_posts ORDER BY created_at DESC"
  );
  return NextResponse.json({ ok: true, data: result.rows });
}

export async function POST(request: Request) {
  const token = (await cookies()).get("vd_session")?.value;
  if (!verifySessionToken(token)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  try {
    const body = (await request.json()) as CreatePayload;
    if (
      !body.slug ||
      !body.title ||
      !body.meta_title ||
      !body.meta_description
    ) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    const normalizedSlug = normalizeSlug(body.slug);
    const result = await query(
      "INSERT INTO blog_posts (slug, title, meta_title, meta_description, excerpt, intent, focus_keyword, canonical_url, og_image_url, author_name, cover_image_url, content_markdown, published) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) RETURNING id",
      [
        normalizedSlug,
        body.title,
        body.meta_title,
        body.meta_description,
        body.excerpt ?? "",
        body.intent ?? "Article",
        body.focus_keyword ?? null,
        body.canonical_url ?? null,
        body.og_image_url ?? null,
        body.author_name ?? null,
        body.cover_image_url ?? null,
        body.content_markdown ?? "",
        body.published ?? true,
      ]
    );

    return NextResponse.json({ ok: true, id: result.rows[0]?.id });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Erreur inconnue.";
    const isSchemaError =
      message.includes("column") && message.includes("does not exist");
    return NextResponse.json(
      {
        ok: false,
        error: isSchemaError
          ? "La base n'est pas à jour. Exécute le script SQL blog_posts_update.sql."
          : "Erreur serveur lors de la création.",
      },
      { status: 500 }
    );
  }
}
