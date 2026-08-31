import { test } from "node:test";
import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { getResult, setResult, deleteResult } from "../../src/regression/storage.ts";
import { getPool } from "../../src/db.ts";

// Unikalne id na test, żeby wpisy różnych testów (na współdzielonej bazie) się nie mylily.
function fakeId(): string {
  return `test-${randomUUID()}`;
}

async function cleanup(...ids: string[]): Promise<void> {
  await getPool().query("DELETE FROM regression_results WHERE test_case_id = ANY($1)", [ids]);
}

test("getResult: brak wpisu → undefined", async () => {
  assert.equal(await getResult(fakeId()), undefined);
});

test("setResult: zapisuje status i datę", async () => {
  const id = fakeId();
  try {
    const result = await setResult(id, "pass");
    assert.equal(result.status, "pass");
    assert.ok(result.updatedAt, "wynik powinien mieć datę");

    const found = await getResult(id);
    assert.equal(found?.status, "pass");
  } finally {
    await cleanup(id);
  }
});

test("setResult: nadpisuje poprzedni wynik tego samego test case'a", async () => {
  const id = fakeId();
  try {
    await setResult(id, "fail");
    await setResult(id, "pass");

    const found = await getResult(id);
    assert.equal(found?.status, "pass");
  } finally {
    await cleanup(id);
  }
});

test("setResult: wyniki różnych test case'ów nie nadpisują się nawzajem", async () => {
  const id1 = fakeId();
  const id2 = fakeId();
  try {
    await setResult(id1, "pass");
    await setResult(id2, "not supported");

    assert.equal((await getResult(id1))?.status, "pass");
    assert.equal((await getResult(id2))?.status, "not supported");
  } finally {
    await cleanup(id1, id2);
  }
});

test("deleteResult: usuwa wynik jednego test case'a, nie ruszając innych", async () => {
  const id1 = fakeId();
  const id2 = fakeId();
  try {
    await setResult(id1, "pass");
    await setResult(id2, "fail");

    await deleteResult(id1);

    assert.equal(await getResult(id1), undefined);
    assert.equal((await getResult(id2))?.status, "fail");
  } finally {
    await cleanup(id1, id2);
  }
});

test("deleteResult: działa nawet jeśli wpis nie istniał", async () => {
  await deleteResult(fakeId());
});

// clearResults() celowo NIE jest tu testowane: czyści całą tabelę
// regression_results, a testy działają na tej samej bazie co produkcja
// (patrz README) — test wywołujący ją skasowałby prawdziwe wyniki.
