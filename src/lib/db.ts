import { Pool, QueryResultRow } from "pg";

let pool: Pool | null = null;

function getPool() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is missing");
  }
  if (!pool) {
    pool = new Pool({ connectionString });
  }
  return pool;
}

export async function query<T extends QueryResultRow = QueryResultRow>(
  text: string,
  params?: unknown[]
) {
  const result = await getPool().query<T>(text, params);
  return result;
}
