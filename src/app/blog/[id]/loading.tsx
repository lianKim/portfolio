import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div className="relative w-full pt-20 pb-12">
      <div className="section-grid">
        {/* 왼쪽 카테고리 메뉴 스켈레톤 */}
        <aside className="section-left hidden md:block">
          <div className="sticky top-below-header max-w-aside space-y-4">
            <Skeleton className="h-6 w-24" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </aside>

        {/* 메인 콘텐츠 스켈레톤 */}
        <article className="section-right mt-3 md:mt-0 min-w-0">
          {/* 포스트 헤더 스켈레톤 */}
          <header>
            <Skeleton className="h-8 w-3/4 mb-6" />
            <div className="flex flex-wrap items-center gap-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-20" />
            </div>
          </header>

          {/* 포스트 본문 스켈레톤 */}
          <div className="mt-10 space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-32 w-full mt-6" />
            <Skeleton className="h-4 w-full mt-6" />
            <Skeleton className="h-4 w-4/5" />
          </div>
        </article>
      </div>
    </div>
  )
}
