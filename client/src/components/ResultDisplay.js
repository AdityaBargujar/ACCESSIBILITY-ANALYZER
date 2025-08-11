import React from 'react';

function ResultDisplay({ result }) {
  if (!result) return null;
  if (result.error) {
    return <div className="error">{result.error}</div>;
  }

  return (
    <div className="results">
      <h2>Accessibility Report</h2>
      {result.issues && result.issues.length > 0 ? (
        <ul>
          {result.issues.map((issue, index) => (
            <li key={index}>
              <strong>{issue.type}</strong>: {issue.message}
            </li>
          ))}
        </ul>
      ) : (
        <p>No major accessibility issues found. 🎉</p>
      )}
    </div>
  );
}

export default ResultDisplay;
