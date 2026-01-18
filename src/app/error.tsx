'use client'

import { useEffect } from 'react'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="relative w-full py-12">
      <div className="section-grid">
        <h2 className="section-left section-title">Error</h2>
        <div className="section-right section-content">
          <div className="space-y-2">
            <p>페이지를 불러오는 중 문제가 발생했습니다.</p>
            <p className="text-sm text-muted-foreground">
              잠시 후 다시 시도해 주세요.
            </p>
            <div className="pt-6">
              <button
                onClick={reset}
                className="text-sm text-muted-foreground hover:text-foreground underline underline-offset-4 cursor-pointer"
              >
                다시 시도
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
