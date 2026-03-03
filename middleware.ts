import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verify } from 'jsonwebtoken'

interface JWTPayload {
  userId: string
  role: 'admin' | 'editor' | 'viewer'
  email: string
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get('admin_token')?.value

  // ===== LOGIN PAGE =====
  if (pathname === '/admin/login') {
    if (token) {
      try {
        verify(token, process.env.JWT_SECRET as string)
        return NextResponse.redirect(new URL('/admin', request.url))
      } catch {
        return NextResponse.next()
      }
    }
    return NextResponse.next()
  }

  // ===== ADMIN PROTECTION =====
  if (pathname.startsWith('/admin')) {

    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    try {
      verify(token, process.env.JWT_SECRET as string)
      return NextResponse.next()
    } catch {
      const response = NextResponse.redirect(
        new URL('/admin/login', request.url)
      )
      response.cookies.delete('admin_token')
      return response
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/admin/:path*',
  ],
}
