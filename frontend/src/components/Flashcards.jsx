import { useState } from 'react';

export default function Flashcards({ flashcards }) {
  if (!flashcards || flashcards.length === 0) return null;

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-white mb-4">Study Flashcards</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {flashcards.map((card, i) => (
          <Flashcard key={i} question={card.question} answer={card.answer} />
        ))}
      </div>
    </div>
  );
}

function Flashcard({ question, answer }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="relative h-48 w-full cursor-pointer group perspective-1000"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className={`relative h-full w-full transition-transform duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
        
        {/* Front (Question) */}
        <div className="absolute inset-0 backface-hidden bg-gray-900 border border-gray-800 rounded-xl p-6 flex flex-col items-center justify-center text-center shadow-lg hover:border-blue-500/50 transition-colors">
          <span className="text-blue-400 text-xs font-bold uppercase tracking-wider mb-2">Question</span>
          <p className="text-gray-200 font-medium">{question}</p>
        </div>

        {/* Back (Answer) */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 bg-blue-900/20 border border-blue-500/30 rounded-xl p-6 flex flex-col items-center justify-center text-center shadow-lg">
          <span className="text-purple-400 text-xs font-bold uppercase tracking-wider mb-2">Answer</span>
          <p className="text-gray-200">{answer}</p>
        </div>

      </div>
    </div>
  );
}
