import { generatePrompt } from "@/lib/cloudflare"
import "dotenv"
export const testSendMessage = async () => {
    const res = await generatePrompt()
    console.log(res)
}



testSendMessage()