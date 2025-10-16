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
  // 외부 이미지인지 확인
  const isExternal = src.startsWith('http')

  return (
    <figure className="my-8 space-y-3">
      <NextImage
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        className={cn(
          'w-full h-auto rounded-lg border border-border/40',
          className,
        )}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
        unoptimized={isExternal} // 외부 이미지는 최적화 비활성화
      />

      {(caption || alt) && (
        <figcaption className="text-center text-sm text-muted-foreground leading-relaxed">
          {caption || alt}
        </figcaption>
      )}
    </figure>
  )
}
