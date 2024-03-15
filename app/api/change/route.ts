import OpenAI from "openai";
import { getOpenAI } from "../preset/db";
import { generatePrompt, rewritePropmt } from "@/lib/cloudflare";

export async function POST(request: Request) {
  console.time("generatePrompt");
  const p = await generatePrompt()
  console.timeEnd("generatePrompt");

  try {
    const res = p

    return Response.json({ code: 0, data: res });
  } catch (err: any) {
    console.log(err);
    return Response.json({ code: 1, msg: err.message });
  }
}
