// COMMENTED OUT - Using static demo data only
// This page is not available in demo mode

"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AddMarksPage() {
  return (
    <div className="p-4 md:p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Add Exam Marks</h1>
        <p className="text-gray-500 mt-2">Enter marks for students</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Demo Mode</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600">
            This feature requires database connection and is not available in demo mode.
          </p>
          <p className="text-gray-600">
            In production, teachers would be able to enter marks for students here.
          </p>
          <Link href="/teacher/exams">
            <Button>Back to Exams</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
