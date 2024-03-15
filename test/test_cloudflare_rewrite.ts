import { rewritePropmt } from "@/lib/cloudflare"
import "dotenv"
export const testSendMessage = async () => {
    const res = await rewritePropmt("赛博朋克风格的猫")
    console.log(res)
}



testSendMessage()