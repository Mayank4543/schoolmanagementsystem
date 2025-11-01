"use client"

import { createClient } from "@/lib/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"

interface Student {
  id: string
  profiles: {
    full_name: string
    email: string
  }
}

interface StudentMarks {
  studentId: string
  marks: number
}

interface ExamInfo {
  total_marks: number
  subject: string
}

export default function AddMarksPage() {
  const params = useParams()
  const examId = params.examId as string

  const [students, setStudents] = useState<Student[]>([])
  const [exam, setExam] = useState<ExamInfo | null>(null)
  const [marks, setMarks] = useState<Record<string, StudentMarks>>({})
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      const supabase = createClient()

      // Get exam info
      const { data: examData } = await supabase.from("exams").select("total_marks, subject").eq("id", examId).single()

      setExam(examData as ExamInfo)

      // Get students for the exam
      const { data: examFull } = await supabase.from("exams").select("class_id").eq("id", examId).single()

      if (examFull) {
        const { data: enrollments } = await supabase
          .from("enrollments")
          .select("student_id, profiles:student_id(full_name, email)")
          .eq("class_id", examFull.class_id)

        setStudents(enrollments as Student[])
      }

      setIsLoading(false)
    }

    loadData()
  }, [examId])

  const handleMarksChange = (studentId: string, marksValue: string) => {
    const marksNum = Number.parseInt(marksValue) || 0
    setMarks((prev) => ({
      ...prev,
      [studentId]: { studentId, marks: marksNum },
    }))
  }

  const handleSaveMarks = async () => {
    if (Object.keys(marks).length === 0) {
      alert("Please enter marks for at least one student")
      return
    }

    setIsSaving(true)
    const supabase = createClient()

    try {
      const marksRecords = Object.values(marks).map((record) => ({
        student_id: record.studentId,
        exam_id: examId,
        marks_obtained: record.marks,
      }))

      const { error } = await supabase.from("marks").insert(marksRecords)

      if (error) throw error

      alert("Marks saved successfully!")
      setMarks({})
    } catch (error: any) {
      alert(`Error saving marks: ${error.message}`)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="p-4 md:p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Add Exam Marks</h1>
        <p className="text-gray-500 mt-2">{exam && `${exam.subject} - Total Marks: ${exam.total_marks}`}</p>
      </div>

      {isLoading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Enter Marks for Students</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {students.length === 0 ? (
              <p className="text-gray-500">No students found for this exam</p>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Marks ({exam?.total_marks})</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {students.map((student) => (
                        <TableRow key={student.id}>
                          <TableCell className="font-medium">{student.profiles?.full_name}</TableCell>
                          <TableCell>{student.profiles?.email}</TableCell>
                          <TableCell>
                            <Input
                              type="number"
                              min="0"
                              max={exam?.total_marks}
                              placeholder="Enter marks"
                              value={marks[student.id]?.marks || ""}
                              onChange={(e) => handleMarksChange(student.id, e.target.value)}
                              className="w-32"
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <Button onClick={handleSaveMarks} disabled={isSaving} className="w-full md:w-auto">
                  {isSaving ? "Saving..." : "Save All Marks"}
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
