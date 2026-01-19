import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div className="relative w-full py-12">
      <div className="section-grid">
        <h2 className="section-left section-title">Posts</h2>
        <div className="section-right section-content space-y-6">
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
