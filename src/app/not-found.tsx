import { ErrorFallback } from '@/components/shared/ErrorFallback'
import Link from 'next/link'

export default function NotFound() {
  return (
    <ErrorFallback
      title="404"
      message="요청하신 페이지를 찾을 수 없습니다."
      description="주소가 잘못되었거나, 페이지가 삭제되었을 수 있습니다."
    >
      <Link
        href="/"
        className="text-sm text-muted-foreground hover:text-foreground underline underline-offset-4"
      >
        홈으로 돌아가기
      </Link>
    </ErrorFallback>
  )
}
