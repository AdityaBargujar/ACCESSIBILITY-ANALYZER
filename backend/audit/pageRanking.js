// Page ranking and grading system
// Assigns A-F grades and performance tiers based on accessibility and SEO scores

function calculateGrade(score) {
  // Traditional letter grade system
  // A: 90-100 (Excellent)
  // B: 80-89  (Good)
  // C: 70-79  (Acceptable)
  // D: 60-69  (Poor)
  // F: <60    (Failing)
  if (score >= 90) return 'A';
  if (score >= 80) return 'B';
  if (score >= 70) return 'C';
  if (score >= 60) return 'D';
  return 'F';
}

function getGradeColor(grade) {
  // Return hex color for grade visualization
  const colors = {
    'A': '#0cce6b', // Green (excellent)
    'B': '#ffc400', // Amber/Yellow (good)
    'C': '#ff8c00', // Orange (acceptable)
    'D': '#ff6b6b', // Red-Orange (poor)
    'F': '#c41e3a'  // Dark Red (failing)
  };
  return colors[grade] || '#999';
}

function getGradeDescription(grade) {
  const descriptions = {
    'A': 'Excellent - Page meets high accessibility and SEO standards',
    'B': 'Good - Page is accessible but has minor improvements available',
    'C': 'Acceptable - Page has moderate accessibility/SEO issues',
    'D': 'Poor - Page has significant accessibility/SEO problems',
    'F': 'Failing - Page has critical accessibility or SEO issues'
  };
  return descriptions[grade] || 'Unknown';
}

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
  // Provide comparison metrics for benchmarking
  return {
    wcag: {
      score: wcagScore,
      grade: calculateGrade(wcagScore),
      percentile: getPercentile(wcagScore),
      label: `WCAG Accessibility: ${calculateGrade(wcagScore)}`
    },
    seo: {
      score: seoScore,
      grade: calculateGrade(seoScore),
      percentile: getPercentile(seoScore),
      label: `SEO Optimization: ${calculateGrade(seoScore)}`
    },
    overall: {
      score: Math.round((wcagScore + seoScore) / 2),
      grade: calculateGrade(Math.round((wcagScore + seoScore) / 2)),
      label: `Overall Score: ${Math.round((wcagScore + seoScore) / 2)}`
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
    grades: {
      wcag: calculateGrade(wcagScore),
      seo: calculateGrade(seoScore),
      overall: calculateGrade(Math.round((wcagScore + seoScore) / 2))
    },
    performance: assignPerformanceTier(wcagScore, seoScore),
    metrics: calculateComparisonMetrics(wcagScore, seoScore),
    recommendations: generateRecommendationPriority(wcagBreakdown, seoBreakdown),
    summary: {
      wcagScore,
      seoScore,
      overallScore: Math.round((wcagScore + seoScore) / 2),
      wcagGrade: calculateGrade(wcagScore),
      seoGrade: calculateGrade(seoScore),
      overallGrade: calculateGrade(Math.round((wcagScore + seoScore) / 2)),
      wcagColor: getGradeColor(calculateGrade(wcagScore)),
      seoColor: getGradeColor(calculateGrade(seoScore)),
      overallColor: getGradeColor(calculateGrade(Math.round((wcagScore + seoScore) / 2))),
      message: getGradeDescription(calculateGrade(Math.round((wcagScore + seoScore) / 2)))
    }
  };
}

module.exports = { 
  calculateGrade, 
  getGradeColor, 
  getGradeDescription, 
  assignPerformanceTier, 
  generateRecommendationPriority,
  calculateComparisonMetrics,
  generatePageRanking
};
