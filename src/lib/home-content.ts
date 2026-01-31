export type HomeContent = {
  hero_title: string;
  hero_subtitle: string;
  hero_bullets: string[];
  value_props: { title: string; text: string }[];
  method_steps: { title: string; text: string }[];
};

export async function getHomeContent(): Promise<HomeContent | null> {
  if (!process.env.DATABASE_URL) {
    return null;
  }

  try {
    const { query } = await import("@/lib/db");
    const result = await query<HomeContent>(
      "SELECT hero_title, hero_subtitle, hero_bullets, value_props, method_steps FROM home_content WHERE id = 1"
    );
    return result.rows[0] ?? null;
  } catch {
    return null;
  }
}
