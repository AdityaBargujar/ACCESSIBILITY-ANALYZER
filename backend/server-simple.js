const express = require('express');
const cors = require('cors');
const runAudit = require('./audit/auditRunner');
const suggestionEngine = require('./suggestions/suggestionEngine');

const app = express();
app.use(express.json());
app.use(cors({ origin: '*' }));

app.post('/api/audit', async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: 'Missing url' });
    
    console.log('📍 Starting audit for:', url);
    const audit = await runAudit(url);
    console.log('📍 Audit complete, generating suggestions...');
    const suggestions = await suggestionEngine(audit);
    console.log('✅ Suggestions ready');
    res.json({ ...audit, suggestions });
  } catch (err) {
    console.error('❌ Error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

process.on('uncaughtException', err => console.error('CRASH:', err));
process.on('unhandledRejection', err => console.error('REJECT:', err));
