<!-- 
🔍 CONTEXT: 블로그 UI 컴포넌트 구현, 사용자 인터페이스 개발 시 참조
🏷️ KEYWORDS: component, ui, post, blog, card, header, navigation, comments, scroll
🎯 TRIGGER: "컴포넌트", "UI", "인터페이스", "포스트 카드", "헤더", "네비게이션", "댓글"
-->

# 🧩 컴포넌트 구현

## 컴포넌트 구현 상세

### PostBody 컴포넌트 (MDX 렌더링)

```typescript
// src/components/blog/PostBody.tsx
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import remarkBreaks from 'remark-breaks'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import { mdxComponents } from '@/components/mdx'

export function PostBody({ content }: { content: string }) {
  return (
    <article className=\"prose prose-lg max-w-none dark:prose-invert\">
      <MDXRemote
        source={content}
        components={mdxComponents}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm, remarkBreaks],
            rehypePlugins: [
              [rehypePrettyCode, {
                theme: {
                  dark: 'github-dark-dimmed',
                  light: 'github-light'
                },
                onVisitLine(node: any) {
                  if (node.children.length === 0) {
                    node.children = [{ type: 'text', value: ' ' }]
                  }
                },
                onVisitHighlightedLine(node: any) {
                  node.properties.className.push('highlighted')
                },
                onVisitHighlightedWord(node: any) {
                  node.properties.className = ['word']
                },
              }],
              rehypeSlug
            ]
          }
        }}
      />
    </article>
  )
}
```

### TableOfContents 컴포넌트

```typescript
// src/components/blog/TableOfContents.tsx
'use client'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import type { TocItem } from '@/types/blog'

export function TableOfContents({ toc }: { toc: TocItem[] }) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '-100px 0px -70% 0px' }
    )

    toc.forEach(item => {
      const element = document.getElementById(item.id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [toc])

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 100
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  return (
    <nav className=\"sticky top-20\">
      <h3 className=\"font-semibold text-gray-900 dark:text-gray-100 mb-4\">목차</h3>
      <ul className=\"space-y-2 text-sm\">
        {toc.map(item => (
          <li
            key={item.id}
            style={{ paddingLeft: `${(item.level - 1) * 12}px` }}
          >
            <a
              href={`#${item.id}`}
              onClick={(e) => handleClick(e, item.id)}
              className={cn(
                'block py-1 hover:text-blue-600 transition-colors',
                activeId === item.id
                  ? 'text-blue-600 font-medium'
                  : 'text-gray-600 dark:text-gray-400'
              )}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
```

### Comments 컴포넌트 (Giscus)

```typescript
// src/components/blog/Comments.tsx
'use client'
import { useTheme } from 'next-themes'
import Giscus from '@giscus/react'

export function Comments() {
  const { theme } = useTheme()

  return (
    <div className=\"mt-16 pt-8 border-t\">
      <Giscus
        repo={process.env.NEXT_PUBLIC_GISCUS_REPO as `${string}/${string}`}
        repoId={process.env.NEXT_PUBLIC_GISCUS_REPO_ID!}
        category={process.env.NEXT_PUBLIC_GISCUS_CATEGORY!}
        categoryId={process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID!}
        mapping=\"pathname\"
        reactionsEnabled=\"1\"
        emitMetadata=\"0\"
        inputPosition=\"top\"
        theme={theme === 'dark' ? 'dark' : 'light'}
        lang=\"ko\"
        loading=\"lazy\"
      />
    </div>
  )
}
```

### ScrollProgress 컴포넌트

```typescript
// src/components/blog/ScrollProgress.tsx
'use client'
import { useEffect, useState } from 'react'

export function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollTop = window.scrollY
      const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100
      setProgress(scrollPercent)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className=\"fixed top-0 left-0 w-full h-1 bg-gray-200 z-50\">
      <div
        className=\"h-full bg-blue-600 transition-all duration-150\"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
```

### ShareButtons 컴포넌트

```typescript
// src/components/blog/ShareButtons.tsx
'use client'
import { Button } from '@/components/ui/button'
import { Share2, Link2, Twitter } from 'lucide-react'
import { toast } from 'sonner'

interface ShareButtonsProps {
  title: string
  url: string
}

export function ShareButtons({ title, url }: ShareButtonsProps) {
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      toast.success('링크가 복사되었습니다')
    } catch (err) {
      toast.error('링크 복사에 실패했습니다')
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          url,
        })
      } catch (err) {
        console.error('Share failed:', err)
      }
    } else {
      handleCopyLink()
    }
  }

  const handleTwitterShare = () => {
    const text = encodeURIComponent(title)
    const shareUrl = encodeURIComponent(url)
    window.open(
      `https://twitter.com/intent/tweet?text=${text}&url=${shareUrl}`,
      '_blank'
    )
  }

  return (
    <div className=\"flex gap-2\">
      <Button
        variant=\"outline\"
        size=\"sm\"
        onClick={handleShare}
      >
        <Share2 className=\"w-4 h-4 mr-2\" />
        공유
      </Button>
      <Button
        variant=\"outline\"
        size=\"sm\"
        onClick={handleCopyLink}
      >
        <Link2 className=\"w-4 h-4 mr-2\" />
        링크 복사
      </Button>
      <Button
        variant=\"outline\"
        size=\"sm\"
        onClick={handleTwitterShare}
      >
        <Twitter className=\"w-4 h-4 mr-2\" />
        트윗
      </Button>
    </div>
  )
}
```

### CategoryNav 컴포넌트

```typescript
// src/components/blog/CategoryNav.tsx
'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import type { Category } from '@/types/blog'

