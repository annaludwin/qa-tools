import { randomUUID } from "node:crypto";
import { getPool } from "../db.ts";
import { seedTestCases } from "./seedTestCases.ts";
import type { TestCase } from "./types.ts";

/** Dane nowego lub edytowanego test case'a (bez id — id nadaje/zachowuje store). */
export type TestCaseInput = Omit<TestCase, "id">;

interface TestCaseRow {
  id: string;
  section: string;
  title: string;
  priority: TestCase["priority"];
  platforms: string[];
  preconditions: string;
  steps: string[];
  expected_result: string[];
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
  };
}

/** Wgrywa dane początkowe (seed) z "CM Test Scenarios.md" — tylko przy pierwszym uruchomieniu. */
async function seed(): Promise<void> {
  const pool = getPool();
  for (const tc of seedTestCases) {
    await pool.query(
      `INSERT INTO regression_test_cases (id, section, title, priority, platforms, preconditions, steps, expected_result)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
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
 * Wczytuje wszystkie test case'y.
 * Jeśli tabela jest pusta (pierwsze uruchomienie) — zasila ją danymi początkowymi.
 */
export async function readAll(): Promise<TestCase[]> {
  const pool = getPool();
  const { rows } = await pool.query<TestCaseRow>("SELECT * FROM regression_test_cases");
  if (rows.length === 0) {
    await seed();
    return [...seedTestCases];
  }
  return rows.map(rowToTestCase);
}

/** Zwraca test case po id lub undefined, jeśli nie znaleziono. */
export async function getById(id: string): Promise<TestCase | undefined> {
  const pool = getPool();
  const { rows } = await pool.query<TestCaseRow>(
    "SELECT * FROM regression_test_cases WHERE id = $1",
    [id],
  );
  return rows[0] ? rowToTestCase(rows[0]) : undefined;
}

/** Dodaje nowy test case (nadaje mu id). */
export async function create(input: TestCaseInput): Promise<TestCase> {
  const pool = getPool();
  const testCase: TestCase = { id: randomUUID(), ...input };

  await pool.query(
    `INSERT INTO regression_test_cases (id, section, title, priority, platforms, preconditions, steps, expected_result)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
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

/** Nadpisuje dane istniejącego test case'a, zachowując id. Zwraca undefined, jeśli nie znaleziono. */
export async function update(id: string, input: TestCaseInput): Promise<TestCase | undefined> {
  const pool = getPool();
  const { rowCount } = await pool.query(
    `UPDATE regression_test_cases
     SET section = $2, title = $3, priority = $4, platforms = $5, preconditions = $6, steps = $7, expected_result = $8
     WHERE id = $1`,
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
  if (!rowCount) {
    return undefined;
  }
  return { id, ...input };
}

/** Usuwa test case. Zwraca false, jeśli nie znaleziono. */
export async function remove(id: string): Promise<boolean> {
  const pool = getPool();
  const { rowCount } = await pool.query("DELETE FROM regression_test_cases WHERE id = $1", [id]);
  return (rowCount ?? 0) > 0;
}
