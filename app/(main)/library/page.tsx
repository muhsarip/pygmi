"use client"

import { useEffect, useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { Search, ChevronDown, ChevronUp, Plus, Sparkles, Grid3X3 } from "lucide-react"
import FilterTabs from "@/components/gallery/FilterTabs"
import LibraryCard from "@/components/gallery/LibraryCard"

interface ImageData {
  id: string
  image_url: string
  created_at: string
  generation: {
    id: string
    prompt: string
    settings: {
      aspectRatio: string
      numOutputs: number
      hdr: boolean
    }
  }
}

interface GroupedImages {
  date: string
  items: ImageData[]
}

export default function LibraryPage() {
  const router = useRouter()
  const [images, setImages] = useState<ImageData[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<"all" | "images" | "videos" | "favorites">("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest")
  const [showSortDropdown, setShowSortDropdown] = useState(false)
  const [expandedDates, setExpandedDates] = useState<Set<string>>(new Set())

  const fetchImages = async () => {
    try {
      const response = await fetch("/api/images")
      const data = await response.json()

      if (response.ok) {
        setImages(data.images)
        // Expand all dates by default
        const dates = new Set(data.images.map((img: ImageData) =>
          new Date(img.created_at).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })
        ))
        setExpandedDates(dates as Set<string>)
      }
    } catch {
      toast.error("Failed to load images")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchImages()
  }, [])

  // Filter and search images
  const filteredImages = useMemo(() => {
    let result = [...images]

    // Apply filter (for now, all are images since video is dummy)
    if (filter === "images") {
      result = result // All are images for now
    } else if (filter === "videos") {
      result = [] // No videos yet
    } else if (filter === "favorites") {
      result = [] // Favorites not implemented yet
    }

    // Apply search
    if (searchQuery.trim()) {
      result = result.filter((img) =>
        img.generation.prompt.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Apply sort
    result.sort((a, b) => {
      const dateA = new Date(a.created_at).getTime()
      const dateB = new Date(b.created_at).getTime()
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB
    })

    return result
  }, [images, filter, searchQuery, sortOrder])

  // Group images by date
  const groupedImages = useMemo(() => {
    const groups: Record<string, ImageData[]> = {}

    filteredImages.forEach((img) => {
      const dateKey = new Date(img.created_at).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })

      if (!groups[dateKey]) {
        groups[dateKey] = []
      }
      groups[dateKey].push(img)
    })

    return Object.entries(groups).map(([date, items]) => ({
      date,
      items,
    }))
  }, [filteredImages])

  const toggleDateExpanded = (date: string) => {
    const newExpanded = new Set(expandedDates)
    if (newExpanded.has(date)) {
      newExpanded.delete(date)
    } else {
      newExpanded.add(date)
    }
    setExpandedDates(newExpanded)
  }

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/images/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setImages(images.filter((img) => img.id !== id))
        toast.success("Image deleted")
      } else {
        toast.error("Failed to delete image")
      }
    } catch {
      toast.error("Failed to delete image")
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        {/* Header Skeleton */}
        <div className="animate-pulse">
          <div className="h-4 w-16 bg-gray-200 rounded mb-2" />
          <div className="h-8 w-48 bg-gray-200 rounded" />
        </div>

        {/* Grid Skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div
              key={i}
              className="aspect-square bg-gray-200 rounded-2xl animate-pulse"
            />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
            Library
          </p>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl md:text-3xl font-bold text-black">
              Collections
            </h1>
            <span className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium text-gray-600">
              Total {images.length}
            </span>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search creations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:w-64 pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Filter Tabs and Sort */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <FilterTabs filter={filter} onChange={setFilter} />

        {/* Sort Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowSortDropdown(!showSortDropdown)}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 hover:bg-gray-50 transition-all min-w-[150px] justify-between"
          >
            {sortOrder === "newest" ? "Newest first" : "Oldest first"}
            <ChevronDown size={16} />
          </button>
          {showSortDropdown && (
            <div className="absolute right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-200 py-1 min-w-[150px] z-50">
              <button
                onClick={() => {
                  setSortOrder("newest")
                  setShowSortDropdown(false)
                }}
                className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 ${
                  sortOrder === "newest" ? "text-purple-600 font-medium" : "text-gray-700"
                }`}
              >
                Newest first
              </button>
              <button
                onClick={() => {
                  setSortOrder("oldest")
                  setShowSortDropdown(false)
                }}
                className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 ${
                  sortOrder === "oldest" ? "text-purple-600 font-medium" : "text-gray-700"
                }`}
              >
                Oldest first
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Collections Section */}
      <div className="gradient-card rounded-2xl p-4 md:p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Sparkles size={18} className="text-purple-600" />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Collections
              </p>
              <p className="text-sm font-medium text-gray-800">Organize your work</p>
            </div>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-xl text-sm font-medium hover:bg-gray-800 transition-all">
            <Plus size={16} />
            New
          </button>
        </div>

        <div className="flex gap-2">
          <span className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full text-sm font-medium">
            All
          </span>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="gradient-card rounded-2xl p-4 md:p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-100 rounded-lg">
              <Grid3X3 size={18} className="text-gray-600" />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Timeline
              </p>
              <p className="text-sm font-medium text-gray-800">Recent creations</p>
            </div>
          </div>
          <span className="text-sm text-gray-500">
            Showing {filteredImages.length} of {images.length}
          </span>
        </div>

        {filteredImages.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
              <Sparkles size={24} className="text-gray-300" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">No creations yet</h3>
            <p className="text-sm text-gray-500 mb-4">
              {filter !== "all"
                ? `No ${filter} found. Try changing your filter.`
                : "Generate some images to see them here"}
            </p>
            <button
              onClick={() => router.push("/imagine")}
              className="px-6 py-2.5 gradient-button text-white rounded-xl font-medium"
            >
              Start Creating
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {groupedImages.map((group) => (
              <div key={group.date} className="border border-gray-100 rounded-xl overflow-hidden">
                {/* Date Header */}
                <button
                  onClick={() => toggleDateExpanded(group.date)}
                  className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 bg-white rounded-lg shadow-sm">
                      {expandedDates.has(group.date) ? (
                        <ChevronUp size={16} className="text-gray-500" />
                      ) : (
                        <ChevronDown size={16} className="text-gray-500" />
                      )}
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-gray-800">{group.date}</p>
                      <p className="text-xs text-gray-500">{group.items.length} items</p>
                    </div>
                  </div>
                </button>

                {/* Images Grid */}
                {expandedDates.has(group.date) && (
                  <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {group.items.map((image) => (
                      <LibraryCard
                        key={image.id}
                        id={image.id}
                        imageUrl={image.image_url}
                        prompt={image.generation.prompt}
                        type="image"
                        createdAt={image.created_at}
                        onDelete={handleDelete}
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
