import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req: NextRequest) {
  const { paragraph } = await req.json();
  if (!paragraph || paragraph.length > 2000) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }
  const systemPrompt = fs.readFileSync(
    path.join(process.cwd(), "prompts/grammar-analyzer.txt"),
    "utf8"
  );
  const message = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 2048,
    system: systemPrompt,
    messages: [{ role: "user", content: `Analyze this paragraph:\n\n${paragraph}` }],
  });
  const responseText = message.content[0].type === "text" ? message.content[0].text : "";
  try {
    const analysis = JSON.parse(responseText);
    return NextResponse.json(analysis);
  } catch {
    return NextResponse.json({ error: "Analysis failed", raw: responseText }, { status: 500 });
  }
}
