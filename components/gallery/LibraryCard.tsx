"use client"

import { useState } from "react"
import { createPortal } from "react-dom"
import { Share2, Trash2, Grid3X3, X } from "lucide-react"
import toast from "react-hot-toast"
import ConfirmDialog from "@/components/ui/ConfirmDialog"

interface LibraryCardProps {
  id: string
  imageUrl: string
  prompt: string
  type: "image" | "video"
  createdAt: string
  onDelete: (id: string) => void
  onShare?: (id: string) => void
}

export default function LibraryCard({
  id,
  imageUrl,
  prompt,
  type,
  createdAt,
  onDelete,
  onShare,
}: LibraryCardProps) {
  const [showModal, setShowModal] = useState(false)
  const [showConfirmDelete, setShowConfirmDelete] = useState(false)

  const handleShare = () => {
    navigator.clipboard.writeText(imageUrl)
    toast.success("Image URL copied to clipboard")
    onShare?.(id)
  }

  const handleDelete = () => {
    setShowConfirmDelete(true)
  }

  const confirmDelete = () => {
    setShowConfirmDelete(false)
    onDelete(id)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "numeric",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <>
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-gray-100">
        {/* Image Preview */}
        <div
          className="relative aspect-square cursor-pointer group"
          onClick={() => setShowModal(true)}
        >
          {/* Type Badge */}
          <div className="absolute top-3 left-3 z-10">
            <span className="px-2 py-1 bg-white/90 backdrop-blur-sm rounded-md text-xs font-semibold text-gray-700 shadow-sm">
              {type === "video" ? "VID" : "IMG"}
            </span>
          </div>

          {type === "video" ? (
            <video
              src={imageUrl}
              className="w-full h-full object-cover"
              muted
            />
          ) : (
            <img
              src={imageUrl}
              alt={prompt}
              className="w-full h-full object-cover"
            />
          )}

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all" />
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Prompt */}
          <p className="text-sm text-gray-800 font-medium line-clamp-2 mb-2 min-h-[40px]">
            {prompt}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400">{formatDate(createdAt)}</span>

            <div className="flex items-center gap-1">
              <button
                onClick={handleShare}
                className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-600 transition-all"
                title="Share"
              >
                <Share2 size={16} />
              </button>
              <button
                onClick={handleDelete}
                className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-red-500 transition-all"
                title="Delete"
              >
                <Trash2 size={16} />
              </button>
              <button
                onClick={() => setShowModal(true)}
                className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-600 transition-all"
                title="View"
              >
                <Grid3X3 size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {showModal && typeof window !== "undefined" && createPortal(
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
            {type === "video" ? (
              <video
                src={imageUrl}
                className="max-w-[90vw] max-h-[85vh] object-contain rounded-2xl shadow-2xl"
                controls
                autoPlay
                loop
              />
            ) : (
              <img
                src={imageUrl}
                alt={prompt}
                className="max-w-[90vw] max-h-[85vh] object-contain rounded-2xl shadow-2xl"
              />
            )}
          </div>
        </div>,
        document.body
      )}

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        isOpen={showConfirmDelete}
        title="Delete Item"
        message="Are you sure you want to delete this item? This action cannot be undone."
        type="danger"
        onConfirm={confirmDelete}
        onCancel={() => setShowConfirmDelete(false)}
      />
    </>
  )
}
