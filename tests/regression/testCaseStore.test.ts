import { test } from "node:test";
import assert from "node:assert/strict";
import { tmpdir } from "node:os";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { rm } from "node:fs/promises";
import { readAll, getById, create, update, remove } from "../../src/regression/testCaseStore.ts";
import { seedTestCases } from "../../src/regression/seedTestCases.ts";
import type { TestCaseInput } from "../../src/regression/testCaseStore.ts";

function tempFile(): string {
  return path.join(tmpdir(), `regression-testcases-${randomUUID()}.json`);
}

function fakeInput(overrides: Partial<TestCaseInput> = {}): TestCaseInput {
  return {
    section: "99. NEW SECTION",
    title: "A brand new test case",
    priority: "MEDIUM",
    platforms: ["Desktop"],
    preconditions: "User is logged in",
    steps: ["Do the thing"],
    expectedResult: ["The thing happens"],
    ...overrides,
  };
}

test("readAll: nieistniejący plik → zasila go seedem i zwraca go", async () => {
  const file = tempFile();
  try {
    const testCases = await readAll(file);
    assert.equal(testCases.length, seedTestCases.length);

    // drugie wczytanie czyta już zapisany plik, a nie seeduje ponownie
    const again = await readAll(file);
    assert.equal(again.length, seedTestCases.length);
  } finally {
    await rm(file, { force: true });
  }
});

test("create: dodaje test case z nowym id", async () => {
  const file = tempFile();
  try {
    const created = await create(file, fakeInput());
    assert.ok(created.id);
    assert.equal(created.title, "A brand new test case");

    const testCases = await readAll(file);
    assert.equal(testCases.length, seedTestCases.length + 1);
  } finally {
    await rm(file, { force: true });
  }
});

test("getById: znajduje po id oraz zwraca undefined dla nieznanego id", async () => {
  const file = tempFile();
  try {
    const created = await create(file, fakeInput());
    const found = await getById(file, created.id);
    assert.equal(found?.id, created.id);
    assert.equal(await getById(file, "nie-istnieje"), undefined);
  } finally {
    await rm(file, { force: true });
  }
});

test("update: nadpisuje dane istniejącego test case'a, zachowując id", async () => {
  const file = tempFile();
  try {
    const created = await create(file, fakeInput());
    const updated = await update(file, created.id, fakeInput({ title: "Updated title", priority: "HIGH" }));

    assert.equal(updated?.id, created.id);
    assert.equal(updated?.title, "Updated title");
    assert.equal(updated?.priority, "HIGH");

    const found = await getById(file, created.id);
    assert.equal(found?.title, "Updated title");
  } finally {
    await rm(file, { force: true });
  }
});

test("update: zwraca undefined dla nieznanego id i niczego nie zmienia", async () => {
  const file = tempFile();
  try {
    const before = await readAll(file);
    const result = await update(file, "nie-istnieje", fakeInput());
    assert.equal(result, undefined);

    const after = await readAll(file);
    assert.equal(after.length, before.length);
  } finally {
    await rm(file, { force: true });
  }
});

test("remove: usuwa test case i zwraca true", async () => {
  const file = tempFile();
  try {
    const created = await create(file, fakeInput());
    const removed = await remove(file, created.id);
    assert.equal(removed, true);
    assert.equal(await getById(file, created.id), undefined);
  } finally {
    await rm(file, { force: true });
  }
});

test("remove: zwraca false dla nieznanego id", async () => {
  const file = tempFile();
  try {
    await readAll(file); // zainicjuj plik (seed)
    const removed = await remove(file, "nie-istnieje");
    assert.equal(removed, false);
  } finally {
    await rm(file, { force: true });
  }
});
