'use client'
import React from 'react'
import styles from '@/styles/Header.module.css'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_MENU = [
  { name: 'Home', path: '/' },
  { name: 'Work', path: '/work' },
]

export default function Header() {
  const pathname = usePathname()

  return (
    <header className={styles.header}>
      <div className={styles['grid-container']}>
        <h1 className={styles.logo}>
          <Link href="/">
            <span>Lian Kim,</span>
            <span>Front-End</span>
            <span>Web Developer</span>
          </Link>
        </h1>
        <ul className={styles['contact-list']}>
          <li>
            <a href={`tel:+82(0)1090011250`}>{'+82(0)1090011250'}</a>
          </li>
          <li>
            <a href={`mailto:5ffcut@gmail.com`}>{'5ffcut@gmail.com'}</a>
          </li>
        </ul>
        <nav className={styles.nav}>
          <ol>
            {NAV_MENU.map((menu) => (
              <li
                className={`${styles['nav-item']} ${
                  pathname === menu.path ? styles.active : ''
                }`}
                key={menu.name}
              >
                <Link href={menu.path}>{menu.name}</Link>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </header>
  )
}
