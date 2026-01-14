"use client"

import { Loader2 } from "lucide-react"

interface GenerateButtonProps {
  onClick: () => void
  loading: boolean
  disabled: boolean
  cost: number
}

export default function GenerateButton({
  onClick,
  loading,
  disabled,
  cost,
}: GenerateButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className="w-full py-3 px-6 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
    >
      {loading ? (
        <>
          <Loader2 size={20} className="animate-spin" />
          Generating...
        </>
      ) : (
        <>Generate - {cost} Credit</>
      )}
    </button>
  )
}
