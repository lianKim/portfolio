import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div className="relative w-full grid grid-cols-1 md:grid-cols-12 gap-x-5">
      {/* 왼쪽 카테고리 메뉴 스켈레톤 */}
      <aside className="hidden md:block col-span-5">
        <div className="sticky top-[var(--sticky-top-offset)] max-w-[14rem] space-y-4">
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
      <article className="col-span-1 md:col-span-7 mt-3 md:mt-0 py-12">
        {/* 포스트 헤더 스켈레톤 */}
        <header className="mb-8">
          <Skeleton className="h-10 w-3/4 mb-6" />
          <div className="flex flex-wrap items-center gap-4">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-20" />
          </div>
        </header>

        <Separator className="mb-16" />

        {/* 포스트 본문 스켈레톤 */}
        <div className="mb-16 space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-32 w-full mt-6" />
          <Skeleton className="h-4 w-full mt-6" />
          <Skeleton className="h-4 w-4/5" />
        </div>

        <Separator className="mb-12" />
      </article>
    </div>
  )
}
