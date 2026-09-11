import { randomUUID } from "node:crypto";
import { getPool } from "../db.ts";
import { seedTestCases } from "./seedTestCases.ts";
import type { TestCase, TestSuite } from "./types.ts";

/** Dane nowego lub edytowanego test case'a (bez id — id nadaje/zachowuje store; bez automated — ustawia się je przez setAutomated). */
export type TestCaseInput = Omit<TestCase, "id" | "automated">;

interface TestCaseRow {
  id: string;
  section: string;
  title: string;
  priority: TestCase["priority"];
  platforms: string[];
  preconditions: string;
  steps: string[];
  expected_result: string[];
  automated: boolean;
  deleted_at: Date | null;
}

export interface DeletedTestCase extends TestCase {
  deletedAt: string;
}

function rowToTestCase(row: TestCaseRow): TestCase {
  return {
    id: row.id,
    section: row.section,
    title: row.title,
    priority: row.priority,
    platforms: row.platforms,
    preconditions: row.preconditions,
    steps: row.steps,
    expectedResult: row.expected_result,
    automated: row.automated,
  };
}

/** Wgrywa dane początkowe (seed) z "CM Test Scenarios.md" — tylko przy pierwszym uruchomieniu. Seed to zawsze test case'y manualne. */
async function seed(): Promise<void> {
  const pool = getPool();
  for (const tc of seedTestCases) {
    await pool.query(
      `INSERT INTO regression_test_cases (id, section, title, priority, platforms, preconditions, steps, expected_result, automated)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, false)
       ON CONFLICT (id) DO NOTHING`,
      [
        tc.id,
        tc.section,
        tc.title,
        tc.priority,
        JSON.stringify(tc.platforms),
        tc.preconditions,
        JSON.stringify(tc.steps),
        JSON.stringify(tc.expectedResult),
      ],
    );
  }
}

/**
 * Wczytuje test case'y należące do danego suite'u (manual/e2e).
 * Jeśli tabela jest pusta (pierwsze uruchomienie) — zasila ją danymi początkowymi (zawsze manual).
 */
export async function readAll(suite: TestSuite): Promise<TestCase[]> {
  const pool = getPool();
  const { rows } = await pool.query<TestCaseRow>("SELECT * FROM regression_test_cases");
  if (rows.length === 0) {
    await seed();
    return suite === "manual" ? seedTestCases.map((tc) => ({ ...tc, automated: false })) : [];
  }
  return rows
    .filter((row) => row.deleted_at === null && row.automated === (suite === "e2e"))
    .map(rowToTestCase);
}

/** Zwraca test case po id lub undefined, jeśli nie znaleziono. */
export async function getById(id: string): Promise<TestCase | undefined> {
  const pool = getPool();
  const { rows } = await pool.query<TestCaseRow>(
    "SELECT * FROM regression_test_cases WHERE id = $1 AND deleted_at IS NULL",
    [id],
  );
  return rows[0] ? rowToTestCase(rows[0]) : undefined;
}

/** Dodaje nowy test case (nadaje mu id). Zawsze tworzony jako manualny — automatyzacja to osobna, świadoma akcja. */
export async function create(input: TestCaseInput): Promise<TestCase> {
  const pool = getPool();
  const testCase: TestCase = { id: randomUUID(), ...input, automated: false };

  await pool.query(
    `INSERT INTO regression_test_cases (id, section, title, priority, platforms, preconditions, steps, expected_result, automated)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, false)`,
    [
      testCase.id,
      testCase.section,
      testCase.title,
      testCase.priority,
      JSON.stringify(testCase.platforms),
      testCase.preconditions,
      JSON.stringify(testCase.steps),
      JSON.stringify(testCase.expectedResult),
    ],
  );

  return testCase;
}

