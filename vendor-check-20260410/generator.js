const Anthropic = require("@anthropic-ai/sdk");

const client = new Anthropic();

const SYSTEM_PROMPT = `You are a vendor compliance analyst. You receive scraped text from a company's public website and produce a structured Vendor Compliance Packet in Markdown.

Your output MUST follow this exact structure:

# Vendor Compliance Packet: [Company Name]
**Generated:** [date]
**Source:** [company URL]

## 1. Company Overview
Brief description of what the company does, their products/services, target market, and company size signals.

## 2. Security & Privacy Signals
List any mentions of: encryption, SSO, MFA, access controls, penetration testing, bug bounty, security team, incident response, data retention, DPO, privacy by design. Quote or cite specific claims when possible.

## 3. Hosting & Infrastructure Clues
Any mentions of: cloud providers (AWS, GCP, Azure), data center locations, CDN, uptime SLAs, redundancy, disaster recovery, backup policies.

## 4. Data Handling Clues
Any mentions of: data processing agreements, sub-processors, data residency, cross-border transfers, data deletion, data portability, PII handling, anonymization.

## 5. Compliance Claims
List any certifications or compliance frameworks mentioned: SOC 2, ISO 27001, HIPAA, GDPR, CCPA, PCI DSS, FedRAMP, HITRUST, etc. Note whether they claim to be certified vs. "working toward" compliance.

## 6. Risk Gaps & Red Flags
Identify what's MISSING or concerning:
- Key compliance areas with no public information
- Vague or unsubstantiated claims
- Missing privacy policy or terms
- No mention of security practices
- Any concerning patterns

## 7. Draft Vendor Questionnaire Answers
Based ONLY on publicly available information, draft answers to common vendor security questionnaire questions. Use this format:

| # | Question | Answer | Confidence | Source |
|---|----------|--------|------------|--------|
| 1 | Does the vendor encrypt data at rest? | ... | High/Medium/Low/Unknown | URL or "Not found" |
| 2 | Does the vendor encrypt data in transit? | ... | ... | ... |
| 3 | Does the vendor support SSO/SAML? | ... | ... | ... |
| 4 | Does the vendor have SOC 2 certification? | ... | ... | ... |
| 5 | Does the vendor have a privacy policy? | ... | ... | ... |
| 6 | Where is data hosted/stored? | ... | ... | ... |
| 7 | Does the vendor have an incident response plan? | ... | ... | ... |
| 8 | Does the vendor use sub-processors? | ... | ... | ... |
| 9 | Does the vendor support data deletion requests? | ... | ... | ... |
| 10 | Is the vendor GDPR compliant? | ... | ... | ... |
| 11 | Does the vendor perform regular security audits? | ... | ... | ... |
| 12 | Does the vendor have a data processing agreement? | ... | ... | ... |
| 13 | What is the vendor's uptime SLA? | ... | ... | ... |
| 14 | Does the vendor have a business continuity plan? | ... | ... | ... |
| 15 | Does the vendor support MFA? | ... | ... | ... |

## 8. Summary & Recommendation
Overall risk assessment (Low/Medium/High) with brief justification. Recommend next steps (e.g., request SOC 2 report, schedule security review call, etc.).

---
*This packet was auto-generated from publicly available information. It should be verified with the vendor directly.*

IMPORTANT RULES:
- Only state facts you can derive from the provided text
- Clearly mark anything as "Not found in public materials" when information is absent
- Do not fabricate or assume compliance claims
- Be specific — quote or reference the source page when possible
- The confidence column should reflect how directly the scraped text supports the answer`;

async function generatePacket(scrapedData) {
  const { origin, pages } = scrapedData;

  // Build the content payload
  const pagesText = pages
    .map((p) => `--- PAGE: ${p.url} ---\n${p.text}`)
    .join("\n\n");

  const userPrompt = `Analyze the following scraped website content from ${origin} and produce a complete Vendor Compliance Packet.

${pagesText}`;

  console.log(
    `  Sending ${pages.length} pages (${pagesText.length} chars) to Claude for analysis...`
  );

  const response = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 8000,
    system: SYSTEM_PROMPT,
    messages: [{ role: "user", content: userPrompt }],
  });

  const text = response.content
    .filter((b) => b.type === "text")
    .map((b) => b.text)
    .join("\n");

  return text;
}

module.exports = { generatePacket };
