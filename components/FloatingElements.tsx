'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type FloatingElementsProps = {
  variant?: 'orbs' | 'dots' | 'grid' | 'mixed'
  density?: 'light' | 'medium' | 'heavy'
}

export default function FloatingElements({ variant = 'mixed', density = 'medium' }: FloatingElementsProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const elements = containerRef.current.querySelectorAll('.parallax-element')

    elements.forEach((element) => {
      const speed = parseFloat(element.getAttribute('data-speed') || '0.5')

      gsap.to(element, {
        y: () => window.innerHeight * speed,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    })

    // Floating animation for orbs
    const orbs = containerRef.current.querySelectorAll('.floating-orb')
    orbs.forEach((orb, index) => {
      gsap.to(orb, {
        y: '+=20',
        duration: 3 + index,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      })
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  const getDensityCount = () => {
    switch (density) {
      case 'light':
        return { orbs: 1, dots: 3 }
      case 'medium':
        return { orbs: 2, dots: 6 }
      case 'heavy':
        return { orbs: 3, dots: 10 }
      default:
        return { orbs: 2, dots: 6 }
    }
  }

  const counts = getDensityCount()

  const renderOrbs = () => {
    const positions = [
      { top: '10%', left: '10%', size: 'w-64 h-64', color: 'bg-neon-blue/10', speed: 0.3 },
      { top: '60%', right: '15%', size: 'w-96 h-96', color: 'bg-purple-500/8', speed: 0.5 },
      { top: '35%', left: '70%', size: 'w-80 h-80', color: 'bg-neon-blue/7', speed: 0.4 },
    ]

    return positions.slice(0, counts.orbs).map((pos, index) => (
      <div
        key={`orb-${index}`}
        className={`floating-orb parallax-element absolute ${pos.size} ${pos.color} rounded-full blur-3xl pointer-events-none opacity-50`}
        data-speed={pos.speed}
        style={{
          top: pos.top,
          left: pos.left,
          right: (pos as any).right,
        }}
      />
    ))
  }

  const renderDots = () => {
    const positions = [
      { top: '15%', left: '20%', size: 'w-2 h-2', speed: 0.6 },
      { top: '25%', right: '25%', size: 'w-1.5 h-1.5', speed: 0.4 },
      { top: '45%', left: '15%', size: 'w-2 h-2', speed: 0.7 },
      { top: '55%', right: '30%', size: 'w-1 h-1', speed: 0.5 },
      { top: '70%', left: '35%', size: 'w-1.5 h-1.5', speed: 0.6 },
      { top: '80%', right: '20%', size: 'w-2 h-2', speed: 0.3 },
      { top: '20%', left: '60%', size: 'w-1 h-1', speed: 0.5 },
      { top: '50%', left: '80%', size: 'w-1.5 h-1.5', speed: 0.4 },
      { top: '65%', left: '70%', size: 'w-2 h-2', speed: 0.6 },
      { top: '85%', left: '50%', size: 'w-1 h-1', speed: 0.7 },
    ]

    return positions.slice(0, counts.dots).map((pos, index) => (
      <div
        key={`dot-${index}`}
        className={`parallax-element absolute ${pos.size} bg-gray-600/20 rounded-full pointer-events-none shadow-lg shadow-neon-blue/10`}
        data-speed={pos.speed}
        style={{
          top: pos.top,
          left: pos.left,
          right: (pos as any).right,
        }}
      />
    ))
  }

  const renderGrid = () => (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        opacity: 0.3,
      }}
    />
  )

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Gradient Orbs */}
      {(variant === 'orbs' || variant === 'mixed') && renderOrbs()}

      {/* Parallax Dots */}
      {(variant === 'dots' || variant === 'mixed') && renderDots()}

      {/* Subtle Grid Pattern */}
      {(variant === 'grid' || variant === 'mixed') && renderGrid()}
    </div>
  )
}
