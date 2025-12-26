import createMiddleware from 'next-intl/middleware'
import { NextRequest, NextResponse } from 'next/server'
import { locales, defaultLocale } from '@/lib/i18n/config'
import { updateSession } from '@/lib/supabase/middleware'

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed'
})

export async function proxy(request: NextRequest) {
  // Handle Supabase auth session
  const supabaseResponse = await updateSession(request)

  // Handle internationalization
  const response = intlMiddleware(request)

  // Copy Supabase cookies to the response
  supabaseResponse.cookies.getAll().forEach(cookie => {
    response.cookies.set(cookie.name, cookie.value, cookie)
  })

  return response
}

export const config = {
  matcher: [
    // Match all pathnames except for
    // - /api (API routes)
    // - /_next (Next.js internals)
    // - /_vercel (Vercel internals)
    // - /static (inside /public)
    // - all files with an extension (e.g. favicon.ico, manifest.json)
    '/((?!api|_next|_vercel|static|.*\\..*).*)'
  ]
}
