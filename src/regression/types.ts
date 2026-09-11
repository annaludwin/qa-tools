export type Priority = "HIGH" | "MEDIUM" | "LOW";

export type TestStatus = "untested" | "pass" | "fail" | "not supported";

/** Który zestaw test case'ów: manualne czy zautomatyzowane (e2e). */
export type TestSuite = "manual" | "e2e";

export interface TestCase {
  id: string;
  /** Nazwa sekcji, do której należy test case (grupowanie na liście). */
  section: string;
  title: string;
  priority: Priority;
  platforms: string[];
  preconditions: string;
  steps: string[];
  expectedResult: string[];
  /** Czy test case został zautomatyzowany (e2e) — decyduje, w której zakładce się pojawia. */
  automated: boolean;
}

/** Zapisany wynik wykonania testu. */
export interface TestResult {
  status: TestStatus;
  /** Data zapisu w formacie ISO. */
  updatedAt: string;
}

/** Test case ze statusem — do listy po lewej stronie. */
export interface TestCaseSummary {
  id: string;
  section: string;
  title: string;
  status: TestStatus;
}

/** Pełny test case ze statusem — do podglądu po prawej stronie. */
export interface TestCaseDetail extends TestCase {
  status: TestStatus;
}

/** Liczba test case'ów w każdym statusie. */
export type StatusCounts = Record<TestStatus, number>;

/** Wynik jednego test case'a zapisany w raporcie. */
export interface ReportResultEntry {
  id: string;
  section: string;
  title: string;
  status: TestStatus;
}

/** Pełny raport: snapshot wyników wszystkich test case'ów danego suite'u w danym momencie. */
export interface Report {
  id: string;
  /** Data wygenerowania raportu w formacie ISO. */
  generatedAt: string;
  type: TestSuite;
  summary: StatusCounts;
  results: ReportResultEntry[];
}

/** Skrót raportu — na listę historii raportów (bez pełnych wyników). */
export interface ReportSummary {
  id: string;
  generatedAt: string;
  type: TestSuite;
  summary: StatusCounts;
}
