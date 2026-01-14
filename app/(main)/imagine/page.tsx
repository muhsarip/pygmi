"use client"

import { useState } from "react"
import toast from "react-hot-toast"
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
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to generate")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <PromptInput
          value={prompt}
          onChange={setPrompt}
          referenceImage={referenceImage}
          onReferenceChange={setReferenceImage}
        />
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm">
        <SettingsPanel settings={settings} onChange={setSettings} />
      </div>

      <GenerateButton
        onClick={handleGenerate}
        loading={loading}
        disabled={!prompt.trim()}
        cost={1}
      />

      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h2 className="text-lg font-medium mb-4">Generated Images</h2>
        <ImageGrid images={generatedImages} loading={loading} />
      </div>
    </div>
  )
}
