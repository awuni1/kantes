'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Features() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])

  const mainFeatures = [
    {
      title: 'Text-to-BIM',
      description: 'Transform natural language descriptions into complete Building Information Models. Simply describe your vision, and watch it become a fully detailed BIM model.',
      icon: '🤖',
      tag: 'AI-Powered',
    },
    {
      title: 'Architectural Visualization',
      description: 'Create stunning photorealistic renders and visualizations instantly. Perfect for client presentations and design reviews.',
      icon: '🎨',
      tag: 'Instant',
    },
    {
      title: 'Construction Drawing Automation',
      description: 'Automatically generate complete construction documentation including floor plans, elevations, sections, and details - all code-compliant.',
      icon: '📐',
      tag: 'Automated',
    },
    {
      title: 'Export to BIM/CAD Software',
      description: 'Seamlessly export to Revit, AutoCAD, ArchiCAD, SketchUp, and other industry-standard platforms. Full compatibility guaranteed.',
      icon: '📤',
      tag: 'Compatible',
    },
    {
      title: 'Real-Time Collaboration',
      description: 'Work together with your team in real-time. Share models, review changes, and collaborate seamlessly across projects and locations.',
      icon: '👥',
      tag: 'Real-Time',
    },
    {
      title: 'Cloud-Based Storage',
      description: 'Secure cloud storage for all your BIM models and project files. Access your work from anywhere, anytime, with automatic backups and version control.',
      icon: '☁️',
      tag: 'Secure',
    },
  ]

  useEffect(() => {
    if (!sectionRef.current || cardsRef.current.length === 0) return

    // Animate cards on scroll with stagger
    cardsRef.current.forEach((card, index) => {
      if (!card) return

      gsap.fromTo(
        card,
        {
          opacity: 0,
          y: 60,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          delay: index * 0.15, // Stagger effect
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
      className="relative py-24 md:py-28 px-4 bg-gradient-to-b from-deep-charcoal/90 to-deep-charcoal"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-24">
          {/* Feature Badge */}
          <div className="inline-flex items-center justify-center mb-8">
            <span className="px-5 py-2 border border-gray-700 rounded-full text-sm text-gray-300 font-medium">
              Features
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Powerful Features for Modern Architects
          </h2>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Everything you need to transform your architectural workflow and deliver exceptional results faster.
          </p>
        </div>

        {/* Split Screen Layout */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Left Side - Spline 3D Embed */}
          <div className="w-full lg:w-1/2">
            <div className="lg:sticky lg:top-24">
              <div className="bg-[#0f0f0f] border border-gray-800 rounded-3xl overflow-hidden h-[400px] md:h-[600px] lg:h-[700px] shadow-2xl">
                <iframe
                  src="https://my.spline.design/buildingblueprintfromscratch-lLhe1babuXzIOyFCFCbdyKQ6/"
                  frameBorder="0"
                  width="100%"
                  height="100%"
                  className="w-full h-full"
                  style={{ border: 'none' }}
                />
              </div>
            </div>
          </div>

          {/* Right Side - Feature Cards */}
          <div className="w-full lg:w-1/2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mainFeatures.map((feature, index) => (
                <div
                  key={index}
                  ref={(el) => {
                    if (el) cardsRef.current[index] = el
                  }}
                  className="group bg-[#1a1a1a] border border-gray-800 rounded-2xl p-8 transition-all duration-300 hover:border-neon-blue/50 hover:shadow-lg hover:shadow-neon-blue/10 hover:-translate-y-1"
                >
                  {/* Tag */}
                  <div className="flex items-start justify-end mb-4">
                    <span className="px-3 py-1 bg-neon-blue/10 border border-neon-blue/20 rounded-full text-xs text-neon-blue font-medium">
                      {feature.tag}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-semibold text-white leading-tight mb-3 group-hover:text-neon-blue transition-colors">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
