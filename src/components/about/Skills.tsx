'use client'
import React, { useMemo } from 'react'
import styles from '@/styles/About.module.css'
import { SkillItemData } from '@/types/skills'
import SectionTitle from '../@common/SectionTitle'

interface SkillProps {
  dataList: SkillItemData[][]
}

export default function Skills({ dataList }: SkillProps) {
  const skillList = useMemo(() => {
    return dataList.map((list) => {
      const type = list.at(0)?.properties?.Type.select?.name || 'ETC'
      const sortedList = list
        .map(
          (item: SkillItemData) =>
            item.properties?.Name.title?.at(0)?.plain_text,
        )
        .reverse()

      return { title: type, list: sortedList }
    })
  }, [])

  return (
    <section className="section">
      <SectionTitle title="Skills" />
      {skillList.map((listOfType) => (
        <div
          className={styles['skill-list-container']}
          key={listOfType.title.slice(0, 3)}
        >
          <h4 className={styles['skill-title']}>{listOfType.title}</h4>
          <ul className={`${styles.content} ${styles['skill-list']}`}>
            {listOfType.list.map((skill) => (
              <li className={`${styles['skill-item']}`} key={skill}>
                <h5>{skill}</h5>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  )
}
