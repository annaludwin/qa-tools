import { test } from "node:test";
import assert from "node:assert/strict";
import { tmpdir } from "node:os";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { rm } from "node:fs/promises";
import { readResults, getResult, setResult, clearResults, deleteResult } from "../../src/regression/storage.ts";

function tempFile(): string {
  return path.join(tmpdir(), `regression-results-${randomUUID()}.json`);
}

test("readResults: nieistniejący plik → pusta mapa", async () => {
  const file = tempFile();
  assert.deepEqual(await readResults(file), {});
});

test("getResult: brak wpisu → undefined", async () => {
  const file = tempFile();
  assert.equal(await getResult(file, "tc-1"), undefined);
});

test("setResult: zapisuje status i datę", async () => {
  const file = tempFile();
  try {
    const result = await setResult(file, "tc-1", "pass");
    assert.equal(result.status, "pass");
    assert.ok(result.updatedAt, "wynik powinien mieć datę");

    const found = await getResult(file, "tc-1");
    assert.equal(found?.status, "pass");
  } finally {
    await rm(file, { force: true });
  }
});

test("setResult: nadpisuje poprzedni wynik tego samego test case'a", async () => {
  const file = tempFile();
  try {
    await setResult(file, "tc-1", "fail");
    await setResult(file, "tc-1", "pass");

    const results = await readResults(file);
    assert.equal(Object.keys(results).length, 1);
    assert.equal(results["tc-1"].status, "pass");
  } finally {
    await rm(file, { force: true });
  }
});

test("setResult: wyniki różnych test case'ów nie nadpisują się nawzajem", async () => {
  const file = tempFile();
  try {
    await setResult(file, "tc-1", "pass");
    await setResult(file, "tc-2", "not supported");

    const results = await readResults(file);
    assert.equal(results["tc-1"].status, "pass");
    assert.equal(results["tc-2"].status, "not supported");
  } finally {
    await rm(file, { force: true });
  }
});

test("clearResults: usuwa wszystkie zapisane wyniki", async () => {
  const file = tempFile();
  try {
    await setResult(file, "tc-1", "pass");
    await setResult(file, "tc-2", "fail");

    await clearResults(file);

    assert.deepEqual(await readResults(file), {});
    assert.equal(await getResult(file, "tc-1"), undefined);
  } finally {
    await rm(file, { force: true });
  }
});

test("clearResults: działa nawet jeśli plik jeszcze nie istniał", async () => {
  const file = tempFile();
  try {
    await clearResults(file);
    assert.deepEqual(await readResults(file), {});
  } finally {
    await rm(file, { force: true });
  }
});

test("deleteResult: usuwa wynik jednego test case'a, nie ruszając innych", async () => {
  const file = tempFile();
  try {
    await setResult(file, "tc-1", "pass");
    await setResult(file, "tc-2", "fail");

    await deleteResult(file, "tc-1");

    assert.equal(await getResult(file, "tc-1"), undefined);
    assert.equal((await getResult(file, "tc-2"))?.status, "fail");
  } finally {
    await rm(file, { force: true });
  }
});

test("deleteResult: działa nawet jeśli wpis nie istniał", async () => {
  const file = tempFile();
  try {
    await deleteResult(file, "nie-istnieje");
    assert.deepEqual(await readResults(file), {});
  } finally {
    await rm(file, { force: true });
  }
});
