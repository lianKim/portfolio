import { ErrorFallback } from '@/components/shared/ErrorFallback'
import Link from 'next/link'

export default function BlogNotFound() {
  return (
    <ErrorFallback
      title="404"
      message="요청하신 포스트를 찾을 수 없습니다."
      description="주소가 잘못되었거나, 포스트가 삭제되었을 수 있습니다."
    >
      <Link
        href="/blog"
        className="text-sm text-muted-foreground hover:text-foreground underline underline-offset-4"
      >
        블로그 목록으로
      </Link>
      <Link
        href="/"
        className="text-sm text-muted-foreground hover:text-foreground underline underline-offset-4"
      >
        홈으로 돌아가기
      </Link>
    </ErrorFallback>
  )
}
