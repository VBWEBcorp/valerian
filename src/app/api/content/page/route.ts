import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { query } from "@/lib/db";
import { verifySessionToken } from "@/lib/auth";

type PagePayload = {
  slug?: string;
  content?: Record<string, unknown>;
};

export async function GET(request: Request) {
  const token = (await cookies()).get("vd_session")?.value;
  if (!verifySessionToken(token)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");
  if (!slug) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const result = await query<{ content: Record<string, unknown> }>(
    "SELECT content FROM page_content WHERE slug = $1",
    [slug]
  );

  return NextResponse.json({ ok: true, data: result.rows[0]?.content ?? null });
}

export async function PUT(request: Request) {
  const token = (await cookies()).get("vd_session")?.value;
  if (!verifySessionToken(token)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const body = (await request.json()) as PagePayload;
  const slug = body.slug?.trim();
  if (!slug || !body.content) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  await query(
    "INSERT INTO page_content (slug, content, updated_at) VALUES ($1, $2, NOW()) ON CONFLICT (slug) DO UPDATE SET content = EXCLUDED.content, updated_at = NOW()",
    [slug, JSON.stringify(body.content)]
  );

  return NextResponse.json({ ok: true });
}
