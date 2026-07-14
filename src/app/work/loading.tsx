import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div className="relative w-full pt-20 pb-12">
      <div className="section-grid">
        <h2 className="section-left section-label">/ Works</h2>
        <div className="section-right section-content">
          <div className="flex flex-col space-y-12">
            {/* 기록 카드 스켈레톤 (3개) */}
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-2">
                {/* 제목 */}
                <Skeleton className="h-5 w-3/4" />

                {/* 설명 */}
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
