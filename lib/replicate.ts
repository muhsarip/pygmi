import Replicate from "replicate"

const token = process.env.REPLICATE_API_TOKEN

if (!token) {
  console.warn("REPLICATE_API_TOKEN not set")
}

export const replicate = new Replicate({
  auth: token || "",
})
