<!-- 
🔍 CONTEXT: MDX 콘텐츠 관련 작업, 커스텀 MDX 컴포넌트 구현, 콘텐츠 최적화 시 참조
🏷️ KEYWORDS: mdx, content, custom component, codeblock, callout, image, link
🎯 TRIGGER: "MDX", "콘텐츠", "커스텀 컴포넌트", "코드 블록", "콜아웃", "이미지"
-->

# 📝 MDX & 콘텐츠

## MDX 커스텀 컴포넌트

### 코드 블록 컴포넌트

```typescript
// src/components/mdx/CodeBlock.tsx
'use client'
import { useState } from 'react'
import { Check, Copy } from 'lucide-react'

export function CodeBlock({ children, ...props }: any) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    const code = children.props.children
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className=\"relative group\">
      <pre {...props} className=\"overflow-x-auto p-4 rounded-lg bg-gray-900\">
        {children}
      </pre>
      <button
        onClick={handleCopy}
        className=\"absolute top-2 right-2 p-2 rounded bg-gray-700 opacity-0 group-hover:opacity-100 transition-opacity\"
      >
        {copied ? (
          <Check className=\"w-4 h-4 text-green-400\" />
        ) : (
          <Copy className=\"w-4 h-4 text-gray-300\" />
        )}
      </button>
    </div>
  )
}
```

### Callout 컴포넌트

```typescript
// src/components/mdx/Callout.tsx
import { AlertCircle, Info, AlertTriangle, CheckCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CalloutProps {
  type?: 'info' | 'warning' | 'error' | 'success'
  children: React.ReactNode
}

const calloutStyles = {
  info: {
    container: 'bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800',
    icon: Info,
    iconColor: 'text-blue-600 dark:text-blue-400'
  },
  warning: {
    container: 'bg-yellow-50 border-yellow-200 dark:bg-yellow-950 dark:border-yellow-800',
    icon: AlertTriangle,
    iconColor: 'text-yellow-600 dark:text-yellow-400'
  },
  error: {
    container: 'bg-red-50 border-red-200 dark:bg-red-950 dark:border-red-800',
    icon: AlertCircle,
    iconColor: 'text-red-600 dark:text-red-400'
  },
  success: {
    container: 'bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800',
    icon: CheckCircle,
    iconColor: 'text-green-600 dark:text-green-400'
  }
}

export function Callout({ type = 'info', children }: CalloutProps) {
  const styles = calloutStyles[type]
  const Icon = styles.icon

  return (
    <div className={cn(
      'my-6 p-4 border rounded-lg flex gap-3',
      styles.container
    )}>
      <Icon className={cn('w-5 h-5 mt-0.5 flex-shrink-0', styles.iconColor)} />
      <div className=\"flex-1\">
        {children}
      </div>
    </div>
  )
}
```

### Image 컴포넌트

```typescript
// src/components/mdx/Image.tsx
import NextImage from 'next/image'

export function Image({ src, alt, ...props }: any) {
  // 외부 이미지인 경우
  if (src.startsWith('http')) {
    return (
      <img
        src={src}
        alt={alt}
        className="rounded-lg my-8 w-full"
        {...props}
      />
    )
  }

  // 내부 이미지인 경우 Next.js Image 컴포넌트 사용
  return (
    <figure className="my-8">
      <NextImage
        src={src}
        alt={alt}
        width={800}
        height={400}
        className="rounded-lg w-full h-auto"
        loading="lazy"
        {...props}
      />
      {alt && (
        <figcaption className="text-center text-sm text-gray-500 mt-2">
          {alt}
        </figcaption>
      )}
    </figure>
  )
}
```

### Link 컴포넌트

```typescript
// src/components/mdx/Link.tsx
import NextLink from 'next/link'
import { ExternalLink } from 'lucide-react'

export function Link({ href, children, ...props }: any) {
  const isInternal = href && (href.startsWith('/') || href.startsWith('#'))

  if (isInternal) {
    return (
      <NextLink
        href={href}
        className="text-blue-600 dark:text-blue-400 hover:underline"
        {...props}
      >
        {children}
      </NextLink>
    )
  }

  return (

      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
      {...props}
    >
      {children}
      <ExternalLink className="w-3 h-3" />
    </a>
  )
}
```
