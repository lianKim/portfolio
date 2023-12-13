'use client'
import React, { useMemo } from 'react'
import styles from '@/styles/About.module.css'
import { ContactItemData } from '@/types/contact'

interface ContactProps {
  data: ContactItemData[]
}

export default function Contact({ data }: ContactProps) {
  console.log(data)

  const [mobile, email, ...links] = useMemo(
    () =>
      data.map((item: any) => {
        const title = item.properties?.Option.title?.at(0)?.plain_text
        const { content, link } = item.properties?.Value.rich_text?.at(0)?.text
        return { option: title, value: content, link: link?.url }
      }),
    [data],
  )

  return (
    <div className={styles['grid-container']}>
      <h3 className={styles['sub-title']}>{`(Contact)`}</h3>
      <ul className={`${styles.content} ${styles.contact}`}>
        {/* name */}
        <li key="name">
          <div className={`${styles['contact-type']} font-sans`}>Name</div>
          <div className={`${styles['contact-value']} font-kor`}>김리안</div>
        </li>
        {/* mobile */}
        <li key={mobile.option}>
          <div className={`${styles['contact-type']} font-sans`}>Mobile</div>
          <a
            href={`tel:${mobile.value}`}
            className={`${styles['contact-value']} font-kor`}
          >
            {mobile.value}
          </a>
        </li>
        {/* email */}
        <li key={email.option}>
          <div className={`${styles['contact-type']} font-sans`}>Email</div>
          <a
            href={`mailto:${email.value}`}
            className={`${styles['contact-value']} font-kor`}
          >
            {email.value}
          </a>
        </li>
        {/* others */}
        {links.map((link: any) => (
          <li key={link.option}>
            <div className={`${styles['contact-type']} font-sans`}>
              {link.option}
            </div>
            <a
              href={link.url || ''}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles['contact-value']}`}
            >
              {link.value}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
