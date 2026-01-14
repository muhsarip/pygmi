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
        <label className="block text-sm font-bold mb-3 text-gray-800">Aspect Ratio</label>
        <div className="flex gap-3">
          {aspectRatios.map((ratio) => (
            <button
              key={ratio}
              onClick={() => onChange({ ...settings, aspectRatio: ratio })}
              className={`px-6 py-3 rounded-xl border-2 font-semibold transition-all ${
                settings.aspectRatio === ratio
                  ? "gradient-button text-white border-transparent shadow-lg"
                  : "border-purple-200 hover:border-purple-400 text-gray-700"
              }`}
            >
              {ratio}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold mb-3 text-gray-800">Number of Images</label>
        <div className="flex gap-3">
          {outputCounts.map((count) => (
            <button
              key={count}
              onClick={() => onChange({ ...settings, numOutputs: count })}
              className={`w-12 h-12 rounded-xl border-2 font-bold transition-all ${
                settings.numOutputs === count
                  ? "gradient-button text-white border-transparent shadow-lg"
                  : "border-purple-200 hover:border-purple-400 text-gray-700"
              }`}
            >
              {count}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="flex items-center gap-3 cursor-pointer p-4 rounded-xl hover:bg-purple-50 transition-colors">
          <input
            type="checkbox"
            checked={settings.hdr}
            onChange={(e) => onChange({ ...settings, hdr: e.target.checked })}
            className="w-6 h-6 rounded border-purple-300"
          />
          <span className="font-bold text-gray-800">✨ HDR Mode</span>
        </label>
      </div>
    </div>
  )
}
