import type { ReactNode } from 'react'

import { TableOfContents } from '@/components/blog/TableOfContents'
import type { TocItem } from '@/types/blog'

interface DetailLayoutProps {
  toc: TocItem[]
  /** 제목 등 본문 위 헤더 */
  header: ReactNode
  /** 본문(prose로 래핑됨) */
  children: ReactNode
  /** 공유·댓글 등 본문 아래 영역 (선택) */
  footer?: ReactNode
}

/**
 * blog/projects 상세 페이지 공통 셸.
 * 좌측 sticky 목차 + 우측 article(header · prose 본문 · footer)로 구성한다.
 * 헤더/푸터 내용은 각 도메인이 slot으로 주입한다.
 */
export function DetailLayout({
  toc,
  header,
  children,
  footer,
}: DetailLayoutProps) {
  return (
    <div className="relative w-full pt-20 pb-12">
      <div className="section-grid">
        {/* 왼쪽 목차 */}
        <aside className="section-left hidden md:block">
          <div className="sticky top-below-header max-w-aside">
            <TableOfContents items={toc} />
          </div>
        </aside>

        {/* 메인 콘텐츠 */}
        <article className="section-right mt-3 md:mt-0 min-w-0">
          {header}
          <div className="mt-18 prose prose-lg max-w-none prose-gray dark:prose-invert">
            {children}
          </div>
          {footer}
        </article>
      </div>
    </div>
  )
}
