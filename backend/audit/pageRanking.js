// Page ranking helper (grades removed)
// This module assigns performance tiers, recommendations and comparison metrics
// based only on numeric scores (no A-F grading system).
function assignPerformanceTier(wcagScore, seoScore) {
  // Assigns a performance tier based on both scores
  // Tier 1 (Best): Both scores >= 85
  // Tier 2 (Good): Both scores >= 75
  // Tier 3 (Fair): Both scores >= 60
  // Tier 4 (Needs Work): One or both < 60

  const avgScore = (wcagScore + seoScore) / 2;

  if (wcagScore >= 85 && seoScore >= 85) {
    return {
      tier: 1,
      name: 'Best Practice',
      label: 'This page exemplifies accessibility and SEO best practices'
    };
  }
  if (wcagScore >= 75 && seoScore >= 75) {
    return {
      tier: 2,
      name: 'Good Performance',
      label: 'This page is accessible and SEO-friendly with room for optimization'
    };
  }
  if (wcagScore >= 60 && seoScore >= 60) {
    return {
      tier: 3,
      name: 'Fair Performance',
      label: 'This page has accessibility and SEO issues that should be addressed'
    };
  }
  return {
    tier: 4,
    name: 'Needs Improvement',
    label: 'This page has critical accessibility or SEO problems that need urgent attention'
  };
}

function generateRecommendationPriority(wcagBreakdown, seoBreakdown) {
  // Generate a prioritized list of recommendations based on issue severity
  const recommendations = [];

  // Critical accessibility issues (highest priority)
  if (wcagBreakdown.critical > 0) {
    recommendations.push({
      priority: 1,
      category: 'Critical Accessibility',
      count: wcagBreakdown.critical,
      action: `Fix ${wcagBreakdown.critical} critical accessibility issues immediately`,
      impact: 'Users with disabilities cannot access your site'
    });
  }

  // Critical SEO issues (high priority)
  if (seoBreakdown.critical > 0) {
    recommendations.push({
      priority: 2,
      category: 'Critical SEO',
      count: seoBreakdown.critical,
      action: `Fix ${seoBreakdown.critical} critical SEO issues immediately`,
      impact: 'Your page will not be indexed by search engines'
    });
  }

  // Major accessibility issues
  if (wcagBreakdown.major > 0) {
    recommendations.push({
      priority: 3,
      category: 'Major Accessibility',
      count: wcagBreakdown.major,
      action: `Address ${wcagBreakdown.major} major accessibility issues`,
      impact: 'Some users will have difficulty using your site'
    });
  }

  // Major SEO issues
  if (seoBreakdown.major > 0) {
    recommendations.push({
      priority: 4,
      category: 'Major SEO',
      count: seoBreakdown.major,
      action: `Address ${seoBreakdown.major} major SEO issues`,
      impact: 'Your search engine visibility will be limited'
    });
  }

  // Moderate issues
  if (wcagBreakdown.moderate > 0) {
    recommendations.push({
      priority: 5,
      category: 'Moderate Issues',
      count: wcagBreakdown.moderate + seoBreakdown.moderate,
      action: `Improve user experience by addressing moderate issues`,
      impact: 'Better usability and search ranking potential'
    });
  }

  // Minor issues
  if (wcagBreakdown.minor > 0 || seoBreakdown.minor > 0) {
    recommendations.push({
      priority: 6,
      category: 'Optimization Opportunities',
      count: wcagBreakdown.minor + seoBreakdown.minor,
      action: `Consider minor improvements`,
      impact: 'Polish and optimization for maximum reach'
    });
  }

  return recommendations;
}

function calculateComparisonMetrics(wcagScore, seoScore, issues = []) {
  // Provide comparison metrics for benchmarking (no grade letters)
  const overall = Math.round((wcagScore + seoScore) / 2);
  return {
    wcag: {
      score: wcagScore,
      percentile: getPercentile(wcagScore)
    },
    seo: {
      score: seoScore,
      percentile: getPercentile(seoScore)
    },
    overall: {
      score: overall
    }
  };
}

function getPercentile(score) {
  // Estimate percentile ranking (rough estimate)
  // Most web pages score 40-70, good pages 70-85, excellent pages 85+
  if (score >= 85) return 'Top 10%';
  if (score >= 75) return 'Top 25%';
  if (score >= 65) return 'Top 50%';
  if (score >= 50) return 'Below Average';
  return 'Bottom 20%';
}

function generatePageRanking(wcagScore, seoScore, wcagBreakdown, seoBreakdown) {
  // Main function to generate complete ranking and grading
  return {
    performance: assignPerformanceTier(wcagScore, seoScore),
    metrics: calculateComparisonMetrics(wcagScore, seoScore),
    recommendations: generateRecommendationPriority(wcagBreakdown, seoBreakdown),
    summary: {
      wcagScore,
      seoScore,
      overallScore: Math.round((wcagScore + seoScore) / 2)
    }
  };
}

module.exports = {
  assignPerformanceTier,
  generateRecommendationPriority,
  calculateComparisonMetrics,
  generatePageRanking
};
