const axios = require('axios');
const cheerio = require('cheerio');

const scanPage = async (req, res) => {
  const { url } = req.body;

  try {
    const { data: html } = await axios.get(url);
    const $ = cheerio.load(html);

    const issues = [];

    // Check for missing alt on images
    $('img').each((i, el) => {
      if (!$(el).attr('alt')) {
        issues.push({ type: 'Missing alt attribute', html: $.html(el) });
      }
    });

    // Check for inputs without labels
    $('input').each((i, el) => {
      const id = $(el).attr('id');
      const hasLabel = id && $(`label[for="${id}"]`).length > 0;
      if (!hasLabel) {
        issues.push({ type: 'Input without label', html: $.html(el) });
      }
    });

    res.json({
      url,
      issueCount: issues.length,
      issues,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to scan URL' });
  }
};

module.exports = { scanPage };
