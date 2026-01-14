"use client"

import { createPortal } from "react-dom"
import { AlertTriangle } from "lucide-react"

interface ConfirmDialogProps {
  isOpen: boolean
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  onConfirm: () => void
  onCancel: () => void
  type?: "danger" | "warning" | "info"
}

export default function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  type = "info",
}: ConfirmDialogProps) {
  if (!isOpen || typeof window === 'undefined') return null

  const getButtonColor = () => {
    switch (type) {
      case "danger":
        return "bg-red-500 hover:bg-red-600"
      case "warning":
        return "bg-orange-500 hover:bg-orange-600"
      default:
        return "gradient-button"
    }
  }

  return createPortal(
    <div
      className="fixed inset-0 bg-black/40 z-[200] flex items-center justify-center p-4"
      onClick={onCancel}
    >
      <div
        className="gradient-card rounded-2xl shadow-2xl max-w-md w-full p-6 animate-in fade-in zoom-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start gap-4 mb-4">
          {type !== "info" && (
            <div className={`p-2 rounded-lg ${type === "danger" ? "bg-red-100" : "bg-orange-100"}`}>
              <AlertTriangle className={`${type === "danger" ? "text-red-600" : "text-orange-600"}`} size={24} />
            </div>
          )}
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{message}</p>
          </div>
        </div>

        <div className="flex gap-3 justify-end mt-6">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium transition-all"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2 rounded-lg text-white font-medium transition-all shadow-lg ${getButtonColor()}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
}
