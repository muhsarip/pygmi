"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Compass, Sparkles, Images, FolderOpen, X } from "lucide-react"

const navItems = [
  { href: "/explore", label: "Explore", icon: Compass },
  { href: "/imagine", label: "Imagine", icon: Sparkles },
  { href: "/library", label: "My Generate", icon: Images },
  { href: "/organize", label: "Organize", icon: FolderOpen, disabled: true },
]

interface SidebarProps {
  isOpen?: boolean
  onClose?: () => void
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname()

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static w-64 h-screen gradient-sidebar text-white flex flex-col shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0 z-[60]" : "-translate-x-full md:translate-x-0 z-50"
        }`}
      >
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
              <svg width="32" height="32" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M32 12L34.5 24.5L42 20L38 28.5L50 32L38 35.5L42 44L34.5 39.5L32 52L29.5 39.5L22 44L26 35.5L14 32L26 28.5L22 20L29.5 24.5L32 12Z" fill="white"/>
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white drop-shadow-lg">
                PYGMI
              </h1>
              <p className="text-white/90 text-xs mt-0.5 font-medium">AI Image Generator</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="md:hidden text-white/80 hover:text-white cursor-pointer"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 px-4">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              const Icon = item.icon

              return (
                <li key={item.href}>
                  {item.disabled ? (
                    <span className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/40 cursor-not-allowed">
                      <Icon size={20} />
                      {item.label}
                    </span>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium cursor-pointer ${
                        isActive
                          ? "bg-white/25 text-white shadow-lg backdrop-blur-sm"
                          : "text-white/80 hover:bg-white/15 hover:text-white"
                      }`}
                    >
                      <Icon size={20} />
                      {item.label}
                    </Link>
                  )}
                </li>
              )
            })}
          </ul>
        </nav>
      </aside>
    </>
  )
}
