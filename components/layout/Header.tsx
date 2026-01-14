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
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <div />

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg">
          <Coins size={18} className="text-yellow-500" />
          <span className="font-medium">
            {creditsLoading ? "..." : credits} Credits
          </span>
        </div>

        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Buy Credits
        </button>

        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
          >
            <User size={20} />
          </button>

          {showMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
              <div className="px-4 py-2 text-sm text-gray-600 border-b border-gray-100">
                {user?.email}
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-4 py-2 text-left text-red-600 hover:bg-gray-50"
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
