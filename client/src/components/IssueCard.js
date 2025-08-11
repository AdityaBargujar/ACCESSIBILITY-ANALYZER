import React from 'react';
import './IssueCard.css'; // Optional: separate styling for cards

function IssueCard({ issue }) {
  return (
    <div className="issue-card">
      <h3 className="issue-type">⚠️ {issue.type}</h3>
      <p className="issue-message">{issue.message}</p>
      {issue.selector && (
        <p className="issue-selector"><strong>Element:</strong> {issue.selector}</p>
      )}
      {issue.suggestion && (
        <p className="issue-suggestion"><strong>Suggestion:</strong> {issue.suggestion}</p>
      )}
    </div>
  );
}

export default IssueCard;
