'use client'
import React, { useEffect } from 'react'

export default function Loading() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    document.body.style.cssText = `
        position: fixed;
        top: -${window.scrollY}px;
        overflow-y: hidden;
        width: 100%;
      `

    return () => {
      if (typeof window === 'undefined') return

      const scrollY = document.body.style.top
      document.body.style.cssText = ''
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1)
    }
  }, [])
  return <div className="loading">Loading...</div>
}
