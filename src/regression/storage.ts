import { getPool } from "../db.ts";
import type { TestResult, TestStatus } from "./types.ts";

/** Mapa: id test case'a → jego ostatni zapisany wynik. */
type ResultsMap = Record<string, TestResult>;

interface ResultRow {
  test_case_id: string;
  status: TestStatus;
  updated_at: Date;
}

/** Wczytuje wszystkie wyniki. */
export async function readResults(): Promise<ResultsMap> {
  const pool = getPool();
  const { rows } = await pool.query<ResultRow>(
    "SELECT test_case_id, status, updated_at FROM regression_results",
  );
  const results: ResultsMap = {};
  for (const row of rows) {
    results[row.test_case_id] = { status: row.status, updatedAt: row.updated_at.toISOString() };
  }
  return results;
}

/** Zwraca wynik pojedynczego test case'a lub undefined, jeśli jeszcze nie testowano. */
export async function getResult(id: string): Promise<TestResult | undefined> {
  const pool = getPool();
  const { rows } = await pool.query<ResultRow>(
    "SELECT test_case_id, status, updated_at FROM regression_results WHERE test_case_id = $1",
    [id],
  );
  return rows[0] ? { status: rows[0].status, updatedAt: rows[0].updated_at.toISOString() } : undefined;
}

/** Zapisuje wynik test case'a (nadpisuje poprzedni) i zwraca zapisany wpis. */
export async function setResult(id: string, status: TestStatus): Promise<TestResult> {
  const pool = getPool();
  const updatedAt = new Date().toISOString();

  await pool.query(
    `INSERT INTO regression_results (test_case_id, status, updated_at)
     VALUES ($1, $2, $3)
     ON CONFLICT (test_case_id) DO UPDATE SET status = $2, updated_at = $3`,
    [id, status, updatedAt],
  );

  return { status, updatedAt };
}

/** Usuwa wszystkie zapisane wyniki — test case'y wracają do statusu "untested". */
export async function clearResults(): Promise<void> {
  const pool = getPool();
  await pool.query("DELETE FROM regression_results");
}

/** Usuwa zapisany wynik pojedynczego test case'a (np. gdy sam test case zostaje skasowany). */
export async function deleteResult(id: string): Promise<void> {
  const pool = getPool();
  await pool.query("DELETE FROM regression_results WHERE test_case_id = $1", [id]);
}
