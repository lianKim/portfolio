import React from 'react'
import styles from '@/styles/Header.module.css'
import Link from 'next/link'

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles['grid-container']}>
        <h1 className={styles.logo}>
          <Link href="/">{`Lian Kim\n+82(0)1090011250\n5ffcut@gmail.com`}</Link>
        </h1>
        <nav className={styles.nav}>
          <ol>
            <li className={styles.active}>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/work">Work</Link>
            </li>
          </ol>
        </nav>
        <div className={styles.update}>{`Last Updated (23.11.24)`}</div>
      </div>
    </header>
  )
}
