'use client'

import { Link as LinkIcon } from 'lucide-react'
import { toast } from 'sonner'

interface ShareButtonProps {
  url: string
}

export function ShareButton({ url }: ShareButtonProps) {
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      toast.success('링크가 복사되었습니다!')
    } catch (err) {
      console.error('Failed to copy:', err)
      toast.error('링크 복사에 실패했습니다.')
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopyLink}
      aria-label="링크 복사"
      className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-sm text-foreground transition-colors hover:bg-muted cursor-pointer"
    >
      <LinkIcon className="size-3.5" />
      공유
    </button>
  )
}
