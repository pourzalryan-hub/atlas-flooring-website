'use client'

import { usePathname } from 'next/navigation'

/**
 * Hides the public site chrome (nav, footer, sticky CTA) on internal routes
 * like /manage. Children are server-rendered and passed in; this only decides
 * whether to show them based on the current path.
 */
export default function ChromeGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  if (pathname?.startsWith('/manage')) return null
  return <>{children}</>
}
