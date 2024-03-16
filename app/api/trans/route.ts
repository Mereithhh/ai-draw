import { rewritePropmt } from "@/lib/cloudflare";
import { LimitManager } from "@/lib/limit";

// 改写 prompt
export async function POST(request: Request) {
  const body = await request.json();
  const { prompt } = body;
  const hasReachLimit = LimitManager.getInstance().check(1)
  if (hasReachLimit) {
    return Response.json({ code: 1, msg: "已经达到API使用次数限制" });
  }
  console.time("rewritePropmt");
  const writeRes = await rewritePropmt(prompt)

  console.timeEnd("rewritePropmt");


  try {
    const res = writeRes

    return Response.json({ code: 0, data: res });
  } catch (err: any) {
    console.log(err);
    return Response.json({ code: 1, msg: err.message });
  }
}
