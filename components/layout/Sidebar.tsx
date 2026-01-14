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
        className={`fixed md:static w-64 h-screen gradient-sidebar text-white flex flex-col shadow-2xl z-50 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="p-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white drop-shadow-lg">
              PYGMI
            </h1>
            <p className="text-white/90 text-sm mt-1 font-medium">AI Image Generator</p>
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
