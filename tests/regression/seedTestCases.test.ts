import { test } from "node:test";
import assert from "node:assert/strict";
import { seedTestCases } from "../../src/regression/seedTestCases.ts";

const VALID_PRIORITIES = new Set(["HIGH", "MEDIUM", "LOW"]);

test("seedTestCases: lista nie jest pusta", () => {
  assert.ok(seedTestCases.length > 0);
});

test("seedTestCases: id są unikalne", () => {
  const ids = seedTestCases.map((tc) => tc.id);
  assert.equal(new Set(ids).size, ids.length);
});

test("seedTestCases: każdy wpis ma wymagane pola", () => {
  for (const tc of seedTestCases) {
    assert.ok(VALID_PRIORITIES.has(tc.priority), `${tc.id}: nieprawidłowy priorytet "${tc.priority}"`);
    assert.ok(tc.section.length > 0, `${tc.id}: brak sekcji`);
    assert.ok(tc.platforms.length > 0, `${tc.id}: brak platform`);
    assert.ok(tc.preconditions.length > 0, `${tc.id}: brak preconditions`);
    assert.ok(tc.steps.length > 0, `${tc.id}: brak steps`);
    assert.ok(tc.expectedResult.length > 0, `${tc.id}: brak expectedResult`);
  }
});
