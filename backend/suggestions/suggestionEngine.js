const axios = require('axios');

async function hfSuggest(audit) {
  const hfToken = process.env.HF_API_TOKEN;
  const model = process.env.HF_MODEL || 'gpt2';
  const prompt = `You are an assistant that produces concise, actionable accessibility and SEO suggestions for developers. Return an array of suggestions with title and text in JSON format (e.g. [{"title":"...","text":"..."}, ...]).\nHere is the audit result:\nWCAG/Accessibility issues: ${JSON.stringify(audit.wcag.issues || []).slice(0,2000)}\nSEO issues: ${JSON.stringify(audit.seo.issues || []).slice(0,2000)}`;

  const body = {
    inputs: prompt,
    parameters: { max_new_tokens: 300, temperature: 0.2 },
    // Request the model be loaded if it's not awake (may increase latency)
    options: { wait_for_model: true }
  };

  // New Hugging Face inference router endpoint (replaces api-inference.huggingface.co)
  const hfUrl = `https://router.huggingface.co/hf-inference/${model}`;
  let res;
  try {
    console.log('HF request ->', { url: hfUrl, model, truncatedPrompt: prompt.slice(0, 400) });
    res = await axios.post(hfUrl, body, {
      headers: {
        Authorization: `Bearer ${hfToken}`,
        'Content-Type': 'application/json'
      },
      timeout: 60000
    });
    console.log('HF response status:', res.status);
    // Log a small preview of response data for debugging
    try {
      const preview = JSON.stringify(res.data).slice(0, 1000);
      console.log('HF response preview:', preview);
    } catch (e) {
      console.log('HF response preview: (unable to stringify)');
    }
  } catch (err) {
    console.error('HF request failed:', err.message);
    if (err.response) {
      console.error('HF response status:', err.response.status);
      try {
        console.error('HF response data:', JSON.stringify(err.response.data).slice(0,1500));
      } catch (e) {
        console.error('HF response data: (unable to stringify)');
      }
      // If router returns 404 Not Found, try the legacy models endpoint as a fallback
      if (err.response.status === 404) {
        const legacyUrl = `https://api-inference.huggingface.co/models/${model}`;
        try {
          console.warn('Router returned 404 — trying legacy HF models endpoint:', legacyUrl);
          res = await axios.post(legacyUrl, body, {
            headers: {
              Authorization: `Bearer ${hfToken}`,
              'Content-Type': 'application/json'
            },
            timeout: 60000
          });
          console.log('HF legacy response status:', res.status);
          try {
            const preview = JSON.stringify(res.data).slice(0, 1000);
            console.log('HF legacy response preview:', preview);
          } catch (e) {
            console.log('HF legacy response preview: (unable to stringify)');
          }
        } catch (legacyErr) {
          console.error('HF legacy endpoint failed:', legacyErr.message);
          if (legacyErr.response) {
            console.error('HF legacy response status:', legacyErr.response.status);
            try { console.error('HF legacy response data:', JSON.stringify(legacyErr.response.data).slice(0,1500)); }
            catch (e) { console.error('HF legacy response data: (unable to stringify)'); }
          }
          // If legacy endpoint fails (e.g., returns 410 deprecation), try the pipeline text-generation endpoint as a last resort
          try {
            const pipelineUrl = 'https://api-inference.huggingface.co/pipeline/text-generation';
            const pipelineBody = { inputs: prompt, parameters: { max_new_tokens: 300, temperature: 0.2 }, model };
            console.warn('Trying HF pipeline endpoint as fallback:', pipelineUrl);
            const pipelineRes = await axios.post(pipelineUrl, pipelineBody, {
              headers: { Authorization: `Bearer ${hfToken}`, 'Content-Type': 'application/json' },
              timeout: 60000
            });
            console.log('HF pipeline response status:', pipelineRes.status);
            try { console.log('HF pipeline preview:', JSON.stringify(pipelineRes.data).slice(0,1000)); } catch (e) { console.log('HF pipeline preview: (unable to stringify)'); }
            res = pipelineRes;
          } catch (pipelineErr) {
            console.error('HF pipeline fallback failed:', pipelineErr.message);
            if (pipelineErr.response) {
              try { console.error('HF pipeline response data:', JSON.stringify(pipelineErr.response.data).slice(0,1500)); } catch (e) { console.error('HF pipeline response data: (unable to stringify)'); }
            }
            throw pipelineErr;
          }
        }
      } else {
        throw err; // rethrow non-404 errors
      }
    } else {
      throw err; // network/other error
    }
  }

  // HF router may return several shapes. Normalize common ones:
  // - [{generated_text: '...'}]
  // - { generated_text: '...' }
  // - { data: [{generated_text: '...'}] }
  // - plain string
  let text = '';
  if (Array.isArray(res.data) && res.data[0] && res.data[0].generated_text) {
    text = res.data[0].generated_text;
  } else if (res.data && typeof res.data === 'object' && res.data.generated_text) {
    text = res.data.generated_text;
  } else if (res.data && res.data.data && Array.isArray(res.data.data) && res.data.data[0] && res.data.data[0].generated_text) {
    text = res.data.data[0].generated_text;
  } else if (typeof res.data === 'string') {
    text = res.data;
  } else {
    text = JSON.stringify(res.data);
  }
  try {
    const parsed = JSON.parse(text);
    if (Array.isArray(parsed)) return parsed.map(s => ({ title: s.title || s.id || 'Suggestion', text: s.text || s.description || '', source: 'ai' }));
  } catch (e) {
    return [{ title: 'AI Suggestions', text, source: 'ai' }];
  }

  return [{ title: 'AI Suggestions', text }];
}

