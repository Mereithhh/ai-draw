import { sendCFMessage } from "@/lib/cloudflare"
import "dotenv"
export const testSendMessage = async () => {
    const res = await sendCFMessage("@cf/qwen/qwen1.5-14b-chat-awq", {messages: [
        {
            role: "system",
            content: "你是一个英文翻译官，你会把用户的输入都翻译成英语，如果已经是英语的部分则不做改动。你不会输出任何多余的内容，只把用户的输入翻译出来即可。 如果用户的输入通过标点符号分割，请你也保持用标点符号分割，无需翻译成完整的句子。"
        },
        {
            role: "user",
            content: "赛博朋克风格的猫"
        }
    ]})
    console.log(res)
}



testSendMessage()