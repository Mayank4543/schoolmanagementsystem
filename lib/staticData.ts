// Static data utility for demo purposes
import sampleData from '../data/sampleData.json'

export interface User {
  id: string
  email: string
  role: 'teacher' | 'student'
  full_name: string
  phone: string
}

export interface Class {
  id: string
  name: string
  grade: string
  section: string
  teacher_id: string
  studentCount?: number
}

export interface Enrollment {
  id: string
  student_id: string
  class_id: string
}

export interface Schedule {
  id: string
  teacher_id: string
  class_id: string
  subject: string
  day_of_week: string
  start_time: string
  end_time: string
  classes: {
    name: string
  }
}

export interface AttendanceRecord {
  id: string
  student_id: string
  class_id: string
  date: string
  status: 'present' | 'absent' | 'late'
  classes: {
    name: string
  }
}

export interface Exam {
  id: string
  class_id: string
  subject: string
  exam_date: string
  start_time: string
  end_time: string
  total_marks: number
  classes: {
    name: string
  }
}

export interface MarksRecord {
  id: string
  student_id: string
  exam_id: string
  marks_obtained: number
  grade: string
  exams: {
    subject: string
    exam_date: string
    total_marks: number
    classes: {
      name: string
    }
  }
}

export interface Notification {
  id: string
  user_id: string
  title: string
  message: string
  type: string
  read: boolean
  created_at: string
}

export interface DashboardStats {
  student: {
    attendance: number
    upcomingExams: number
  }
  teacher: {
    classes: number
    students: number
    upcomingExams: number
    attendance: number
  }
}

// Static data access functions
export const getUsers = (): User[] => sampleData.users as User[]
export const getClasses = (): Class[] => sampleData.classes as Class[]
export const getEnrollments = (): Enrollment[] => sampleData.enrollments as Enrollment[]
export const getSchedules = (): Schedule[] => sampleData.schedules as Schedule[]
export const getAttendance = (): AttendanceRecord[] => sampleData.attendance as AttendanceRecord[]
export const getExams = (): Exam[] => sampleData.exams as Exam[]
export const getMarks = (): MarksRecord[] => sampleData.marks as MarksRecord[]
export const getNotifications = (): Notification[] => sampleData.notifications as Notification[]
export const getDashboardStats = (): DashboardStats => sampleData.dashboardStats as DashboardStats

// Helper functions for filtering data
export const getUserById = (id: string): User | undefined =>
  (sampleData.users as User[]).find((user: User) => user.id === id)

export const getUserByRole = (role: 'teacher' | 'student'): User[] =>
  (sampleData.users as User[]).filter((user: User) => user.role === role)

export const getClassesByTeacher = (teacherId: string): Class[] =>
  (sampleData.classes as Class[]).filter((cls: Class) => cls.teacher_id === teacherId)

export const getStudentsByClass = (classId: string): User[] => {
  const enrollments = (sampleData.enrollments as Enrollment[]).filter((e: Enrollment) => e.class_id === classId)
  return enrollments.map((e: Enrollment) => (sampleData.users as User[]).find((u: User) => u.id === e.student_id)!)
    .filter(Boolean)
}

export const getSchedulesByTeacher = (teacherId: string): Schedule[] =>
  (sampleData.schedules as Schedule[]).filter((schedule: Schedule) => schedule.teacher_id === teacherId)

export const getSchedulesByStudent = (studentId: string): Schedule[] => {
  const enrollments = (sampleData.enrollments as Enrollment[]).filter((e: Enrollment) => e.student_id === studentId)
  const classIds = enrollments.map((e: Enrollment) => e.class_id)
  return (sampleData.schedules as Schedule[]).filter((schedule: Schedule) => classIds.includes(schedule.class_id))
}

export const getAttendanceByStudent = (studentId: string): AttendanceRecord[] =>
  (sampleData.attendance as AttendanceRecord[]).filter((att: AttendanceRecord) => att.student_id === studentId)

export const getAttendanceByClass = (classId: string): AttendanceRecord[] =>
  (sampleData.attendance as AttendanceRecord[]).filter((att: AttendanceRecord) => att.class_id === classId)

export const getExamsByClass = (classId: string): Exam[] =>
  (sampleData.exams as Exam[]).filter((exam: Exam) => exam.class_id === classId)

export const getExamsByStudent = (studentId: string): Exam[] => {
  const enrollments = (sampleData.enrollments as Enrollment[]).filter((e: Enrollment) => e.student_id === studentId)
  const classIds = enrollments.map((e: Enrollment) => e.class_id)
  return (sampleData.exams as Exam[]).filter((exam: Exam) => classIds.includes(exam.class_id))
}

export const getMarksByStudent = (studentId: string): MarksRecord[] =>
  (sampleData.marks as MarksRecord[]).filter((mark: MarksRecord) => mark.student_id === studentId)

export const getMarksByExam = (examId: string): MarksRecord[] =>
  (sampleData.marks as MarksRecord[]).filter((mark: MarksRecord) => mark.exam_id === examId)

export const getNotificationsByUser = (userId: string): Notification[] =>
  (sampleData.notifications as Notification[]).filter((notif: Notification) => notif.user_id === userId)

// Mock authentication
export const mockCurrentUser: User = sampleData.users[0] as User // Default to first teacher

export const setMockCurrentUser = (userId: string): User | null => {
  const user = getUserById(userId)
  if (user) {
    Object.assign(mockCurrentUser, user)
    return user
  }
  return null
}