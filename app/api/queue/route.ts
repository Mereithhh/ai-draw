import { LimitManager } from "@/lib/limit";

export async function POST(request: Request) {
  try {
    const res = {
      rest_time: LimitManager.getInstance().getRestTime(),
    }

    return Response.json({ code: 0, data: res });
  } catch (err: any) {
    console.log(err);
    return Response.json({ code: 1, msg: err.message });
  }
}
