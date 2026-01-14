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
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Prompt</label>
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Describe the image you want to generate..."
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
        <div className="text-right text-sm text-gray-500 mt-1">
          {value.length} characters
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Reference Image (optional)
        </label>
        {referenceImage ? (
          <div className="relative inline-block">
            <img
              src={referenceImage}
              alt="Reference"
              className="h-24 rounded-lg object-cover"
            />
            <button
              onClick={() => onReferenceChange(null)}
              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
            >
              <X size={14} />
            </button>
          </div>
        ) : (
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
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
