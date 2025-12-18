'use client'

import { Button } from '@/components/ui/button'
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
    <Button
      variant="outline"
      onClick={handleCopyLink}
      aria-label="링크 복사"
      className="flex items-center gap-2"
    >
      <LinkIcon className="w-4 h-4" />
      <span className="text-sm">공유</span>
    </Button>
  )
}
