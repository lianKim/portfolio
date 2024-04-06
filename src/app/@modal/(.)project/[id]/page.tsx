import React, { Suspense } from 'react'
import ProjectDetail from '@/components/project/detail/ProjectDetail'
import Modal from '@/components/@common/Modal'
import LoadingModal from '../../loading'

interface ProjectDetailModalProps {
  params: {
    id: string
  }
}

export default function ProjectDetailModal({
  params,
}: ProjectDetailModalProps) {
  const detailPageId = process.env[`NEXT_PUBLIC_PROJECT_${params.id}_ID`]
  if (typeof detailPageId !== 'string') return

  return (
    <Modal>
      <Suspense fallback={<LoadingModal />}>
        <ProjectDetail pageId={detailPageId} />
      </Suspense>
    </Modal>
  )
}
