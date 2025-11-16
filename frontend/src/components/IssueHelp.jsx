import React from 'react';
import { createPortal } from 'react-dom';
import { getIssueHelp } from '../utils/issueExplainer';

export default function IssueHelp({ issueId, onClose }) {
  const help = getIssueHelp(issueId);

  // Guard for SSR / tests where document may not exist
  if (typeof document === 'undefined') return null;

  const modal = (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-md z-40"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal container */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none">
        <div
          role="dialog"
          aria-modal="true"
          aria-label={help.title}
          className="bg-[#0d1117] border border-gray-700 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl pointer-events-auto"
        >
          {/* Header */}
          <div className="sticky top-0 bg-linear-to-r from-blue-500/20 to-purple-500/20 border-b border-gray-700 p-6 flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">{help.title}</h2>
              <span className="inline-block bg-blue-500/30 text-blue-300 px-3 py-1 rounded-full text-sm font-semibold">
                {help.wcagLevel}
              </span>
            </div>
            <button
              onClick={onClose}
              aria-label="Close help"
              className="text-gray-400 hover:text-white text-2xl font-bold transition"
            >
              ✕
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            <section>
              <h3 className="text-lg font-bold text-blue-300 mb-2">📝 What Does This Mean?</h3>
              <p className="text-gray-300 leading-relaxed">{help.explanation}</p>
            </section>

            <section className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
              <h3 className="text-lg font-bold text-yellow-300 mb-2">⚠️ Why Is This Important?</h3>
              <p className="text-gray-300 leading-relaxed">{help.why}</p>
            </section>

            <section className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <h3 className="text-lg font-bold text-green-300 mb-2">✅ How to Fix It</h3>
              <p className="text-gray-300 leading-relaxed">{help.howToFix}</p>
            </section>

            {help.example && (
              <section className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                <h3 className="text-lg font-bold text-purple-300 mb-3">💡 Example</h3>
                <pre className="bg-black/50 p-3 rounded text-sm text-gray-300 overflow-x-auto whitespace-pre-wrap word-break font-mono">
                  {help.example}
                </pre>
              </section>
            )}

            <section className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <h3 className="text-lg font-bold text-blue-300 mb-2">💡 Pro Tips</h3>
              <ul className="text-gray-300 space-y-2 ml-4">
                <li>• Use browser DevTools (F12) to inspect elements and find exact locations</li>
                <li>• Test with screen readers like NVDA (Windows) or VoiceOver (Mac)</li>
                <li>• Use tools like WebAIM contrast checker for color issues</li>
                <li>• Validate HTML with W3C Validator</li>
              </ul>
            </section>
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-gray-800/50 border-t border-gray-700 p-4 flex justify-end">
            <button
              onClick={onClose}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition"
            >
              Got It!
            </button>
          </div>
        </div>
      </div>
    </>
  );

  return createPortal(modal, document.body);
}
