"use client"

interface ImageGridProps {
  images: string[]
  loading?: boolean
}

export default function ImageGrid({ images, loading }: ImageGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="aspect-square bg-gray-200 rounded-lg animate-pulse"
          />
        ))}
      </div>
    )
  }

  if (images.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p>No images generated yet.</p>
        <p className="text-sm mt-1">Enter a prompt and click Generate to create images.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      {images.map((url, index) => (
        <div
          key={index}
          className="relative group magic-appear"
          style={{ animationDelay: `${index * 0.15}s` }}
        >
          <img
            src={url}
            alt={`Generated image ${index + 1}`}
            className="w-full aspect-square object-cover rounded-lg shadow-lg"
          />
          <a
            href={url}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center text-white cursor-pointer"
          >
            Download
          </a>
        </div>
      ))}
    </div>
  )
}
