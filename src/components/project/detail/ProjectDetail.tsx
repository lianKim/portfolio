import React from 'react'
import BlockContainer from '@/components/project/detail/BlockContainer'
import { ImageData, NotionBlockData } from '@/types/projects'
import Content from '@/components/project/detail/Content'
import styles from '@/styles/ProjectDetail.module.css'
import MainContent from '@/components/project/detail/MainContent'
import { getNotionBlockChildren, getPageProperties } from '@/lib/api/projectApi'
import dynamic from 'next/dynamic'
import ModalHeader from './ModalHeader'

const HorizontalScrollSlider = dynamic(
  async () =>
    await import('@/components/project/detail/HorizontalScrollSlider'),
  {
    ssr: false,
  },
)

interface ProjectDetailProps {
  pageId: string
}

export default async function ProjectDetail({ pageId }: ProjectDetailProps) {
  const projectProperties = await getPageProperties(pageId)
  const ProjectDetailBlocks = await getNotionBlockChildren(pageId)
  const [thumbBlock, imageBlock, wilBlock, ...contentBlocks] =
    ProjectDetailBlocks
  const imageBlockList = imageBlock?.id
    ? await getNotionBlockChildren(imageBlock.id)
    : []

  return (
    <>
      <ModalHeader properties={projectProperties} />
      <div className={styles.container}>
        <MainContent properties={projectProperties} />
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
            properties={projectProperties}
          />
        )}
      </div>
    </>
  )
}
