'use client'
import React, { useMemo } from 'react'
import styles from '@/styles/About.module.css'
import Image from 'next/image'
import { SkillItemData } from '@/types/skill'

interface SkillProps {
  data: SkillItemData[]
}

interface SkillItemProps {
  name?: string
  imgSrc?: string
}

export default function Skill({ data }: SkillProps) {
  const skillList = useMemo(
    () =>
      data
        .map((item: SkillItemData) => {
          const title = item.properties?.Name.title?.at(0)?.plain_text
          const imageUrl = item.properties?.Image.files?.at(0)?.file?.url

          return { title, imageUrl }
        })
        .reverse(),
    [data],
  )

  return (
    <div className={styles['grid-container']}>
      <h3 className={styles['sub-title']}>{`(Skill)`}</h3>
      <ul className={`${styles.content} ${styles.skill}`}>
        {skillList.map((skill) => (
          <SkillItem
            key={skill.title}
            name={skill.title}
            imgSrc={skill.imageUrl}
          />
        ))}
      </ul>
    </div>
  )
}

function SkillItem({ name, imgSrc }: SkillItemProps) {
  if (!name || !imgSrc) return

  return (
    <li className={styles['skill-item']}>
      <Image
        className={styles['skill-icon']}
        src={imgSrc}
        alt={`${name} icon`}
        width={100}
        height={100}
        priority
        style={{ width: '100%', height: 'auto' }}
      />
      <h4 className={`${styles['skill-name']} font-sans`}>{name}</h4>
    </li>
  )
}
