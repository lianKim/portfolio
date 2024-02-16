import { useEffect, useRef, useState } from 'react'

/**
 * Intersection Observer를 생성하고 타켓 ref 지정하여,
 * 타겟의 inView 여부와 해당 ref를 반환하는 hook
 * @param observerOptions 옵션 변경 시 { key: value } 형태로 전달
 * @returns { {boolean, MutableRefObject} }
 */
export const useIntersectionObserver = (
  observerOptions?: IntersectionObserverInit,
) => {
  const [isInView, setIsInView] = useState(false)
  const targetRef = useRef(null)

  useEffect(() => {
    if (!targetRef.current) return

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0,
      ...observerOptions,
    }
    const callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        setIsInView(entry.isIntersecting ? true : false)
      })
    }

    const observer = new IntersectionObserver(callback, options)
    // 옵저버 on
    observer.observe(targetRef.current)

    return () => {
      // 언마운트 시 옵저버 off
      observer.disconnect()
    }
  }, [observerOptions])

  return { isInView, targetRef }
}
