"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { getUsers, setMockCurrentUser, mockCurrentUser } from "@/lib/staticData"
import { Badge } from "@/components/ui/badge"
import { User, GraduationCap } from "lucide-react"

export default function DemoPage() {
  const [currentUser, setCurrentUser] = useState(mockCurrentUser)
  const users = getUsers()

  const handleUserSwitch = (userId: string) => {
    const newUser = setMockCurrentUser(userId)
    if (newUser) {
      setCurrentUser(newUser)
      // Refresh the page to update all components
      window.location.reload()
    }
  }

  return (
    <div className="p-4 md:p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Demo Mode</h1>
        <p className="text-gray-500 mt-2">Switch between different users to test the system</p>
      </div>

      {/* Current User */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="text-blue-600" size={20} />
            Current User
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100">
              {currentUser.role === 'teacher' ? (
                <GraduationCap className="text-blue-600" size={24} />
              ) : (
                <User className="text-blue-600" size={24} />
              )}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{currentUser.full_name}</h3>
              <p className="text-sm text-gray-600">{currentUser.email}</p>
              <Badge variant="outline" className={currentUser.role === 'teacher' ? 'border-green-200 text-green-700' : 'border-blue-200 text-blue-700'}>
                {currentUser.role}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Available Users */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Switch User</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map((user) => (
            <Card 
              key={user.id} 
              className={`cursor-pointer transition-all hover:shadow-md ${
                user.id === currentUser.id ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:bg-gray-50'
              }`}
              onClick={() => handleUserSwitch(user.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-100">
                    {user.role === 'teacher' ? (
                      <GraduationCap className="text-gray-600" size={20} />
                    ) : (
                      <User className="text-gray-600" size={20} />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{user.full_name}</h3>
                    <p className="text-xs text-gray-500">{user.email}</p>
                    <Badge 
                      variant="outline" 
                      className={`mt-1 text-xs ${
                        user.role === 'teacher' 
                          ? 'border-green-200 text-green-700' 
                          : 'border-blue-200 text-blue-700'
                      }`}
                    >
                      {user.role}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

    
    </div>
  )
}