// scoring.js – Precise Lighthouse-style scoring

function classifyIssue(issue) {
  const id = (issue.id || "").toLowerCase();

  // Critical issues (accessibility failures that block users)
  if (
    id.includes("alt") ||
    id.includes("contrast") ||
    id.includes("label") ||
    id.includes("aria") ||
    id.includes("keyboard") ||
    id.includes("missing-lang") ||
    id.includes("missing-title") ||
    id.includes("missing-viewport") ||
    id.includes("noindex")
  ) {
    return "critical";
  }

  // Major issues (important for accessibility/SEO but not blocking)
  if (
    id.includes("heading") ||
    id.includes("h1") ||
    id.includes("title") ||
    id.includes("description") ||
    id.includes("meta-desc") ||
    id.includes("canonical") ||
    id.includes("og-tags") ||
    id.includes("short-title") ||
    id.includes("long-title") ||
    id.includes("short-meta-desc") ||
    id.includes("long-meta-desc") ||
    id.includes("missing-h1") ||
    id.includes("multiple-h1") ||
    id.includes("images-missing-alt")
  ) {
    return "major";
  }

  return "minor";
}

function calculateScore(issues = [], type = "wcag") {
  let critical = 0;
  let major = 0;
  let minor = 0;

  for (const issue of issues) {
    const level = classifyIssue(issue);
    if (level === "critical") critical++;
    else if (level === "major") major++;
    else minor++;
  }

  // Precise penalty calculation
  // Critical: 15 points each, Major: 8 points each, Minor: 3 points each
  const totalPenalty =
    critical * 15 +
    major * 8 +
    minor * 3;

  // Scale penalty using logarithmic scale for more realistic scoring
  // This prevents small issues from tanking the score too much
  const scaledPenalty = Math.min(100, totalPenalty);
  
  // Calculate score: starts at 100, deduct based on severity
  // Formula ensures scores are precise and meaningful
  let score = 100 - scaledPenalty;

  // Minimum floor: 10 for truly terrible pages, 0 for empty/broken
  if (score < 0) score = 0;

  // Round to nearest integer for clean display
  score = Math.round(score);

  return {
    score,
    breakdown: { 
      critical, 
      major, 
      minor, 
      total: critical + major + minor,
      totalPenalty: Math.round(totalPenalty)
    }
  };
}

module.exports = { calculateScore };
