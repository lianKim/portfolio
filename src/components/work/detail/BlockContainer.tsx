'use client'
import {
  BulletedListItemData,
  Heading1Data,
  Heading2Data,
  Heading3Data,
  ImageData,
  NotionBlockData,
  ParagraphData,
} from '@/types/works'
import React from 'react'
import styles from '@/styles/WorkDetail.module.css'
import Image from 'next/image'
import {
  BLUR_DATA_URL_BASE64,
  getNotionUrlNonExp,
} from '@/lib/utils/handleImage'

interface BlockContainerProps {
  data: NotionBlockData
  children?: React.ReactNode
}

interface BlockProps<T> {
  data: T
  children?: React.ReactNode
}

export default function BlockContainer({
  data,
  children,
}: BlockContainerProps) {
  switch (data.type) {
    case 'heading_1':
      return <Heading1 data={data as Heading1Data}>{children}</Heading1>
    case 'heading_2':
      return <Heading2 data={data as Heading2Data}>{children}</Heading2>
    case 'heading_3':
      return <Heading3 data={data as Heading3Data}>{children}</Heading3>
    case 'paragraph':
      return <Paragraph data={data as ParagraphData}>{children}</Paragraph>
    case 'bulleted_list_item':
      return (
        <BulletedListItem data={data as BulletedListItemData}>
          {children}
        </BulletedListItem>
      )
    case 'image':
      return <ImageFile data={data as ImageData} />
    default:
      return <></>
  }
}

function Heading1({ data, children }: BlockProps<Heading1Data>) {
  const heading = data.heading_1.rich_text?.at(0)?.plain_text || ''

  return (
    <div className={`${styles['block-wrapper']}`} id={heading.toLowerCase()}>
      <h4 className={styles['block-title']}>{heading}</h4>
      {children}
    </div>
  )
}

function Heading2({ data, children }: BlockProps<Heading2Data>) {
  const heading = data.heading_2.rich_text?.at(0)?.plain_text || ''

  return (
    <div className={styles['block-sub-wrapper']}>
      <h5 className={styles['block-sub-title']}>{heading}</h5>
      {children}
    </div>
  )
}

// 외부 URL 필요할 경우 Heading3 link에 주소 값 있음
function Heading3({ data, children }: BlockProps<Heading3Data>) {
  const heading = data.heading_3.rich_text?.at(0)?.plain_text || ''
  const link = data.heading_3.rich_text?.at(0)?.text?.link?.url || ''
  const NOTION_PAGE_BASE_URL = process.env.NEXT_PUBLIC_NOTION_PAGE_BASE_URL
  const url = link.startsWith('http') ? link : NOTION_PAGE_BASE_URL + link

  return (
    <div
      className={
        link ? styles['block-link-wrapper'] : styles['block-heading3-wrapper']
      }
    >
      {url ? (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles['block-link']}
        >
          <h6>{heading}</h6>
        </a>
      ) : (
        <h6 className={styles['block-sub-title']}>{heading}</h6>
      )}
      {children}
    </div>
  )
}

function Paragraph({ data, children }: BlockProps<ParagraphData>) {
  const textList =
    data.paragraph.rich_text?.map((text) => text.plain_text) || []

  return (
    <>
      <p className={`${styles.paragraph}`}>{textList.join(' ')}</p>
      {children}
    </>
  )
}

function BulletedListItem({
  data,
  children,
}: BlockProps<BulletedListItemData>) {
  const textList =
    data.bulleted_list_item.rich_text?.map((text) => text.plain_text) || []

  return (
    <>
      <span className={`${styles['bulleted-item']}`}>{textList.join(' ')}</span>
      {children}
    </>
  )
}

// 썸네일
function ImageFile({ data }: BlockProps<ImageData>) {
  const imageBlockId = data.id
  const imageUrl = data.image?.file?.url
  const url = getNotionUrlNonExp(imageUrl, imageBlockId)

  return (
    <div className={styles['thumb-container']}>
      {url && (
        <Image
          src={url}
          alt="project image"
          priority
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL_BASE64}
          width={1920}
          height={1080}
          style={{
            width: '100%',
            height: 'auto',
          }}
          quality={100}
        />
      )}
    </div>
  )
}
