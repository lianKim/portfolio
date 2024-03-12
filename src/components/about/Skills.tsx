'use client'
import React, { useMemo } from 'react'
import styles from '@/styles/About.module.css'
import { SkillItemData } from '@/types/skill'
import SectionTitle from '../@common/SectionTitle'

interface SkillProps {
  data: SkillItemData[]
}

export default function Skills({ data }: SkillProps) {
  const skillList = useMemo(
    () =>
      data
        .map(
          (item: SkillItemData) =>
            item.properties?.Name.title?.at(0)?.plain_text,
        )
        .reverse(),
    [data],
  )

  return (
    <section className="section">
      <SectionTitle title="Skills" />
      <ul className={`${styles.content} ${styles.skills}`}>
        {skillList.map((skill) => (
          <li className={`${styles['skill-item']}`} key={skill}>
            <h4>{skill}</h4>
          </li>
        ))}
      </ul>
    </section>
  )
}
