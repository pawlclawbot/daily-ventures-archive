#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { scrape } = require("./scraper");
const { generatePacket } = require("./generator");
const { generatePacketLocal } = require("./generator-local");

async function main() {
  const url = process.argv[2];
  if (!url) {
    console.error("Usage: node index.js <company-url>");
    console.error("Example: node index.js https://stripe.com");
    process.exit(1);
  }

  const outDir = process.argv[3] || "./output";
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  // Derive a filename from the domain
  const domain = url.replace(/^https?:\/\//, "").replace(/[^a-zA-Z0-9.-]/g, "_");
  const timestamp = new Date().toISOString().slice(0, 10);
  const outFile = path.join(outDir, `${domain}-compliance-packet-${timestamp}.md`);

  console.log(`\n=== Vendor Compliance Packet Builder ===`);
  console.log(`Target: ${url}`);
  console.log(`Output: ${outFile}\n`);

  // Step 1: Scrape
  console.log("[1/2] Scraping public pages...");
  const scrapedData = await scrape(url);

  // Step 2: Generate
  console.log("\n[2/2] Generating compliance packet...");
  const packet = process.env.ANTHROPIC_API_KEY
    ? await generatePacket(scrapedData)
    : generatePacketLocal(scrapedData);

  // Write output
  fs.writeFileSync(outFile, packet, "utf-8");
  console.log(`\nDone! Compliance packet saved to: ${outFile}`);

  return outFile;
}

main().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
