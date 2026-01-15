"use client"

import { useState } from "react"
import { Video, Image, Sparkles, ChevronDown } from "lucide-react"

interface PromptBarProps {
  prompt: string
  onPromptChange: (value: string) => void
  generationType: "image" | "video"
  onTypeChange: (type: "image" | "video") => void
  aspectRatio: string
  onAspectRatioChange: (ratio: string) => void
  model: string
  onModelChange: (model: string) => void
  onGenerate: () => void
  loading: boolean
  disabled: boolean
}

const aspectRatios = [
  { value: "1:1", label: "1:1" },
  { value: "16:9", label: "16:9" },
  { value: "9:16", label: "9:16" },
]

const imageModels = [
  { value: "flux-schnell", label: "Flux Schnell" },
]

const videoModels = [
  { value: "video-model", label: "Video Model" },
]

export default function PromptBar({
  prompt,
  onPromptChange,
  generationType,
  onTypeChange,
  aspectRatio,
  onAspectRatioChange,
  model,
  onModelChange,
  onGenerate,
  loading,
  disabled,
}: PromptBarProps) {
  const [showRatioDropdown, setShowRatioDropdown] = useState(false)
  const [showModelDropdown, setShowModelDropdown] = useState(false)

  const models = generationType === "video" ? videoModels : imageModels

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey && !disabled) {
      e.preventDefault()
      onGenerate()
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-4">
      {/* Prompt Input */}
      <div className="flex items-start gap-3 mb-4">
        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
          <Sparkles size={16} className="text-white" />
        </div>
        <textarea
          value={prompt}
          onChange={(e) => onPromptChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={`Describe the ${generationType} you want to generate...`}
          className="flex-1 resize-none border-0 focus:ring-0 focus:outline-none text-gray-800 placeholder-gray-400 text-sm min-h-[60px]"
          rows={2}
        />
      </div>

      {/* Bottom Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Video/Image Toggle */}
          <div className="inline-flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => onTypeChange("video")}
              className={`p-2 rounded-md transition-all flex items-center gap-1.5 text-xs font-medium ${
                generationType === "video"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <Video size={14} />
              Video
            </button>
            <button
              onClick={() => onTypeChange("image")}
              className={`p-2 rounded-md transition-all flex items-center gap-1.5 text-xs font-medium ${
                generationType === "image"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <Image size={14} />
              Image
            </button>
          </div>

          {/* Aspect Ratio Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setShowRatioDropdown(!showRatioDropdown)
                setShowModelDropdown(false)
              }}
              className="flex items-center gap-1.5 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-xs font-medium text-gray-700 transition-all"
            >
              {aspectRatio}
              <ChevronDown size={12} />
            </button>
            {showRatioDropdown && (
              <div className="absolute bottom-full left-0 mb-2 bg-white rounded-lg shadow-xl border border-gray-200 py-1 min-w-[80px] z-50">
                {aspectRatios.map((ratio) => (
                  <button
                    key={ratio.value}
                    onClick={() => {
                      onAspectRatioChange(ratio.value)
                      setShowRatioDropdown(false)
                    }}
                    className={`w-full px-3 py-2 text-left text-xs hover:bg-gray-50 ${
                      aspectRatio === ratio.value ? "text-purple-600 font-medium" : "text-gray-700"
                    }`}
                  >
                    {ratio.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Model Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setShowModelDropdown(!showModelDropdown)
                setShowRatioDropdown(false)
              }}
              className="flex items-center gap-1.5 px-3 py-2 bg-purple-100 text-purple-700 rounded-lg text-xs font-medium transition-all"
            >
              {models.find((m) => m.value === model)?.label || model}
              <ChevronDown size={12} />
            </button>
            {showModelDropdown && (
              <div className="absolute bottom-full left-0 mb-2 bg-white rounded-lg shadow-xl border border-gray-200 py-1 min-w-[120px] z-50">
                {models.map((m) => (
                  <button
                    key={m.value}
                    onClick={() => {
                      onModelChange(m.value)
                      setShowModelDropdown(false)
                    }}
                    className={`w-full px-3 py-2 text-left text-xs hover:bg-gray-50 ${
                      model === m.value ? "text-purple-600 font-medium" : "text-gray-700"
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={onGenerate}
          disabled={disabled || loading}
          className="px-6 py-2.5 gradient-button text-white rounded-xl font-medium shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-sm"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles size={16} />
              Generate
            </>
          )}
        </button>
      </div>
    </div>
  )
}
