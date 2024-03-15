import fs from "fs";
export async function GET(request: Request) {
  const query = new URL(request.url).searchParams;
  const path = query.get("path") || "";

  const imgPath = `public/images/${path}`;

  const file = fs.readFileSync(imgPath);

    return new Response(file, { status: 200, headers: {
        "Content-Type": "image/png",
    } });
}
