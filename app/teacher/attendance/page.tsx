"use client"

// COMMENTED OUT - Using static demo data only
// import { createClient } from "@/lib/client"
import { getClassesByTeacher, getStudentsByClass } from "@/lib/staticData"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useEffect, useState } from "react"
import { format } from "date-fns"

interface Class {
  id: string
  name: string
}

interface Student {
  id: string
  full_name: string
  email: string
}

interface AttendanceStatus {
  studentId: string
  status: "present" | "absent" | "late"
}

export default function MarkAttendancePage() {
  const [classes, setClasses] = useState<Class[]>([])
  const [selectedClass, setSelectedClass] = useState<string>("")
  const [students, setStudents] = useState<Student[]>([])
  const [attendance, setAttendance] = useState<Record<string, AttendanceStatus>>({})
  const [selectedDate, setSelectedDate] = useState(format(new Date(), "yyyy-MM-dd"))
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    const loadClasses = async () => {
      // DEMO MODE - Using static data
      /*
      const supabase = createClient()
      const { data: userData } = await supabase.auth.getUser()

      if (userData?.user) {
        const { data } = await supabase.from("classes").select("id, name").eq("teacher_id", userData.user.id)

        setClasses(data as Class[])
      }
      */

      // Use static data for teacher-1
      const demoClasses = getClassesByTeacher("teacher-1")
      setClasses(demoClasses)
      setIsLoading(false)
    }

    loadClasses()
  }, [])

  useEffect(() => {
    if (!selectedClass) return

    const loadStudents = async () => {
      // DEMO MODE - Using static data
      /*
      const supabase = createClient()
      const { data } = await supabase
        .from("enrollments")
        .select("student_id, profiles:student_id(full_name, email)")
        .eq("class_id", selectedClass)

      setStudents(data as Student[])
      setAttendance({})
      */

      // Use static data
      const demoStudents = getStudentsByClass(selectedClass)
      setStudents(demoStudents)
      setAttendance({})
    }

    loadStudents()
  }, [selectedClass])

  const handleAttendanceChange = (studentId: string, status: "present" | "absent" | "late") => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: { studentId, status },
    }))
  }

  const handleSaveAttendance = async () => {
    if (!selectedClass || Object.keys(attendance).length === 0) {
      alert("Please mark attendance for at least one student")
      return
    }

    setIsSaving(true)
    // DEMO MODE - Just local state update
    /*
    const supabase = createClient()

    try {
      const attendanceRecords = Object.values(attendance).map((record) => ({
        student_id: record.studentId,
        class_id: selectedClass,
        date: selectedDate,
        status: record.status,
      }))

      const { error } = await supabase.from("attendance").insert(attendanceRecords)

      if (error) throw error

      alert("Attendance saved successfully!")
      setAttendance({})
    } catch (error: any) {
      alert(`Error saving attendance: ${error.message}`)
    } finally {
      setIsSaving(false)
    }
    */

    // DEMO MODE
    alert("Attendance saved successfully! (Demo Mode)")
    setAttendance({})
    setIsSaving(false)
  }

  return (
    <div className="p-4 md:p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Mark Attendance</h1>
        <p className="text-gray-500 mt-2">Record student attendance</p>
      </div>

      {isLoading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <>
          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Select Class & Date</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">Class</label>
                  <Select value={selectedClass} onValueChange={setSelectedClass}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a class" />
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
                  <label className="text-sm font-medium text-gray-700 block mb-2">Date</label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Attendance Table */}
          {selectedClass && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Students ({students.length})</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {students.length === 0 ? (
                  <p className="text-gray-500">No students enrolled in this class</p>
                ) : (
                  <>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {students.map((student) => (
                            <TableRow key={student.id}>
                              <TableCell className="font-medium">{student.full_name}</TableCell>
                              <TableCell>{student.email}</TableCell>
                              <TableCell>
                                <Select
                                  value={attendance[student.id]?.status || "present"}
                                  onValueChange={(value) =>
                                    handleAttendanceChange(student.id, value as "present" | "absent" | "late")
                                  }
                                >
                                  <SelectTrigger className="w-32">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="present">Present</SelectItem>
                                    <SelectItem value="absent">Absent</SelectItem>
                                    <SelectItem value="late">Late</SelectItem>
                                  </SelectContent>
                                </Select>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                    <Button onClick={handleSaveAttendance} className="w-full md:w-auto" disabled={isSaving}>
                      {isSaving ? "Saving..." : "Save Attendance"}
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  )
}
