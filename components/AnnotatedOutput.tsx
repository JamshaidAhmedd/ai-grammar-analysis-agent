"use client";

interface GrammarError {
  original: string;
  category: string;
  suggestion: string;
}

interface Props {
  errors: GrammarError[];
  corrected: string;
  score: number;
  priority_feedback: string;
}

const CATEGORY_COLORS: Record<string, string> = {
  "Grammar": "bg-red-100 text-red-800",
  "Spelling": "bg-orange-100 text-orange-800",
  "Subject-Verb Agreement": "bg-yellow-100 text-yellow-800",
  "Punctuation": "bg-blue-100 text-blue-800",
  "Capitalization": "bg-purple-100 text-purple-800",
  "Sentence Structure": "bg-pink-100 text-pink-800",
  "Informal Register": "bg-green-100 text-green-800",
  "Repetition": "bg-teal-100 text-teal-800",
  "Overused Transitions": "bg-gray-100 text-gray-800",
};

export default function AnnotatedOutput({ errors, corrected, score, priority_feedback }: Props) {
  return (
    <div className="w-full max-w-2xl mx-auto p-4 space-y-4">
      <div className="text-2xl font-bold">Score: {score}/100</div>
      <p className="text-gray-600 italic">{priority_feedback}</p>
      <div className="space-y-2">
        {errors.map((err, i) => (
          <div key={i} className="flex items-start gap-2 p-2 border rounded">
            <span className={`text-xs px-2 py-1 rounded font-medium ${CATEGORY_COLORS[err.category] || "bg-gray-100"}`}>
              {err.category}
            </span>
            <div>
              <span className="line-through text-red-500">{err.original}</span>
              <span className="ml-2 text-green-600">→ {err.suggestion}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="p-3 bg-green-50 border border-green-200 rounded">
        <div className="text-sm font-semibold text-green-800 mb-1">Corrected Version:</div>
        <p className="text-gray-700">{corrected}</p>
      </div>
    </div>
  );
}
