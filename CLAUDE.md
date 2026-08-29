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
