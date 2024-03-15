export async function POST(request: Request) {
  try {
    const res = {
      queue_pending: [],
      queue_running: [],
    };

    return Response.json({ code: 0, data: res });
  } catch (err: any) {
    console.log(err);
    return Response.json({ code: 1, msg: err.message });
  }
}
