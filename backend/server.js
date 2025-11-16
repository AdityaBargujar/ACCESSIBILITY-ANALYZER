require('dotenv').config();
const express = require('express');
const cors = require('cors');
const runAudit = require('./audit/auditRunner');
const suggestionEngine = require('./suggestions/suggestionEngine');

process.on('uncaughtException', (err) => {
  console.error('❌ UNCAUGHT EXCEPTION:', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ UNHANDLED REJECTION:', reason);
});

const app = express();
app.use(express.json());
app.use(cors({ origin: '*' }));
app.options('/api/audit', (req,res)=>res.sendStatus(200));

app.use((req,res,next)=>{
  console.log('🔥 Incoming request:', req.method, req.url);
  next();
});

app.post('/api/audit', async (req,res)=>{
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: 'Missing url' });
  console.log('🔍 AUDIT REQUEST:', url);
  try {
    const audit = await runAudit(url);
    const suggestions = await suggestionEngine(audit).catch(err => {
      console.error('Suggestion engine error:', err && (err.message || err));
      return [];
    });
    res.json({ ...audit, suggestions });
  } catch (err) {
    console.error('❌ BACKEND AUDIT ERROR:', err && (err.stack || err.message));
    res.status(500).json({ error: 'Audit failed', detail: String(err && err.message) });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=>console.log('🚀 Server running on port', PORT));
