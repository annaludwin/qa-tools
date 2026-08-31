import pg from "pg";

let pool: pg.Pool | undefined;

/** Zwraca współdzielony pool połączeń do Postgresa (Supabase). Leniwie inicjalizowany. */
export function getPool(): pg.Pool {
  if (!pool) {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error(
        "DATABASE_URL is not set. Copy .env.example to .env and fill in your Supabase connection string.",
      );
    }
    pool = new pg.Pool({ connectionString, ssl: { rejectUnauthorized: false } });
  }
  return pool;
}

/** Tworzy wszystkie tabele, jeśli jeszcze nie istnieją. Bezpieczne do wywołania przy każdym starcie. */
export async function initSchema(): Promise<void> {
  const pool = getPool();
  await pool.query(`
    CREATE TABLE IF NOT EXISTS seo_history (
      id text PRIMARY KEY,
      saved_at timestamptz NOT NULL,
      report jsonb NOT NULL
    );

    CREATE TABLE IF NOT EXISTS regression_test_cases (
      id text PRIMARY KEY,
      section text NOT NULL,
      title text NOT NULL,
      priority text NOT NULL,
      platforms jsonb NOT NULL,
      preconditions text NOT NULL,
      steps jsonb NOT NULL,
      expected_result jsonb NOT NULL
    );

    CREATE TABLE IF NOT EXISTS regression_results (
      test_case_id text PRIMARY KEY,
      status text NOT NULL,
      updated_at timestamptz NOT NULL
    );

    CREATE TABLE IF NOT EXISTS regression_reports (
      id text PRIMARY KEY,
      generated_at timestamptz NOT NULL,
      summary jsonb NOT NULL,
      results jsonb NOT NULL
    );
  `);
}
