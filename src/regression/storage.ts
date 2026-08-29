import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import type { TestResult, TestStatus } from "./types.ts";

/** Mapa: id test case'a → jego ostatni zapisany wynik. */
type ResultsMap = Record<string, TestResult>;

/**
 * Wczytuje wszystkie wyniki z pliku.
 * Jeśli plik jeszcze nie istnieje — zwraca pustą mapę.
 */
export async function readResults(file: string): Promise<ResultsMap> {
  try {
    const content = await readFile(file, "utf8");
    const data = JSON.parse(content);
    return data && typeof data === "object" ? (data as ResultsMap) : {};
  } catch (err) {
    if (err instanceof Error && "code" in err && err.code === "ENOENT") {
      return {};
    }
    throw err;
  }
}

/** Zwraca wynik pojedynczego test case'a lub undefined, jeśli jeszcze nie testowano. */
export async function getResult(file: string, id: string): Promise<TestResult | undefined> {
  const results = await readResults(file);
  return results[id];
}

/** Zapisuje wynik test case'a (nadpisuje poprzedni) i zwraca zapisany wpis. */
export async function setResult(file: string, id: string, status: TestStatus): Promise<TestResult> {
  const result: TestResult = { status, updatedAt: new Date().toISOString() };

  const results = await readResults(file);
  results[id] = result;

  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, JSON.stringify(results, null, 2), "utf8");

  return result;
}

/** Usuwa wszystkie zapisane wyniki — test case'y wracają do statusu "untested". */
export async function clearResults(file: string): Promise<void> {
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, JSON.stringify({}, null, 2), "utf8");
}

/** Usuwa zapisany wynik pojedynczego test case'a (np. gdy sam test case zostaje skasowany). */
export async function deleteResult(file: string, id: string): Promise<void> {
  const results = await readResults(file);
  if (!(id in results)) {
    return;
  }
  delete results[id];

  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, JSON.stringify(results, null, 2), "utf8");
}
