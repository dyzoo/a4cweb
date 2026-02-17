// app/api/auth/admin/login/route.ts
import { NextResponse } from 'next/server'
import { sign } from 'jsonwebtoken'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (email === 'admin@example.com' && password === 'admin123') {
      const token = sign(
        {
          userId: '1',
          email,
          role: 'admin',
        },
        process.env.JWT_SECRET as string,
        { expiresIn: '24h' }
      )

      // ✅ FIX: await cookies()
      const cookieStore = await cookies()

      cookieStore.set({
        name: 'admin_token',
        value: token,
        httpOnly: true,
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24,
      })

      return NextResponse.json({
        success: true,
        message: 'Login successful',
      })
    }

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
