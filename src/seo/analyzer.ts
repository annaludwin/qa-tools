import * as cheerio from "cheerio";
import type { Check, Heading, SeoReport } from "./types.ts";

// ── Progi SEO (wg powszechnie przyjętych dobrych praktyk) ──────────────────
// Trzymamy je jako stałe na górze, żeby łatwo było je zmienić w jednym miejscu.
const TITLE_MIN = 30;
const TITLE_MAX = 60;
const DESC_MIN = 50;
const DESC_MAX = 160;

/**
 * Typ pojedynczego sprawdzenia: dostaje sparsowany dokument (Cheerio),
 * zwraca wynik jako obiekt Check.
 */
type CheckFn = ($: cheerio.CheerioAPI) => Check;

// ── Poszczególne sprawdzenia ────────────────────────────────────────────────
// Każde to mała, samodzielna funkcja. Żeby dodać nowe sprawdzenie:
//   1. napisz funkcję poniżej,
//   2. dopisz jej nazwę do listy CHECKS na dole.

/** 1. Page title — presence and length. */
function checkTitle($: cheerio.CheerioAPI): Check {
  const label = "Page title (<title>)";
  const title = $("head > title").first().text().trim();
  if (!title) {
    return { id: "title", label, status: "error", message: "Missing <title> tag. It's one of the most important SEO elements." };
  }
  if (title.length < TITLE_MIN || title.length > TITLE_MAX) {
    return { id: "title", label, status: "warning", value: title, message: `Title is ${title.length} characters. Recommended ${TITLE_MIN}–${TITLE_MAX}.` };
  }
  return { id: "title", label, status: "ok", value: title, message: `Title is ${title.length} characters — within the recommended range.` };
}

/** 2. Meta description — presence and length. */
function checkDescription($: cheerio.CheerioAPI): Check {
  const label = "Meta description";
  const desc = $('meta[name="description"]').attr("content")?.trim() ?? "";
  if (!desc) {
    return { id: "description", label, status: "error", message: "Missing meta description. It affects what's shown in search results." };
  }
  if (desc.length < DESC_MIN || desc.length > DESC_MAX) {
    return { id: "description", label, status: "warning", value: desc, message: `Description is ${desc.length} characters. Recommended ${DESC_MIN}–${DESC_MAX}.` };
  }
  return { id: "description", label, status: "ok", value: desc, message: `Description is ${desc.length} characters — within the recommended range.` };
}

/** 3. H1 heading — there should be exactly one. */
function checkH1($: cheerio.CheerioAPI): Check {
  const label = "H1 heading";
  const h1s = $("h1");
  if (h1s.length === 0) {
    return { id: "h1", label, status: "error", message: "Missing H1 heading. The page should have exactly one." };
  }
  if (h1s.length > 1) {
    return { id: "h1", label, status: "warning", value: h1s.first().text().trim(), message: `Found ${h1s.length} H1 headings. Exactly one is recommended.` };
  }
  return { id: "h1", label, status: "ok", value: h1s.first().text().trim(), message: "Exactly one H1 heading — perfect." };
}

/** 4. Images without an alt attribute. */
function checkImgAlt($: cheerio.CheerioAPI): Check {
  const label = "Image alt attributes";
  const images = $("img");
  const withoutAlt = images.filter((_, el) => {
    const alt = $(el).attr("alt");
    return alt === undefined || alt.trim() === "";
  });
  if (images.length === 0) {
    return { id: "img-alt", label, status: "ok", message: "No images on the page." };
  }
  if (withoutAlt.length > 0) {
    return { id: "img-alt", label, status: "warning", message: `${withoutAlt.length} of ${images.length} images have no alt text (important for accessibility and SEO).` };
  }
  return { id: "img-alt", label, status: "ok", message: `All ${images.length} images have alt text.` };
}

/** 5. Canonical link — helps avoid duplicate content. */
function checkCanonical($: cheerio.CheerioAPI): Check {
  const label = "Canonical link";
  const canonical = $('link[rel="canonical"]').attr("href")?.trim() ?? "";
  if (canonical) {
    return { id: "canonical", label, status: "ok", value: canonical, message: "Canonical link is set (helps avoid duplicate content)." };
  }
  return { id: "canonical", label, status: "warning", message: "Missing canonical link. May lead to duplicate content issues." };
}

/** 6. Meta robots — warn on noindex. */
function checkRobots($: cheerio.CheerioAPI): Check {
  const label = "Meta robots";
  const robots = $('meta[name="robots"]').attr("content")?.trim().toLowerCase() ?? "";
  if (robots.includes("noindex")) {
    return { id: "robots", label, status: "warning", value: robots, message: 'The page has "noindex" — it won\'t be indexed. Make sure that\'s intentional!' };
  }
  return {
    id: "robots", label, status: "ok", value: robots || undefined,
    message: robots ? `Meta robots: "${robots}" — the page can be indexed.` : "No meta robots tag — the page can be indexed by default.",
  };
}

/** 7. lang attribute on <html>. */
function checkLang($: cheerio.CheerioAPI): Check {
  const label = "Page language (html lang)";
  const lang = $("html").attr("lang")?.trim() ?? "";
  if (lang) {
    return { id: "lang", label, status: "ok", value: lang, message: `Page language is set: "${lang}".` };
  }
  return { id: "lang", label, status: "warning", message: "Missing lang attribute on <html>. Important for accessibility and SEO." };
}

