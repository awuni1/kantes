'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function ProgressBar() {
  const containerRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!barRef.current) return

    // Animate progress bar from 0% to 100%
    gsap.fromTo(
      barRef.current,
      {
        width: '0%',
      },
      {
        width: '100%',
        duration: 2,
        delay: 1.3, // Start after tagline appears
        ease: 'power2.out',
      }
    )
  }, [])

  return (
    <div
      ref={containerRef}
      className="pulse-line w-64 h-0.5 bg-white/10 rounded-full overflow-hidden"
    >
      <div
        ref={barRef}
        className="h-full bg-neon-blue rounded-full"
        style={{ boxShadow: '0 0 10px rgba(15, 240, 252, 0.6)' }}
      />
    </div>
  )
}
