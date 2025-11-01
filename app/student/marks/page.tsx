"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { mockCurrentUser, getMarksByStudent, MarksRecord } from "@/lib/staticData"

export default function MarksPage() {
  const [marks, setMarks] = useState<MarksRecord[]>([])
  const [stats, setStats] = useState({ average: 0, total: 0, count: 0 })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadMarks = async () => {
      // Use static data instead of Supabase
      const currentUser = mockCurrentUser
      
      if (currentUser.role === 'student') {
        const studentMarks = getMarksByStudent(currentUser.id)
        
        // Sort by subject
        const sortedMarks = studentMarks.sort((a, b) => 
          a.exams.subject.localeCompare(b.exams.subject)
        )
        
        setMarks(sortedMarks)

        // Calculate stats
        if (sortedMarks.length > 0) {
          const total = sortedMarks.reduce((sum, m) => sum + m.marks_obtained, 0)
          const average = total / sortedMarks.length
          setStats({
            average: Math.round(average * 100) / 100,
            total,
            count: sortedMarks.length,
          })
        }
      }
      setIsLoading(false)
    }

    loadMarks()
  }, [])

  const getPerformanceColor = (percentage: number) => {
    if (percentage >= 80) return "bg-green-100 text-green-800"
    if (percentage >= 60) return "bg-blue-100 text-blue-800"
    if (percentage >= 40) return "bg-yellow-100 text-yellow-800"
    return "bg-red-100 text-red-800"
  }

  const getPerformanceLabel = (percentage: number) => {
    if (percentage >= 80) return "Excellent"
    if (percentage >= 60) return "Good"
    if (percentage >= 40) return "Average"
    return "Poor"
  }

  return (
    <div className="p-4 md:p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">My Marks</h1>
        <p className="text-gray-500 mt-2">View your exam results</p>
      </div>

      {/* Stats */}
      {stats.count > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-gradient-to-br from-indigo-50 to-indigo-100 border-indigo-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-indigo-900">Average Marks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-indigo-700">{stats.average}</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-purple-900">Total Marks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-700">{stats.total}</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-blue-900">Exams Taken</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-700">{stats.count}</div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Marks Table */}
      <Card>
        <CardHeader>
          <CardTitle>Exam Marks</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-gray-500">Loading...</p>
          ) : marks.length === 0 ? (
            <p className="text-gray-500">No marks available yet</p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Subject</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Marks Obtained</TableHead>
                    <TableHead>Total Marks</TableHead>
                    <TableHead>Percentage</TableHead>
                    <TableHead>Performance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {marks.map((mark) => {
                    const percentage = ((mark.marks_obtained / mark.exams.total_marks) * 100).toFixed(1)
                    return (
                      <TableRow key={mark.id}>
                        <TableCell className="font-medium">{mark.exams.subject}</TableCell>
                        <TableCell>{mark.exams.classes.name}</TableCell>
                        <TableCell>{mark.marks_obtained}</TableCell>
                        <TableCell>{mark.exams.total_marks}</TableCell>
                        <TableCell>{percentage}%</TableCell>
                        <TableCell>
                          <Badge className={getPerformanceColor(Number.parseFloat(percentage))}>
                            {getPerformanceLabel(Number.parseFloat(percentage))}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
