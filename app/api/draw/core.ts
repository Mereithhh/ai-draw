import { DrawParams, fetchDraw, translatePrompt } from "@/lib/cloudflare";
import fs from "fs"
import path from "path"
import { getPreset } from "../preset/route";

const getParams = async (prompt: string, presetId: string) => {
  const transedPrompt =await translatePrompt(prompt);
  const preset = await getPreset(presetId)
  return {
    model: preset.model,
    prompt: transedPrompt,
  } as DrawParams
}

export const draw = async (prompt: string, presetId: string) => {

  console.log("draw", prompt, presetId);
  const drawParams: DrawParams = await getParams(prompt, presetId);
  const arrayBuffer = await fetchDraw(drawParams);
  const filename = `${drawParams.model.split("/").pop()}-${new Date().valueOf()}.png`;
  const filePath = path.join("public", "images", filename); 
  fs.writeFileSync(filePath, Buffer.from(arrayBuffer))
  console.log("saveFile", filePath, arrayBuffer.byteLength)

  const images: { filename: string }[] = [];
  images.push({ filename });

  return images;
};

