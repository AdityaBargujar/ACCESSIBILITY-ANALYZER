// scoring.js – Precise Lighthouse-style scoring

function classifyIssue(issue) {
  const id = (issue.id || "").toLowerCase();

  // CRITICAL issues (100% accessibility/SEO failures that block users or search engines)
  if (
    id.includes("missing-lang") || // Language not set
    id.includes("missing-title") || // No page title
    id.includes("missing-viewport") || // Not mobile-friendly
    id.includes("noindex") || // Explicitly hidden from search
    id.includes("color-contrast") || // WCAG AA contrast failures
    id.includes("keyboard-trap") // Keyboard navigation blocked
  ) {
    return "critical";
  }

  // MAJOR issues (significantly impact accessibility/SEO)
  if (
    id.includes("alt") || // Images missing descriptions
    id.includes("aria-") || // Missing ARIA attributes
    id.includes("label") || // Form labels missing
    id.includes("missing-h1") || // Page structure broken
    id.includes("multiple-h1") || // Confusing hierarchy
    id.includes("missing-meta-desc") || // No search snippet
    id.includes("missing-canonical") || // Duplicate content risk
    id.includes("missing-og-tags") || // Social sharing broken
    id.includes("heading") || // Heading structure issues
    id.includes("form-input") // Form accessibility
  ) {
    return "major";
  }

  // MODERATE issues (affects user experience and SEO)
  if (
    id.includes("short-title") || // Too brief for search results
    id.includes("long-title") || // Truncated in search results
    id.includes("short-meta-desc") || // Too brief description
    id.includes("long-meta-desc") || // Truncated description
    id.includes("small-text") || // Mobile readability
    id.includes("link-purpose") || // Link text unclear
    id.includes("focus-visible") // Keyboard visibility
  ) {
    return "moderate";
  }

  // MINOR issues (nice-to-have improvements)
  return "minor";
}

function calculateScore(issues = [], type = "wcag") {
  let critical = 0;
  let major = 0;
  let moderate = 0;
  let minor = 0;

  for (const issue of issues) {
    const level = classifyIssue(issue);
    if (level === "critical") critical++;
    else if (level === "major") major++;
    else if (level === "moderate") moderate++;
    else minor++;
  }

  const totalIssues = critical + major + moderate + minor;

  // Simple penalty calculation: weighted by severity
  // Critical: 20 pts each | Major: 10 pts each | Moderate: 4 pts each | Minor: 1 pt each
  const basePenalty =
    critical * 20 +
    major * 10 +
    moderate * 4 +
    minor * 1;

  // Cap penalty at 100 (maximum deduction)
  // This ensures scores range from 0-100 realistically
  const cappedPenalty = Math.min(100, basePenalty);

  // Calculate final score (0-100) using linear deduction
  let score = 100 - cappedPenalty;

  // Ensure score is in valid range
  if (score < 0) score = 0;
  if (score > 100) score = 100;

  return {
    score,
    breakdown: {
      critical,
      major,
      moderate,
      minor,
      total: totalIssues,
      basePenalty: Math.round(basePenalty),
      cappedPenalty: Math.round(cappedPenalty)
    }
  };
}

module.exports = { calculateScore };
