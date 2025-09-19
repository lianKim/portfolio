'use client'

import { Check, Copy } from 'lucide-react'
import { ReactNode, isValidElement, useState } from 'react'

import { cn } from '@/lib/utils'

interface CodeBlockProps {
  children: ReactNode
  className?: string
  'data-language'?: string
}

export function CodeBlock({
  children,
  className,
  'data-language': language,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  // 언어 추출 (className에서 language- 접두사 제거)
  const lang = language || className?.replace('language-', '') || 'text'

  // 코드 텍스트 추출
  const getCodeText = () => {
    if (typeof children === 'string') return children
    if (
      isValidElement(children) &&
      typeof children.props.children === 'string'
    ) {
      return children.props.children
    }
    return ''
  }

  const handleCopy = async () => {
    const codeText = getCodeText()
    try {
      await navigator.clipboard.writeText(codeText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('복사 실패:', err)
    }
  }

  return (
    <div className="relative group my-6">
      {/* 언어 라벨과 복사 버튼 */}
      <div className="flex items-center justify-between px-4 py-2 bg-muted border border-border/40 rounded-t-lg">
        <span className="text-xs font-medium text-muted-foreground uppercase">
          {lang}
        </span>
        <button
          onClick={handleCopy}
          className={cn(
            'flex items-center gap-1 px-2 py-1 text-xs rounded transition-colors',
            'hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
            copied
              ? 'text-green-600 dark:text-green-400'
              : 'text-muted-foreground hover:text-foreground',
          )}
        >
          {copied ? (
            <>
              <Check className="w-3 h-3" />
              <span>복사됨</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              <span>복사</span>
            </>
          )}
        </button>
      </div>

      {/* 코드 블록 */}
      <pre
        className={cn(
          'overflow-x-auto p-4 bg-card border border-t-0 border-border/40 rounded-b-lg',
          'text-sm leading-relaxed text-card-foreground',
          '[&>code]:bg-transparent [&>code]:p-0',
          className,
        )}
      >
        {children}
      </pre>
    </div>
  )
}
