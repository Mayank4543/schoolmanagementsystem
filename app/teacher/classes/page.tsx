"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { Users, BookOpen } from "lucide-react"
import { mockCurrentUser, getClassesByTeacher, getStudentsByClass, Class } from "@/lib/staticData"

interface ClassInfo {
  id: string
  name: string
  grade: string
  section: string
  studentCount?: number
}

export default function ClassesPage() {
  const [classes, setClasses] = useState<ClassInfo[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadClasses = async () => {
      // Use static data instead of Supabase
      const currentUser = mockCurrentUser
      
      if (currentUser.role === 'teacher') {
        const teacherClasses = getClassesByTeacher(currentUser.id)
        
        // Get student count for each class
        const classesWithCount = teacherClasses.map((cls) => {
          const students = getStudentsByClass(cls.id)
          return {
            ...cls,
            studentCount: students.length,
          }
        })

        setClasses(classesWithCount)
      }
      setIsLoading(false)
    }

    loadClasses()
  }, [])

  return (
    <div className="p-4 md:p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">My Classes</h1>
        <p className="text-gray-500 mt-2">Manage your classes and students</p>
      </div>

      {isLoading ? (
        <p className="text-gray-500">Loading...</p>
      ) : classes.length === 0 ? (
        <Card>
          <CardContent className="p-6">
            <p className="text-gray-500">No classes assigned</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classes.map((cls) => (
            <Card key={cls.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl">{cls.name}</CardTitle>
                    <p className="text-sm text-blue-100 mt-1">
                      Grade {cls.grade} {cls.section && `- Section ${cls.section}`}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-blue-400">
                      <BookOpen size={20} />
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-indigo-100">
                    <Users size={16} className="text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Students</p>
                    <p className="font-semibold text-gray-900">{cls.studentCount || 0}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
