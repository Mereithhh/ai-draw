import { generatePrompt } from "@/lib/cloudflare";
import { LimitManager } from "@/lib/limit";

export async function POST(request: Request) {
  const hasReachLimit = LimitManager.getInstance().check(1);
  if (hasReachLimit) {
    return Response.json({ code: 1, msg: "已经达到API使用次数限制" });
  }

  console.time("generatePrompt");
  const p = await generatePrompt();
  console.timeEnd("generatePrompt");

  try {
    const res = p;

    return Response.json({ code: 0, data: res });
  } catch (err: any) {
    console.log(err);
    return Response.json({ code: 1, msg: err.message });
  }
}
