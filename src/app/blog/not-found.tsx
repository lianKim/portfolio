import Link from 'next/link'

export default function BlogNotFound() {
  return (
    <div className="relative w-full py-12">
      <div className="section-grid">
        <h2 className="section-left section-title">404</h2>
        <div className="section-right section-content">
          <div className="space-y-2">
            <p>요청하신 포스트를 찾을 수 없습니다.</p>
            <p className="text-sm text-muted-foreground">
              주소가 잘못되었거나, 포스트가 삭제되었을 수 있습니다.
            </p>
            <div className="pt-6 flex gap-4">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
