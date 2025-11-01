# School Management System - Static Demo Data

यह project अब static sample data के साथ configured है demo purposes के लिए।

## Static Data Structure

All static data is stored in:
- `data/sampleData.json` - Main data file with all sample records
- `lib/staticData.ts` - Utility functions to access static data

## Sample Users

### Teachers
1. **Rajesh Sharma** (teacher-1)
   - Email: rajesh.sharma@school.com
   - Classes: Class 10-A, Class 9-A
   - Subjects: Mathematics, Physics

2. **Priya Singh** (teacher-2)
   - Email: priya.singh@school.com
   - Classes: Class 10-B
   - Subjects: English, Hindi

### Students
1. **Amit Kumar** (student-1)
   - Email: amit.kumar@student.com
   - Class: Class 10-A

2. **Sneha Patel** (student-2)
   - Email: sneha.patel@student.com
   - Class: Class 10-A

3. **Rahul Gupta** (student-3)
   - Email: rahul.gupta@student.com
   - Class: Class 10-B

4. **Anjali Verma** (student-4)
   - Email: anjali.verma@student.com
   - Class: Class 10-B

5. **Vikash Yadav** (student-5)
   - Email: vikash.yadav@student.com
   - Class: Class 9-A

## Features Available

### Teacher Features
- **Dashboard**: Overview stats for classes and students
- **My Classes**: View assigned classes with student counts
- **Mark Attendance**: View classes (demo data displayed)
- **Manage Exams**: View existing exams, create new ones (demo mode)
- **Schedule**: Weekly teaching schedule

### Student Features
- **Dashboard**: Overview of attendance and upcoming exams
- **Attendance**: View attendance records with statistics
- **Schedule**: Weekly class timetable
- **Exams**: View upcoming and past exams
- **Marks**: View exam results and performance

## Demo Mode

Visit `/demo` page to:
- Switch between different users
- Test both teacher and student views
- See how data changes based on user role

## How to Use

1. **Start the application:**
   ```bash
   npm run dev
   ```

2. **Access demo mode:**
   - Go to `http://localhost:3000/demo`
   - Click on any user card to switch users
   - Navigate through different pages to see role-based data

3. **Default User:**
   - By default, the system loads with "Rajesh Sharma" (Teacher)
   - Use demo page to switch between users

## Data Files

### `data/sampleData.json`
Contains all static data:
- Users (teachers and students)
- Classes and enrollments
- Schedules and timetables
- Attendance records
- Exams and marks
- Notifications
- Dashboard statistics

### `lib/staticData.ts`
Provides utility functions:
- `getUsers()` - Get all users
- `getClassesByTeacher(teacherId)` - Get teacher's classes
- `getAttendanceByStudent(studentId)` - Get student attendance
- `getMarksByStudent(studentId)` - Get student marks
- `getSchedulesByTeacher(teacherId)` - Get teacher schedule
- And many more...

## Modified Components

All following components now use static data instead of Supabase:

- `app/dashboard/page.tsx`
- `app/teacher/classes/page.tsx`
- `app/teacher/schedule/page.tsx`
- `app/teacher/exams/page.tsx`
- `app/student/attendance/page.tsx`
- `app/student/marks/page.tsx`
- `app/student/exams/page.tsx`
- `app/student/schedule/page.tsx`
- `components/sidebar.tsx`

## Adding More Data

To add more sample data, edit `data/sampleData.json`:

1. **Add new users:**
   ```json
   {
     "id": "user-new",
     "email": "new.user@example.com",
     "role": "student",
     "full_name": "New User",
     "phone": "+91-9876543220"
   }
   ```

2. **Add new classes:**
   ```json
   {
     "id": "class-new",
     "name": "Class 11-A",
     "grade": "11",
     "section": "A",
     "teacher_id": "teacher-1",
     "studentCount": 30
   }
   ```

3. **Add enrollments, schedules, etc.** following the same pattern

## Notes

- यह demo version है - कोई भी changes permanently save नहीं होंगे
- Authentication disabled है demo के लिए
- सभी data JSON file से load होता है
- Real database integration के लिए original Supabase code को restore करना होगा

## Reset to Dynamic Data

Original Supabase integration को restore करने के लिए:
1. Git history में पुराने files को restore करें
2. Environment variables को properly configure करें
3. Supabase database को setup करें