"use client"

interface ModeSwitchProps {
  mode: "all" | "video" | "image"
  onChange: (mode: "all" | "video" | "image") => void
}

export default function ModeSwitch({ mode, onChange }: ModeSwitchProps) {
  const tabs = [
    { id: "all" as const, label: "All" },
    { id: "video" as const, label: "Video" },
    { id: "image" as const, label: "Images" },
  ]

  return (
    <div className="inline-flex bg-gray-100 rounded-xl p-1">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            mode === tab.id
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
