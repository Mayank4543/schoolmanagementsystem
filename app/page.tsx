import { redirect } from "next/navigation"
// COMMENTED OUT - Using static demo data only
// import { createClient } from "@/lib/server"

export default async function Page() {
  // DEMO MODE - Direct redirect to demo page
  /*
  const supabase = await createClient()
  const { data } = await supabase.auth.getUser()

  if (data?.user) {
    redirect("/dashboard")
  }

  redirect("/auth/login")
  */

  redirect("/demo")
}
