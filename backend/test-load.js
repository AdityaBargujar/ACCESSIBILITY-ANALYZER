require('dotenv').config();
console.log('✅ dotenv loaded');

console.log('Loading modules...');
try {
  const express = require('express');
  console.log('✅ express loaded');
  
  const cors = require('cors');
  console.log('✅ cors loaded');
  
  const runAudit = require('./audit/auditRunner');
  console.log('✅ audit/auditRunner loaded');
  
  const suggestionEngine = require('./suggestions/suggestionEngine');
  console.log('✅ suggestions/suggestionEngine loaded');
  
  const app = express();
  console.log('✅ app created');
  
  app.use(express.json());
  app.use(cors({ origin: '*' }));
  console.log('✅ middleware added');
  
  app.listen(4000, () => {
    console.log('✅ server listening on 4000');
  });
} catch (err) {
  console.error('❌ ERROR:', err.message);
  console.error(err.stack);
}
