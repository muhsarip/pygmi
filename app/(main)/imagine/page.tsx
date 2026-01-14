"use client"

import { useState } from "react"
import toast from "react-hot-toast"
import { ChevronDown, ChevronUp } from "lucide-react"
import PromptInput from "@/components/generator/PromptInput"
import SettingsPanel, { GenerationSettings } from "@/components/generator/SettingsPanel"
import GenerateButton from "@/components/generator/GenerateButton"
import ImageGrid from "@/components/gallery/ImageGrid"

export default function ImaginePage() {
  const [prompt, setPrompt] = useState("")
  const [referenceImage, setReferenceImage] = useState<string | null>(null)
  const [settings, setSettings] = useState<GenerationSettings>({
    aspectRatio: "1:1",
    numOutputs: 1,
    hdr: false,
  })
  const [loading, setLoading] = useState(false)
  const [generatedImages, setGeneratedImages] = useState<string[]>([])
  const [showPrompt, setShowPrompt] = useState(true)

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt")
      return
    }

    setLoading(true)

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          referenceImage,
          ...settings,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate")
      }

      setGeneratedImages(data.images)
      toast.success("Images generated successfully!")
      setShowPrompt(false)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to generate")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-4 md:space-y-6">
      {showPrompt ? (
        <>
          <div className="gradient-card rounded-2xl p-4 md:p-6 shadow-xl">
            <PromptInput
              value={prompt}
              onChange={setPrompt}
              referenceImage={referenceImage}
              onReferenceChange={setReferenceImage}
            />
          </div>

          <div className="gradient-card rounded-2xl p-4 md:p-6 shadow-xl">
            <SettingsPanel settings={settings} onChange={setSettings} />
          </div>

          <GenerateButton
            onClick={handleGenerate}
            loading={loading}
            disabled={!prompt.trim()}
            cost={1}
          />
        </>
      ) : (
        <button
          onClick={() => setShowPrompt(true)}
          className="w-full py-3 px-4 gradient-card rounded-2xl font-semibold text-gray-700 shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <ChevronDown size={20} />
          Show Prompt
        </button>
      )}

      {generatedImages.length > 0 && (
        <div className="gradient-card rounded-2xl p-4 md:p-6 shadow-xl">
          <h2 className="text-xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Generated Images
          </h2>
          <ImageGrid images={generatedImages} loading={loading} />
        </div>
      )}
    </div>
  )
}
