'use client'
import React, { useEffect, useState } from 'react'
import styles from '@/styles/Modal.module.css'
import { useRouter } from 'next/navigation'
import CloseIcon from '@icons/close-icon.svg'
import Image from 'next/image'

interface ModalProps {
  children: React.ReactNode
}

export default function Modal({ children }: ModalProps) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const HandleModalClose = () => {
    setIsOpen(false)

    setTimeout(() => {
      router.back()
    }, 500)
  }

  const HandleCloseBtnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    HandleModalClose()
  }

  const HandleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return

    HandleModalClose()
  }

  useEffect(() => {
    setTimeout(() => {
      setIsOpen(true)
    }, 100)
  }, [])

  // 스크롤 방지
  useEffect(() => {
    if (typeof window === 'undefined') return

    document.body.style.cssText = `
        position: fixed;
        top: -${window.scrollY}px;
        overflow-y: hidden;
        width: 100%;
      `

    return () => {
      if (typeof window === 'undefined') return

      const scrollY = document.body.style.top
      document.body.style.cssText = ''
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1)
    }
  }, [])

  return (
    <div
      className={`${styles.wrapper} ${isOpen ? styles['active'] : ''}`}
      onClick={HandleBackgroundClick}
    >
      <button
        type="button"
        className={styles['btn-close']}
        onClick={HandleCloseBtnClick}
      >
        <Image src={CloseIcon} alt="close icon" />
      </button>
      <div className={styles.container}>{children}</div>
    </div>
  )
}
