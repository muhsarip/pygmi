"use client"

import { Play, RefreshCw, Download } from "lucide-react"

interface ResultPanelProps {
  imageUrl: string | null
  prompt: string
  settings: {
    aspectRatio: string
    model: string
  }
  createdAt?: string
  onUse: () => void
  onRerun: () => void
  onDownload: () => void
  generationType: "image" | "video"
}

export default function ResultPanel({
  imageUrl,
  prompt,
  settings,
  createdAt,
  onUse,
  onRerun,
  onDownload,
  generationType,
}: ResultPanelProps) {
  const getResolution = (aspectRatio: string) => {
    switch (aspectRatio) {
      case "1:1":
        return "1024x1024"
      case "16:9":
        return "1344x768"
      case "9:16":
        return "768x1344"
      default:
        return "1024x1024"
    }
  }

  if (!imageUrl) {
    return (
      <div className="h-full flex items-center justify-center text-gray-400 text-xs p-4">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3">
            <Play size={18} className="text-gray-300" />
          </div>
          <p>Generate {generationType === "video" ? "a video" : "an image"} to see results</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col">
      {/* Thumbnail */}
      <div className="p-3">
        <div className="rounded-lg overflow-hidden shadow-md">
          {generationType === "video" ? (
            <div className="aspect-video bg-gray-900 flex items-center justify-center">
              <video
                src={imageUrl}
                className="w-full h-full object-cover"
                controls
                autoPlay
                loop
                muted
              />
            </div>
          ) : (
            <img
              src={imageUrl}
              alt="Generated"
              className="w-full aspect-square object-cover"
            />
          )}
        </div>
      </div>

      {/* Prompt */}
      <div className="px-3 pb-3">
        <h4 className="text-[10px] font-semibold text-gray-400 uppercase mb-1">Prompt</h4>
        <p className="text-xs text-gray-700 line-clamp-2">{prompt}</p>
      </div>

      {/* Details */}
      <div className="px-3 pb-3 flex-1">
        <h4 className="text-[10px] font-semibold text-gray-400 uppercase mb-2">Details</h4>
        <div className="space-y-1.5 text-xs">
          <div className="flex justify-between">
            <span className="text-gray-500">Type</span>
            <span className="text-gray-800 font-medium capitalize">{generationType}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Model</span>
            <span className="text-gray-800 font-medium">{settings.model}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Ratio</span>
            <span className="text-gray-800 font-medium">{settings.aspectRatio}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Resolution</span>
            <span className="text-gray-800 font-medium">{getResolution(settings.aspectRatio)}</span>
          </div>
          {createdAt && (
            <div className="flex justify-between">
              <span className="text-gray-500">Created</span>
              <span className="text-gray-800 font-medium">{createdAt}</span>
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="p-3 border-t border-gray-100">
        <div className="flex gap-2">
          <button
            onClick={onUse}
            className="flex-1 py-2 px-3 bg-gray-100 hover:bg-gray-200 rounded-lg text-xs font-medium text-gray-700 transition-all flex items-center justify-center gap-1.5"
          >
            <Play size={14} />
            Use
          </button>
          <button
            onClick={onRerun}
            className="flex-1 py-2 px-3 bg-gray-100 hover:bg-gray-200 rounded-lg text-xs font-medium text-gray-700 transition-all flex items-center justify-center gap-1.5"
          >
            <RefreshCw size={14} />
            Rerun
          </button>
        </div>
        <button
          onClick={onDownload}
          className="w-full mt-2 py-2 px-3 gradient-button text-white rounded-lg text-xs font-medium transition-all flex items-center justify-center gap-1.5"
        >
          <Download size={14} />
          Download
        </button>
      </div>
    </div>
  )
}
