import NextImage from 'next/image'
import { cn } from '@/lib/utils/cn'

interface ImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  caption?: string
  priority?: boolean
}

export function Image({
  src,
  alt,
  width = 800,
  height = 400,
  className,
  caption,
  priority = false,
}: ImageProps) {
  return (
    <figure className="my-8 space-y-3">
      <NextImage
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        loading={priority ? 'eager' : 'lazy'}
        className={cn(
          'w-full h-auto rounded-lg border border-border/40',
          className,
        )}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, (max-width: 1280px) 60vw, 720px"
        placeholder="empty"
        unoptimized={false} // 외부 이미지도 Next.js로 최적화
      />

      {(caption || alt) && (
        <figcaption className="text-center text-sm text-muted-foreground leading-relaxed">
          {caption || alt}
        </figcaption>
      )}
    </figure>
  )
}
