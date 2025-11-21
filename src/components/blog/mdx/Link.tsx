import NextLink from 'next/link'
import { ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

interface LinkProps {
  href: string
  children: React.ReactNode
  className?: string
}

export function Link({ href, children, className }: LinkProps) {
  // 내부 링크인지 확인 (/, #으로 시작하거나 현재 도메인)
  const isInternal = href.startsWith('/') || href.startsWith('#')
  
  // 기본 링크 스타일
  const baseStyles = "text-primary underline-offset-4 hover:underline transition-colors font-medium"

  if (isInternal) {
    return (
      <NextLink
        href={href}
        className={cn(baseStyles, className)}
      >
        {children}
      </NextLink>
    )
  }

  // 외부 링크
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        baseStyles,
        "inline-flex items-center gap-1",
        className
      )}
    >
      {children}
      <ExternalLink className="w-3 h-3 ml-0.5" />
    </a>
  )
}