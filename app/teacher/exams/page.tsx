"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useEffect, useState } from "react"
import { format, parseISO } from "date-fns"
import Link from "next/link"
import { mockCurrentUser, getClassesByTeacher, getExamsByClass, Class, Exam } from "@/lib/staticData"

export default function ManageExamsPage() {
  const [classes, setClasses] = useState<Class[]>([])
  const [exams, setExams] = useState<Exam[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isCreating, setIsCreating] = useState(false)

  const [formData, setFormData] = useState({
    classId: "",
    subject: "",
    examDate: "",
    startTime: "",
    endTime: "",
    totalMarks: "100",
  })

  useEffect(() => {
    const loadData = async () => {
      // Use static data instead of Supabase
      const currentUser = mockCurrentUser

      if (currentUser.role === 'teacher') {
        const teacherClasses = getClassesByTeacher(currentUser.id)
        setClasses(teacherClasses)

        // Get exams for all teacher classes
        let allExams: Exam[] = []
        teacherClasses.forEach(cls => {
          const classExams = getExamsByClass(cls.id)
          allExams = [...allExams, ...classExams]
        })
        
        // Sort by date
        allExams.sort((a, b) => new Date(a.exam_date).getTime() - new Date(b.exam_date).getTime())
        setExams(allExams)
      }
      setIsLoading(false)
    }

    loadData()
  }, [])

  const handleCreateExam = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.classId || !formData.subject) {
      alert("Please fill all required fields")
      return
    }

    setIsCreating(true)

    try {
      // For demo purposes - just show success message
      // In real app, this would add to database
      
      alert("Exam created successfully! (Demo Mode - not saved to database)")
      setFormData({
        classId: "",
        subject: "",
        examDate: "",
        startTime: "",
        endTime: "",
        totalMarks: "100",
      })

      // For demo, could add to local state
      // But keeping it simple for now
      
    } catch (error: any) {
      alert(`Error creating exam: ${error.message}`)
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <div className="p-4 md:p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Manage Exams</h1>
        <p className="text-gray-500 mt-2">Create and manage exams for your classes</p>
      </div>

      {isLoading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <>
          {/* Create Exam Form */}
          <Card>
            <CardHeader>
              <CardTitle>Create New Exam</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateExam} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="class">Class</Label>
                    <Select
                      value={formData.classId}
                      onValueChange={(value) => setFormData({ ...formData, classId: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select class" />
                      </SelectTrigger>
                      <SelectContent>
                        {classes.map((cls) => (
                          <SelectItem key={cls.id} value={cls.id}>
                            {cls.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      placeholder="e.g., Mathematics"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="examDate">Exam Date</Label>
                    <Input
                      id="examDate"
                      type="date"
                      value={formData.examDate}
                      onChange={(e) => setFormData({ ...formData, examDate: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="totalMarks">Total Marks</Label>
                    <Input
                      id="totalMarks"
                      type="number"
                      value={formData.totalMarks}
                      onChange={(e) => setFormData({ ...formData, totalMarks: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="startTime">Start Time</Label>
                    <Input
                      id="startTime"
                      type="time"
                      value={formData.startTime}
                      onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="endTime">End Time</Label>
                    <Input
                      id="endTime"
                      type="time"
                      value={formData.endTime}
                      onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                    />
                  </div>
                </div>
                <Button type="submit" disabled={isCreating} className="w-full md:w-auto">
                  {isCreating ? "Creating..." : "Create Exam"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Exams List */}
          <Card>
            <CardHeader>
              <CardTitle>Exams ({exams.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {exams.length === 0 ? (
                <p className="text-gray-500">No exams created yet</p>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Subject</TableHead>
                        <TableHead>Class</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Max Marks</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {exams.map((exam) => (
                        <TableRow key={exam.id}>
                          <TableCell className="font-medium">{exam.subject}</TableCell>
                          <TableCell>{exam.classes?.name}</TableCell>
                          <TableCell>{format(parseISO(exam.exam_date), "MMM dd, yyyy")}</TableCell>
                          <TableCell>
                            {exam.start_time} - {exam.end_time}
                          </TableCell>
                          <TableCell>{exam.total_marks}</TableCell>
                          <TableCell>
                            <Link href={`/teacher/exams/${exam.id}/marks`}>
                              <Button variant="outline" size="sm">
                                Add Marks
                              </Button>
                            </Link>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
