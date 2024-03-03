import React from 'react'
import Modal from '@/components/modal/Modal'
import BlockContainer from '@/components/work/detail/BlockContainer'
import { ImageData, NotionBlockData } from '@/types/workDetail'
import Content from '@/components/work/detail/Content'
import styles from '@/styles/WorkDetail.module.css'
import MainContent from '@/components/work/detail/MainContent'
import { getNotionBlockChildren, getPageProperties } from '@/lib/api/workApi'
import dynamic from 'next/dynamic'
import ModalHeader from './ModalHeader'

const ImageCarousel = dynamic(
  async () => await import('@/components/work/detail/ImageCarousel'),
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
  const [thumbnail, imageBlock, wilBlock, ...contentBlocks] = workDetailBlocks
  const imageBlockList = imageBlock?.id
    ? await getNotionBlockChildren(imageBlock.id)
    : []

  return (
    <Modal>
      <ModalHeader properties={workProperties} />
      <div className={styles.container}>
        <MainContent properties={workProperties} />
        {/* 썸네일 */}
        <div className={styles['thumb-container']} key={thumbnail.id}>
          <BlockContainer data={thumbnail as NotionBlockData} />
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
        {/* 이미지 */}
        {/* {!!imageBlockList?.length && (
            <div className={styles['carousel-container']}>
              <ImageCarousel
                blockList={imageBlockList as ImageData[]}
              />
            </div>
          )} */}
      </div>
    </Modal>
  )
}
