'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import SplineBackground from '@/components/SplineBackground'
import VideoModal from '@/components/VideoModal'

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)

  useEffect(() => {
    if (!heroRef.current || !ctaRef.current) return

    const tl = gsap.timeline()

    // Animate hero content after preloader completes
    tl.fromTo(
      heroRef.current,
      {
        opacity: 0,
        y: 30,
        filter: 'blur(10px)',
      },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 1,
        delay: 3,
        ease: 'power2.out',
      }
    )

    // Animate CTA buttons with stagger
    tl.fromTo(
      ctaRef.current.children,
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power2.out',
      },
      '-=0.5'
    )
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20 overflow-hidden">
      {/* Spline 3D Background - only visible in hero section */}
      <SplineBackground />

      {/* Hero Content */}
      <div
        ref={heroRef}
        className="relative z-10 flex flex-col items-center justify-center gap-10 opacity-0"
      >
        {/* Trust Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-sm">
          <span className="text-sm text-gray-300">✨ Trusted by 500+ architects worldwide</span>
        </div>

        <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white text-center max-w-6xl leading-[1.1] tracking-tight">
          From idea to construction drawings{' '}
          <span className="bg-gradient-to-r from-neon-blue to-blue-400 bg-clip-text text-transparent">
            in one prompt
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-400 text-center max-w-3xl leading-relaxed">
          Kantes replaces months of CAD work with one conversation. Generate complete BIM models, renders, and construction docs instantly.
        </p>

        {/* CTA Buttons */}
        <div ref={ctaRef} className="flex flex-wrap items-center justify-center gap-4 mt-6">
          <Link
            href="/waitlist"
            className="group px-10 py-5 bg-neon-blue text-deep-charcoal font-bold rounded-xl shadow-neon-glow transition-all duration-300 hover:scale-105 hover:shadow-neon-glow-sm inline-flex items-center gap-2"
          >
            Try Kantes Free
            <svg
              className="w-5 h-5 group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
          <button
            onClick={() => setIsVideoModalOpen(true)}
            className="group px-10 py-5 border-2 border-neon-blue text-neon-blue font-bold rounded-xl transition-all duration-300 hover:bg-neon-blue/10 hover:scale-105 inline-flex items-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
            Watch Demo
          </button>
        </div>

        {/* Social Proof Stats */}
        <div className="flex flex-wrap items-center justify-center gap-8 mt-8 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <span className="text-neon-blue font-bold text-lg">10,000+</span>
            <span>BIM Models Created</span>
          </div>
          <div className="w-px h-4 bg-gray-700"></div>
          <div className="flex items-center gap-2">
            <span className="text-neon-blue font-bold text-lg">50%</span>
            <span>Faster Than Traditional CAD</span>
          </div>
          <div className="w-px h-4 bg-gray-700"></div>
          <div className="flex items-center gap-2">
            <span className="text-neon-blue font-bold text-lg">24/7</span>
            <span>AI-Powered Generation</span>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        videoUrl="https://drive.google.com/file/d/1gn8xQBfNxFST09Q8Mqb4JbpVFH15nwEm/preview"
      />
    </section>
  )
}
