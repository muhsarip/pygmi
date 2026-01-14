"use client"

import { useState } from "react"
import { createPortal } from "react-dom"
import { X, Download } from "lucide-react"

interface ImageGridProps {
  images: string[]
  loading?: boolean
}

export default function ImageGrid({ images, loading }: ImageGridProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="aspect-square bg-gray-200 rounded-lg animate-pulse"
          />
        ))}
      </div>
    )
  }

  if (images.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p>No images generated yet.</p>
        <p className="text-sm mt-1">Enter a prompt and click Generate to create images.</p>
      </div>
    )
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        {images.map((url, index) => (
          <div
            key={index}
            className="relative group magic-appear"
            style={{ animationDelay: `${index * 0.15}s` }}
          >
            <img
              src={url}
              alt={`Generated image ${index + 1}`}
              className="w-full aspect-square object-cover rounded-lg shadow-lg cursor-pointer"
              onClick={() => setSelectedImage(url)}
            />
            <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <a
                href={url}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 text-white transition-all inline-flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                <Download size={16} />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Image Modal - Rendered outside using Portal */}
      {selectedImage && typeof window !== 'undefined' && createPortal(
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-5xl max-h-[90vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 p-2 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 text-white transition-all"
            >
              <X size={24} />
            </button>
            <img
              src={selectedImage}
              alt="Generated image"
              className="w-full h-full object-contain rounded-2xl shadow-2xl"
            />
          </div>
        </div>,
        document.body
      )}
    </>
  )
}
