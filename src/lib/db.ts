import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is missing");
}

export const pool = new Pool({ connectionString });

export async function query<T = unknown>(text: string, params?: unknown[]) {
  const result = await pool.query<T>(text, params);
  return result;
}
