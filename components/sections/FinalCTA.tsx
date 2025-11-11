'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [email, setEmail] = useState('')

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return

    gsap.fromTo(
      contentRef.current,
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      }
    )
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle email submission
    console.log('Email submitted:', email)
    setEmail('')
  }

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-32 px-4 bg-gradient-to-t from-deep-charcoal via-deep-charcoal to-deep-charcoal/90"
    >
      <div className="max-w-4xl mx-auto">
        <div
          ref={contentRef}
          className="relative p-8 md:p-12 lg:p-16 bg-gradient-to-br from-neon-blue/10 to-neon-blue/5 backdrop-blur-sm rounded-3xl border border-neon-blue/30 text-center"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Ready to Transform Your Workflow?
          </h2>
          <p className="text-xl md:text-2xl text-cool-gray mb-8 max-w-2xl mx-auto">
            Join hundreds of architects who are saving time and money with Kantes
          </p>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 px-6 py-4 bg-deep-charcoal/80 border border-cool-gray/30 rounded-lg text-white placeholder:text-cool-gray/50 focus:outline-none focus:border-neon-blue transition-colors"
              />
              <button
                type="submit"
                className="px-8 py-4 bg-neon-blue text-deep-charcoal font-bold rounded-lg shadow-neon-glow transition-all duration-300 hover:scale-105 hover:shadow-neon-glow-sm whitespace-nowrap"
              >
                Get Started
              </button>
            </div>
          </form>

          <p className="text-sm text-cool-gray/70">
            No credit card required • Free trial available • Cancel anytime
          </p>

          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-neon-blue/5 to-transparent opacity-50 pointer-events-none" />
        </div>
      </div>
    </section>
  )
}
