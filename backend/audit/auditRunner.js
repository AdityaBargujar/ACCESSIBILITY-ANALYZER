const axios = require('axios');
const cheerio = require('cheerio');
const { runWCAGChecks } = require('./wcagChecks');
const { runSEOChecks } = require('./seoChecks');
const { calculateScore } = require('./scoring');
const { generatePageRanking } = require('./pageRanking');
const suggestionEngine = require('../suggestions/suggestionEngine');

module.exports = async function runAudit(url) {
  console.log('➡️ runAudit started for:', url);
  const resp = await axios.get(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36'
    },
    timeout: 20000
  });
  const html = resp.data;
  console.log('➡️ fetched HTML length:', html.length);
  const $ = cheerio.load(html);

  const wcagIssues = runWCAGChecks($) || [];
  console.log('➡️ wcagIssues count:', wcagIssues.length);

  const seoIssues = runSEOChecks($) || [];
  console.log('➡️ seoIssues count:', seoIssues.length);

  const wcagResult = calculateScore(wcagIssues, 'wcag');
  const seoResult = calculateScore(seoIssues, 'seo');

  // Precise overall calculation: 70% WCAG, 30% SEO
  // WCAG is more important for accessibility
  const overall = Math.round(wcagResult.score * 0.7 + seoResult.score * 0.3);

  console.log('➡️ scoring done:', { wcag: wcagResult.score, seo: seoResult.score, overall });

  // Generate page ranking and grading
  const pageRanking = generatePageRanking(
    wcagResult.score, 
    seoResult.score, 
    wcagResult.breakdown, 
    seoResult.breakdown
  );

  // Build audit object to pass to suggestion engine
  const auditForSuggestions = {
    url,
    wcag: { score: wcagResult.score, breakdown: wcagResult.breakdown, issues: wcagIssues },
    seo: { score: seoResult.score, breakdown: seoResult.breakdown, issues: seoIssues }
  };

  let suggestions = [];
  try {
    suggestions = await suggestionEngine(auditForSuggestions);
  } catch (e) {
    console.error('Failed to generate suggestions:', e.message || e);
    suggestions = [];
  }

  return {
    url,
    wcag: { 
      score: wcagResult.score, 
      breakdown: wcagResult.breakdown, 
      issues: wcagIssues 
    },
    seo: { 
      score: seoResult.score, 
      breakdown: seoResult.breakdown,
      issues: seoIssues 
    },
    overall: { 
      score: overall,
      wcagWeight: 70,
      seoWeight: 30
    },
    ranking: pageRanking,
    suggestions
  };
};
