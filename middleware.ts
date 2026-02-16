import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verify } from 'jsonwebtoken'

interface JWTPayload {
  userId: string
  role: 'admin' | 'editor' | 'viewer'
  email: string
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Public paths
  const publicPaths = ['/', '/about', '/projects', '/contact', '/api/public']
  const isPublicPath = publicPaths.some(path => pathname.startsWith(path))
  
  // Admin paths
  if (pathname.startsWith('/admin')) {
    // Allow access to admin login
    if (pathname === '/admin/login') {
      // If already logged in, redirect to admin dashboard
      const token = request.cookies.get('admin_token')?.value
      if (token) {
        try {
          // Verify token - if valid, redirect to dashboard
          return NextResponse.redirect(new URL('/admin', request.url))
        } catch {
          // Token invalid, allow access to login
          return NextResponse.next()
        }
      }
      return NextResponse.next()
    }
    
    // Check authentication
    const token = request.cookies.get('admin_token')?.value
    
    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
    
    try {
      // Verify JWT token
      const decoded = verify(token, process.env.JWT_SECRET || 'secret') as JWTPayload
      
      // Role-based access control
      const requestHeaders = new Headers(request.headers)
      requestHeaders.set('x-user-id', decoded.userId)
      requestHeaders.set('x-user-role', decoded.role)
      
      // Check permissions for specific admin routes
      if (pathname.startsWith('/admin/settings') && decoded.role !== 'admin') {
        // Only admins can access settings
        return NextResponse.redirect(new URL('/admin', request.url))
      }
      
      if (pathname.startsWith('/admin/users') && decoded.role !== 'admin') {
        // Only admins can manage users
        return NextResponse.redirect(new URL('/admin', request.url))
      }
      
      // Continue with user info in headers
      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      })
    } catch (error) {
      // Invalid token
      const response = NextResponse.redirect(new URL('/admin/login', request.url))
      response.cookies.delete('admin_token')
      return response
    }
  }
  
  // For non-admin routes, just continue
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}