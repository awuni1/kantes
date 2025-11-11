'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface GlitchTextProps {
  onComplete?: () => void
}

export default function GlitchText({ onComplete }: GlitchTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (!containerRef.current || !textRef.current) return

    const tl = gsap.timeline({
      delay: 0.3, // Start after grid fades in
      onComplete,
    })

    // Create glitch effect layers
    const letters = gsap.utils.toArray('.glitch-letter') as HTMLElement[]

    // Initial state - letters are offset and blurred
    gsap.set(letters, {
      x: () => gsap.utils.random(-30, 30),
      y: () => gsap.utils.random(-10, 10),
      opacity: 0,
      filter: 'blur(8px)',
    })

    // Glitch materialization - letters snap into place
    tl.to(letters, {
      x: 0,
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      duration: 0.7,
      stagger: {
        each: 0.08,
        from: 'random',
      },
      ease: 'power3.out',
    })

    // RGB chromatic aberration flash
    tl.to(
      textRef.current,
      {
        textShadow: '3px 0 #0FF0FC, -3px 0 #FF00FF, 0 0 20px rgba(15, 240, 252, 0.8)',
        duration: 0.1,
      },
      '-=0.2'
    )

    // Neon blue flash when locked in
    tl.to(textRef.current, {
      textShadow: '0 0 30px rgba(15, 240, 252, 1), 0 0 60px rgba(15, 240, 252, 0.6)',
      duration: 0.2,
      ease: 'power2.out',
    })

    // Settle to white glow
    tl.to(textRef.current, {
      textShadow: '0 0 20px rgba(255, 255, 255, 0.5), 0 0 40px rgba(255, 255, 255, 0.3)',
      duration: 0.3,
      ease: 'power2.out',
    })

    return () => {
      tl.kill()
    }
  }, [onComplete])

  const text = 'KANTES'

  return (
    <div ref={containerRef} className="relative">
      <h1
        ref={textRef}
        className="text-7xl md:text-8xl lg:text-9xl font-black tracking-widest text-white select-none"
        style={{
          fontWeight: 900,
          letterSpacing: '0.15em',
        }}
      >
        {text.split('').map((letter, i) => (
          <span
            key={i}
            className="glitch-letter inline-block"
            style={{
              display: 'inline-block',
            }}
          >
            {letter}
          </span>
        ))}
      </h1>
    </div>
  )
}
