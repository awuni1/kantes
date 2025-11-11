'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function GridBackground() {
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!gridRef.current) return

    // Fade in grid
    gsap.fromTo(
      gridRef.current,
      { opacity: 0 },
      { opacity: 0.1, duration: 0.3, ease: 'power2.out' }
    )

    // Slow upward drift
    gsap.to(gridRef.current, {
      y: -20,
      duration: 4,
      repeat: -1,
      ease: 'linear',
    })
  }, [])

  return (
    <div
      ref={gridRef}
      className="absolute inset-0 grid-lines opacity-0"
      style={{
        backgroundPosition: '0 0',
      }}
    />
  )
}
