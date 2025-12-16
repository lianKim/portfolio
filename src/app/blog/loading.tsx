import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div className="relative w-full py-12">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-x-5">
        {/* 왼쪽 제목 */}
        <h2 className="text-3xl font-thin col-span-1 md:col-span-5 md:sticky md:top-[var(--sticky-top-offset)]">
          Posts
        </h2>

        {/* 오른쪽 포스트 목록 스켈레톤 */}
        <div className="col-span-1 md:col-span-7 mt-8 md:mt-0 space-y-6">
          <div className="flex flex-col">
            <Separator className="mt-0 mb-12" />

            {/* 포스트 카드 스켈레톤 (3개) */}
            {[1, 2, 3].map((i) => (
              <div key={i}>
                <div className="space-y-4">
                  {/* 제목 */}
                  <Skeleton className="h-6 w-3/4" />

                  {/* 설명 */}
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                </div>

                <Separator className="my-12" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