/** Nadpisuje dane istniejącego test case'a, zachowując id i flagę automated. Zwraca undefined, jeśli nie znaleziono. */
export async function update(id: string, input: TestCaseInput): Promise<TestCase | undefined> {
  const pool = getPool();
  const { rows } = await pool.query<TestCaseRow>(
    `UPDATE regression_test_cases
     SET section = $2, title = $3, priority = $4, platforms = $5, preconditions = $6, steps = $7, expected_result = $8
     WHERE id = $1
     RETURNING *`,
    [
      id,
      input.section,
      input.title,
      input.priority,
      JSON.stringify(input.platforms),
      input.preconditions,
      JSON.stringify(input.steps),
      JSON.stringify(input.expectedResult),
    ],
  );
  return rows[0] ? rowToTestCase(rows[0]) : undefined;
}

/** Ustawia flagę automated (przenosi test case między zakładkami Manual/E2E). Zwraca undefined, jeśli nie znaleziono. */
export async function setAutomated(id: string, automated: boolean): Promise<TestCase | undefined> {
  const pool = getPool();
  const { rows } = await pool.query<TestCaseRow>(
    "UPDATE regression_test_cases SET automated = $2 WHERE id = $1 RETURNING *",
    [id, automated],
  );
  return rows[0] ? rowToTestCase(rows[0]) : undefined;
}

/** Usuwa test case. Zwraca false, jeśli nie znaleziono. */
export async function remove(id: string): Promise<boolean> {
  const pool = getPool();
  const { rowCount } = await pool.query("DELETE FROM regression_test_cases WHERE id = $1", [id]);
  return (rowCount ?? 0) > 0;
}

/** Trwale usuwa test case wyłącznie wtedy, gdy znajduje się już w koszu. */
export async function removeFromTrash(id: string): Promise<boolean> {
  const pool = getPool();
  const { rowCount } = await pool.query(
    "DELETE FROM regression_test_cases WHERE id = $1 AND deleted_at IS NOT NULL",
    [id],
  );
  return (rowCount ?? 0) > 0;
}

/** Przenosi test case do tymczasowego kosza, zachowując jego wyniki. */
export async function trash(id: string): Promise<boolean> {
  const pool = getPool();
  const { rowCount } = await pool.query(
    "UPDATE regression_test_cases SET deleted_at = NOW() WHERE id = $1 AND deleted_at IS NULL",
    [id],
  );
  return (rowCount ?? 0) > 0;
}

/** Zwraca test case'y z kosza, najnowsze usunięte jako pierwsze. */
export async function readTrash(): Promise<DeletedTestCase[]> {
  const pool = getPool();
  const { rows } = await pool.query<TestCaseRow>(
    "SELECT * FROM regression_test_cases WHERE deleted_at IS NOT NULL ORDER BY deleted_at DESC",
  );
  return rows.map((row) => ({ ...rowToTestCase(row), deletedAt: row.deleted_at!.toISOString() }));
}

/** Przywraca test case z kosza. */
export async function restore(id: string): Promise<boolean> {
  const pool = getPool();
  const { rowCount } = await pool.query(
    "UPDATE regression_test_cases SET deleted_at = NULL WHERE id = $1 AND deleted_at IS NOT NULL",
    [id],
  );
  return (rowCount ?? 0) > 0;
}

/** Trwale usuwa test case'y przebywające w koszu dłużej niż 30 dni. */
export async function purgeExpired(): Promise<number> {
  const pool = getPool();
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const { rows } = await client.query<{ id: string }>(
      "SELECT id FROM regression_test_cases WHERE deleted_at < NOW() - INTERVAL '30 days'",
    );
    if (rows.length === 0) {
      await client.query("COMMIT");
      return 0;
    }

    const ids = rows.map((row) => row.id);
    await client.query("DELETE FROM regression_results WHERE test_case_id = ANY($1)", [ids]);
    await client.query("DELETE FROM regression_results_e2e WHERE test_case_id = ANY($1)", [ids]);
    await client.query("DELETE FROM regression_test_cases WHERE id = ANY($1)", [ids]);
    await client.query("COMMIT");
    return ids.length;
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
}
