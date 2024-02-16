'use client'
import React from 'react'
import IntersectionObserverContainer from './IntersectionObserverContainer'

interface SectionTitleProps {
  title: string
}

export default function SectionTitle({ title }: SectionTitleProps) {
  const chars = title.split('')

  return (
    <IntersectionObserverContainer>
      <h3 className="sub-title">
        {chars.map((char, idx) => {
          const delayTime = idx * 80 + 200

          return (
            <span
              className="char"
              style={{ animationDelay: idx * 80 + 200 + 'ms' }}
              key={delayTime}
            >
              {char}
            </span>
          )
        })}
      </h3>
    </IntersectionObserverContainer>
  )
}
