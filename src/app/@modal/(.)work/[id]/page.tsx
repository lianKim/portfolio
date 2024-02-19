import React from 'react'
import WorkDetailModal from '@/components/work/detail/WorkDetailModal'

interface WorkDetailProps {
  params: {
    id: string
  }
}

export default function WorkDetail({ params }: WorkDetailProps) {
  const workDetailPageId = process.env[`NEXT_PUBLIC_WORK_${params.id}_ID`]
  if (typeof workDetailPageId !== 'string') return

  return <WorkDetailModal pageId={workDetailPageId} />
}
