import { NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { replicate } from "@/lib/replicate"

export async function POST(request: NextRequest) {
  const cookieStore = await cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          )
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await request.json()
  const { prompt, aspectRatio, numOutputs, hdr } = body

  if (!prompt) {
    return NextResponse.json({ error: "Prompt is required" }, { status: 400 })
  }

  // Check credits
  const { data: profile } = await supabase
    .from("profiles")
    .select("credits")
    .eq("id", user.id)
    .single()

  if (!profile || profile.credits < 1) {
    return NextResponse.json({ error: "Insufficient credits" }, { status: 400 })
  }

  // Deduct credits
  await supabase
    .from("profiles")
    .update({ credits: profile.credits - 1 })
    .eq("id", user.id)

  // Create generation record
  const { data: generation, error: genError } = await supabase
    .from("generations")
    .insert({
      user_id: user.id,
      prompt,
      settings: { aspectRatio, numOutputs, hdr },
      status: "pending",
    })
    .select()
    .single()

  if (genError) {
    return NextResponse.json({ error: "Failed to create generation" }, { status: 500 })
  }

  try {
    // Call Replicate API
    const output = await replicate.run("black-forest-labs/flux-schnell", {
      input: {
        prompt,
        num_outputs: numOutputs || 1,
        aspect_ratio: aspectRatio || "1:1",
      },
    })

    // FileOutput objects need toString() to get URL
    const outputArray = Array.isArray(output) ? output : [output]
    const imageUrls: string[] = []

    for (const item of outputArray) {
      // FileOutput.toString() returns the URL
      const url = String(item)
      if (url && url.startsWith("http")) {
        imageUrls.push(url)
      }
    }

    console.log("Parsed URLs:", imageUrls)

    // Save images to database
    const imageRecords = imageUrls.map((url) => ({
      generation_id: generation.id,
      user_id: user.id,
      image_url: url,
    }))

    await supabase.from("images").insert(imageRecords)

    // Update generation status
    await supabase
      .from("generations")
      .update({ status: "completed" })
      .eq("id", generation.id)

    return NextResponse.json({ images: imageUrls })
  } catch (error) {
    console.error("Generate error:", error)

    // Update generation status to failed
    await supabase
      .from("generations")
      .update({ status: "failed" })
      .eq("id", generation.id)

    // Refund credits on failure
    await supabase
      .from("profiles")
      .update({ credits: profile.credits })
      .eq("id", user.id)

    const message = error instanceof Error ? error.message : "Failed to generate images"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
