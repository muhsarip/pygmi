"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import ImageCard from "@/components/gallery/ImageCard"

interface ImageData {
  id: string
  image_url: string
  created_at: string
  generation: {
    id: string
    prompt: string
    settings: {
      aspectRatio: string
      numOutputs: number
      hdr: boolean
    }
  }
}

export default function LibraryPage() {
  const router = useRouter()
  const [images, setImages] = useState<ImageData[]>([])
  const [loading, setLoading] = useState(true)

  const fetchImages = async () => {
    try {
      const response = await fetch("/api/images")
      const data = await response.json()

      if (response.ok) {
        setImages(data.images)
      }
    } catch {
      toast.error("Failed to load images")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchImages()
  }, [])

  const handleReuse = (prompt: string, settings: ImageData["generation"]["settings"]) => {
    const params = new URLSearchParams({
      prompt,
      ...Object.fromEntries(
        Object.entries(settings).map(([k, v]) => [k, String(v)])
      ),
    })
    router.push(`/imagine?${params.toString()}`)
  }

  const handleRerun = async (prompt: string, settings: ImageData["generation"]["settings"]) => {
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, ...settings }),
      })

      if (response.ok) {
        toast.success("Generation started!")
        router.push("/imagine")
      } else {
        const data = await response.json()
        toast.error(data.error || "Failed to rerun")
      }
    } catch {
      toast.error("Failed to rerun generation")
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/images/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setImages(images.filter((img) => img.id !== id))
        toast.success("Image deleted")
      } else {
        toast.error("Failed to delete image")
      }
    } catch {
      toast.error("Failed to delete image")
    }
  }

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div
            key={i}
            className="aspect-square bg-gradient-to-br from-purple-200 to-pink-200 rounded-2xl animate-pulse"
          />
        ))}
      </div>
    )
  }

  if (images.length === 0) {
    return (
      <div className="text-center py-12 gradient-card rounded-2xl p-12">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          No images yet
        </h2>
        <p className="text-gray-600 mt-4 text-lg">
          ✨ Generate some magical images to see them here
        </p>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
        My Generations
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image) => (
          <ImageCard
            key={image.id}
            id={image.id}
            imageUrl={image.image_url}
            prompt={image.generation.prompt}
            settings={image.generation.settings}
            onReuse={handleReuse}
            onRerun={handleRerun}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  )
}
