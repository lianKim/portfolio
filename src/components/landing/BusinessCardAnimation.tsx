'use client'
import React, { useEffect, useMemo, useRef } from 'react'
import styles from '@/styles/Landing.module.css'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, useTexture, Html } from '@react-three/drei'
import * as THREE from 'three'

export default function BusinessCardAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)

  // resize
  useEffect(() => {
    if (typeof window === 'undefined') return

    const resizeHandler = () => {
      if (!containerRef?.current) return

      containerRef.current.style.width = window.innerWidth - 40 + 'px'
      containerRef.current.style.height = window.innerHeight + 'px'
    }
    window.addEventListener('resize', resizeHandler)

    return () => window.removeEventListener('resize', resizeHandler)
  }, [])

  return (
    <div className={styles['canvas-container']} ref={containerRef}>
      <Canvas>
        <ambientLight />
        <BusinessCard />
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  )
}

function BusinessCard(props: any) {
  const meshRef = useRef<THREE.Mesh>(null)
  const boxRef = useRef<THREE.BoxGeometry>(null)
  const texture = useTexture(
    '/static/images/texture/black-concrete-texture.jpg',
  )
  const { viewport } = useThree()

  const responsiveScale = useMemo((): [number, number, 0.01] | null => {
    const deviceWidth = window?.innerWidth || 1024
    const maxX: number = deviceWidth < 768 ? 2.7 : 3.5
    const nextX: number = Math.max(viewport.width / 2.5, maxX)

    return [nextX, (nextX / 9) * 5, 0.01]
  }, [viewport])

  useFrame((state) => {
    if (meshRef.current === null) return

    const t = state.clock.getElapsedTime()
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      Math.cos(t / 2) / 20 + 0.25,
      0.1,
    )
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      Math.sin(t / 4) / 20,
      0.1,
    )
    meshRef.current.rotation.z = THREE.MathUtils.lerp(
      meshRef.current.rotation.z,
      Math.sin(t / 8) / 20,
      0.1,
    )
    meshRef.current.position.y = THREE.MathUtils.lerp(
      meshRef.current.position.y,
      (-1.2 + Math.sin(t / 2)) / 3,
      0.1,
    )
  })

  return (
    <mesh ref={meshRef} scale={responsiveScale} {...props}>
      <boxGeometry ref={boxRef} />
      <meshBasicMaterial map={texture} toneMapped={false} />
      <Html
        occlude
        distanceFactor={1}
        position={[0, 0, 0.51]}
        transform
        className={styles['html-wrapper']}
      >
        <input
          type="text"
          placeholder="귀사의 이름을 입력해주세요"
          className={`${styles['company_name-input']}`}
        />
        <div className={styles['contact-wrapper']}>
          <div>
            <div className={`${styles['contact-item']} font-kor`}>김리안</div>
            <div className={`${styles['contact-item']} ${styles.job}`}>
              Front-End Web Developer
            </div>
          </div>
          <div>
            <div className={styles['contact-item']}>{`+82(0)1090011250`}</div>
            <div className={styles['contact-item']}>{`5ffcut@gmail.com`}</div>
          </div>
        </div>
      </Html>
    </mesh>
  )
}
