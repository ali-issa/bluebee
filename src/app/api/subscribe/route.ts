// app/api/subscribe/route.ts
import { NextResponse } from 'next/server'
import sendgrid from '@sendgrid/mail'
import { emailRateLimiter, ipRateLimiter } from '@/lib/rate-limiter'
import { headers } from 'next/headers'

// Initialize SendGrid with your API key
sendgrid.setApiKey(process.env.SENDGRID_API_KEY as string)

// Clean up rate limiter periodically
setInterval(
  () => {
    ipRateLimiter.cleanup()
    emailRateLimiter.cleanup()
  },
  60 * 60 * 1000,
) // Clean up every hour

export async function POST(request: Request) {
  try {
    // Get the IP address from the headers
    const headersList = await headers()
    const ip = (headersList.get('x-forwarded-for') || 'unknown').split(',')[0]

    // Check IP-based rate limit
    const isIpLimited = await ipRateLimiter.isRateLimited(ip ?? '')
    if (isIpLimited) {
      return NextResponse.json(
        {
          error: 'Too many requests from this IP. Please try again later.',
          retryAfter: ipRateLimiter.getResetTime(ip ?? ''),
        },
        {
          status: 429,
          headers: {
            'Retry-After': Math.ceil(
              (ipRateLimiter.getResetTime(ip ?? '') - Date.now()) / 1000,
            ).toString(),
          },
        },
      )
    }
    // Get email from request body
    const { email } = await request.json()

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Please provide a valid email address' }, { status: 400 })
    }

    // Check email-based rate limit
    const isEmailLimited = await emailRateLimiter.isRateLimited(email)
    if (isEmailLimited) {
      return NextResponse.json(
        {
          error: 'Too many subscription attempts from this email. Please try again later.',
          retryAfter: emailRateLimiter.getResetTime(email),
        },
        {
          status: 429,
          headers: {
            'Retry-After': Math.ceil(
              (emailRateLimiter.getResetTime(email) - Date.now()) / 1000,
            ).toString(),
          },
        },
      )
    }

    // Prepare email content
    const msg = {
      to: process.env.ADMIN_EMAIL as string, // Your email where you want to receive notifications
      from: process.env.SENDGRID_FROM_EMAIL as string, // Verified sender email in SendGrid
      subject: 'New bluebee Website Subscription',
      text: `New subscription request from: ${email}`,
      html: `<p>New subscription request from: <strong>${email}</strong></p>`,
    }

    // Send email using SendGrid
    await sendgrid.send(msg)

    // Optional: Here you could also save the email to your database

    return NextResponse.json({ message: 'Subscription successful' }, { status: 200 })
  } catch (error) {
    console.error('Subscription error:', error)
    return NextResponse.json(
      { error: 'Failed to subscribe. Please try again later.' },
      { status: 500 },
    )
  }
}
