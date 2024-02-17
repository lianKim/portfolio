'use client'
import React, { useMemo, useState } from 'react'
import styles from '@/styles/About.module.css'
import { SkillItemData } from '@/types/skill'
import SectionTitle from '../@common/SectionTitle'

interface SkillProps {
  data: SkillItemData[]
}

export default function Skill({ data }: SkillProps) {
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
      <SectionTitle title="Skill" />
      <ul className={`${styles.content} ${styles.skill}`}>
        {skillList.map((skill) => (
          <li className={`${styles['skill-item']}`} key={skill}>
            <h4>{skill}</h4>
          </li>
        ))}
      </ul>
    </section>
  )
}