export function CategoryNav({ categories }: { categories: Category[] }) {
  const pathname = usePathname()

  return (
    <nav className="flex flex-wrap gap-2 mb-8">
      <Link href="/blog">
        <Badge
          variant={pathname === '/blog' ? 'default' : 'outline'}
          className="cursor-pointer"
        >
          전체
        </Badge>
      </Link>
      {categories.map(category => (
        <Link key={category.slug} href={`/blog/${category.slug}`}>
          <Badge
            variant={pathname.includes(category.slug) ? 'default' : 'outline'}
            className="cursor-pointer"
          >
            {category.name} ({category.count})
          </Badge>
        </Link>
      ))}
    </nav>
  )
}
```

### PostCard 컴포넌트

```typescript
// src/components/blog/PostCard.tsx
import Link from 'next/link'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock } from 'lucide-react'
import type { Post } from '@/types/blog'

export function PostCard({ post }: { post: Post }) {
  return (
    <Link href={`/blog/${post.category}/${post.slug}`}>
      <Card className="h-full hover:shadow-lg transition-shadow duration-300">
        {post.thumbnail && (
          <div className="aspect-video relative overflow-hidden rounded-t-lg">
            <img
              src={post.thumbnail}
              alt={post.title}
              className="object-cover w-full h-full"
            />
          </div>
        )}
        <CardHeader>
          <div className="flex justify-between items-start mb-2">
            <Badge variant="secondary">{post.category}</Badge>
          </div>
          <h3 className="text-xl font-semibold line-clamp-2">{post.title}</h3>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 dark:text-gray-400 line-clamp-3 mb-4">
            {post.description}
          </p>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{new Date(post.date).toLocaleDateString('ko-KR')}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{post.readingTime}분</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            {post.tags.slice(0, 3).map(tag => (
              <Badge key={tag} variant="outline" className="text-xs">
                #{tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
```

### PostList 컴포넌트

```typescript
// src/components/blog/PostList.tsx
import { PostCard } from './PostCard'
import type { Post } from '@/types/blog'

interface PostListProps {
  posts: Post[]
  columns?: 1 | 2 | 3
}

export function PostList({ posts, columns = 3 }: PostListProps) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">
          아직 작성된 포스트가 없습니다.
        </p>
      </div>
    )
  }

  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
  }

  return (
    <div className={`grid gap-6 ${gridCols[columns]}`}>
      {posts.map(post => (
        <PostCard
          key={`${post.category}-${post.slug}`}
          post={post}
        />
      ))}
    </div>
  )
}
```

### PostHeader 컴포넌트

```typescript
// src/components/blog/PostHeader.tsx
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, User } from 'lucide-react'
import type { Post } from '@/types/blog'

export function PostHeader({ post }: { post: Post }) {
  return (
    <header className="mb-8 pb-8 border-b">
      <div className="flex items-center gap-2 mb-4">
        <Badge>{post.category}</Badge>
      </div>

      <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
        {post.title}
      </h1>

      <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
        {post.description}
      </p>

      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
        <div className="flex items-center gap-1">
          <User className="w-4 h-4" />
          <span>Lian Kim</span>
        </div>
        <div className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          <span>{new Date(post.date).toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          <span>{post.readingTime}분 읽기</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-6">
        {post.tags.map(tag => (
          <Badge key={tag} variant="outline">
            #{tag}
          </Badge>
        ))}
      </div>
    </header>
  )
}
```

### Pagination 컴포넌트

```typescript
// src/components/blog/Pagination.tsx
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  basePath: string
}

export function Pagination({ currentPage, totalPages, basePath }: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)
  const maxVisiblePages = 5

  let visiblePages = pages
  if (totalPages > maxVisiblePages) {
    const start = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
    const end = Math.min(totalPages, start + maxVisiblePages - 1)
    visiblePages = pages.slice(start - 1, end)
  }

  return (
    <div className="flex justify-center items-center gap-2 mt-12">
      <Link
        href={`${basePath}?page=${currentPage - 1}`}
        className={currentPage <= 1 ? 'pointer-events-none opacity-50' : ''}
      >
        <Button variant="outline" size="icon" disabled={currentPage <= 1}>
          <ChevronLeft className="w-4 h-4" />
        </Button>
      </Link>

      {visiblePages[0] > 1 && (
        <>
          <Link href={`${basePath}?page=1`}>
            <Button variant="outline" size="sm">1</Button>
          </Link>
          {visiblePages[0] > 2 && <span className="px-2">...</span>}
        </>
      )}

      {visiblePages.map(page => (
        <Link key={page} href={`${basePath}?page=${page}`}>
          <Button
            variant={page === currentPage ? 'default' : 'outline'}
            size="sm"
          >
            {page}
          </Button>
        </Link>
      ))}

      {visiblePages[visiblePages.length - 1] < totalPages && (
        <>
          {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
            <span className="px-2">...</span>
          )}
          <Link href={`${basePath}?page=${totalPages}`}>
            <Button variant="outline" size="sm">{totalPages}</Button>
          </Link>
        </>
      )}

      <Link
        href={`${basePath}?page=${currentPage + 1}`}
        className={currentPage >= totalPages ? 'pointer-events-none opacity-50' : ''}
      >
        <Button variant="outline" size="icon" disabled={currentPage >= totalPages}>
          <ChevronRight className="w-4 h-4" />
        </Button>
      </Link>
    </div>
  )
}
```

### ScrollToTop 버튼 컴포넌트

```typescript
// src/components/blog/ScrollToTop.tsx
'use client'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowUp } from 'lucide-react'

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  if (!isVisible) {
    return null
  }

  return (
    <Button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 z-50 rounded-full w-12 h-12 p-0"
      size="icon"
      variant="secondary"
    >
      <ArrowUp className="w-5 h-5" />
    </Button>
  )
}
```
