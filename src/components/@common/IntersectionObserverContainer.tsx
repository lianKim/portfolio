'use client'
import React from 'react'
import { useIntersectionObserver } from '@/lib/hooks/useIntersectionObserver'

interface IntersectionObserverContainerProps {
  children: React.ReactNode
}

export default function IntersectionObserverContainer({
  children,
}: IntersectionObserverContainerProps) {
  const { isInView, targetRef } = useIntersectionObserver()

  return (
    <div ref={targetRef} className={isInView ? 'visible' : ''}>
      {children}
    </div>
  )
}
