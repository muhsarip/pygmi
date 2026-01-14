"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Compass, Sparkles, Images, FolderOpen } from "lucide-react"

const navItems = [
  { href: "/explore", label: "Explore", icon: Compass },
  { href: "/imagine", label: "Imagine", icon: Sparkles },
  { href: "/library", label: "My Generate", icon: Images },
  { href: "/organize", label: "Organize", icon: FolderOpen, disabled: true },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 h-screen gradient-sidebar text-white flex flex-col shadow-2xl">
      <div className="p-6">
        <h1 className="text-3xl font-bold text-white drop-shadow-lg">
          PYGMI
        </h1>
        <p className="text-white/90 text-sm mt-1 font-medium">AI Image Generator</p>
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
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${
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
  )
}
