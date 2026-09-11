import { getPool } from "../db.ts";
import type { TestResult, TestStatus } from "./types.ts";

/** Mapa: id test case'a → jego ostatni zapisany wynik. */
type ResultsMap = Record<string, TestResult>;

interface ResultRow {
  test_case_id: string;
  status: TestStatus;
  updated_at: Date;
}

/** Nazwy tabel wyników — whitelist, nigdy nie budowana z inputu użytkownika. */
type ResultsTable = "regression_results" | "regression_results_e2e";

/** Tworzy magazyn wyników nad daną tabelą (manual/e2e mają identyczną logikę, różną tylko tabelą). */
function createResultsStore(table: ResultsTable) {
  return {
    /** Wczytuje wszystkie wyniki. */
    async readResults(): Promise<ResultsMap> {
      const pool = getPool();
      const { rows } = await pool.query<ResultRow>(
        `SELECT test_case_id, status, updated_at FROM ${table}`,
      );
      const results: ResultsMap = {};
      for (const row of rows) {
        results[row.test_case_id] = { status: row.status, updatedAt: row.updated_at.toISOString() };
      }
      return results;
    },

    /** Zwraca wynik pojedynczego test case'a lub undefined, jeśli jeszcze nie testowano. */
    async getResult(id: string): Promise<TestResult | undefined> {
      const pool = getPool();
      const { rows } = await pool.query<ResultRow>(
        `SELECT test_case_id, status, updated_at FROM ${table} WHERE test_case_id = $1`,
        [id],
      );
      return rows[0] ? { status: rows[0].status, updatedAt: rows[0].updated_at.toISOString() } : undefined;
    },

    /** Zapisuje wynik test case'a (nadpisuje poprzedni) i zwraca zapisany wpis. */
    async setResult(id: string, status: TestStatus): Promise<TestResult> {
      const pool = getPool();
      const updatedAt = new Date().toISOString();

      await pool.query(
        `INSERT INTO ${table} (test_case_id, status, updated_at)
         VALUES ($1, $2, $3)
         ON CONFLICT (test_case_id) DO UPDATE SET status = $2, updated_at = $3`,
        [id, status, updatedAt],
      );

      return { status, updatedAt };
    },

    /** Usuwa wszystkie zapisane wyniki — test case'y wracają do statusu "untested". */
    async clearResults(): Promise<void> {
      const pool = getPool();
      await pool.query(`DELETE FROM ${table}`);
    },

    /** Usuwa zapisany wynik pojedynczego test case'a (np. gdy sam test case zostaje skasowany). */
    async deleteResult(id: string): Promise<void> {
      const pool = getPool();
      await pool.query(`DELETE FROM ${table} WHERE test_case_id = $1`, [id]);
    },
  };
}

/** Wyniki test case'ów manualnych. */
export const manualResults = createResultsStore("regression_results");

/** Wyniki test case'ów zautomatyzowanych (e2e) — osobna historia od momentu automatyzacji. */
export const e2eResults = createResultsStore("regression_results_e2e");
