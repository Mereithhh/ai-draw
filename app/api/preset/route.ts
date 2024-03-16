import { presets } from "@/lib/preset"



export async function POST(request: Request) {

    try {

      const res = presets
  
      return Response.json({ code: 0, data: res })
    } catch (err: any) {
        console.log(err)
      return Response.json({ code: 1, msg: err.message })
    }
  
  }