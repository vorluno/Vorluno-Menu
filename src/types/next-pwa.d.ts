declare module 'next-pwa' {
  import type { NextConfig } from 'next'

  interface RuntimeCaching {
    urlPattern: RegExp | string
    handler: 'CacheFirst' | 'CacheOnly' | 'NetworkFirst' | 'NetworkOnly' | 'StaleWhileRevalidate'
    options?: {
      cacheName?: string
      expiration?: {
        maxEntries?: number
        maxAgeSeconds?: number
      }
      networkTimeoutSeconds?: number
      cacheableResponse?: {
        statuses?: number[]
        headers?: Record<string, string>
      }
    }
  }

  interface PWAConfig {
    dest?: string
    disable?: boolean
    register?: boolean
    scope?: string
    sw?: string
    skipWaiting?: boolean
    runtimeCaching?: RuntimeCaching[]
    buildExcludes?: (string | RegExp)[]
    publicExcludes?: string[]
    fallbacks?: {
      document?: string
      image?: string
      font?: string
      audio?: string
      video?: string
    }
  }

  function withPWA(config: PWAConfig): (nextConfig: NextConfig) => NextConfig
  export default withPWA
}
