"use client"

import { useState, useRef } from "react"
import { Upload, X } from "lucide-react"

interface PromptInputProps {
  value: string
  onChange: (value: string) => void
  referenceImage: string | null
  onReferenceChange: (image: string | null) => void
}

export default function PromptInput({
  value,
  onChange,
  referenceImage,
  onReferenceChange,
}: PromptInputProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      onReferenceChange(event.target?.result as string)
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-bold mb-3 text-gray-800">✨ Your Prompt</label>
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Describe the magical image you want to create..."
          rows={4}
          className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none transition-all"
        />
        <div className="text-right text-sm text-purple-600 font-semibold mt-2">
          {value.length} characters
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold mb-3 text-gray-800">
          📸 Reference Image (optional)
        </label>
        {referenceImage ? (
          <div className="relative inline-block">
            <img
              src={referenceImage}
              alt="Reference"
              className="h-28 rounded-2xl object-cover shadow-lg border-2 border-purple-200"
            />
            <button
              onClick={() => onReferenceChange(null)}
              className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-red-400 to-red-600 text-white rounded-full flex items-center justify-center hover:shadow-lg transition-all"
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 px-5 py-3 border-2 border-purple-200 rounded-xl hover:border-purple-400 hover:bg-purple-50 transition-all font-semibold text-gray-700"
          >
            <Upload size={18} />
            Upload Reference
          </button>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    </div>
  )
}
