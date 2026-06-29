"use client";

interface Props {
  errors: Array<{ category: string }>;
}

export default function ErrorSummary({ errors }: Props) {
  const counts: Record<string, number> = {};
  errors.forEach((e) => { counts[e.category] = (counts[e.category] || 0) + 1; });
  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <h3 className="font-semibold mb-2">Error Breakdown</h3>
      <div className="space-y-1">
        {sorted.map(([cat, count]) => (
          <div key={cat} className="flex justify-between text-sm">
            <span>{cat}</span>
            <span className="font-mono font-bold">{count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
