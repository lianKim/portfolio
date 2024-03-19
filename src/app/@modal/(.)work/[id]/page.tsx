import React, { Suspense } from 'react'
import WorkDetail from '@/components/work/detail/WorkDetail'
import Modal from '@/components/modal/Modal'
import LoadingModal from '../../loading'

interface WorkDetailProps {
  params: {
    id: string
  }
}

export default function WorkDetailModal({ params }: WorkDetailProps) {
  const workDetailPageId = process.env[`NEXT_PUBLIC_WORK_${params.id}_ID`]
  if (typeof workDetailPageId !== 'string') return

  return (
    <Modal>
      <Suspense fallback={<LoadingModal />}>
        <WorkDetail pageId={workDetailPageId} />
      </Suspense>
    </Modal>
  )
}
