import type { ReactNode } from 'react'

import { Toaster } from 'sonner'

interface BlogLayoutProps {
  children: ReactNode
}

export default function BlogLayout({ children }: BlogLayoutProps) {
  return (
    <div className="relative w-full">
      {children}
      {/* 토스트 알림 (공유/코드 복사 — blog에서만 사용) */}
      <Toaster position="top-right" offset={{ top: 'var(--header-height)' }} />
    </div>
  )
}
