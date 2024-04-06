import React from 'react'
import SectionContainer from '../@common/SectionContainer'
import styles from '@/styles/Project.module.css'
import Link from 'next/link'
import { ProjectItemData, ProjectItemPropData } from '@/types/projects'
import { makeNumberToTwoLetter } from '@/lib/utils/handleString'
import Image from 'next/image'
import { BLUR_DATA_URL_BASE64 } from '@/lib/utils/handleImage'
import {
  getFileUrlData,
  getMultiSelectDataList,
  getNumberData,
  getTextData,
  getTitleData,
} from '@/lib/utils/handleNotionData'

interface ProjectListProps {
  dataList: ProjectItemData[]
}

interface ProjectItemProps {
  data: ProjectItemPropData
}

export default function ProjectList({ dataList }: ProjectListProps) {
  return (
    <SectionContainer title="Projects">
      <ol className={`${styles.projects} container`}>
        {dataList.map((project: ProjectItemData) => {
          if (!('properties' in project)) {
            throw new Error('No Properties Error')
          }

          const { properties } = project

          return (
            <Link
              href={`/project/${properties.Order.number}`}
              prefetch
              key={properties.Order.number}
            >
              <ProjectItem data={properties} />
            </Link>
          )
        })}
      </ol>
    </SectionContainer>
  )
}

function ProjectItem({ data }: ProjectItemProps) {
  const { Order, Name, Description, Stack, Thumbnail } = data
  const order = getNumberData(Order)
  const title = getTitleData(Name)
  const description = getTextData(Description)
  const skillList = getMultiSelectDataList(Stack)
  const thumbnailUrl = getFileUrlData(Thumbnail)

  return (
    <li className={styles['project-item']}>
      {/* 작업 순서 (역순) */}
      <div className={styles.order}>{makeNumberToTwoLetter(order)}</div>
      {/* 썸네일 */}
      {thumbnailUrl && (
        <div className={styles['thumb-container']}>
          <Image
            src={thumbnailUrl}
            alt={`${title} thumbnail`}
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL_BASE64}
            width="640"
            height="480"
            style={{ width: '100%', height: 'auto' }}
          />
        </div>
      )}
      {/* 프로젝트 정보 */}
      <div className={styles.content}>
        {/* 기술 스택 */}
        <div className={styles['tech-stack']}>{skillList.join('  |  ')}</div>
        {/* 이름 */}
        <div className={`${styles['title']}`}>{title}</div>
        {/* 설명 */}
        <div className={`${styles.desc} font-kor`}>{description}</div>
      </div>
    </li>
  )
}
