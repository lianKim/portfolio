'use client'
import React, { Suspense, useMemo, useRef } from 'react'
import styles from '@/styles/Landing.module.css'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import { OrbitControls, Html } from '@react-three/drei'
import * as THREE from 'three'
import SectionContainer from '../@common/SectionContainer'

export default function BusinessCardAnimation() {
  return (
    <SectionContainer>
      <div className={styles['canvas-wrapper']}>
        <div className={styles['canvas-container']}>
          <Canvas>
            <ambientLight />
            <BusinessCard />
            <OrbitControls enableZoom={false} />
          </Canvas>
        </div>
      </div>
    </SectionContainer>
  )
}

function BusinessCard(props: any) {
  const meshRef = useRef<THREE.Mesh>(null)
  // useLoader caches assets
  const texture = useLoader(
    THREE.TextureLoader,
    '/static/images/texture/black-concrete-texture.webp',
  )
  const { viewport } = useThree()

  const responsiveScale = useMemo((): [number, number, 0.01] | null => {
    const deviceWidth = window?.innerWidth || 1024
    const maxX: number = deviceWidth < 768 ? 3.5 : 6
    const nextX: number = Math.max(viewport.width / 3, maxX)

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
      <boxGeometry />
      <meshBasicMaterial map={texture} toneMapped={false} />
      <Suspense fallback="명함 컴포넌트">
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
                Front-End Developer
              </div>
            </div>
            <div>
              <div className={styles['contact-item']}>{`+82(0)1090011250`}</div>
              <div className={styles['contact-item']}>{`5ffcut@gmail.com`}</div>
            </div>
          </div>
        </Html>
      </Suspense>
    </mesh>
  )
}
