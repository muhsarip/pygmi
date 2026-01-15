"use client"

import { useState } from "react"
import { createPortal } from "react-dom"
import { Copy, RefreshCw, Play, Download, Trash2, X } from "lucide-react"
import toast from "react-hot-toast"
import ConfirmDialog from "@/components/ui/ConfirmDialog"

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
  const [showModal, setShowModal] = useState(false)
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean
    title: string
    message: string
    type: "danger" | "warning" | "info"
    onConfirm: () => void
  }>({
    isOpen: false,
    title: "",
    message: "",
    type: "info",
    onConfirm: () => {},
  })

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt)
    toast.success("Prompt copied to clipboard")
  }

  const downloadImage = async () => {
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

  const handleDownload = () => {
    setConfirmDialog({
      isOpen: true,
      title: "Download Image",
      message: "Do you want to download this image to your device?",
      type: "info",
      onConfirm: () => {
        setConfirmDialog((prev) => ({ ...prev, isOpen: false }))
        downloadImage()
      },
    })
  }

  const handleReuse = () => {
    setConfirmDialog({
      isOpen: true,
      title: "Reuse Prompt",
      message: "This will copy the prompt and settings to the imagine page. Continue?",
      type: "info",
      onConfirm: () => {
        setConfirmDialog((prev) => ({ ...prev, isOpen: false }))
        onReuse(prompt, settings)
      },
    })
  }

  const handleRerun = () => {
    setConfirmDialog({
      isOpen: true,
      title: "Rerun Generation",
      message: "This will generate new images with the same prompt and settings. This will cost 1 credit. Continue?",
      type: "warning",
      onConfirm: () => {
        setConfirmDialog((prev) => ({ ...prev, isOpen: false }))
        onRerun(prompt, settings)
      },
    })
  }

  const handleDelete = () => {
    setConfirmDialog({
      isOpen: true,
      title: "Delete Image",
      message: "Are you sure you want to delete this image? This action cannot be undone.",
      type: "danger",
      onConfirm: () => {
        setConfirmDialog((prev) => ({ ...prev, isOpen: false }))
        onDelete(id)
      },
    })
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
        className="w-full aspect-square object-cover cursor-pointer"
        onClick={() => setShowModal(true)}
      />

      {showActions && (
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-end p-4 cursor-pointer"
          onClick={() => setShowModal(true)}
        >
          <p className="text-white text-sm line-clamp-2 mb-4 font-medium">{prompt}</p>

          <div className="flex justify-center gap-2" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={handleCopy}
              className="p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 text-white transition-all hover:scale-110"
              title="Copy prompt"
            >
              <Copy size={16} />
            </button>
            <button
              onClick={handleReuse}
              className="p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 text-white transition-all hover:scale-110"
              title="Re-use prompt"
            >
              <Play size={16} />
            </button>
            <button
              onClick={handleRerun}
              className="p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 text-white transition-all hover:scale-110"
              title="Rerun generation"
            >
              <RefreshCw size={16} />
            </button>
            <button
              onClick={handleDownload}
              className="p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 text-white transition-all hover:scale-110"
              title="Download"
            >
              <Download size={16} />
            </button>
            <button
              onClick={handleDelete}
              className="p-2 bg-red-500/70 backdrop-blur-sm rounded-lg hover:bg-red-500 text-white transition-all hover:scale-110"
              title="Delete"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Image Modal - Rendered outside using Portal */}
      {showModal && typeof window !== 'undefined' && createPortal(
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4 md:p-8"
          onClick={() => setShowModal(false)}
        >
          <div
            className="relative flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute -top-12 right-0 p-2 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 text-white transition-all z-10"
            >
              <X size={24} />
            </button>
            <img
              src={imageUrl}
              alt={prompt}
              className="max-w-[90vw] max-h-[85vh] object-contain rounded-2xl shadow-2xl"
            />
          </div>
        </div>,
        document.body
      )}

      {/* Confirm Dialog */}
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        title={confirmDialog.title}
        message={confirmDialog.message}
        type={confirmDialog.type}
        onConfirm={confirmDialog.onConfirm}
        onCancel={() => setConfirmDialog((prev) => ({ ...prev, isOpen: false }))}
      />
    </div>
  )
}
