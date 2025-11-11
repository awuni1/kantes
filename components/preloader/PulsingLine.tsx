'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function PulsingLine() {
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!lineRef.current) return

    // Pulse animation - continuous loop
    gsap.to(lineRef.current, {
      scaleX: 1.2,
      opacity: 0.4,
      duration: 0.8,
      delay: 1.3, // Start at 1.3s
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })
  }, [])

  return (
    <div className="pulse-line relative w-24 md:w-32 h-0.5 mx-auto mt-4">
      <div
        ref={lineRef}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-neon-blue to-transparent"
        style={{
          boxShadow: '0 0 20px rgba(15, 240, 252, 0.8)',
        }}
      />
    </div>
  )
}
