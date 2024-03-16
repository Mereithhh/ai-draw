
export async function POST(request: Request) {
  const setting = {
    autoTrans: false,
    defaultPrompt: "猫咪在写代码，赛博朋克风格"
  }

  try {
    const res = setting

    return Response.json({ code: 0, data: res });
  } catch (err: any) {
    console.log(err);
    return Response.json({ code: 1, msg: err.message });
  }
}
