// Comprehensive WCAG 2.2 accessibility checks
function runWCAGChecks($) {
  const issues = [];

  // 1. Language attribute (WCAG 3.1.1 - Language of Page)
  if (!$('html').attr('lang')) {
    issues.push({ 
      id: 'missing-lang', 
      desc: '<html> missing lang attribute - required for screen readers to determine language'
    });
  }

  // 2. Image alt text (WCAG 1.1.1 - Non-text Content)
  let imagesWithoutAlt = 0;
  $('img').each((i, el) => {
    const alt = $(el).attr('alt');
    const src = $(el).attr('src') || '';
    const classes = $(el).attr('class') || 'no-class';
    const id = $(el).attr('id') || 'no-id';
    if (typeof alt === 'undefined' || alt === null || String(alt).trim() === '') {
      imagesWithoutAlt++;
      if (imagesWithoutAlt <= 5) { // Report first 5 only
        issues.push({
          id: 'missing-alt',
          desc: `Image missing alt text: ${src.substring(0, 50)}...`,
          location: `<img id="${id}" class="${classes}">`,
          snippet: $.html(el).slice(0, 200)
        });
      }
    }
  });
  if (imagesWithoutAlt > 5) {
    issues.push({
      id: 'missing-alt-multiple',
      desc: `And ${imagesWithoutAlt - 5} more images missing alt text`
    });
  }

  // 3. Page structure - H1 (WCAG 1.3.1 - Info and Relationships)
  const h1Count = $('h1').length;
  if (h1Count === 0) {
    issues.push({ 
      id: 'missing-h1', 
      desc: 'Page missing H1 heading - required for page structure and screen readers'
    });
  } else if (h1Count > 1) {
    issues.push({ 
      id: 'multiple-h1', 
      desc: `Page has ${h1Count} H1 tags. Should have exactly one H1`
    });
  }

  // 4. Heading hierarchy (WCAG 1.3.1 - Info and Relationships)
  const headings = $('h1, h2, h3, h4, h5, h6');
  let lastLevel = 0;
  let hasHeadingSkip = false;
  headings.each((i, el) => {
    const level = parseInt(el.name[1]);
    if (level > lastLevel + 1) {
      hasHeadingSkip = true;
    }
    lastLevel = level;
  });
  if (hasHeadingSkip && h1Count > 0) {
    issues.push({ 
      id: 'heading-hierarchy', 
      desc: 'Heading hierarchy is not sequential (skipped levels)' 
    });
  }

  // 5. Form labels (WCAG 1.3.1 & 4.1.2 - Info and Relationships, Name/Role/Value)
  let inputsWithoutLabels = 0;
  $('input[id], textarea[id], select[id]').each((i, el) => {
    const inputId = $(el).attr('id');
    const inputType = $(el).attr('type') || $(el)[0].name;
    const classes = $(el).attr('class') || 'no-class';
    const label = $(`label[for="${inputId}"]`);
    const ariaLabel = $(el).attr('aria-label');
    const ariaLabelledby = $(el).attr('aria-labelledby');
    
    if (label.length === 0 && !ariaLabel && !ariaLabelledby) {
      inputsWithoutLabels++;
      if (inputsWithoutLabels <= 5) {
        issues.push({ 
          id: 'form-missing-label', 
          desc: `Form control (id="${inputId}") has no label, aria-label, or aria-labelledby`,
          location: `<${inputType} id="${inputId}" class="${classes}">`,
          snippet: $.html(el).slice(0, 150)
        });
      }
    }
  });
  if (inputsWithoutLabels > 5) {
    issues.push({
      id: 'form-missing-label-multiple',
      desc: `And ${inputsWithoutLabels - 5} more form controls without labels`
    });
  }

  // 6. Links with meaningful text (WCAG 2.4.4 - Link Purpose in Context)
  let emptyLinks = 0;
  let genericLinks = 0;
  const genericTexts = ['click here', 'read more', 'learn more', 'link', 'more', 'here'];
  
  $('a').each((i, el) => {
    const text = $(el).text().trim().toLowerCase();
    const ariaLabel = $(el).attr('aria-label') || '';
    if (!text && !ariaLabel) {
      emptyLinks++;
    } else if (genericTexts.some(generic => text === generic)) {
      genericLinks++;
    }
  });
  
  if (emptyLinks > 0) {
    issues.push({ 
      id: 'link-empty-text', 
      desc: `${emptyLinks} link(s) have no text - provide meaningful link text` 
    });
  }
  if (genericLinks > 0) {
    issues.push({ 
      id: 'link-generic-text', 
      desc: `${genericLinks} link(s) have generic text (e.g., 'Click here') - use descriptive text` 
    });
  }

  // 7. Title tag (WCAG 2.4.2 - Page Titled)
  if ($('title').length === 0 || $('title').text().trim() === '') {
    issues.push({ 
      id: 'missing-title', 
      desc: 'Page missing or empty title tag - required for document identification' 
    });
  }

  // 8. ARIA attributes (WCAG 4.1.2 - Name, Role, Value)
  let ariaIssues = 0;
  $('[role]').each((i, el) => {
    const role = $(el).attr('role');
    if ((role === 'button' || role === 'link') && !$(el).attr('aria-label') && !$(el).text().trim()) {
      ariaIssues++;
      if (ariaIssues === 1) {
        issues.push({ 
          id: 'aria-missing-label', 
          desc: `Element with role="${role}" has no accessible name` 
        });
      }
    }
  });

  return issues;
}

module.exports = { runWCAGChecks };
