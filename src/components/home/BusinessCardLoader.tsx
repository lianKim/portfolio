'use client'

import dynamic from 'next/dynamic'

const BusinessCardCanvas = dynamic(
  () => import('@/components/home/BusinessCard'),
  { ssr: false },
)

export default function BusinessCardLoader() {
  return <BusinessCardCanvas />
}
