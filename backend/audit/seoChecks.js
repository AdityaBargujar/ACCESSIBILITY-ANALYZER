function runSEOChecks($) {
  const issues = [];

  // 1. Title tag checks
  if ($('title').length === 0) {
    issues.push({ 
      id: 'missing-title', 
      desc: 'Missing <title> tag - critical for SEO and browser tabs',
      location: '<head> section'
    });
  } else {
    const title = $('title').text().trim();
    const titleTag = $.html($('title')).slice(0, 100);
    if (title.length === 0) {
      issues.push({ 
        id: 'empty-title', 
        desc: 'Title tag is empty',
        location: '<head> section',
        snippet: titleTag
      });
    } else if (title.length < 10) {
      issues.push({ 
        id: 'short-title', 
        desc: `Title is too short (${title.length} chars). Recommended: 30-60 chars`,
        location: '<head> section',
        snippet: titleTag
      });
    } else if (title.length > 60) {
      issues.push({ 
        id: 'long-title', 
        desc: `Title is too long (${title.length} chars). Recommended: 30-60 chars`,
        location: '<head> section',
        snippet: titleTag
      });
    }
  }

  // 2. Meta description checks
  if ($("meta[name='description']").length === 0) {
    issues.push({ 
      id: 'missing-meta-desc', 
      desc: 'Missing meta description - important for search results',
      location: '<head> section'
    });
  } else {
    const metaDesc = $("meta[name='description']").attr('content') || '';
    const metaTag = $.html($("meta[name='description']")).slice(0, 150);
    if (metaDesc.length === 0) {
      issues.push({ 
        id: 'empty-meta-desc', 
        desc: 'Meta description is empty',
        location: '<head> section',
        snippet: metaTag
      });
    } else if (metaDesc.length < 50) {
      issues.push({ 
        id: 'short-meta-desc', 
        desc: `Meta description is too short (${metaDesc.length} chars). Recommended: 120-160 chars`,
        location: '<head> section',
        snippet: metaTag
      });
    } else if (metaDesc.length > 160) {
      issues.push({ 
        id: 'long-meta-desc', 
        desc: `Meta description is too long (${metaDesc.length} chars). Recommended: 120-160 chars`,
        location: '<head> section',
        snippet: metaTag
      });
    }
  }

  // 3. Viewport meta tag (mobile optimization)
  if (!$("meta[name='viewport']").length) {
    issues.push({ 
      id: 'missing-viewport', 
      desc: 'Missing viewport meta tag - affects mobile SEO ranking' 
    });
  }

  // 4. H1 tag checks (structural SEO)
  const h1Count = $('h1').length;
  if (h1Count === 0) {
    issues.push({ 
      id: 'missing-h1', 
      desc: 'Missing H1 heading - important for page structure and SEO' 
    });
  } else if (h1Count > 1) {
    issues.push({ 
      id: 'multiple-h1', 
      desc: `Multiple H1 tags (${h1Count} found). Should have only one H1` 
    });
  }

  // 5. Canonical tag (duplicate content prevention)
  if (!$("link[rel='canonical']").length) {
    issues.push({ 
      id: 'missing-canonical', 
      desc: 'Missing canonical tag - helps prevent duplicate content issues' 
    });
  }

  // 6. Open Graph / Social meta tags
  const hasOgTitle = $("meta[property='og:title']").length > 0;
  const hasOgDesc = $("meta[property='og:description']").length > 0;
  const hasOgImage = $("meta[property='og:image']").length > 0;

  if (!hasOgTitle || !hasOgDesc || !hasOgImage) {
    issues.push({ 
      id: 'missing-og-tags', 
      desc: 'Missing Open Graph tags - affects social media sharing and preview' 
    });
  }

  // 7. Mobile responsiveness (meta viewport already checked, this checks for responsive design hints)
  if (!$('meta[name="theme-color"]').length) {
    issues.push({ 
      id: 'missing-theme-color', 
      desc: 'Missing theme-color meta tag - improves mobile appearance' 
    });
  }

  // 8. Image optimization - check for images without alt text (also impacts SEO)
  let imagesWithoutAlt = 0;
  $('img').each((i, el) => {
    const alt = $(el).attr('alt');
    if (typeof alt === 'undefined' || alt === null || String(alt).trim() === '') {
      imagesWithoutAlt++;
    }
  });
  if (imagesWithoutAlt > 0) {
    issues.push({ 
      id: 'images-missing-alt', 
      desc: `${imagesWithoutAlt} image(s) missing alt text - needed for image search SEO` 
    });
  }

  // 9. Mobile-friendly text (font size check)
  const bodyFontSize = $('body').css('font-size');
  if (bodyFontSize && parseInt(bodyFontSize) < 12) {
    issues.push({ 
      id: 'small-text', 
      desc: 'Body text may be too small for mobile readability' 
    });
  }

  // 10. Robots meta tag (crawlability)
  const robotsTag = $("meta[name='robots']").attr('content') || '';
  if (robotsTag.includes('noindex')) {
    issues.push({ 
      id: 'noindex-tag', 
      desc: 'Page has noindex tag - will not appear in search results' 
    });
  }

  return issues;
}

module.exports = { runSEOChecks };
