'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import GridBackground from './GridBackground'
import GlitchText from './GlitchText'
import Tagline from './Tagline'
import ProgressBar from './ProgressBar'

export default function Preloader() {
  const preloaderRef = useRef<HTMLDivElement>(null)
  const backgroundRef = useRef<HTMLDivElement>(null)
  const logoContainerRef = useRef<HTMLDivElement>(null)
  const [shouldExit, setShouldExit] = useState(false)

  useEffect(() => {
    // Start exit animation after 2 seconds
    const exitTimer = setTimeout(() => {
      setShouldExit(true)
    }, 2000)

    return () => clearTimeout(exitTimer)
  }, [])

  useEffect(() => {
    if (!shouldExit || !preloaderRef.current) return

    const exitTl = gsap.timeline({
      onComplete: () => {
        if (preloaderRef.current) {
          preloaderRef.current.style.display = 'none'
        }
      },
    })

    // Fade out tagline and progress bar
    exitTl.to('.tagline, .pulse-line', {
      opacity: 0,
      duration: 0.2,
    })

    // Fade out grid
    exitTl.to(
      '.grid-lines',
      {
        opacity: 0,
        duration: 0.4,
      },
      '-=0.1'
    )

    // Fade out ENTIRE preloader (including KANTES)
    exitTl.to(
      preloaderRef.current,
      {
        opacity: 0,
        duration: 0.6,
        ease: 'power2.inOut',
      },
      '-=0.2'
    )

    return () => {
      exitTl.kill()
    }
  }, [shouldExit])

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden pointer-events-none"
    >
      {/* Background */}
      <div ref={backgroundRef} className="absolute inset-0 bg-deep-charcoal -z-10" />

      {/* Grid Background */}
      <GridBackground />

      {/* Text Container */}
      <div ref={logoContainerRef} className="logo-container flex flex-col items-center gap-6 relative z-10">
        <GlitchText />
        <Tagline />
        <ProgressBar />
      </div>
    </div>
  )
}
