'use client'
import React from 'react'
import Image from 'next/image'
import GitHubIcon from '@icons/github-icon.svg'
import GhostIcon from '@icons/ghost-icon.svg'
import InstaIcon from '@icons/instagram-icon.svg'
import ArrowUpIcon from '@icons/arrow_upward-icon.svg'

export default React.memo(function LinkedIcons() {
  const handleScrollToTop = () => {
    if (typeof window === 'undefined') return

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <div className="icons_wrapper">
      <div className="link-icons_container">
        <a
          href="https://github.com/lianKim"
          target="_blank"
          rel="noopener noreferrer"
          className="link-icon"
        >
          <Image src={GitHubIcon} alt="GitHub" width="36" height="36" />
        </a>
        {/* <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          className="link-icon"
        >
          <Image src={GhostIcon} alt="Blog" width="36" height="36" />
        </a> */}
        <a
          href="https://instagram.com/5ffcut"
          target="_blank"
          rel="noopener noreferrer"
          className="link-icon"
        >
          <Image src={InstaIcon} alt="Instagram" width="36" height="36" />
        </a>
      </div>
      <button type="button" onClick={handleScrollToTop} className="btn-top">
        <Image src={ArrowUpIcon} alt="Top" width="32" height="32" />
      </button>
    </div>
  )
})
