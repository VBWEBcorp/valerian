import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { query } from "@/lib/db";
import { verifySessionToken } from "@/lib/auth";

type UpdatePayload = {
  title?: string;
  meta_title?: string;
  meta_description?: string;
  excerpt?: string;
  cover_image_url?: string;
  content_markdown?: string;
  published?: boolean;
};

export async function GET(
  _request: Request,
  { params }: { params: { slug: string } }
) {
  const token = (await cookies()).get("vd_session")?.value;
  if (!verifySessionToken(token)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const result = await query(
    "SELECT * FROM blog_posts WHERE slug = $1 LIMIT 1",
    [params.slug]
  );
  return NextResponse.json({ ok: true, data: result.rows[0] ?? null });
}

export async function PUT(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const token = (await cookies()).get("vd_session")?.value;
  if (!verifySessionToken(token)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const body = (await request.json()) as UpdatePayload;
  await query(
    "UPDATE blog_posts SET title = $1, meta_title = $2, meta_description = $3, excerpt = $4, cover_image_url = $5, content_markdown = $6, published = $7, updated_at = NOW() WHERE slug = $8",
    [
      body.title ?? "",
      body.meta_title ?? "",
      body.meta_description ?? "",
      body.excerpt ?? "",
      body.cover_image_url ?? null,
      body.content_markdown ?? "",
      body.published ?? true,
      params.slug,
    ]
  );

  return NextResponse.json({ ok: true });
}

export async function DELETE(
  _request: Request,
  { params }: { params: { slug: string } }
) {
  const token = (await cookies()).get("vd_session")?.value;
  if (!verifySessionToken(token)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  await query("DELETE FROM blog_posts WHERE slug = $1", [params.slug]);
  return NextResponse.json({ ok: true });
}
