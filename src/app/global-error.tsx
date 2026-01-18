'use client'

import { useEffect } from 'react'

interface GlobalErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error('Global error:', error)
  }, [error])

  return (
    <html lang="ko">
      <body>
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-thin">Error</h1>
            <p className="text-sm text-muted-foreground">
              예기치 않은 오류가 발생했습니다.
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
      </body>
    </html>
  )
}
