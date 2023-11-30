import WorkItem from '@/components/work/WorkItem'
import React from 'react'
import styles from '@/styles/Work.module.css'
import ArffyPreview from '@public/static/images/work/arffy/preview_arffy.png'
import GokkanPreview from '@public/static/images/work/gokkan/preview_gokkan.png'
import OndePreview from '@public/static/images/work/onde/preview_onde.png'

const tempData = [
  // arffy online store
  {
    order: '03',
    imgSrc: ArffyPreview,
    duration: '2023.02 - present',
    title: 'arffy online store',
    description: '빈티지 조명 및 소품 판매 브랜드 아르피의 온라인 스토어',
    skillList: [
      'TypeScript',
      'React',
      'React-Query',
      'Jotai',
      'Styled-Components',
      'Github Actions',
      'Storybook',
      'Jest',
      'Amazon ec2',
    ],
  },
  // 곳간
  {
    order: '02',
    imgSrc: GokkanPreview,
    duration: '2023.01 - 2023.02',
    title: 'gokkan',
    description: '전문가 검수 시스템이 있는 프리미엄 빈티지 가구 경매 서비스',
    skillList: [
      'TypeScript',
      'React',
      'React-Query',
      'Jotai',
      'Styled-Components',
      'Github Actions',
      'Jest',
      'Amazon ec2',
    ],
  },
  // 온데
  {
    order: '01',
    imgSrc: OndePreview,
    duration: '2021.11 - 2022.12',
    title: 'onde',
    description: '동선 파악 기능이 있는 여정 단위의 여행 기록 및 공유 서비스',
    skillList: ['React', 'Styled-Components', 'Context API', 'Kakao Map API'],
  },
]

export default function Work() {
  return (
    <section className={styles['grid-container']}>
      <ol className={styles.works}>
        {tempData.map((data) => {
          const { order, imgSrc, duration, title, description, skillList } =
            data
          return (
            <WorkItem
              key={order}
              order={order}
              imgSrc={imgSrc}
              duration={duration}
              title={title}
              description={description}
              skillList={skillList}
            />
          )
        })}
      </ol>
    </section>
  )
}
