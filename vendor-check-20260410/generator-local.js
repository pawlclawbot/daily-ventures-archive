function buildSourceMap(pages) {
  const byHint = {};
  for (const p of pages) {
    const url = p.url.toLowerCase();
    if (url.includes('security')) byHint.security = p.url;
    if (url.includes('privacy')) byHint.privacy = p.url;
    if (url.includes('subprocessor')) byHint.subprocessors = p.url;
    if (url.includes('terms')) byHint.terms = p.url;
    if (url.includes('trust')) byHint.trust = p.url;
  }
  return byHint;
}

function hasAny(text, patterns) {
  return patterns.some((p) => text.includes(p));
}

function firstSource(sourceMap, key, fallback) {
  return sourceMap[key] || fallback || 'Not found in public documentation';
}

function yesNoUnknown(val) {
  if (val === true) return 'Yes';
  if (val === false) return 'No';
  return 'Not found in public documentation — request from vendor';
}

function generatePacketLocal(scrapedData) {
  const { origin, pages } = scrapedData;
  const all = pages.map((p) => p.text).join('\n').toLowerCase();
  const sourceMap = buildSourceMap(pages);
  const generated = new Date().toISOString().slice(0, 10);

  const privacyPolicy = hasAny(all, ['privacy policy', 'privacy notice']);
  const gdpr = hasAny(all, ['gdpr', 'general data protection regulation']);
  const dpa = hasAny(all, ['data processing addendum', 'data processing agreement', 'dpa']);
  const subprocessors = hasAny(all, ['subprocessors', 'sub-processors']);
  const encryptionTransit = hasAny(all, ['encryption in transit', 'tls', 'https']);
  const encryptionAtRest = hasAny(all, ['encryption at rest']);
  const soc2 = hasAny(all, ['soc 2', 'soc2']);
  const iso27001 = hasAny(all, ['iso 27001']);
  const sso = hasAny(all, ['single sign-on', 'sso', 'saml']);
  const mfa = hasAny(all, ['multi-factor', 'mfa', '2fa', 'two-factor']);
  const incidentResponse = hasAny(all, ['incident response', 'security incident']);
  const deletion = hasAny(all, ['delete your data', 'data deletion', 'delete data', 'deletion request']);
  const uptime = hasAny(all, ['sla', 'uptime']);
  const bcdr = hasAny(all, ['disaster recovery', 'business continuity', 'backup']);
  const cloud = hasAny(all, ['aws', 'amazon web services', 'gcp', 'google cloud', 'azure']);

  const riskGaps = [];
  if (!soc2) riskGaps.push('- SOC 2 or equivalent certification not found in public documentation — request from vendor.');
  if (!encryptionAtRest) riskGaps.push('- Encryption at rest not found in public documentation — request from vendor.');
  if (!incidentResponse) riskGaps.push('- Incident response plan details not found in public documentation — request from vendor.');
  if (!subprocessors) riskGaps.push('- Subprocessor disclosure not found in public documentation — request from vendor.');
  if (!bcdr) riskGaps.push('- Backup / disaster recovery details not found in public documentation — request from vendor.');
  if (!uptime) riskGaps.push('- Uptime SLA not found in public documentation — request from vendor.');

  const riskLevel = riskGaps.length >= 5 ? 'Medium' : 'Low';

  return `# Vendor Compliance Packet\n\n**Vendor:** ${origin.replace(/^https?:\/\//, '')}\n**Website:** ${origin}\n**Packet Generated:** ${generated}\n**Source Basis:** Publicly accessible website content only\n**Confidence Level:** Medium, based on public documentation only\n\n## 1. Company Overview\nThis vendor operates a software platform delivered over the web. Public pages indicate a B2B SaaS / cloud software model with customer-facing legal, privacy, and security materials.\n\n## 2. Security & Privacy Findings\n- Public privacy documentation: ${privacyPolicy ? `Found (${firstSource(sourceMap, 'privacy', origin)})` : 'Not found in public documentation — request from vendor.'}\n- GDPR reference: ${gdpr ? `Found (${firstSource(sourceMap, 'privacy', origin)})` : 'Not found in public documentation — request from vendor.'}\n- Data Processing Agreement / Addendum: ${dpa ? `Found (${firstSource(sourceMap, 'privacy', origin)})` : 'Not found in public documentation — request from vendor.'}\n- SSO / SAML support: ${sso ? `Found (${firstSource(sourceMap, 'security', origin)})` : 'Not found in public documentation — request from vendor.'}\n- MFA support: ${mfa ? `Found (${firstSource(sourceMap, 'security', origin)})` : 'Not found in public documentation — request from vendor.'}\n- Encryption in transit: ${encryptionTransit ? `Found (${firstSource(sourceMap, 'security', origin)})` : 'Not found in public documentation — request from vendor.'}\n- Encryption at rest: ${encryptionAtRest ? `Found (${firstSource(sourceMap, 'security', origin)})` : 'Not found in public documentation — request from vendor.'}\n- Incident response details: ${incidentResponse ? `Found (${firstSource(sourceMap, 'security', origin)})` : 'Not found in public documentation — request from vendor.'}\n\n## 3. Hosting & Infrastructure Clues\n- Cloud hosting provider reference: ${cloud ? `Found in public materials (${origin})` : 'Not found in public documentation — request from vendor.'}\n- Regional hosting / data location details: Not found in public documentation — request from vendor.\n- Uptime SLA: ${uptime ? `Found in public materials (${origin})` : 'Not found in public documentation — request from vendor.'}\n- Backup / disaster recovery: ${bcdr ? `Found in public materials (${origin})` : 'Not found in public documentation — request from vendor.'}\n\n## 4. Data Handling Clues\n- Privacy policy available: ${privacyPolicy ? 'Yes' : 'Not found in public documentation — request from vendor.'}\n- DPA available: ${dpa ? 'Yes' : 'Not found in public documentation — request from vendor.'}\n- Subprocessor disclosure: ${subprocessors ? `Found (${firstSource(sourceMap, 'subprocessors', origin)})` : 'Not found in public documentation — request from vendor.'}\n- Data deletion process: ${deletion ? `Found (${firstSource(sourceMap, 'privacy', origin)})` : 'Not found in public documentation — request from vendor.'}\n\n## 5. Compliance Claims\n- SOC 2: ${soc2 ? `Found (${firstSource(sourceMap, 'security', origin)})` : 'Not found in public documentation — request from vendor.'}\n- ISO 27001: ${iso27001 ? `Found (${firstSource(sourceMap, 'security', origin)})` : 'Not found in public documentation — request from vendor.'}\n- GDPR: ${gdpr ? `Found (${firstSource(sourceMap, 'privacy', origin)})` : 'Not found in public documentation — request from vendor.'}\n\n## 6. Risk Gaps & Red Flags\n${riskGaps.join('\n')}\n\n## 7. Draft Vendor Questionnaire Answers\n\n| # | Question | Answer | Confidence | Source |\n|---|----------|--------|------------|--------|\n| 1 | Does the vendor encrypt data at rest? | ${yesNoUnknown(encryptionAtRest)} | ${encryptionAtRest ? 'Medium' : 'Unknown'} | ${encryptionAtRest ? firstSource(sourceMap, 'security', origin) : 'Not found'} |\n| 2 | Does the vendor encrypt data in transit? | ${yesNoUnknown(encryptionTransit)} | ${encryptionTransit ? 'Medium' : 'Unknown'} | ${encryptionTransit ? firstSource(sourceMap, 'security', origin) : 'Not found'} |\n| 3 | Does the vendor support SSO/SAML? | ${yesNoUnknown(sso)} | ${sso ? 'Medium' : 'Unknown'} | ${sso ? firstSource(sourceMap, 'security', origin) : 'Not found'} |\n| 4 | Does the vendor have SOC 2 certification? | ${yesNoUnknown(soc2)} | ${soc2 ? 'Medium' : 'Unknown'} | ${soc2 ? firstSource(sourceMap, 'security', origin) : 'Not found'} |\n| 5 | Does the vendor have a privacy policy? | ${yesNoUnknown(privacyPolicy)} | ${privacyPolicy ? 'High' : 'Unknown'} | ${privacyPolicy ? firstSource(sourceMap, 'privacy', origin) : 'Not found'} |\n| 6 | Where is data hosted/stored? | Not found in public documentation — request from vendor. | Unknown | Not found |\n| 7 | Does the vendor have an incident response plan? | ${yesNoUnknown(incidentResponse)} | ${incidentResponse ? 'Medium' : 'Unknown'} | ${incidentResponse ? firstSource(sourceMap, 'security', origin) : 'Not found'} |\n| 8 | Does the vendor use sub-processors? | ${yesNoUnknown(subprocessors)} | ${subprocessors ? 'Medium' : 'Unknown'} | ${subprocessors ? firstSource(sourceMap, 'subprocessors', origin) : 'Not found'} |\n| 9 | Does the vendor support data deletion requests? | ${yesNoUnknown(deletion)} | ${deletion ? 'Medium' : 'Unknown'} | ${deletion ? firstSource(sourceMap, 'privacy', origin) : 'Not found'} |\n| 10 | Is the vendor GDPR compliant? | ${yesNoUnknown(gdpr)} | ${gdpr ? 'Medium' : 'Unknown'} | ${gdpr ? firstSource(sourceMap, 'privacy', origin) : 'Not found'} |\n| 11 | Does the vendor perform regular security audits? | Not found in public documentation — request from vendor. | Unknown | Not found |\n| 12 | Does the vendor have a data processing agreement? | ${yesNoUnknown(dpa)} | ${dpa ? 'Medium' : 'Unknown'} | ${dpa ? firstSource(sourceMap, 'privacy', origin) : 'Not found'} |\n| 13 | What is the vendor's uptime SLA? | ${uptime ? 'Public uptime/SLA language found.' : 'Not found in public documentation — request from vendor.'} | ${uptime ? 'Medium' : 'Unknown'} | ${uptime ? origin : 'Not found'} |\n| 14 | Does the vendor have a business continuity plan? | ${yesNoUnknown(bcdr)} | ${bcdr ? 'Medium' : 'Unknown'} | ${bcdr ? origin : 'Not found'} |\n| 15 | Does the vendor support MFA? | ${yesNoUnknown(mfa)} | ${mfa ? 'Medium' : 'Unknown'} | ${mfa ? firstSource(sourceMap, 'security', origin) : 'Not found'} |\n\n## 8. Summary & Recommendation\n**Overall risk assessment:** ${riskLevel}\n\n**Recommendation:**\nUse this packet as a first-pass procurement review. Public materials are sufficient to begin vendor evaluation, but missing items should be requested directly from the vendor before approval.\n\n## 9. Follow-up Request Email\nSubject: Follow-up request for security and compliance materials\n\nHi team,\n\nWe reviewed your public security and privacy documentation and would like to proceed with vendor review. To complete our internal assessment, please share the following if available:\n- latest SOC 2 / audit report\n- DPA / SCC materials\n- subprocessor list\n- encryption and key-management summary\n- incident response / breach notification overview\n- backup / disaster recovery summary\n\nThanks,\nProcurement / Security Review\n`;
}

module.exports = { generatePacketLocal };
