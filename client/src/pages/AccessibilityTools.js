import React from "react";
import "./AccessibilityTools.css"; // Create this CSS file for styling

const AccessibilityTools = () => {
  return (
    <div className="tools-container">
      <h1>🛠️ Accessibility Tools & Resources</h1>
      <p>
        Here are some amazing tools and resources to help you build
        accessible, user-friendly websites for everyone.
      </p>

      <section>
        <h2>🔍 Testing & Auditing Tools</h2>
        <ul>
          <li>
            <a href="https://wave.webaim.org/" target="_blank" rel="noreferrer">
              WAVE – Web Accessibility Evaluation Tool
            </a>{" "}
            – Analyze your web pages for WCAG compliance.
          </li>
          <li>
            <a href="https://accessibilityinsights.io/" target="_blank" rel="noreferrer">
              Accessibility Insights
            </a>{" "}
            – Test for accessibility issues with automated checks.
          </li>
          <li>
            <a href="https://chrome.google.com/webstore/detail/axe-devtools-web-accessib/lhdoppojpmngadmnindnejefpokejbdd"
              target="_blank" rel="noreferrer">
              Axe DevTools
            </a>{" "}
            – Chrome extension for accessibility testing.
          </li>
        </ul>
      </section>

      <section>
        <h2>🎨 Design & Color Tools</h2>
        <ul>
          <li>
            <a href="https://contrast-ratio.com/" target="_blank" rel="noreferrer">
              Contrast Ratio Checker
            </a>{" "}
            – Ensure text meets WCAG contrast requirements.
          </li>
          <li>
            <a href="https://colororacle.org/" target="_blank" rel="noreferrer">
              Color Oracle
            </a>{" "}
            – Simulate color blindness to improve designs.
          </li>
          <li>
            <a href="https://www.toptal.com/designers/colorfilter/" target="_blank" rel="noreferrer">
              Color Blind Filter
            </a>{" "}
            – Test designs for color accessibility.
          </li>
        </ul>
      </section>

      <section>
        <h2>📚 Learning Resources</h2>
        <ul>
          <li>
            <a href="https://www.w3.org/WAI/standards-guidelines/wcag/"
              target="_blank" rel="noreferrer">
              WCAG Guidelines
            </a>{" "}
            – Official accessibility standards.
          </li>
          <li>
            <a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility"
              target="_blank" rel="noreferrer">
              MDN Web Docs: Accessibility
            </a>{" "}
            – Comprehensive accessibility guide.
          </li>
          <li>
            <a href="https://a11yproject.com/" target="_blank" rel="noreferrer">
              The A11Y Project
            </a>{" "}
            – Community-driven accessibility resources.
          </li>
        </ul>
      </section>
    </div>
  );
};

export default AccessibilityTools;
