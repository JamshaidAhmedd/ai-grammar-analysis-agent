"use client";
import { useState } from "react";

interface Props {
  onAnalyze: (paragraph: string) => void;
  isLoading: boolean;
}

export default function ParagraphInput({ onAnalyze, isLoading }: Props) {
  const [text, setText] = useState("");
  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <textarea
        className="w-full h-48 p-3 border rounded-lg text-gray-800 resize-none"
        placeholder="Paste your paragraph here for grammar analysis..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        maxLength={2000}
      />
      <div className="flex justify-between items-center mt-2">
        <span className="text-sm text-gray-400">{text.length}/2000 characters</span>
        <button
          onClick={() => onAnalyze(text)}
          disabled={isLoading || text.trim().length < 20}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
        >
          {isLoading ? "Analyzing..." : "Analyze"}
        </button>
      </div>
    </div>
  );
}
