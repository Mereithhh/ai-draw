import OpenAI from "openai";
import { getOpenAI } from "../preset/db";
import { rewritePropmt } from "@/lib/cloudflare";

// 改写 prompt
export async function POST(request: Request) {
  const body = await request.json();
  const { prompt } = body;

  console.time("rewritePropmt");
  const writeRes = await rewritePropmt(prompt)

  console.timeEnd("rewritePropmt");


  try {
    const res = writeRes

    return Response.json({ code: 0, data: res });
  } catch (err: any) {
    console.log(err);
    return Response.json({ code: 1, msg: err.message });
  }
}
