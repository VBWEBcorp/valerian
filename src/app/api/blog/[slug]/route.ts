import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { query } from "@/lib/db";
import { verifySessionToken } from "@/lib/auth";

type UpdatePayload = {
  slug?: string;
  title?: string;
  meta_title?: string;
  meta_description?: string;
  excerpt?: string;
  intent?: string;
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

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const token = (await cookies()).get("vd_session")?.value;
  if (!verifySessionToken(token)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const { slug } = await params;
  const result = await query(
    "SELECT * FROM blog_posts WHERE slug = $1 LIMIT 1",
    [slug]
  );
  return NextResponse.json({ ok: true, data: result.rows[0] ?? null });
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const token = (await cookies()).get("vd_session")?.value;
  if (!verifySessionToken(token)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const { slug } = await params;
  const body = (await request.json()) as UpdatePayload;
  const normalizedSlug = body.slug ? normalizeSlug(body.slug) : slug;
  await query(
    "UPDATE blog_posts SET slug = $1, title = $2, meta_title = $3, meta_description = $4, excerpt = $5, intent = $6, cover_image_url = $7, content_markdown = $8, published = $9, updated_at = NOW() WHERE slug = $10",
    [
      normalizedSlug,
      body.title ?? "",
      body.meta_title ?? "",
      body.meta_description ?? "",
      body.excerpt ?? "",
      body.intent ?? "Article",
      body.cover_image_url ?? null,
      body.content_markdown ?? "",
      body.published ?? true,
      slug,
    ]
  );

  return NextResponse.json({ ok: true, slug: normalizedSlug });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const token = (await cookies()).get("vd_session")?.value;
  if (!verifySessionToken(token)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const { slug } = await params;
  await query("DELETE FROM blog_posts WHERE slug = $1", [slug]);
  return NextResponse.json({ ok: true });
}
