"use client"

import type React from "react"

// COMMENTED OUT - Using static demo data only
// import { createClient } from "@/lib/client"
import { mockCurrentUser } from "@/lib/staticData"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"
import { User, Mail, Shield } from "lucide-react"

interface UserProfile {
  id: string
  email: string
  full_name: string
  phone: string
  role: string
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState({
    full_name: "",
    phone: "",
  })

  useEffect(() => {
    const loadProfile = async () => {
      // DEMO MODE - Using static data
      /*
      const supabase = createClient()
      const { data: userData } = await supabase.auth.getUser()

      if (userData?.user) {
        const { data: profileData } = await supabase.from("profiles").select("*").eq("id", userData.user.id).single()

        const userProfile = { ...profileData, email: userData.user.email } as UserProfile
        setProfile(userProfile)
        setFormData({
          full_name: userProfile.full_name || "",
          phone: userProfile.phone || "",
        })
      }
      */

      // Use static demo user
      const userProfile = mockCurrentUser as UserProfile
      setProfile(userProfile)
      setFormData({
        full_name: userProfile.full_name || "",
        phone: userProfile.phone || "",
      })
      setIsLoading(false)
    }

    loadProfile()
  }, [])

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!profile) return

    setIsSaving(true)
    // DEMO MODE - Just update local state
    /*
    const supabase = createClient()

    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: formData.full_name,
          phone: formData.phone,
        })
        .eq("id", profile.id)

      if (error) throw error

      setProfile({ ...profile, ...formData })
      alert("Profile updated successfully!")
    } catch (error: any) {
      alert(`Error updating profile: ${error.message}`)
    } finally {
      setIsSaving(false)
    }
    */

    // DEMO MODE - Just update local state
    setProfile({ ...profile, ...formData })
    alert("Profile updated successfully! (Demo Mode)")
    setIsSaving(false)
  }

  if (isLoading) {
    return <div className="p-8">Loading...</div>
  }

  return (
    <div className="p-4 md:p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
        <p className="text-gray-500 mt-2">Manage your account information</p>
      </div>

      {profile && (
        <>
          {/* Profile Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100">
                  <User className="text-indigo-600" size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-600">User Role</p>
                  <p className="font-semibold text-gray-900 capitalize">{profile.role}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Edit Profile Form */}
          <Card>
            <CardHeader>
              <CardTitle>Edit Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg border border-gray-300 text-gray-500">
                    <Mail size={16} />
                    <span className="text-sm">{profile.email}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                </div>

                <div>
                  <Label htmlFor="full_name">Full Name</Label>
                  <Input
                    id="full_name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.full_name}
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                    className="rounded-lg"
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="rounded-lg"
                  />
                </div>

                <Button type="submit" disabled={isSaving} className="w-full md:w-auto rounded-lg">
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Security */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield size={20} />
                Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">
                Your account is protected with Supabase Authentication. To change your password, please use the password
                reset feature.
              </p>
              <Button variant="outline" className="rounded-lg bg-transparent">
                Change Password
              </Button>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
