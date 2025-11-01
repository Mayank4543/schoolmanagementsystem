"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { BarChart3, BookOpen, Calendar, ClipboardList, FileText, Home } from "lucide-react"
import { mockCurrentUser } from "@/lib/staticData"

interface UserProfile {
  role: string
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

export function Sidebar() {
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

  if (isLoading) return null

  const menuItems = profile?.role === "teacher" ? teacherMenuItems : studentMenuItems

  return (
    <aside className="hidden md:flex flex-col w-64 bg-gray-50 border-r border-gray-200 h-[calc(100vh-4rem)] sticky top-16">
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                isActive ? "bg-indigo-100 text-indigo-700 font-semibold" : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Icon size={20} />
              <span className="text-sm">{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
