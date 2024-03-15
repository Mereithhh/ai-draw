
export async function POST(request: Request) {
  const setting = {
    autoTrans: false,
    defaultPrompt: "在梦幻的世界里，月光云彩化身为顽皮的形状，揭示出一幅奇幻的画面。一只脸上绘有星辰图案的调皮猫在飘浮的星星之间舞动。它的眼睛闪烁着夜晚的神秘光辉，而空中留下的梦幻星光勾勒出它每一个优雅的动作。一种迷人的魔法氛围环绕着这个充满幻想的猫儿梦境。"
  }

  try {
    const res = setting

    return Response.json({ code: 0, data: res });
  } catch (err: any) {
    console.log(err);
    return Response.json({ code: 1, msg: err.message });
  }
}
