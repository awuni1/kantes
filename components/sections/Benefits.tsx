'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Benefits() {
  const sectionRef = useRef<HTMLElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !statsRef.current) return

    const stats = statsRef.current.children

    gsap.fromTo(
      stats,
      {
        opacity: 0,
        scale: 0.8,
      },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'back.out(1.4)',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  const stats = [
    {
      value: '90%',
      label: 'Faster Than Traditional CAD',
      description: 'Complete projects in a fraction of the time',
    },
    {
      value: '200+',
      label: 'Hours Saved Monthly',
      description: 'Focus on design, not repetitive drafting',
    },
    {
      value: '$15K+',
      label: 'Average Annual Savings',
      description: 'Reduce software and labor costs',
    },
    {
      value: '99.9%',
      label: 'Accuracy Rate',
      description: 'Professional-grade precision every time',
    },
  ]

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-28 px-4 bg-gradient-to-b from-deep-charcoal to-deep-charcoal/90"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-24">
          {/* Statistics Badge */}
          <div className="inline-flex items-center justify-center mb-8">
            <span className="px-5 py-2 border border-gray-700 rounded-full text-sm text-gray-300 font-medium">
              Statistics
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            The Numbers Speak for Themselves
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Join hundreds of architects who are revolutionizing their workflow
          </p>
        </div>

        {/* Stats Grid */}
        <div
          ref={statsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="p-8 bg-[#1a1a1a] rounded-2xl border border-gray-800 hover:border-gray-700 transition-all duration-200 text-center"
            >
              <div className="text-5xl md:text-6xl font-bold text-white mb-3">
                {stat.value}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {stat.label}
              </h3>
              <p className="text-sm text-gray-400">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
