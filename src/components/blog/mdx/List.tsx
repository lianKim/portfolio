import { cn } from '@/lib/utils/cn'

interface ListProps {
  children: React.ReactNode
  className?: string
}

export function UnorderedList({ children, className }: ListProps) {
  return (
    <ul
      className={cn(
        'my-6 ml-6 list-disc space-y-2',
        '[&>li]:text-foreground [&>li]:leading-7',
        // 중첩 리스트 마커 변경: 첫 번째는 disc(•), 두 번째는 circle(○), 세 번째는 square(■)
        '[&>li>ul]:my-2 [&>li>ul]:ml-6 [&>li>ul]:list-[circle]',
        '[&>li>ul>li>ul]:list-[square]',
        '[&>li>ul>li>ul>li>ul]:list-disc',
        '[&>li>ol]:my-2 [&>li>ol]:ml-6',
        className,
      )}
    >
      {children}
    </ul>
  )
}

export function OrderedList({ children, className }: ListProps) {
  return (
    <ol
      className={cn(
        'my-6 ml-6 list-decimal space-y-2',
        '[&>li]:text-foreground [&>li]:leading-7',
        // 2번째 레벨: lower-alpha (a, b, c)
        '[&>li>ol]:my-2 [&>li>ol]:ml-6 [&>li>ol]:list-[lower-alpha]',
        // 3번째 레벨: lower-roman (i, ii, iii) - 더 구체적인 선택자 사용
        '[&>li>ol>li>ol]:my-2 [&>li>ol>li>ol]:ml-6 [&>li>ol>li>ol]:list-[lower-roman]',
        // 4번째 레벨: 다시 decimal로
        '[&>li>ol>li>ol>li>ol]:list-decimal',
        '[&>li>ul]:my-2 [&>li>ul]:ml-6',
        className,
      )}
    >
      {children}
    </ol>
  )
}