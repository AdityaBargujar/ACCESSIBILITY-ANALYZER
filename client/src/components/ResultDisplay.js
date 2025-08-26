import React from "react";

function ResultDisplay({ result }) {
  if (!result) return null;

  return (
    <div className="result">
      {result.error ? (
        <p style={{ color: "red" }}>{result.error}</p>
      ) : (
        <>
          <h2>Accessibility Report</h2>
          <p><strong>Score:</strong> {result.score}/100</p>
          <p><strong>Total Issues:</strong> {result.totalIssues || result.issues.length}</p>

          <h3>Issues Found:</h3>
          <ul>
            {result.issues.map((issue, index) => (
              <li key={index}>{issue}</li>
            ))}
          </ul>

          <h3>Suggestions:</h3>
          <ul>
            {result.suggestions.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default ResultDisplay;
