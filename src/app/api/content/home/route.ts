import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { query } from "@/lib/db";
import { verifySessionToken } from "@/lib/auth";

type HomeContentRow = {
  hero_title: string;
  hero_subtitle: string;
  hero_bullets: string[];
  value_props: { title: string; text: string }[];
  method_steps: { title: string; text: string }[];
};

export async function GET() {
  const token = (await cookies()).get("vd_session")?.value;
  if (!verifySessionToken(token)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const result = await query<HomeContentRow>(
    "SELECT hero_title, hero_subtitle, hero_bullets, value_props, method_steps FROM home_content WHERE id = 1"
  );
  const row = result.rows[0];
  return NextResponse.json({ ok: true, data: row });
}

export async function PUT(request: Request) {
  const token = (await cookies()).get("vd_session")?.value;
  if (!verifySessionToken(token)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const body = (await request.json()) as HomeContentRow;

  await query(
    "UPDATE home_content SET hero_title = $1, hero_subtitle = $2, hero_bullets = $3, value_props = $4, method_steps = $5, updated_at = NOW() WHERE id = 1",
    [
      body.hero_title,
      body.hero_subtitle,
      JSON.stringify(body.hero_bullets ?? []),
      JSON.stringify(body.value_props ?? []),
      JSON.stringify(body.method_steps ?? []),
    ]
  );

  return NextResponse.json({ ok: true });
}
