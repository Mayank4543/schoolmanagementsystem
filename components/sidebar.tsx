"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { BarChart3, BookOpen, Calendar, ClipboardList, FileText, Home, X } from "lucide-react"
import { mockCurrentUser } from "@/lib/staticData"

interface UserProfile {
  role: string
}

interface SidebarProps {
  isMobileOpen?: boolean
  onClose?: () => void
}

const studentMenuItems = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/student/attendance", label: "Attendance", icon: ClipboardList },
  { href: "/student/schedule", label: "Schedule", icon: Calendar },
  { href: "/student/exams", label: "Exams", icon: FileText },
  { href: "/student/marks", label: "Marks", icon: BarChart3 },
  { href: "/demo", label: "Demo Mode", icon: Home },
]

const teacherMenuItems = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/teacher/attendance", label: "Mark Attendance", icon: ClipboardList },
  { href: "/teacher/classes", label: "My Classes", icon: BookOpen },
  { href: "/teacher/exams", label: "Manage Exams", icon: FileText },
  { href: "/teacher/schedule", label: "Schedule", icon: Calendar },
  { href: "/demo", label: "Demo Mode", icon: Home },
]

export function Sidebar({ isMobileOpen = false, onClose }: SidebarProps) {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const pathname = usePathname()

  useEffect(() => {
    const getProfile = async () => {
      // Use static data instead of Supabase
      const currentUser = mockCurrentUser

      setProfile({
        role: currentUser.role
      })
      setIsLoading(false)
    }
    getProfile()
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    if (isMobileOpen && onClose) {
      onClose()
    }
  }, [pathname])

  if (isLoading) return null

  const menuItems = profile?.role === "teacher" ? teacherMenuItems : studentMenuItems

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[100] md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:sticky top-0 md:top-16 left-0 z-[110] md:z-auto
          w-64 h-screen md:h-[calc(100vh-4rem)]
          bg-white md:bg-gray-50 border-r border-gray-200
          transform transition-transform duration-300 ease-in-out
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          flex flex-col
          shadow-2xl md:shadow-none
        `}
      >
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Menu</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close menu"
          >
            <X size={24} className="text-gray-600" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${isActive ? "bg-indigo-100 text-indigo-700 font-semibold" : "text-gray-700 hover:bg-gray-100"
                  }`}
                onClick={() => {
                  // Close mobile menu on link click
                  if (isMobileOpen && onClose) {
                    onClose()
                  }
                }}
              >
                <Icon size={20} />
                <span className="text-sm">{item.label}</span>
              </Link>
            )
          })}
        </nav>
      </aside>
    </>
  )
}
