import { DrawParams, fetchDraw, translatePrompt } from "@/lib/cloudflare";
import { LimitManager } from "@/lib/limit";
import { getPreset } from "@/lib/preset";
import fs from "fs";
import path from "path";

const getParams = async (prompt: string, presetId: string) => {
  const transedPrompt = await translatePrompt(prompt);
  console.log("transedPrompt", transedPrompt)
  const preset = await getPreset(presetId);
  return {
    model: preset.model,
    prompt: transedPrompt,
  } as DrawParams;
};

export const draw = async (prompt: string, presetId: string) => {
  console.log("draw", prompt, presetId);
  // 消耗两次

  const hasReachLimit = LimitManager.getInstance().check(2);
  if (hasReachLimit) {
    throw new Error("已经达到API使用次数限制");
  }

  const drawParams: DrawParams = await getParams(prompt, presetId);
  const arrayBuffer = await fetchDraw(drawParams);
  const filename = `${drawParams.model
    .split("/")
    .pop()}-${new Date().valueOf()}.png`;
  const filePath = path.join("public", "images", filename);
  fs.writeFileSync(filePath, Buffer.from(arrayBuffer));
  console.log("saveFile", filePath, arrayBuffer.byteLength);

  const images: { filename: string }[] = [];
  images.push({ filename });

  return images;
};
