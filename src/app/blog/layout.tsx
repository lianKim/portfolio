import type { ReactNode } from 'react'

interface BlogLayoutProps {
  children: ReactNode
}

export default function BlogLayout({ children }: BlogLayoutProps) {
  return <div className="relative w-full">{children}</div>
}
