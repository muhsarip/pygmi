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
    <aside className="w-64 h-screen bg-gray-900 text-white flex flex-col">
      <div className="p-6">
        <h1 className="text-2xl font-bold">PYGMI</h1>
      </div>

      <nav className="flex-1 px-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon

            return (
              <li key={item.href}>
                {item.disabled ? (
                  <span className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-500 cursor-not-allowed">
                    <Icon size={20} />
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? "bg-blue-600 text-white"
                        : "text-gray-300 hover:bg-gray-800"
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
