"use client"

import { useState } from "react"
import { createPortal } from "react-dom"
import toast from "react-hot-toast"
import { X, Download } from "lucide-react"
import ModeSwitch from "@/components/generator/ModeSwitch"
import PromptBar from "@/components/generator/PromptBar"
import ResultPanel from "@/components/generator/ResultPanel"

interface GenerationResult {
  imageUrl: string
  prompt: string
  settings: {
    aspectRatio: string
    model: string
  }
  type: "image" | "video"
  createdAt: string
}

export default function ImaginePage() {
  const [viewMode, setViewMode] = useState<"all" | "video" | "image">("all")
  const [generationType, setGenerationType] = useState<"image" | "video">("image")
  const [prompt, setPrompt] = useState("")
  const [aspectRatio, setAspectRatio] = useState("1:1")
  const [model, setModel] = useState("flux-schnell")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<GenerationResult | null>(null)
  const [showModal, setShowModal] = useState(false)

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt")
      return
    }

    if (generationType === "video") {
      // Dummy video generation - just show a toast
      toast.error("Video generation is coming soon!")
      return
    }

    setLoading(true)

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          aspectRatio,
          numOutputs: 1,
          hdr: false,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate")
      }

      const now = new Date()
      setResult({
        imageUrl: data.images[0],
        prompt,
        settings: {
          aspectRatio,
          model,
        },
        type: "image",
        createdAt: now.toLocaleDateString(),
      })

      toast.success("Image generated successfully!")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to generate")
    } finally {
      setLoading(false)
    }
  }

  const handleTypeChange = (type: "image" | "video") => {
    setGenerationType(type)
    if (type === "video") {
      setModel("video-model")
    } else {
      setModel("flux-schnell")
    }
  }

  const handleUse = () => {
    if (result) {
      setPrompt(result.prompt)
      setAspectRatio(result.settings.aspectRatio)
      toast.success("Settings loaded")
    }
  }

  const handleRerun = () => {
    if (result) {
      handleGenerate()
    }
  }

  const handleDownload = async () => {
    if (!result?.imageUrl) return

    try {
      const response = await fetch(result.imageUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `pygmi-${Date.now()}.png`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
      toast.success("Image downloaded")
    } catch {
      toast.error("Failed to download image")
    }
  }

  // Filter based on view mode
  const shouldShowResult = () => {
    if (!result) return false
    if (viewMode === "all") return true
    return viewMode === result.type
  }

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-4">
        <ModeSwitch mode={viewMode} onChange={setViewMode} />
        <div className="text-sm text-gray-500">
          {result ? "1 generation" : "No generations yet"}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex gap-4 min-h-0">
        {/* Main Canvas Area */}
        <div className="flex-1 gradient-card rounded-2xl shadow-xl overflow-hidden flex flex-col">
          {/* Canvas */}
          <div className="flex-1 flex items-center justify-center p-6 overflow-auto">
            {loading ? (
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin" />
                <p className="text-gray-500">Generating your {generationType}...</p>
              </div>
            ) : result && shouldShowResult() ? (
              <div
                className="relative max-w-full max-h-full cursor-pointer group"
                onClick={() => setShowModal(true)}
              >
                {result.type === "video" ? (
                  <video
                    src={result.imageUrl}
                    className="max-w-full max-h-[60vh] rounded-xl shadow-2xl object-contain"
                    controls
                    autoPlay
                    loop
                    muted
                  />
                ) : (
                  <img
                    src={result.imageUrl}
                    alt={result.prompt}
                    className="max-w-full max-h-[60vh] rounded-xl shadow-2xl object-contain"
                  />
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all rounded-xl" />
              </div>
            ) : (
              <div className="text-center text-gray-400">
                <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                  <svg width="48" height="48" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M32 12L34.5 24.5L42 20L38 28.5L50 32L38 35.5L42 44L34.5 39.5L32 52L29.5 39.5L22 44L26 35.5L14 32L26 28.5L22 20L29.5 24.5L32 12Z" fill="#E5E7EB"/>
                  </svg>
                </div>
                <p className="text-lg font-medium">No generation yet</p>
                <p className="text-sm mt-1">Enter a prompt below to create something amazing</p>
              </div>
            )}
          </div>

          {/* Prompt Bar */}
          <div className="p-4 border-t border-gray-100">
            <PromptBar
              prompt={prompt}
              onPromptChange={setPrompt}
              generationType={generationType}
              onTypeChange={handleTypeChange}
              aspectRatio={aspectRatio}
              onAspectRatioChange={setAspectRatio}
              model={model}
              onModelChange={setModel}
              onGenerate={handleGenerate}
              loading={loading}
              disabled={!prompt.trim()}
            />
          </div>
        </div>

        {/* Right Sidebar - Result Panel */}
        <div className="w-64 gradient-card rounded-2xl shadow-xl overflow-hidden hidden lg:block flex-shrink-0">
          <ResultPanel
            imageUrl={shouldShowResult() ? result?.imageUrl || null : null}
            prompt={result?.prompt || ""}
            settings={{
              aspectRatio: result?.settings.aspectRatio || aspectRatio,
              model: result?.settings.model || model,
            }}
            createdAt={result?.createdAt}
            onUse={handleUse}
            onRerun={handleRerun}
            onDownload={handleDownload}
            generationType={result?.type || generationType}
          />
        </div>
      </div>

      {/* Image Modal */}
      {showModal && result && typeof window !== "undefined" && createPortal(
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
            {result.type === "video" ? (
              <video
                src={result.imageUrl}
                className="max-w-[90vw] max-h-[85vh] object-contain rounded-2xl shadow-2xl"
                controls
                autoPlay
                loop
              />
            ) : (
              <img
                src={result.imageUrl}
                alt={result.prompt}
                className="max-w-[90vw] max-h-[85vh] object-contain rounded-2xl shadow-2xl"
              />
            )}
          </div>
        </div>,
        document.body
      )}
    </div>
  )
}
