"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Coins, LogOut, User } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"
import { useCredits } from "@/hooks/useCredits"

export default function Header() {
  const router = useRouter()
  const { user, signOut } = useAuth()
  const { credits, loading: creditsLoading } = useCredits()
  const [showMenu, setShowMenu] = useState(false)

  const handleLogout = async () => {
    await signOut()
    router.push("/login")
  }

  return (
    <header className="h-16 glass-effect flex items-center justify-between px-6 shadow-lg">
      <div />

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-xl text-white shadow-lg">
          <Coins size={18} />
          <span className="font-bold">
            {creditsLoading ? "..." : credits} Credits
          </span>
        </div>

        <button className="px-6 py-2 gradient-button text-white rounded-xl font-medium shadow-lg">
          Buy Credits
        </button>

        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center hover:shadow-lg transition-all text-white"
          >
            <User size={20} />
          </button>

          {showMenu && (
            <div className="absolute right-0 mt-2 w-48 glass-effect rounded-xl shadow-2xl py-2 z-50">
              <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-200">
                {user?.email}
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-4 py-2 text-left text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
