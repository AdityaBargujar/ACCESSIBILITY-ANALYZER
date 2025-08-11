// src/pages/AccessibilityScoreExplanation.js
import React from "react";

const AccessibilityScoreExplanation = () => {
  return (
    <div style={{ maxWidth: "800px", margin: "auto", lineHeight: "1.6" }}>
      <h1>Accessibility Score – How It’s Calculated</h1>
      <p>
        The Accessibility Score is a measure of how well your website or application meets
        accessibility standards such as the WCAG (Web Content Accessibility Guidelines).
        It helps identify barriers that might prevent people with disabilities from fully
        using your site.
      </p>

      <h2>Scoring Factors</h2>
      <ul>
        <li>
          <strong>Contrast Ratio (20%)</strong> – Checks if text has enough contrast with its background for readability.
        </li>
        <li>
          <strong>Alt Text for Images (15%)</strong> – Ensures that images have descriptive alternative text.
        </li>
        <li>
          <strong>Keyboard Accessibility (20%)</strong> – Tests if users can navigate without a mouse.
        </li>
        <li>
          <strong>ARIA Labels (15%)</strong> – Validates proper use of ARIA attributes for assistive technologies.
        </li>
        <li>
          <strong>Headings Structure (10%)</strong> – Checks for logical and hierarchical heading usage.
        </li>
        <li>
          <strong>Form Labels (10%)</strong> – Ensures that form fields have associated labels.
        </li>
        <li>
          <strong>Responsive Design (10%)</strong> – Verifies that the content adapts well to different screen sizes.
        </li>
      </ul>

      <h2>Score Ranges</h2>
      <ul>
        <li><strong>90–100:</strong> Excellent – Fully accessible to most users.</li>
        <li><strong>70–89:</strong> Good – Minor improvements needed.</li>
        <li><strong>50–69:</strong> Fair – Several accessibility barriers present.</li>
        <li><strong>Below 50:</strong> Poor – Significant accessibility issues.</li>
      </ul>

      <h2>Why Accessibility Matters</h2>
      <p>
        Accessibility ensures that everyone, including people with disabilities, can use your website effectively.
        Improving your score not only benefits users but also enhances SEO, legal compliance, and overall user experience.
      </p>
    </div>
  );
};

export default AccessibilityScoreExplanation;
