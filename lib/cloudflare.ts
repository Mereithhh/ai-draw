
const gateway = process.env.CLOUDFLARE_GATEWAY || "";
const apiToken = process.env.CLOUDFLARE_API_TOKEN || "";

export type CFMessage = {
    role: "system" | "user",
    content: string;
}

export type CFMessageInput = {
    messages: CFMessage[];
}

export type CFChatModel = "@cf/qwen/qwen1.5-14b-chat-awq";

export const sendCFMessage = async (model: CFChatModel,input: CFMessageInput) => {
  
  const endpoint = `${gateway}/${model}`;
  const response = await fetch(endpoint, {
    headers: { Authorization: `Bearer ${apiToken}` },
    method: "POST",
    body: JSON.stringify(input),
  });
  // console.log(input)
  const result = await response.json();
  return result;
};

export type CFImageModel = "@cf/bytedance/stable-diffusion-xl-lightning" |
    "@cf/runwayml/stable-diffusion-v1-5-inpainting" |
    "@cf/lykon/dreamshaper-8-lcm" | 
    "@cf/stabilityai/stable-diffusion-xl-base-1.0"


export type DrawParams = {
    prompt: string;
    model: CFImageModel;
    num_steps?: number;
    strength?:number;
    guidance?: number;
    mask?: string;
    image?: string;
}
export const fetchDraw = async (params: DrawParams) => {
  const endpoint = `${gateway}/${params.model}`;
  const {model,...restBody} = params
  const response = await fetch(endpoint, {
    headers: { Authorization: `Bearer ${apiToken}` },
    method: "POST",
    body: JSON.stringify(restBody),
  });

  const status = response.status;
  if (status !== 200) {
    throw new Error(`Failed to fetch draw: ${status}`);
  }
  const arrayBuffer = await response.arrayBuffer();
  // console.log(input)

  return arrayBuffer;
}

export const translatePrompt = async (input: string) => {
  const prompt = "你是一个英文翻译官，你会把用户的输入都翻译成英语，如果已经是英语的部分则不做改动。你不会输出任何多余的内容，只把用户的输入翻译出来即可。 如果用户的输入通过标点符号分割，请你也保持用标点符号分割，无需翻译成完整的句子。"
  return await processPrompt(input,prompt)
}

export const processPrompt = async (input: string, prompt: string) => {
  const res =await  sendCFMessage("@cf/qwen/qwen1.5-14b-chat-awq", {messages: [
    {
        role: "system",
        content: prompt,
    },{
        role: "user",
        content: input
    }
  ]})
  if (!res) {
    console.log("no response")
    return input
  }
  if (!res?.success) {
    console.log("no success",res)
    return input
  }
  if (!res?.result?.response) {
    console.log("no response",res)
    return input
  }
  return res?.result?.response
}

export const rewritePropmt = async (input: string) => {
  const prompt = `我想让你作为一个提示词生成器，帮我生成用于文生图模型的 prompt。我会给你简短的描述，请你帮我把描述扩写，插入一些想象，小于150字。请不要说对于的内容，直接给我改写后的文字即可，无论我输入什么语言，请都用英语回答。  这是第一个输入: [${input}]`
  return await processPrompt(input,prompt)
}

export const generatePrompt = async () => {
  const prompt = `请帮我随机生成一段图片的描述，发挥你的想象力，任何题材任何内容都行，这个描述将用于ai绘图。不要重复。尽量简短，少于50字，请直接用中文输出，不要加任何多余的话。输出时尽量用一些单词描述，用逗号分隔，而不是说一个完整的话。 `
  return await processPrompt("",prompt)
}