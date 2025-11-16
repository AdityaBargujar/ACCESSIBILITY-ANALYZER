export default function SuggestionCard({ s }) {
  return (
    <div className="bg-linear-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 p-6 rounded-xl shadow-lg hover:shadow-green-500/30 transition-all duration-300 backdrop-blur-sm group">
      
      {/* Header with Icon */}
      <div className="flex items-start gap-3 mb-4">
        <span className="text-2xl">💡</span>
        <h3 className="font-bold text-lg text-green-300 group-hover:text-green-200 transition">
          {s.title}
        </h3>
      </div>

      {/* Description */}
      <p className="text-gray-300 text-sm leading-relaxed mb-4 ml-11">
        {s.text}
      </p>

      {/* References/Tags */}
      {s.references && s.references.length > 0 && (
        <div className="ml-11 flex flex-wrap gap-2 pt-3 border-t border-green-500/20">
          {s.references.map((ref, i) => (
            <span
              key={i}
              className="bg-green-500/20 text-green-300 text-xs px-3 py-1 rounded-full font-medium hover:bg-green-500/30 transition"
            >
              {ref}
            </span>
          ))}
        </div>
      )}

      {/* Source Badge */}
      <div className="mt-4 ml-11">
        {s.source === 'ai' ? (
          <span className="text-xs text-green-400 font-semibold opacity-75">✨ AI Suggestion</span>
        ) : (
          <span className="text-xs text-gray-400 font-medium opacity-70">Automated suggestion</span>
        )}
      </div>
    </div>
  );
}
