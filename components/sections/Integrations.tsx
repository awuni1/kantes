'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Integrations() {
  const hubRef = useRef<HTMLDivElement>(null)
  const integrationsRef = useRef<HTMLDivElement[]>([])
  const sectionRef = useRef<HTMLElement>(null)

  const integrations = [
    { name: 'Revit', logo: 'RV' },
    { name: 'AutoCAD', logo: 'AC' },
    { name: 'ArchiCAD', logo: 'AR' },
    { name: 'SketchUp', logo: 'SU' },
    { name: 'Rhino', logo: 'RH' },
    { name: 'Blender', logo: 'BL' },
    { name: 'Lumion', logo: 'LU' },
    { name: '3ds Max', logo: '3D' },
  ]

  useEffect(() => {
    if (!hubRef.current) return

    // Smooth fade-in entrance for hub
    gsap.fromTo(
      hubRef.current,
      {
        opacity: 0,
        scale: 0.8
      },
      {
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: hubRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      }
    )

    // Integrations fade in sequentially
    integrationsRef.current.forEach((item, index) => {
      if (!item) return

      gsap.fromTo(
        item,
        {
          opacity: 0,
          scale: 0.8,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: hubRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
          delay: 0.5 + index * 0.15,
        }
      )
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-16 md:py-20 px-4 bg-gradient-to-b from-deep-charcoal/90 to-deep-charcoal overflow-hidden"
    >
      {/* Fade In/Out CSS Animations */}
      <style jsx>{`
        @keyframes fadeInOut {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }

        @keyframes glowFade {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.3; }
        }

        @keyframes lineFade {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }

        .animate-fade-hub {
          animation: fadeInOut 4s ease-in-out infinite;
        }

        .animate-fade-glow {
          animation: glowFade 4s ease-in-out infinite;
        }

        .animate-fade-lines {
          animation: lineFade 5s ease-in-out infinite;
        }
      `}</style>

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-24">
          <div className="inline-flex items-center justify-center mb-8">
            <span className="px-5 py-2 border border-gray-700 rounded-full text-sm text-gray-300 font-medium">
              Integrations
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Works With Your Favorite Tools
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Seamlessly integrate with industry-standard software and platforms
          </p>
        </div>

        {/* Radial Hub Design */}
        <div className="relative w-full max-w-4xl mx-auto h-[600px] md:h-[700px] flex items-center justify-center">
          {/* Connection Lines with Fade */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ zIndex: 0 }}
          >
            {integrations.map((_, index) => {
              const angle = (index * 360) / integrations.length
              const radius = 250
              const x1 = '50%'
              const y1 = '50%'
              const x2 = `calc(50% + ${Math.cos((angle - 90) * (Math.PI / 180)) * radius}px)`
              const y2 = `calc(50% + ${Math.sin((angle - 90) * (Math.PI / 180)) * radius}px)`

              return (
                <line
                  key={index}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="rgba(75, 85, 99, 0.3)"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                  className="animate-fade-lines"
                />
              )
            })}
          </svg>

          {/* Central Kantes Hub */}
          <div
            ref={hubRef}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
          >
            <div className="relative">
              {/* Animated Fading Glow */}
              <div className="absolute inset-0 bg-white/10 rounded-full blur-xl scale-150 animate-fade-glow"></div>

              {/* Main hub with fade in/out */}
              <div className="relative bg-white border-4 border-gray-800 rounded-full w-32 h-32 md:w-40 md:h-40 shadow-2xl animate-fade-hub">
                {/* Perfectly centered content */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-deep-charcoal leading-none">
                      Kantes
                    </div>
                    <div className="text-xs text-gray-600 mt-2">
                      Central Hub
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Radiating Integration Tools */}
          {integrations.map((integration, index) => {
            const angle = (index * 360) / integrations.length
            const radius = 250 // Distance from center
            const x = Math.cos((angle - 90) * (Math.PI / 180)) * radius
            const y = Math.sin((angle - 90) * (Math.PI / 180)) * radius

            return (
              <div
                key={index}
                ref={(el) => {
                  if (el) integrationsRef.current[index] = el
                }}
                className="absolute top-1/2 left-1/2 group"
                style={{
                  transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                }}
              >
                <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-4 md:p-6 flex flex-col items-center justify-center hover:border-gray-600 hover:bg-[#252525] transition-all duration-300 cursor-pointer shadow-lg group-hover:scale-110 w-24 h-24 md:w-28 md:h-28">
                  {/* Logo */}
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-gray-800 group-hover:bg-gray-700 flex items-center justify-center mb-2 transition-colors">
                    <span className="text-white font-bold text-xs md:text-sm">
                      {integration.logo}
                    </span>
                  </div>

                  {/* Name */}
                  <span className="text-xs text-gray-400 text-center group-hover:text-gray-200 transition-colors">
                    {integration.name}
                  </span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Additional Info */}
        <div className="text-center mt-12">
          <p className="text-gray-400">And many more...</p>
        </div>
      </div>
    </section>
  )
}
