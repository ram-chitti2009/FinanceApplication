import { NextResponse } from 'next/server'
import { updateSession } from './app/lib/supabase/middleware'
import { createClient } from './app/lib/supabase/server'
import { NextRequest } from 'next/server'

  // This function can be marked `async` if using `await` inside
  export async function middleware(request: NextRequest) {
    const supabase = await createClient()
    const { data: { user }} = await supabase.auth.getUser()

    if (!user && request.nextUrl.pathname.startsWith('/dashboard')) {
      return Response.redirect(new URL('/login', request.url))
    }

    if (user && request.nextUrl.pathname.startsWith('/login')) {
      return Response.redirect(new URL('/dashboard', request.url))
    }

    return await updateSession(request)
  }
