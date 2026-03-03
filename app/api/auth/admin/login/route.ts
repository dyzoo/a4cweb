import { NextResponse } from 'next/server'
import { sign } from 'jsonwebtoken'
import { cookies } from 'next/headers'
import bcrypt from 'bcryptjs'

// Generate a proper bcrypt hash for "admin123"
const ADMIN_PASSWORD_HASH = '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy' // Hash for "admin123"

// Mock database with a test user
const users = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    password: ADMIN_PASSWORD_HASH,
    role: 'super_admin',
    isActive: true,
    lastLogin: null as Date | null,
    loginAttempts: 0,
    lockedUntil: null as number | null
  }
]

// Rate limiting
const rateLimit = new Map<string, { attempts: number; lastAttempt: number }>()
const MAX_LOGIN_ATTEMPTS = 5
const LOCK_TIME = 15 * 60 * 1000 // 15 minutes
const RATE_LIMIT_WINDOW = 15 * 60 * 1000 // 15 minutes

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password, rememberMe } = body

    console.log('Login attempt:', { email, passwordProvided: !!password }) // Debug log

    // Get client IP
    const ip = request.headers.get('x-forwarded-for') || 'unknown'
    
    // Rate limiting
    const now = Date.now()
    const rateData = rateLimit.get(ip) || { attempts: 0, lastAttempt: now }
    
    if (now - rateData.lastAttempt > RATE_LIMIT_WINDOW) {
      rateData.attempts = 0
    }
    
    if (rateData.attempts >= MAX_LOGIN_ATTEMPTS) {
      return NextResponse.json(
        { 
          success: false,
          message: 'Too many login attempts. Please try again later.'
        },
        { status: 429 }
      )
    }

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { 
          success: false,
          message: 'Email and password are required'
        },
        { status: 400 }
      )
    }

    // Find user by email
    const user = users.find(u => u.email === email && u.isActive)
    
    if (!user) {
      rateData.attempts++
      rateData.lastAttempt = now
      rateLimit.set(ip, rateData)
      
      return NextResponse.json(
        { 
          success: false,
          message: 'Invalid email or password'
        },
        { status: 401 }
      )
    }

    // Check if account is locked
    if (user.lockedUntil && user.lockedUntil > now) {
      return NextResponse.json(
        { 
          success: false,
          message: 'Account is temporarily locked due to too many failed attempts. Please try again later.'
        },
        { status: 423 }
      )
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password)
    
    if (!isPasswordValid) {
      // Increment failed attempts
      user.loginAttempts++
      
      if (user.loginAttempts >= MAX_LOGIN_ATTEMPTS) {
        user.lockedUntil = now + LOCK_TIME
      }
      
      rateData.attempts++
      rateData.lastAttempt = now
      rateLimit.set(ip, rateData)

      return NextResponse.json(
        { 
          success: false,
          message: 'Invalid email or password'
        },
        { status: 401 }
      )
    }

    // Successful login - reset attempts
    user.loginAttempts = 0
    user.lockedUntil = null
    user.lastLogin = new Date()

    console.log('User authenticated successfully:', user.email)
    
    // Create session data
    const sessionData = {
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    }

    // Generate JWT token
    const token = sign(
      sessionData,
      process.env.JWT_SECRET || 'your-secret-key-change-in-production',
      { expiresIn: rememberMe ? '30d' : '24h' }
    )

    // Get cookie store and set cookies
    const cookieStore = await cookies()
    
    cookieStore.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: rememberMe ? 30 * 24 * 60 * 60 : 24 * 60 * 60
    })

    return NextResponse.json({ 
      success: true,
      message: 'Login successful',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    })

  } catch (error) {
    console.error('Login error:', error)
    
    return NextResponse.json(
      { 
        success: false,
        message: 'An internal server error occurred'
      },
      { status: 500 }
    )
  }
}
