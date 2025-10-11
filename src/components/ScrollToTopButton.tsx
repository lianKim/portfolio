'use client'

import { ArrowUp } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function ScrollToTopButton() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <Button
      onClick={scrollToTop}
      size="icon"
      variant="outline"
      className="fixed bottom-8 right-8 z-50 h-10 w-10 rounded-full bg-background/95 backdrop-blur border-border/40 hover:bg-accent hover:text-accent-foreground transition-colors"
      aria-label="맨 위로 이동"
    >
      <ArrowUp className="h-4 w-4" />
    </Button>
  )
}
