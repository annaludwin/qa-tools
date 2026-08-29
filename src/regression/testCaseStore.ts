import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { seedTestCases } from "./seedTestCases.ts";
import type { TestCase } from "./types.ts";

/** Dane nowego lub edytowanego test case'a (bez id — id nadaje/zachowuje store). */
export type TestCaseInput = Omit<TestCase, "id">;

async function writeAll(file: string, testCases: TestCase[]): Promise<void> {
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, JSON.stringify(testCases, null, 2), "utf8");
}

/**
 * Wczytuje wszystkie test case'y z pliku.
 * Jeśli plik jeszcze nie istnieje — zasila go danymi początkowymi (seed)
 * z "CM Test Scenarios.md" i zwraca je.
 */
export async function readAll(file: string): Promise<TestCase[]> {
  try {
    const content = await readFile(file, "utf8");
    const data = JSON.parse(content);
    return Array.isArray(data) ? (data as TestCase[]) : [];
  } catch (err) {
    if (err instanceof Error && "code" in err && err.code === "ENOENT") {
      const seeded = [...seedTestCases];
      await writeAll(file, seeded);
      return seeded;
    }
    throw err;
  }
}

/** Zwraca test case po id lub undefined, jeśli nie znaleziono. */
export async function getById(file: string, id: string): Promise<TestCase | undefined> {
  const testCases = await readAll(file);
  return testCases.find((tc) => tc.id === id);
}

/** Dodaje nowy test case (nadaje mu id) i zapisuje plik. */
export async function create(file: string, input: TestCaseInput): Promise<TestCase> {
  const testCase: TestCase = { id: randomUUID(), ...input };

  const testCases = await readAll(file);
  testCases.push(testCase);
  await writeAll(file, testCases);

  return testCase;
}

/** Nadpisuje dane istniejącego test case'a. Zwraca undefined, jeśli nie znaleziono. */
export async function update(file: string, id: string, input: TestCaseInput): Promise<TestCase | undefined> {
  const testCases = await readAll(file);
  const index = testCases.findIndex((tc) => tc.id === id);
  if (index === -1) {
    return undefined;
  }

  const updated: TestCase = { id, ...input };
  testCases[index] = updated;
  await writeAll(file, testCases);

  return updated;
}

/** Usuwa test case. Zwraca false, jeśli nie znaleziono. */
export async function remove(file: string, id: string): Promise<boolean> {
  const testCases = await readAll(file);
  const filtered = testCases.filter((tc) => tc.id !== id);
  if (filtered.length === testCases.length) {
    return false;
  }

  await writeAll(file, filtered);
  return true;
}
