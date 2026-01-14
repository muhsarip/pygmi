"use client"

import { useState } from "react"
import { Copy, RefreshCw, Play, Download, Trash2 } from "lucide-react"
import toast from "react-hot-toast"

interface ImageCardProps {
  id: string
  imageUrl: string
  prompt: string
  settings: {
    aspectRatio: string
    numOutputs: number
    hdr: boolean
  }
  onReuse: (prompt: string, settings: ImageCardProps["settings"]) => void
  onRerun: (prompt: string, settings: ImageCardProps["settings"]) => void
  onDelete: (id: string) => void
}

export default function ImageCard({
  id,
  imageUrl,
  prompt,
  settings,
  onReuse,
  onRerun,
  onDelete,
}: ImageCardProps) {
  const [showActions, setShowActions] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt)
    toast.success("Prompt copied to clipboard")
  }

  const handleDownload = async () => {
    try {
      const response = await fetch(imageUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `pygmi-${id}.png`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
      toast.success("Image downloaded")
    } catch {
      toast.error("Failed to download image")
    }
  }

  return (
    <div
      className="relative group gradient-card rounded-2xl overflow-hidden shadow-xl"
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <img
        src={imageUrl}
        alt={prompt}
        className="w-full aspect-square object-cover"
      />

      {showActions && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-end p-4">
          <p className="text-white text-sm line-clamp-2 mb-4 font-medium">{prompt}</p>

          <div className="flex justify-center gap-2">
            <button
              onClick={handleCopy}
              className="p-2.5 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 text-white transition-all hover:scale-110"
              title="Copy prompt"
            >
              <Copy size={18} />
            </button>
            <button
              onClick={() => onReuse(prompt, settings)}
              className="p-2.5 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 text-white transition-all hover:scale-110"
              title="Re-use prompt"
            >
              <Play size={18} />
            </button>
            <button
              onClick={() => onRerun(prompt, settings)}
              className="p-2.5 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 text-white transition-all hover:scale-110"
              title="Rerun generation"
            >
              <RefreshCw size={18} />
            </button>
            <button
              onClick={handleDownload}
              className="p-2.5 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 text-white transition-all hover:scale-110"
              title="Download"
            >
              <Download size={18} />
            </button>
            <button
              onClick={() => onDelete(id)}
              className="p-2.5 bg-red-500/70 backdrop-blur-sm rounded-xl hover:bg-red-500 text-white transition-all hover:scale-110"
              title="Delete"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
