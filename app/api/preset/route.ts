import { CFImageModel } from "@/lib/cloudflare"

export const getPreset = async (id: string) => {
  const preset = presets.find((item) => item._id === id)
  if (!preset) {
    throw new Error("preset not found")
  }
  return preset
}

export const presets: {
  name: string,
  _id: string,
  model: CFImageModel
}[] = [
  {
    name: "dreamshaper-8-lcm",
    _id: "110",
    model: "@cf/lykon/dreamshaper-8-lcm"
  },
  {
    name: "sd-xl-lightning",
    _id: "111",
    model: "@cf/bytedance/stable-diffusion-xl-lightning"
  },
  {
    name: "sd-1.5-inpainting",
    _id: "112",
    model: "@cf/runwayml/stable-diffusion-v1-5-inpainting"
  },
  {
    name: "sd-xl-base",
    _id: "113",
    model: "@cf/stabilityai/stable-diffusion-xl-base-1.0"
  },
]

export async function POST(request: Request) {

    try {

      const res = presets
  
      return Response.json({ code: 0, data: res })
    } catch (err: any) {
        console.log(err)
      return Response.json({ code: 1, msg: err.message })
    }
  
  }