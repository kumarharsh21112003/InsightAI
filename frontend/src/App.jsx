import { useState } from 'react';
import VideoInput from './components/VideoInput';
import SummaryCard from './components/SummaryCard';
import Flashcards from './components/Flashcards';
import AgentChat from './components/AgentChat';

function App() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  const handleAnalyze = async (url) => {
    setLoading(true);
    setError('');
    setData(null);
    try {
      const res = await fetch('http://localhost:5001/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error);
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            InsightAI Agent
          </h1>
          <p className="text-gray-400 text-lg">
            Paste a YouTube URL and let Gemini 1.5 Pro instantly generate notes, flashcards, and a Q&A agent.
          </p>
        </div>

        {/* Input Section */}
        <VideoInput onAnalyze={handleAnalyze} loading={loading} />

        {/* Error Handling */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-xl text-center">
            {error}
          </div>
        )}

        {/* Results Section */}
        {data && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            
            {/* Left Column: Summary & Flashcards */}
            <div className="lg:col-span-2 space-y-8">
              <SummaryCard title={data.title} summary={data.summary} takeaways={data.keyTakeaways} />
              <Flashcards flashcards={data.flashcards} />
            </div>

            {/* Right Column: Chat Agent */}
            <div className="lg:col-span-1">
              <AgentChat />
            </div>

          </div>
        )}
      </div>
    </div>
  );
}

export default App;
