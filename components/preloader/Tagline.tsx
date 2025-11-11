'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function Tagline() {
  const taglineRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (!taglineRef.current) return

    // Fade in with upward movement
    gsap.fromTo(
      taglineRef.current,
      {
        opacity: 0,
        y: 10,
      },
      {
        opacity: 0.8,
        y: 0,
        duration: 0.3,
        delay: 1.0, // Start at 1.0s
        ease: 'power2.out',
      }
    )
  }, [])

  return (
    <p
      ref={taglineRef}
      className="tagline text-cool-gray text-sm md:text-base font-light tracking-wide opacity-0"
      style={{
        letterSpacing: '0.5px',
      }}
    >
      From idea to construction drawings in one prompt
    </p>
  )
}
