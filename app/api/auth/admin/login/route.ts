// app/api/auth/admin/login/route.ts
import { NextResponse } from 'next/server'
import { sign } from 'jsonwebtoken'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body

    // Validate credentials (replace with your actual authentication logic)
    if (email === 'admin@example.com' && password === 'admin123') {
      // Create JWT token
      const token = sign(
        {
          userId: '1',
          email: email,
          role: 'admin',
        },
        process.env.JWT_SECRET || 'secret',
        { expiresIn: '24h' }
      )

      // Set cookie
      cookies().set({
        name: 'admin_token',
        value: token,
        httpOnly: true,
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24, // 24 hours
      })

      return NextResponse.json({ 
        success: true,
        message: 'Login successful' 
      })
    }

    // Invalid credentials
    return NextResponse.json(
      { message: 'Invalid email or password' },
      { status: 401 }
    )
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}