/** 8. Viewport — responsiveness / mobile. */
function checkViewport($: cheerio.CheerioAPI): Check {
  const label = "Viewport (mobile)";
  const viewport = $('meta[name="viewport"]').attr("content")?.trim() ?? "";
  if (viewport) {
    return { id: "viewport", label, status: "ok", value: viewport, message: "Meta viewport is set — the page is adapted for mobile devices." };
  }
  return { id: "viewport", label, status: "warning", message: "Missing meta viewport. Google favors mobile-first pages." };
}

/** 9. Character encoding (charset). */
function checkCharset($: cheerio.CheerioAPI): Check {
  const label = "Character encoding";
  const charset =
    $("meta[charset]").attr("charset")?.trim() ||
    $('meta[http-equiv="Content-Type"]').attr("content")?.trim() ||
    "";
  if (charset) {
    return { id: "charset", label, status: "ok", value: charset, message: `Declared encoding: "${charset}".` };
  }
  return { id: "charset", label, status: "warning", message: 'Missing character encoding declaration (e.g. <meta charset="utf-8">).' };
}

/** 10. Open Graph — preview when shared on social media. */
function checkOpenGraph($: cheerio.CheerioAPI): Check {
  const label = "Open Graph (social media)";
  const ogTitle = $('meta[property="og:title"]').attr("content")?.trim() ?? "";
  const ogDesc = $('meta[property="og:description"]').attr("content")?.trim() ?? "";
  const ogImage = $('meta[property="og:image"]').attr("content")?.trim() ?? "";
  const count = [ogTitle, ogDesc, ogImage].filter(Boolean).length;
  if (count === 3) {
    return { id: "open-graph", label, status: "ok", message: "All of og:title, og:description and og:image are present." };
  }
  if (count === 0) {
    return { id: "open-graph", label, status: "warning", message: "Missing Open Graph tags. Links will look bad when shared." };
  }
  const missing = [!ogTitle && "og:title", !ogDesc && "og:description", !ogImage && "og:image"].filter(Boolean).join(", ");
  return { id: "open-graph", label, status: "warning", message: `Incomplete Open Graph tags (${count}/3). Missing: ${missing}.` };
}

/** 11. JSON-LD structured data. */
function checkStructuredData($: cheerio.CheerioAPI): Check {
  const label = "Structured data (JSON-LD)";
  const jsonLd = $('script[type="application/ld+json"]');
  if (jsonLd.length > 0) {
    return { id: "structured-data", label, status: "ok", message: `Found ${jsonLd.length} structured data block(s).` };
  }
  return { id: "structured-data", label, status: "warning", message: "Missing JSON-LD structured data (can give richer results in Google)." };
}

// ── Lista wszystkich sprawdzeń ────────────────────────────────────────────────
// TU dopisujesz nowe sprawdzenia w przyszłości.
// (Sprawdzenie #12 — kod HTTP i czas ładowania — nie zależy od HTML,
//  więc dokładamy je w buildReport na podstawie danych sieciowych.)
const CHECKS: CheckFn[] = [
  checkTitle,
  checkDescription,
  checkH1,
  checkImgAlt,
  checkCanonical,
  checkRobots,
  checkLang,
  checkViewport,
  checkCharset,
  checkOpenGraph,
  checkStructuredData,
];

/**
 * Analizuje surowy HTML strony i zwraca listę sprawdzeń SEO.
 *
 * To czysta funkcja: te same dane wejściowe = ten sam wynik.
 * Dzięki temu można ją testować bez serwera i bez internetu.
 */
export function analyzeHtml(html: string): Check[] {
  const $ = cheerio.load(html);
  return CHECKS.map((check) => check($));
}

/**
 * Wyciąga wszystkie nagłówki H1–H6 w kolejności ich występowania na stronie.
 * Czysta funkcja — łatwa do przetestowania.
 */
export function extractHeadings(html: string): Heading[] {
  const $ = cheerio.load(html);
  const headings: Heading[] = [];
  $("h1, h2, h3, h4, h5, h6").each((_, el) => {
    if (!("tagName" in el)) return;
    // np. "h2" -> 2
    const level = Number(String(el.tagName).replace(/[^0-9]/g, ""));
    // Zbijamy wielokrotne białe znaki do pojedynczych spacji.
    const text = $(el).text().trim().replace(/\s+/g, " ");
    headings.push({ level, text });
  });
  return headings;
}

/**
 * Wylicza wynik 0–100 na podstawie sprawdzeń.
 * ok = 1 pkt, warning = 0.5 pkt, error = 0 pkt.
 */
export function calculateScore(checks: Check[]): number {
  if (checks.length === 0) return 0;
  const points = checks.reduce((sum, c) => {
    if (c.status === "ok") return sum + 1;
    if (c.status === "warning") return sum + 0.5;
    return sum;
  }, 0);
  return Math.round((points / checks.length) * 100);
}

/** Składa kompletny raport z danych sieciowych i wyniku analizy HTML. */
export function buildReport(params: {
  url: string;
  statusCode: number;
  responseTimeMs: number;
  html: string;
}): SeoReport {
  const checks = analyzeHtml(params.html);
  return {
    url: params.url,
    statusCode: params.statusCode,
    responseTimeMs: params.responseTimeMs,
    score: calculateScore(checks),
    checks,
    headings: extractHeadings(params.html),
  };
}
