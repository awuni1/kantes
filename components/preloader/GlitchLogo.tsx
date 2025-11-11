'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Image from 'next/image'

interface GlitchLogoProps {
  onComplete?: () => void
}

export default function GlitchLogo({ onComplete }: GlitchLogoProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || !logoRef.current) return

    const tl = gsap.timeline({
      delay: 0.3, // Start after grid fades in
      onComplete,
    })

    // Create glitch fragments effect
    const fragments = gsap.utils.toArray('.logo-fragment') as HTMLElement[]

    // Glitch materialization
    tl.fromTo(
      fragments,
      {
        x: () => gsap.utils.random(-20, 20),
        opacity: 0,
        filter: 'blur(4px)',
      },
      {
        x: 0,
        opacity: 1,
        filter: 'blur(0px)',
        duration: 0.7,
        stagger: 0.05,
        ease: 'power3.out',
      }
    )

    // Neon blue flash when locked in
    tl.to(
      logoRef.current,
      {
        filter: 'drop-shadow(0 0 20px rgba(15, 240, 252, 0.8))',
        duration: 0.2,
        ease: 'power2.out',
      },
      '-=0.2'
    )

    // Fade to white glow
    tl.to(logoRef.current, {
      filter: 'drop-shadow(0 0 15px rgba(255, 255, 255, 0.3))',
      duration: 0.3,
      ease: 'power2.out',
    })

    return () => {
      tl.kill()
    }
  }, [onComplete])

  return (
    <div ref={containerRef} className="relative w-64 h-64 md:w-80 md:h-80">
      <div ref={logoRef} className="relative w-full h-full">
        {/* Create multiple fragments for glitch effect */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="logo-fragment absolute inset-0 overflow-hidden"
            style={{
              clipPath: `polygon(0% ${i * 12.5}%, 100% ${i * 12.5}%, 100% ${
                (i + 1) * 12.5
              }%, 0% ${(i + 1) * 12.5}%)`,
            }}
          >
            <Image
              src="/assets/kantes-logo.svg"
              alt="KANTES"
              fill
              className="object-contain"
              priority
            />
          </div>
        ))}
      </div>
    </div>
  )
}
