const cheerio = require("cheerio");
const fetch = require("node-fetch");
const { URL } = require("url");

const MAX_PAGES = 15;
const TIMEOUT_MS = 10000;

// Pages likely to contain compliance/security/privacy info
const PRIORITY_PATHS = [
  "/security",
  "/privacy",
  "/privacy-policy",
  "/terms",
  "/terms-of-service",
  "/compliance",
  "/trust",
  "/gdpr",
  "/about",
  "/about-us",
  "/legal",
  "/data-processing",
  "/subprocessors",
  "/soc2",
  "/hipaa",
];

async function fetchPage(url) {
  try {
    const res = await fetch(url, {
      timeout: TIMEOUT_MS,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; VendorComplianceBot/1.0; +compliance-review)",
      },
      redirect: "follow",
    });
    if (!res.ok) return null;
    const contentType = res.headers.get("content-type") || "";
    if (!contentType.includes("text/html")) return null;
    const html = await res.text();
    return html;
  } catch {
    return null;
  }
}

function extractText(html) {
  const $ = cheerio.load(html);
  // Remove noise
  $("script, style, nav, footer, header, iframe, noscript, svg").remove();
  const text = $("body").text().replace(/\s+/g, " ").trim();
  return text.slice(0, 15000); // cap per page
}

function extractLinks(html, baseUrl) {
  const $ = cheerio.load(html);
  const links = new Set();
  const base = new URL(baseUrl);
  $("a[href]").each((_, el) => {
    try {
      const href = $(el).attr("href");
      const resolved = new URL(href, baseUrl);
      if (resolved.hostname === base.hostname) {
        resolved.hash = "";
        resolved.search = "";
        links.add(resolved.href);
      }
    } catch {}
  });
  return [...links];
}

async function scrape(companyUrl) {
  // Normalize URL
  if (!companyUrl.startsWith("http")) companyUrl = "https://" + companyUrl;
  const base = new URL(companyUrl);
  const origin = base.origin;

  const visited = new Set();
  const pages = [];

  // 1. Fetch homepage first
  console.log(`  Fetching homepage: ${origin}`);
  const homeHtml = await fetchPage(origin);
  if (!homeHtml) {
    throw new Error(`Could not fetch homepage at ${origin}`);
  }
  visited.add(origin);
  visited.add(origin + "/");
  pages.push({ url: origin, text: extractText(homeHtml) });

  // 2. Discover links from homepage
  const discoveredLinks = extractLinks(homeHtml, origin);

  // 3. Build priority queue: priority paths first, then discovered links
  const queue = [];
  for (const path of PRIORITY_PATHS) {
    const url = origin + path;
    if (!visited.has(url)) queue.push(url);
  }
  for (const link of discoveredLinks) {
    if (!visited.has(link) && !queue.includes(link)) queue.push(link);
  }

  // 4. Fetch pages up to MAX_PAGES
  for (const url of queue) {
    if (pages.length >= MAX_PAGES) break;
    if (visited.has(url)) continue;
    visited.add(url);

    console.log(`  Fetching: ${url}`);
    const html = await fetchPage(url);
    if (!html) continue;

    const text = extractText(html);
    if (text.length < 50) continue; // skip empty pages
    pages.push({ url, text });
  }

  console.log(`  Scraped ${pages.length} pages from ${origin}`);
  return { origin, pages };
}

module.exports = { scrape };
