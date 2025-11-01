"use client"

import type React from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
// COMMENTED OUT - Using static demo data only
// import { createClient } from "@/lib/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, Mail, Info } from "lucide-react"

export default function VerifyEmailPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const email = searchParams.get("email") || ""

  const [isResending, setIsResending] = useState(false)
  const [isSkipping, setIsSkipping] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [setupRequired, setSetupRequired] = useState(false)

  // DEMO MODE - Auto redirect after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/demo")
    }, 2000)
    return () => clearTimeout(timer)
  }, [router])

  const handleResendEmail = async (e: React.FormEvent) => {
    e.preventDefault()
    // DEMO MODE - Direct redirect
    /*
    const supabase = createClient()
    setIsResending(true)
    setError(null)
    setMessage(null)

    try {
      const { error } = await supabase.auth.resendIdentityConfirmationLink({
        email,
        type: "signup",
      })

      if (error) throw error
      setMessage("Confirmation email sent! Check your inbox.")
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "Failed to resend email")
    } finally {
      setIsResending(false)
    }
    */
    router.push("/demo")
  }

  const handleSkipConfirmation = async (e: React.FormEvent) => {
    e.preventDefault()
    // DEMO MODE - Direct redirect
    /*
    const supabase = createClient()
    setIsSkipping(true)
    setError(null)
    setSetupRequired(false)

    try {
      const response = await fetch("/api/auth/confirm-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        if (data.status === "SETUP_REQUIRED") {
          setSetupRequired(true)
          setError(data.instruction)
          return
        }
        throw new Error(data.message || "Failed to confirm email")
      }

      setMessage("Email confirmed! Redirecting to login...")
      setTimeout(() => {
        router.push(`/auth/login?email=${encodeURIComponent(email)}`)
      }, 1500)
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "Failed to resend email")
    } finally {
      setIsSkipping(false)
    }
    */
    router.push("/demo")
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <Mail className="h-12 w-12 text-blue-600" />
            </div>
            <CardTitle className="text-2xl font-bold">Verify Your Email</CardTitle>
            <CardDescription className="text-center mt-2">Email confirmation required to continue</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {setupRequired && (
              <div className="rounded-lg bg-amber-50 p-4 text-sm text-amber-800 space-y-2 flex gap-3">
                <Info className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold mb-2">Database Setup Required</p>
                  <p className="text-xs mb-3">{error}</p>
                  <ol className="text-xs space-y-1 ml-4 list-decimal">
                    <li>Go to your Supabase dashboard</li>
                    <li>Open the SQL Editor</li>
                    <li>Create a new query</li>
                    <li>
                      Copy and paste the content from{" "}
                      <code className="bg-white px-1 rounded">scripts/004_init_full_database.sql</code>
                    </li>
                    <li>Click "Run" to execute</li>
                    <li>Come back and try again</li>
                  </ol>
                </div>
              </div>
            )}

            {message && (
              <div className="rounded-lg bg-green-50 p-3 text-sm text-green-700 flex items-start gap-2">
                <Mail className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>{message}</span>
              </div>
            )}

            {error && !setupRequired && (
              <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600 flex items-start gap-2">
                <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-3 pt-2">
              <p className="text-sm text-gray-600">
                We sent a confirmation email to <span className="font-semibold">{email}</span>
              </p>

              <button
                onClick={handleResendEmail}
                disabled={isResending || setupRequired}
                className="w-full px-4 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors disabled:opacity-50"
              >
                {isResending ? "Sending..." : "Resend Confirmation Email"}
              </button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">or</span>
                </div>
              </div>

              <button
                onClick={handleSkipConfirmation}
                disabled={isSkipping || setupRequired}
                className="w-full px-4 py-2 text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg transition-colors disabled:opacity-50"
              >
                {isSkipping ? "Confirming..." : "Confirm Email (Development)"}
              </button>
            </div>

            <p className="text-xs text-gray-500 text-center mt-4">
              The "Confirm Email" button is for development only. In production, users must verify via email link.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
