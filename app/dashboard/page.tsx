"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { Calendar, FileText, Users, CheckSquare } from "lucide-react"
import { mockCurrentUser, User, getDashboardStats } from "@/lib/staticData"

interface UserProfile {
  role: string
  full_name: string
}

interface DashboardStats {
  attendance: number
  upcomingExams: number
  classes?: number
  students?: number
}

export default function DashboardPage() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [stats, setStats] = useState<DashboardStats>({
    attendance: 0,
    upcomingExams: 0,
  })

  useEffect(() => {
    const loadData = async () => {
      // Use static data instead of Supabase
      const currentUser = mockCurrentUser
      
      setProfile({
        role: currentUser.role,
        full_name: currentUser.full_name
      })

      // Get stats based on role using static data
      const dashboardStats = getDashboardStats()
      
      if (currentUser.role === "student") {
        setStats({
          attendance: dashboardStats.student.attendance,
          upcomingExams: dashboardStats.student.upcomingExams,
        })
      } else if (currentUser.role === "teacher") {
        setStats({
          attendance: dashboardStats.teacher.attendance,
          upcomingExams: dashboardStats.teacher.upcomingExams,
          classes: dashboardStats.teacher.classes,
          students: dashboardStats.teacher.students,
        })
      }
    }

    loadData()
  }, [])

  return (
    <div className="p-4 md:p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Welcome, {profile?.full_name || "User"}!</h1>
        <p className="text-gray-500 mt-2">
          {profile?.role === "teacher" ? "Manage your classes and students" : "Track your academic progress"}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {profile?.role === "student" ? (
          <>
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-700">Attendance</CardTitle>
                <CheckSquare className="text-blue-600" size={20} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-900">{stats.attendance}</div>
                <p className="text-xs text-blue-600 mt-1">records</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-indigo-50 to-indigo-100 border-indigo-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-700">Upcoming Exams</CardTitle>
                <FileText className="text-indigo-600" size={20} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-indigo-900">{stats.upcomingExams}</div>
                <p className="text-xs text-indigo-600 mt-1">scheduled</p>
              </CardContent>
            </Card>
          </>
        ) : (
          <>
            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-700">My Classes</CardTitle>
                <Calendar className="text-green-600" size={20} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-900">{stats.classes}</div>
                <p className="text-xs text-green-600 mt-1">total</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-700">Students</CardTitle>
                <Users className="text-purple-600" size={20} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-900">{stats.students}</div>
                <p className="text-xs text-purple-600 mt-1">enrolled</p>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Access</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 text-sm">Use the sidebar menu to access your features and manage your account.</p>
        </CardContent>
      </Card>
    </div>
  )
}
