"use client"

interface FilterTabsProps {
  filter: "all" | "images" | "videos" | "favorites"
  onChange: (filter: "all" | "images" | "videos" | "favorites") => void
}

export default function FilterTabs({ filter, onChange }: FilterTabsProps) {
  const tabs = [
    { id: "all" as const, label: "All" },
    { id: "images" as const, label: "Images" },
    { id: "videos" as const, label: "Videos" },
    { id: "favorites" as const, label: "Favorites" },
  ]

  return (
    <div className="flex items-center gap-2">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            filter === tab.id
              ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md"
              : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
