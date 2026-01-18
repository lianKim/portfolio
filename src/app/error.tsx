'use client'

import { ErrorFallback } from '@/components/shared/ErrorFallback'
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
    <ErrorFallback
      title="Error"
      message="페이지를 불러오는 중 문제가 발생했습니다."
      description="잠시 후 다시 시도해 주세요."
    >
      <button
        onClick={reset}
        className="text-sm text-muted-foreground hover:text-foreground underline underline-offset-4 cursor-pointer"
      >
        다시 시도
      </button>
    </ErrorFallback>
  )
}
