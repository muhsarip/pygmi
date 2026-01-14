"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Coins, LogOut, User, Menu } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"
import { useCredits } from "@/hooks/useCredits"

interface HeaderProps {
  onMenuClick?: () => void
}

export default function Header({ onMenuClick }: HeaderProps) {
  const router = useRouter()
  const { user, signOut } = useAuth()
  const { credits, loading: creditsLoading } = useCredits()
  const [showMenu, setShowMenu] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false)
      }
    }

    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showMenu])

  const handleLogout = async () => {
    await signOut()
    router.push("/login")
  }

  return (
    <header className="h-16 glass-effect flex items-center justify-between px-4 md:px-6 shadow-lg relative z-50">
      <button
        onClick={onMenuClick}
        className="md:hidden p-2 hover:bg-purple-100 rounded-lg cursor-pointer"
      >
        <Menu size={24} className="text-gray-700" />
      </button>

      <div className="flex-1 md:flex-none" />

      <div className="flex items-center gap-2 md:gap-4 ml-auto relative z-50">
        <div className="flex items-center gap-2 px-3 md:px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-xl text-white shadow-lg">
          <Coins size={16} className="md:w-[18px] md:h-[18px]" />
          <span className="font-bold text-sm md:text-base">
            {creditsLoading ? "..." : credits}
          </span>
        </div>

        <button
          onClick={() => router.push("/buy-credits")}
          className="hidden md:block px-6 py-2 gradient-button text-white rounded-xl font-medium shadow-lg cursor-pointer"
        >
          Buy Credits
        </button>

        <div className="relative z-[100]" ref={menuRef}>
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center hover:shadow-lg transition-all text-white cursor-pointer"
          >
            <User size={20} />
          </button>

          {showMenu && (
            <div className="absolute right-0 mt-2 w-56 glass-effect rounded-xl shadow-2xl py-2 z-[9999] backdrop-blur-xl bg-white/95">
              <div className="px-4 py-3 border-b border-gray-200">
                <p className="text-xs text-gray-500 mb-1">Signed in as</p>
                <p className="text-sm text-gray-800 font-medium truncate">
                  {user?.email}
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-4 py-3 text-left text-red-600 hover:bg-red-50 transition-colors cursor-pointer font-medium"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
