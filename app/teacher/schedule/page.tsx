"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { Clock, BookOpen } from "lucide-react"
import { mockCurrentUser, getSchedulesByTeacher, Schedule } from "@/lib/staticData"

const daysOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

export default function TeacherSchedulePage() {
  const [schedule, setSchedule] = useState<Schedule[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadSchedule = async () => {
      // Use static data instead of Supabase
      const currentUser = mockCurrentUser
      
      if (currentUser.role === 'teacher') {
        const teacherSchedule = getSchedulesByTeacher(currentUser.id)
        setSchedule(teacherSchedule)
      }
      setIsLoading(false)
    }

    loadSchedule()
  }, [])

  const groupedSchedule = schedule.reduce(
    (acc, item) => {
      if (!acc[item.day_of_week]) {
        acc[item.day_of_week] = []
      }
      acc[item.day_of_week].push(item)
      return acc
    },
    {} as Record<string, Schedule[]>,
  )

  const sortedDays = daysOrder.filter((day) => day in groupedSchedule)

  return (
    <div className="p-4 md:p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">My Schedule</h1>
        <p className="text-gray-500 mt-2">Your weekly teaching schedule</p>
      </div>

      {isLoading ? (
        <p className="text-gray-500">Loading schedule...</p>
      ) : schedule.length === 0 ? (
        <Card>
          <CardContent className="p-6">
            <p className="text-gray-500">No schedule available</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {sortedDays.map((day) => (
            <Card key={day} className="overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
                <CardTitle className="text-lg">{day}</CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-3">
                {groupedSchedule[day].map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start gap-4 p-3 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-green-100">
                        <BookOpen className="text-green-600" size={20} />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{item.subject}</h3>
                      <p className="text-sm text-gray-600 mt-1">{item.classes?.name}</p>
                      <div className="flex items-center gap-1 text-xs text-gray-500 mt-2">
                        <Clock size={14} />
                        {item.start_time} - {item.end_time}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
