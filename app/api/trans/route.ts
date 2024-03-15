import OpenAI from "openai";
import { getOpenAI } from "../preset/db";

export async function POST(request: Request) {
  const body = await request.json();
  const { prompt } = body;
  console.time("openaiSetting");
  const openaiSetting = await getOpenAI();
  if (!openaiSetting) throw new Error("openai setting not found");
  console.timeEnd("openaiSetting");
  console.time("chatCompletion");
  const openai = new OpenAI({
    apiKey:
      openaiSetting.key ??
      "", // This is the default and can be omitted
  });

  const chatCompletion = await openai.chat.completions.create({
    messages: [
      {
        role: "user",
        content: openaiSetting.transPrompt.replace("{提示词}", prompt),
        
      },
    ],
    model: openaiSetting.transModel ?? "gpt-3.5-turbo",
    max_tokens: openaiSetting.transMaxToken ?? 512,
  });
  console.timeEnd("chatCompletion");

  try {
    const res = chatCompletion.choices[0].message.content;

    return Response.json({ code: 0, data: res });
  } catch (err: any) {
    console.log(err);
    return Response.json({ code: 1, msg: err.message });
  }
}
