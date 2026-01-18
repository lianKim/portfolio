import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="relative w-full py-12">
      <div className="section-grid">
        <h2 className="section-left section-title">404</h2>
        <div className="section-right section-content">
          <div className="space-y-2">
            <p>요청하신 페이지를 찾을 수 없습니다.</p>
            <p className="text-sm text-muted-foreground">
              주소가 잘못되었거나, 페이지가 삭제되었을 수 있습니다.
            </p>
            <div className="pt-6">
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
