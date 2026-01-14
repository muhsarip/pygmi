"use client"

export interface GenerationSettings {
  aspectRatio: "1:1" | "16:9" | "9:16"
  numOutputs: 1 | 2 | 3 | 4
  hdr: boolean
}

interface SettingsPanelProps {
  settings: GenerationSettings
  onChange: (settings: GenerationSettings) => void
}

const aspectRatios: GenerationSettings["aspectRatio"][] = ["1:1", "16:9", "9:16"]
const outputCounts: GenerationSettings["numOutputs"][] = [1, 2, 3, 4]

export default function SettingsPanel({ settings, onChange }: SettingsPanelProps) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">Aspect Ratio</label>
        <div className="flex gap-2">
          {aspectRatios.map((ratio) => (
            <button
              key={ratio}
              onClick={() => onChange({ ...settings, aspectRatio: ratio })}
              className={`px-4 py-2 rounded-lg border ${
                settings.aspectRatio === ratio
                  ? "bg-blue-600 text-white border-blue-600"
                  : "border-gray-300 hover:bg-gray-50"
              }`}
            >
              {ratio}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Number of Images</label>
        <div className="flex gap-2">
          {outputCounts.map((count) => (
            <button
              key={count}
              onClick={() => onChange({ ...settings, numOutputs: count })}
              className={`w-10 h-10 rounded-lg border ${
                settings.numOutputs === count
                  ? "bg-blue-600 text-white border-blue-600"
                  : "border-gray-300 hover:bg-gray-50"
              }`}
            >
              {count}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={settings.hdr}
            onChange={(e) => onChange({ ...settings, hdr: e.target.checked })}
            className="w-5 h-5 rounded border-gray-300"
          />
          <span className="font-medium">HDR Mode</span>
        </label>
      </div>
    </div>
  )
}
