// lib/rate-limiter.ts
interface RateLimitInfo {
  count: number
  lastReset: number
}

export class RateLimiter {
  private cache: Map<string, RateLimitInfo>
  private readonly limit: number
  private readonly windowMs: number

  constructor(limit: number, windowMs: number) {
    this.cache = new Map()
    this.limit = limit
    this.windowMs = windowMs
  }

  private getCurrentWindow(timestamp: number): number {
    return Math.floor(timestamp / this.windowMs)
  }

  async isRateLimited(key: string): Promise<boolean> {
    const now = Date.now()
    const currentWindow = this.getCurrentWindow(now)
    const info = this.cache.get(key)

    if (!info || this.getCurrentWindow(info.lastReset) < currentWindow) {
      // First request or window expired, reset counter
      this.cache.set(key, {
        count: 1,
        lastReset: now,
      })
      return false
    }

    if (info.count >= this.limit) {
      return true
    }

    // Increment counter
    info.count += 1
    this.cache.set(key, info)
    return false
  }

  getResetTime(key: string): number {
    const info = this.cache.get(key)
    if (!info) return 0
    return info.lastReset + this.windowMs
  }

  // Clean up old entries periodically
  cleanup(): void {
    const now = Date.now()
    for (const [key, info] of this.cache.entries()) {
      if (now - info.lastReset > this.windowMs) {
        this.cache.delete(key)
      }
    }
  }
}

// Create instances for different rate limits
export const ipRateLimiter = new RateLimiter(5, 60 * 60 * 1000) // 5 requests per hour
export const emailRateLimiter = new RateLimiter(5, 24 * 60 * 60 * 1000) // 5 requests per 24 hours
