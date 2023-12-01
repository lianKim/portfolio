import React from 'react'
import styles from '@/styles/About.module.css'
import { SKILL_LIST } from '@/data/skillList'
import Image, { StaticImageData } from 'next/image'

interface SkillItemProps {
  name: string
  imgSrc: StaticImageData
}

export default function Skill() {
  return (
    <div className={styles['grid-container']}>
      <h3 className={styles['sub-title']}>{`(Skill)`}</h3>
      <ul className={styles.skill}>
        {SKILL_LIST.map((skill) => (
          <SkillItem key={skill.name} name={skill.name} imgSrc={skill.image} />
        ))}
      </ul>
    </div>
  )
}

function SkillItem({ name, imgSrc }: SkillItemProps) {
  return (
    <li className={styles['skill-item']}>
      <Image
        className={styles['skill-icon']}
        src={imgSrc}
        alt={`${name} icon`}
      />
      <h4 className={`${styles['skill-name']} font-sans`}>{name}</h4>
    </li>
  )
}
