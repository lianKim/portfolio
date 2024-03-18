import React from 'react'
import Modal from '@/components/modal/Modal'
import BlockContainer from '@/components/work/detail/BlockContainer'
import { ImageData, NotionBlockData } from '@/types/works'
import Content from '@/components/work/detail/Content'
import styles from '@/styles/WorkDetail.module.css'
import MainContent from '@/components/work/detail/MainContent'
import { getNotionBlockChildren, getPageProperties } from '@/lib/api/workApi'
import dynamic from 'next/dynamic'
import ModalHeader from './ModalHeader'

const HorizontalScrollSlider = dynamic(
  async () => await import('@/components/work/detail/HorizontalScrollSlider'),
  {
    ssr: false,
  },
)

interface WorkDetailModalProps {
  pageId: string
}

export default async function WorkDetailModal({
  pageId,
}: WorkDetailModalProps) {
  const workProperties = await getPageProperties(pageId)
  const workDetailBlocks = await getNotionBlockChildren(pageId)
  const [thumbBlock, imageBlock, wilBlock, ...contentBlocks] = workDetailBlocks
  const imageBlockList = imageBlock?.id
    ? await getNotionBlockChildren(imageBlock.id)
    : []

  return (
    <Modal>
      <ModalHeader properties={workProperties} />
      <div className={styles.container}>
        <MainContent properties={workProperties} />
        {/* 썸네일 */}
        <div className={styles['thumb-container']} key={thumbBlock.id}>
          <BlockContainer data={thumbBlock as NotionBlockData} />
        </div>
        {/* 내용 */}
        <div className={styles['content-container']}>
          <div className={styles['sub-content-container']}>
            <Content blockList={contentBlocks as NotionBlockData[]} />
          </div>
          <div className={styles['wil-container']}>
            <Content blockList={[wilBlock] as NotionBlockData[]} />
          </div>
        </div>
        {/* 이미지 슬라이더 (수평 스크롤) */}
        {imageBlockList.length && (
          <HorizontalScrollSlider
            imageBlockList={imageBlockList as ImageData[]}
            properties={workProperties}
          />
        )}
      </div>
    </Modal>
  )
}
