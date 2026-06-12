import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

/** Public routes that do not require authentication. */
const PUBLIC_PATHS = ["/login", "/verify", "/auth"]

/**
 * Refreshes the Supabase auth session on every request and redirects
 * unauthenticated users to /login.
 */
export async function updateSession(request: NextRequest) {
  // Magic-link safety net: if an auth `code` lands anywhere other than the
  // exchange handler (e.g. Supabase redirected to "/" or "/login"), forward it
  // to /auth/confirm so the session can be established.
  const code = request.nextUrl.searchParams.get("code")
  if (code && request.nextUrl.pathname !== "/auth/confirm") {
    const url = request.nextUrl.clone()
    url.pathname = "/auth/confirm"
    return NextResponse.redirect(url)
  }

  let response = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          response = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const path = request.nextUrl.pathname
  const isPublic = PUBLIC_PATHS.some((p) => path.startsWith(p))

  if (!user && !isPublic) {
    const url = request.nextUrl.clone()
    url.pathname = "/login"
    return NextResponse.redirect(url)
  }

  return response
}
