// COMMENTED OUT - Using static demo data only
// import { createClient } from "@/lib/server"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  // DEMO MODE - Always return success
  /*
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    const supabase = await createClient()

    const { data: tableCheck, error: tableError } = await supabase.from("profiles").select("id").limit(0)

    if (tableError && tableError.message.includes("Could not find the table")) {
      return NextResponse.json(
        {
          error: "Database not initialized",
          message: "Please run the database initialization script first",
          instruction: "Go to Supabase SQL Editor and run scripts/004_init_full_database.sql",
          status: "SETUP_REQUIRED",
        },
        { status: 503 },
      )
    }

    const { data, error: getUserError } = await supabase.from("profiles").select("id").eq("email", email).single()

    if (getUserError) {
      console.error("Get user error:", getUserError)
      return NextResponse.json(
        {
          error: "User profile not found",
          message: "The profile hasn't been created yet. Try signing up again.",
          hint: "If you just signed up, wait a moment for the profile to be created.",
        },
        { status: 404 },
      )
    }

    // Call the confirm_email stored procedure (development only)
    const { error: confirmError } = await supabase.rpc("confirm_email_development", {
      user_email: email,
    })

    if (confirmError) {
      console.error("Confirm email RPC error:", confirmError)
      return NextResponse.json(
        {
          error: "Email confirmation function not found",
          message: "Please run the database initialization script",
          instruction: "Go to Supabase SQL Editor and run scripts/004_init_full_database.sql",
          status: "SETUP_REQUIRED",
        },
        { status: 503 },
      )
    }

    return NextResponse.json({ success: true, message: "Email confirmed successfully" })
  } catch (error) {
    console.error("Error confirming email:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
  */

  return NextResponse.json({ success: true, message: "Email confirmed successfully (Demo Mode)" })
}
