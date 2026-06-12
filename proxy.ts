import { type NextRequest } from "next/server"
import { updateSession } from "@/lib/supabase/middleware"

// Next.js 16 "proxy" convention (formerly middleware): refreshes the
// Supabase auth session and gates protected routes on every request.
export async function proxy(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
  matcher: [
    // Run on everything except static assets and image files
    "/((?!_next/static|_next/image|favicon.ico|moncare-logo.png|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
