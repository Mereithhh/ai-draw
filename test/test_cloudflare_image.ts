import { fetchDraw } from "@/lib/cloudflare"
import "dotenv"
import fs from "fs"
export const testDraw = async () => {
    const res = await fetchDraw({model: "@cf/lykon/dreamshaper-8-lcm", prompt: "cyberpunk cat"})
    console.log(res)
    if (!res) {
        console.log("no response")
    }
    

    fs.writeFileSync("test.png", Buffer.from(res))

}



testDraw()