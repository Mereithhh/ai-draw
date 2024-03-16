import { draw } from "./core";

export async function POST(request: Request) {
    const body = await request.json()
    const { prompt , preset} = body;
    
    try {
      const res = await draw(prompt,preset)
  
      return Response.json({ code: 0, data: res })
    } catch (err: any) {
      if (err.message !== "已经达到API使用次数限制") {
        console.log(err)
      }
      return Response.json({ code: 1, msg: err.message })
    }
  
  }