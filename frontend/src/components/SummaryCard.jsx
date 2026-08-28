import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function SummaryCard({ title, summary, takeaways }) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl shadow-xl overflow-hidden">
      {/* Title */}
      <div className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 p-6 border-b border-gray-800">
        <h2 className="text-2xl font-bold text-white">{title || "Video Analysis"}</h2>
      </div>

      <div className="p-6 space-y-6">
        {/* Summary */}
        <div>
          <h3 className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-3">AI Summary</h3>
          <div className="prose prose-invert prose-sm max-w-none prose-pre:bg-gray-950 prose-pre:border prose-pre:border-gray-800 text-gray-300">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{summary}</ReactMarkdown>
          </div>
        </div>

        {/* Key Takeaways */}
        {takeaways && takeaways.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-purple-400 uppercase tracking-wider mb-3">Key Takeaways</h3>
            <ul className="space-y-4">
              {takeaways.map((point, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-purple-500 shrink-0"></span>
                  <div className="prose prose-invert prose-sm max-w-none text-gray-300">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{point}</ReactMarkdown>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
