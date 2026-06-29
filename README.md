# AI Grammar Analysis Agent

An LLM-powered writing analysis agent that evaluates student paragraphs across nine error categories. Deployed for 100+ CSS (Central Superior Services) exam preparation students.

## Overview

Students preparing for CSS English essays often struggle with recurring, category-specific errors. This agent provides paragraph-level annotation with precise error classification and actionable correction guidance — replacing hours of manual marking with instant, consistent AI feedback.

## Nine Error Categories

| # | Category | Description |
|---|----------|-------------|
| 1 | **Grammar** | Incorrect tense, articles, prepositions, verb forms |
| 2 | **Capitalization** | Improper or missing capitalization |
| 3 | **Punctuation** | Missing or incorrect punctuation marks |
| 4 | **Spelling** | Misspelled words |
| 5 | **Subject-Verb Agreement (SVA)** | Mismatch between subject and verb number |
| 6 | **Sentence Structure** | Fragments, run-ons, dangling modifiers |
| 7 | **Informal Register** | Colloquialisms, contractions, casual phrasing |
| 8 | **Repetition** | Unnecessary word or idea repetition |
| 9 | **Overused Transitions** | Excessive use of "however," "moreover," "furthermore" |

## What It Does

1. Student submits a paragraph via the web interface
2. Claude API analyzes the paragraph against all nine categories
3. Each error is annotated inline with category label and suggested correction
4. Overall score and priority feedback is returned to the student
5. Teachers can view aggregate error patterns across the cohort

## Architecture

```
Next.js Frontend (student interface)
    |
    v
Node.js API Route (/api/analyze)
    |
    v
Claude API (claude-sonnet-4-6)
    | System prompt: nine-category classification
    | Output: structured JSON annotation
    |
    v
React annotation renderer (highlights + tooltips)
```

## Tech Stack

- **Next.js 14** — full-stack framework (frontend + API routes)
- **Node.js** — API layer
- **Claude API** (claude-sonnet-4-6) — error classification and annotation
- **Tailwind CSS** — styling
- **TypeScript** — type safety

## Folder Structure

```
ai-grammar-analysis-agent/
├── api/
│   └── analyze.ts
├── components/
│   ├── ParagraphInput.tsx
│   ├── AnnotatedOutput.tsx
│   └── ErrorSummary.tsx
├── prompts/
│   └── grammar-analyzer.txt
├── types/
│   └── analysis.ts
├── .env.example
├── package.json
└── README.md
```

## Setup

```bash
git clone https://github.com/jamshaidahmedd/ai-grammar-analysis-agent
cd ai-grammar-analysis-agent
npm install
cp .env.example .env
npm run dev
# Open http://localhost:3000
```

## Sample Annotated Output

**Student Input:**
> "Moreover, the goverment have been trying hardly to resolve this issue however they failed to made significant progres."

**Annotated Output:**
```json
{
  "errors": [
    { "original": "Moreover", "category": "Overused Transitions", "suggestion": "Consider removing or varying the transition" },
    { "original": "goverment", "category": "Spelling", "suggestion": "government" },
    { "original": "have been", "category": "Subject-Verb Agreement", "suggestion": "has been (singular subject: the government)" },
    { "original": "hardly", "category": "Grammar", "suggestion": "hard (adverb form for trying hard)" },
    { "original": "however", "category": "Punctuation", "suggestion": "Needs a semicolon before or start a new sentence" },
    { "original": "made", "category": "Grammar", "suggestion": "make (infinitive after failed to)" },
    { "original": "progres", "category": "Spelling", "suggestion": "progress" }
  ],
  "score": 54,
  "priority_feedback": "Focus on subject-verb agreement and spelling — these are your highest-frequency error categories.",
  "corrected": "The government has been trying hard to resolve this issue; however, it has failed to make significant progress."
}
```

## Deployment

Currently deployed on Vercel. Environment variable ANTHROPIC_API_KEY set via Vercel dashboard.

## License

MIT
