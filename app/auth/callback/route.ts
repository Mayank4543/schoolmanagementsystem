// COMMENTED OUT - Using static demo data only
// import { createClient } from "@/lib/server"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  // DEMO MODE - Direct redirect to demo
  /*
  const { searchParams } = new URL(request.url)
  const code = searchParams.get("code")

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }
  }

  return NextResponse.redirect(new URL("/auth/login", request.url))
  */

  return NextResponse.redirect(new URL("/demo", request.url))
}
