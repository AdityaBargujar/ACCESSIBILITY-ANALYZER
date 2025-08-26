// src/components/ResultDisplay.js
import React from "react";

function ResultDisplay({ result }) {
  // Nothing to show yet
  if (!result) return null;

  // Error state from backend
  if (result.error) {
    return (
      <div style={styles.wrap}>
        <div style={{ ...styles.card, ...styles.errorCard }}>
          <div style={styles.sectionTitle}>⚠️ Analysis Error</div>
          <p style={styles.text}>{result.error}</p>
        </div>
      </div>
    );
  }

  // Safe fallbacks
  const issues = Array.isArray(result.issues) ? result.issues : [];
  const suggestions = Array.isArray(result.suggestions) ? result.suggestions : [];
  const totalIssues =
    typeof result.totalIssues === "number" ? result.totalIssues : issues.length;
  const score = typeof result.score === "number" ? result.score : null;
  const clampedScore =
    score === null ? 0 : Math.max(0, Math.min(100, Math.round(score)));

  return (
    <div style={styles.wrap}>
      <div style={styles.card}>
        <h2 style={styles.title}>📊 Accessibility Report</h2>

        {/* Score */}
        <div style={styles.block}>
          <div style={styles.rowBetween}>
            <div style={styles.label}>Overall Score</div>
            <div
              style={{
                ...styles.badge,
                ...(clampedScore >= 80
                  ? styles.badgeGood
                  : clampedScore >= 50
                  ? styles.badgeWarn
                  : styles.badgeBad),
              }}
            >
              {clampedScore} / 100
            </div>
          </div>

          {/* Progress bar */}
          <div style={styles.progressTrack} aria-label="Score progress">
            <div
              style={{ ...styles.progressBar, width: `${clampedScore}%` }}
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={clampedScore}
            />
          </div>

          <div style={styles.metaLine}>
            <span style={styles.meta}>🧩 Total Issues: {totalIssues}</span>
          </div>
        </div>

        {/* Issues */}
        <div style={styles.block}>
          <div style={{ ...styles.sectionTitle, color: "#B45309" }}>
            ⚠️ Issues Found
          </div>
          {issues.length === 0 ? (
            <p style={styles.text}>No issues detected. 🎉</p>
          ) : (
            <ul style={styles.list}>
              {issues.map((issue, i) => (
                <li key={i} style={styles.listItem}>
                  {issue}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Suggestions */}
        <div style={styles.block}>
          <div style={{ ...styles.sectionTitle, color: "#2563EB" }}>
            💡 Suggestions
          </div>
          {suggestions.length === 0 ? (
            <p style={styles.text}>No suggestions — great job! ✅</p>
          ) : (
            <ul style={styles.list}>
              {suggestions.map((s, i) => (
                <li key={i} style={styles.listItem}>
                  {s}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

/* Minimal inline styles so you don’t need Tailwind or extra CSS */
const styles = {
  wrap: {
    display: "flex",
    justifyContent: "center",
    padding: "2rem 1rem",
  },
  card: {
    width: "100%",
    maxWidth: 900,
    background: "#fff",
    border: "1px solid #eef1f5",
    boxShadow: "0 8px 24px rgba(16,24,40,0.06)",
    borderRadius: 16,
    padding: 24,
  },
  errorCard: {
    borderColor: "#fecaca",
    background: "#fff1f2",
  },
  title: {
    margin: 0,
    fontSize: 24,
    fontWeight: 800,
    color: "#0f172a",
    marginBottom: 12,
  },
  block: {
    marginTop: 16,
  },
  rowBetween: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: 600,
    color: "#334155",
  },
  badge: {
    fontSize: 14,
    fontWeight: 700,
    padding: "6px 12px",
    borderRadius: 999,
  },
  badgeGood: { background: "#dcfce7", color: "#166534" },
  badgeWarn: { background: "#fef3c7", color: "#92400e" },
  badgeBad: { background: "#fee2e2", color: "#991b1b" },
  progressTrack: {
    marginTop: 10,
    height: 10,
    background: "#eef2f7",
    borderRadius: 999,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    background:
      "linear-gradient(90deg, #22c55e 0%, #f59e0b 60%, #ef4444 100%)",
  },
  metaLine: { marginTop: 8 },
  meta: { fontSize: 14, color: "#475569" },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 800,
    color: "#0f172a",
    marginBottom: 8,
  },
  text: { fontSize: 15, color: "#334155", lineHeight: 1.6, margin: 0 },
  list: { margin: 0, paddingLeft: 18, display: "grid", gap: 8, marginTop: 6 },
  listItem: {
    fontSize: 15,
    color: "#334155",
  },
};

export default ResultDisplay;
