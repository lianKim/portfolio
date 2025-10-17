import { useEffect, useState, RefObject } from 'react'

interface UseIntersectionObserverOptions {
  rootMargin?: string
  threshold?: number | number[]
}

/**
 * Intersection Observer를 사용하여 요소의 뷰포트 진입 여부를 감지합니다.
 * @param ref - 관찰할 요소의 ref
 * @param options - IntersectionObserver 옵션
 * @returns 요소가 뷰포트에 진입했는지 여부
 */
export function useIntersectionObserver(
  ref: RefObject<HTMLElement>,
  options: UseIntersectionObserverOptions = {}
): boolean {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const { rootMargin = '0px', threshold = 0 } = options

  useEffect(() => {
    if (!ref.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true)
          observer.disconnect()
        }
      },
      { rootMargin, threshold }
    )

    observer.observe(ref.current)

    return () => observer.disconnect()
  }, [ref, rootMargin, threshold])

  return isIntersecting
}
