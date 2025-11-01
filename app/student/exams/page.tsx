"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useEffect, useState } from "react"
import { format, parseISO } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { mockCurrentUser, getExamsByStudent, Exam } from "@/lib/staticData"

export default function ExamsPage() {
  const [exams, setExams] = useState<Exam[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadExams = async () => {
      // Use static data instead of Supabase
      const currentUser = mockCurrentUser
      
      if (currentUser.role === 'student') {
        const studentExams = getExamsByStudent(currentUser.id)
        
        // Sort by date
        const sortedExams = studentExams.sort((a, b) => 
          new Date(a.exam_date).getTime() - new Date(b.exam_date).getTime()
        )
        
        setExams(sortedExams)
      }
      setIsLoading(false)
    }

    loadExams()
  }, [])

  const upcomingExams = exams.filter((e) => new Date(e.exam_date) >= new Date())
  const pastExams = exams.filter((e) => new Date(e.exam_date) < new Date())

  return (
    <div className="p-4 md:p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Exams</h1>
        <p className="text-gray-500 mt-2">View your exam schedule</p>
      </div>

      {/* Upcoming Exams */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Badge className="bg-indigo-100 text-indigo-700">Upcoming</Badge>
          {upcomingExams.length} exams
        </h2>

        {isLoading ? (
          <p className="text-gray-500">Loading...</p>
        ) : upcomingExams.length === 0 ? (
          <Card>
            <CardContent className="p-6">
              <p className="text-gray-500">No upcoming exams</p>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Subject</TableHead>
                      <TableHead>Class</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Max Marks</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {upcomingExams.map((exam) => (
                      <TableRow key={exam.id}>
                        <TableCell className="font-medium">{exam.subject}</TableCell>
                        <TableCell>{exam.classes?.name}</TableCell>
                        <TableCell>{format(parseISO(exam.exam_date), "MMM dd, yyyy")}</TableCell>
                        <TableCell>
                          {exam.start_time} - {exam.end_time}
                        </TableCell>
                        <TableCell>{exam.total_marks}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Past Exams */}
      {pastExams.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Badge className="bg-gray-100 text-gray-700">Completed</Badge>
            {pastExams.length} exams
          </h2>
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Subject</TableHead>
                      <TableHead>Class</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Max Marks</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pastExams.map((exam) => (
                      <TableRow key={exam.id}>
                        <TableCell className="font-medium">{exam.subject}</TableCell>
                        <TableCell>{exam.classes?.name}</TableCell>
                        <TableCell>{format(parseISO(exam.exam_date), "MMM dd, yyyy")}</TableCell>
                        <TableCell>
                          {exam.start_time} - {exam.end_time}
                        </TableCell>
                        <TableCell>{exam.total_marks}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
