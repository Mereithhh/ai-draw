import { ComfyUIClient } from "../../../lib/client";
import type { Prompt } from "../../../lib/types";
import { findPersetById } from "../preset/db";
import {v4} from "uuid"

const serverAddress = "192.168.5.121:8188";
const clientId = v4();
const client = new ComfyUIClient(serverAddress, clientId);


const getPrompt = async (prompt: string, presetId: string) => {
  const preset = (await findPersetById(presetId)) as any;
  const promptInner = preset.data;
  for (const nodeId of Object.keys(promptInner)) {
    if (promptInner[nodeId].class_type == "DeepTranslatorCLIPTextEncodeNode") {
      promptInner[nodeId].inputs.text = prompt;
    }
    if (promptInner[nodeId].class_type == "KSampler") {
      promptInner[nodeId].inputs.seed = Math.floor(
        Math.random() * 1000000000000000
      );
    }
  }
  return promptInner;
};

export const draw = async (prompt: string, preset: string) => {
  if (!client.isConnected()) {
    await client.connect();

  }


  console.log("draw", prompt, preset);
  const promptInner: Prompt = await getPrompt(prompt, preset);

  const response = await client.getImages(promptInner);
  await client.saveImages(response, "public/images");
  const images: { filename: string }[] = [];
  for (const nodeId of Object.keys(response)) {
    for (const img of response[nodeId]) {
      const { filename } = img.image;
      images.push({ filename });
    }
  }


  return images;
};

export const getQuque = async () => {
  if (!client.isConnected()) {
    await client.connect();
  }
  
  const queue = await client.getQueue();
  return queue;
};
