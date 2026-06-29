export interface GrammarError {
  original: string;
  category: string;
  suggestion: string;
}

export interface AnalysisResult {
  errors: GrammarError[];
  score: number;
  priority_feedback: string;
  corrected: string;
}
