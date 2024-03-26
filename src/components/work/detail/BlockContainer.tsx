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
import {
  getAnnotations,
  getBoldTextData,
  getImageData,
  getLinkedTextUrl,
  getTextData,
} from '@/lib/utils/handleNotionData'
import ExternalLinkIcon from '@icons/arrow_outward-icon.svg'

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
      return <Thumbnail data={data as ImageData} />
    default:
      return <></>
  }
}

function Heading1({ data, children }: BlockProps<Heading1Data>) {
  const heading = getTextData(data.heading_1)

  return (
    <div className={`${styles['block-wrapper']}`} id={heading.toLowerCase()}>
      <h4 className={styles['block-title']}>{heading}</h4>
      {children}
    </div>
  )
}

function Heading2({ data, children }: BlockProps<Heading2Data>) {
  const heading = getTextData(data.heading_2)

  return (
    <div className={`${styles['block-sub-wrapper']}`}>
      <h5 className={`${styles['block-sub-title']}`}>{heading}</h5>
      {children}
    </div>
  )
}

// 외부 URL 필요할 경우 Heading3 link에 주소 값 있음
function Heading3({ data, children }: BlockProps<Heading3Data>) {
  const block = data.heading_3
  const heading = getTextData(block)
  const link = getLinkedTextUrl(block)

  if (!link) {
    return (
      <div className={styles['block-heading3-wrapper']}>
        <h6 className={`${styles['block-sub-title']}`}>{heading}</h6>
        {children}
      </div>
    )
  }

  return (
    <div className={styles['block-link-wrapper']}>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className={styles['block-link']}
      >
        <Image src={ExternalLinkIcon} width="18" height="18" alt="close icon" />
        <h6>{heading}</h6>
      </a>
      {children}
    </div>
  )
}

function Paragraph({ data, children }: BlockProps<ParagraphData>) {
  const block = data.paragraph
  const styledText = getBoldTextData(block)

  return (
    <>
      <p>
        {styledText.map((text) => {
          if (text.isBold) {
            return (
              <strong className={styles.highlight} key={text.content}>
                {text.content}
              </strong>
            )
          }

          return text.content
        })}
      </p>
      {children}
    </>
  )
}

function BulletedListItem({
  data,
  children,
}: BlockProps<BulletedListItemData>) {
  const block = data.bulleted_list_item
  const text = getTextData(block)
  const isBold = getAnnotations(block)?.bold

  return (
    <>
      <span
        className={`${styles['bulleted-item']} ${isBold && styles.highlight}`}
      >
        {text}
      </span>
      {children}
    </>
  )
}

// 썸네일
function Thumbnail({ data }: BlockProps<ImageData>) {
  const imageBlockId = data.id
  const imageUrl = getImageData(data.image)
  const url = getNotionUrlNonExp(imageUrl, imageBlockId, '1280')

  return (
    <div className={styles['thumb-container']}>
      {url && (
        <Image
          src={url}
          alt="project image"
          priority
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL_BASE64}
          width={1280}
          height={960}
          style={{
            width: '100%',
            height: 'auto',
          }}
        />
      )}
    </div>
  )
}
