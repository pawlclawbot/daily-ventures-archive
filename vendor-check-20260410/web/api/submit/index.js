const { execFile } = require('child_process');
const fs = require('fs');
const path = require('path');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.statusCode = 405;
    return res.end(JSON.stringify({ error: 'method_not_allowed' }));
  }

  let body = '';
  for await (const chunk of req) body += chunk;
  const { url, email } = JSON.parse(body || '{}');
  if (!url || !email) {
    res.statusCode = 400;
    return res.end(JSON.stringify({ error: 'missing_fields' }));
  }

  const projectRoot = '/Users/rl/.openclaw/workspace/daily-ventures/vendor-compliance-packet-builder';
  const outputDir = path.join(projectRoot, 'output');
  const env = { ...process.env };

  execFile('node', ['index.js', url, outputDir], { cwd: projectRoot, env }, (err) => {
    if (err) {
      res.statusCode = 500;
      return res.end(JSON.stringify({ error: 'packet_generation_failed', details: err.message }));
    }

    const files = fs.readdirSync(outputDir)
      .filter((f) => f.endsWith('.md'))
      .map((f) => ({ f, t: fs.statSync(path.join(outputDir, f)).mtimeMs }))
      .sort((a, b) => b.t - a.t);

    const packetPath = path.join(outputDir, files[0].f);

    execFile('python3', ['send_packet.py', email, 'Your Vendor Compliance Packet', packetPath, 'elatedcoat904@agentmail.to'], { cwd: projectRoot, env }, (sendErr, stdout, stderr) => {
      if (sendErr) {
        res.statusCode = 500;
        return res.end(JSON.stringify({ error: 'email_send_failed', details: stderr || sendErr.message }));
      }
      res.setHeader('Content-Type', 'application/json');
      res.end(stdout);
    });
  });
};
