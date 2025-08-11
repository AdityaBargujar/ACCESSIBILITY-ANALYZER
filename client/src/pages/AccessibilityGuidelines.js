import React from "react";
import "./AccessibilityGuidelines.css";

const guidelines = [
  {
    title: "Perceivable",
    description:
      "Information and user interface components must be presented to users in ways they can perceive. This means users must be able to perceive the information being presented.",
    examples: [
      "Provide text alternatives for non-text content",
      "Provide captions for videos",
      "Use sufficient color contrast"
    ]
  },
  {
    title: "Operable",
    description:
      "User interface components and navigation must be operable. Users must be able to navigate and use the interface effectively.",
    examples: [
      "All functionality should be accessible via keyboard",
      "Provide users enough time to read and use content",
      "Avoid content that causes seizures"
    ]
  },
  {
    title: "Understandable",
    description:
      "Information and the operation of the user interface must be understandable. Users should be able to comprehend the content and how to use the interface.",
    examples: [
      "Make text readable and understandable",
      "Make web pages appear and operate in predictable ways",
      "Help users avoid and correct mistakes"
    ]
  },

];

const AccessibilityGuidelines = () => {
  return (
    <div className="guidelines-container">
      <h1>Web Accessibility Guidelines (WCAG)</h1>
      <p className="intro">
        The Web Content Accessibility Guidelines (WCAG) help make web content more
        accessible to people with disabilities. These are the four main principles:
      </p>
      <div className="guidelines-list">
        {guidelines.map((guideline, index) => (
          <div key={index} className="guideline-card">
            <h2>{guideline.title}</h2>
            <p>{guideline.description}</p>
            <ul>
              {guideline.examples.map((example, i) => (
                <li key={i}>{example}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccessibilityGuidelines;
