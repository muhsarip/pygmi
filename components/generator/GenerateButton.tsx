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
      className="w-full py-3 md:py-4 px-4 md:px-6 gradient-button text-white rounded-2xl font-bold text-base md:text-lg shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
    >
      {loading ? (
        <>
          <Loader2 size={24} className="animate-spin" />
          Generating...
        </>
      ) : (
        <>✨ Generate - {cost} Credit</>
      )}
    </button>
  )
}