async function openaiSuggest(audit) {
  // Preserve original OpenAI behavior for users who still provide OPENAI_API_KEY
  const payload = {
    model: process.env.AI_MODEL || 'gpt-4o-mini',
    messages: [
      { role: 'system', content: 'You are an assistant that produces concise, actionable accessibility and SEO suggestions for developers. Return an array of suggestions with title and text.' },
      { role: 'user', content: `Here is the audit result:\nWCAG/Accessibility issues: ${JSON.stringify(audit.wcag.issues || []).slice(0, 2000)}\nSEO issues: ${JSON.stringify(audit.seo.issues || []).slice(0,2000)}` }
    ],
    max_tokens: 600,
    temperature: 0.2
  };

  const res = await axios.post('https://api.openai.com/v1/chat/completions', payload, {
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json'
    },
    timeout: 20000
  });

  const text = (res.data?.choices?.[0]?.message?.content) || '';
  try {
    const parsed = JSON.parse(text);
    if (Array.isArray(parsed)) return parsed.map(s => ({ title: s.title || s.id || 'Suggestion', text: s.text || s.description || '', source: 'ai' }));
  } catch (e) {
    return [{ title: 'AI Suggestions', text, source: 'ai' }];
  }

  return [{ title: 'AI Suggestions', text }];
}

module.exports = async function suggestionEngine(audit) {
  // Prefer Hugging Face token if present, otherwise fall back to OpenAI if provided
  if (process.env.HF_API_TOKEN) {
    try {
      console.log('📝 Attempting AI suggestions via Hugging Face model:', process.env.HF_MODEL || 'gpt2');
      const aiRes = await hfSuggest(audit);
      console.log('✅ HF suggestions generated:', aiRes.length, 'suggestions');
      return aiRes.map(s => ({ ...s, source: s.source || 'ai' }));
    } catch (err) {
      console.error('❌ Hugging Face suggestion failed, falling back to other methods:');
      console.error('Error:', err.response?.status, err.response?.data || err.message);
    }
  }

  if (process.env.OPENAI_API_KEY) {
    try {
      console.log('📝 Attempting AI suggestions with OpenAI model:', process.env.AI_MODEL || 'gpt-4o-mini');
      const aiRes = await openaiSuggest(audit);
      console.log('✅ OpenAI suggestions generated:', aiRes.length, 'suggestions');
      return aiRes.map(s => ({ ...s, source: s.source || 'ai' }));
    } catch (err) {
      console.error('❌ OpenAI suggestion failed, falling back to local rules:');
      console.error('Error:', err.response?.status, err.response?.data || err.message);
    }
  }

  // Local fallback
  const suggestions = [];
  (audit.wcag.issues || []).forEach(issue => {
    const id = (issue.id || '').toLowerCase();
    if (id.includes('alt')) suggestions.push({ title: 'Add alt text', text: 'Provide descriptive alt attributes for images.', source: 'local' });
    else if (id.includes('lang')) suggestions.push({ title: 'Set HTML lang', text: 'Add lang attribute to <html>.', source: 'local' });
    else if (id.includes('h1')) suggestions.push({ title: 'Add or fix H1', text: 'Ensure the page has a single H1 describing the page.', source: 'local' });
    else suggestions.push({ title: 'Fix issue', text: issue.desc || 'Review and fix.', source: 'local' });
  });
  (audit.seo.issues || []).forEach(issue => suggestions.push({ title: 'SEO', text: issue.desc, source: 'local' }));
  return suggestions;
};
