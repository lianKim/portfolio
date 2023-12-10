import React from 'react'
import Modal from '@/components/modal/Modal'

interface WorkDetailProps {
  params: {
    id: string
  }
}

export default async function WorkDetailModal({ params }: WorkDetailProps) {
  return (
    <Modal>
      <div>{params.id}</div>
    </Modal>
  )
}
