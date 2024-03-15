import {  getSetting } from "../preset/db";

export async function POST(request: Request) {
  const setting = await getSetting();

  try {
    const res = setting

    return Response.json({ code: 0, data: res });
  } catch (err: any) {
    console.log(err);
    return Response.json({ code: 1, msg: err.message });
  }
}
