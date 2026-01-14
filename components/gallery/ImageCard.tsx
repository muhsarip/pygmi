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
      className="relative group bg-white rounded-lg overflow-hidden shadow-sm"
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <img
        src={imageUrl}
        alt={prompt}
        className="w-full aspect-square object-cover"
      />

      {showActions && (
        <div className="absolute inset-0 bg-black/60 flex flex-col justify-between p-4">
          <p className="text-white text-sm line-clamp-3">{prompt}</p>

          <div className="flex justify-center gap-2">
            <button
              onClick={handleCopy}
              className="p-2 bg-white/20 rounded-lg hover:bg-white/30 text-white"
              title="Copy prompt"
            >
              <Copy size={18} />
            </button>
            <button
              onClick={() => onReuse(prompt, settings)}
              className="p-2 bg-white/20 rounded-lg hover:bg-white/30 text-white"
              title="Re-use prompt"
            >
              <Play size={18} />
            </button>
            <button
              onClick={() => onRerun(prompt, settings)}
              className="p-2 bg-white/20 rounded-lg hover:bg-white/30 text-white"
              title="Rerun generation"
            >
              <RefreshCw size={18} />
            </button>
            <button
              onClick={handleDownload}
              className="p-2 bg-white/20 rounded-lg hover:bg-white/30 text-white"
              title="Download"
            >
              <Download size={18} />
            </button>
            <button
              onClick={() => onDelete(id)}
              className="p-2 bg-red-500/50 rounded-lg hover:bg-red-500/70 text-white"
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
