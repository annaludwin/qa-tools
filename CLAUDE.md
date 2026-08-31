# CLAUDE.md — wskazówki dla Claude Code

## Projekt
**QA Tools** — hub z narzędziami web dla QA, jeden serwer Express, jeden port.
Ekran startowy (`public/index.html`) prowadzi do dwóch narzędzi:
- **SEO Analyzer** (`src/seo/`, `public/seo/`) — analiza SEO strony po URL.
- **Regression Test Suite** (`src/regression/`, `public/regression/`) —
  zarządzanie test case'ami regresji, wyniki, raporty.

Backend: Node + Express (TypeScript, uruchamiany natywnie przez Node).
Frontend: czysty HTML/CSS/JS w `public/`, bez frameworka/buildu.

API obu narzędzi żyje pod wspólnym serwerem, rozdzielone prefiksami:
`/api/seo/*` i `/api/regression/*`.

Aplikacja Express jest zbudowana w `src/app.ts` (eksportuje `app`, bez
`app.listen`) — `src/server.ts` to cienki wrapper do lokalnego/Render-owego
uruchamiania, a `api/index.ts` to wejście dla Vercel (deploy jako Function).
Zmiany w routingu/logice rób w `app.ts`, nie duplikuj w obu miejscach
uruchamiania.

### Dane — Postgres (Supabase), nie pliki
Wszystkie dane (historia SEO, test case'y, wyniki, raporty) trzymane są w
jednej bazie Postgres (connection string w `DATABASE_URL`, plik `.env`,
gitignored) — **lokalnie i na produkcji to ta sama baza**. Tabele tworzą się
same przy starcie (`src/db.ts: initSchema()`). Testy jednostkowe też łączą
się z tą bazą (patrz `tests/register.ts`) — pisz je tak, by dotykały tylko
własnych, unikalnie oznaczonych wierszy i sprzątały po sobie; nigdy nie
testuj operacji czyszczących całą tabelę (np. `clearResults()`) na współnej
bazie.

## Zasady współpracy

### Commity — PYTAJ po każdej większej zmianie
Po każdej **ważnej, większej zmianie** (np. nowa funkcja, istotna przebudowa,
poprawka wpływająca na działanie) **zapytaj użytkownika, czy zrobić commit.**
Nigdy nie commituj automatycznie ani „przy okazji" — czekaj na wyraźną zgodę.
Drobne, robocze zmiany nie wymagają pytania za każdym razem.

**Opisy commitów pisz po angielsku.**

### Najpierw plan, potem kod
Przy większych funkcjach najpierw omów plan i poczekaj na akceptację, dopiero
potem koduj. Tłumacz decyzje prosto (użytkownik zna podstawy TS/JS).

### Język
Komunikuj się po polsku. Wszystkie teksty w UI aplikacji — po angielsku.

### Testy
Projekt jest rozwijany przez QA — dbaj o testy. Logikę trzymaj w czystych,
testowalnych funkcjach.

## Przydatne komendy
```bash
npm start        # uruchom serwer (http://localhost:3000)
npm run dev      # serwer w trybie watch (auto-restart po zmianie w src/)
npm test         # testy jednostkowe (node --test)
npm run typecheck # sprawdzenie typów TypeScript
```
