import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { query } from "@/lib/db";
import { verifySessionToken } from "@/lib/auth";

type UpdatePayload = {
  title?: string;
  meta_title?: string;
  meta_description?: string;
  excerpt?: string;
  intent?: string;
  cover_image_url?: string;
  content_markdown?: string;
  published?: boolean;
};

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
  await query(
    "UPDATE blog_posts SET title = $1, meta_title = $2, meta_description = $3, excerpt = $4, intent = $5, cover_image_url = $6, content_markdown = $7, published = $8, updated_at = NOW() WHERE slug = $9",
    [
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

  return NextResponse.json({ ok: true });
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
