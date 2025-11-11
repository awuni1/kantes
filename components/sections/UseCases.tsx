'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function UseCases() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])

  const useCases = [
    {
      title: 'For Architects',
      description: 'Transform your creative vision into detailed BIM models in hours instead of weeks. Focus on design while Kantes handles the technical complexity.',
      benefits: [
        'Reduce CAD work by 85%',
        '3× more client presentations',
        'Win more projects faster',
      ],
    },
    {
      title: 'For Contractors',
      description: 'Get instant design updates and eliminate coordination delays. Stay on schedule and avoid costly change order delays.',
      benefits: [
        '95% faster change orders',
        'Zero scheduling delays',
        'Reduce coordination errors',
      ],
    },
    {
      title: 'For Engineers',
      description: 'Automate structural calculations and code compliance checking. Generate technical drawings with professional-grade precision.',
      benefits: [
        'Automated calculations',
        '99.9% code compliance',
        'Zero violations guaranteed',
      ],
    },
    {
      title: 'For Design Firms',
      description: 'Scale your business without hiring more staff. Handle 5× more projects with consistent quality across all deliverables.',
      benefits: [
        '5× project capacity',
        '$150K+ yearly revenue increase',
        '100% design consistency',
      ],
    },
  ]

  useEffect(() => {
    if (!sectionRef.current || cardsRef.current.length === 0) return

    cardsRef.current.forEach((card, index) => {
      if (!card) return

      gsap.fromTo(
        card,
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          delay: index * 0.1,
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
      className="relative py-16 md:py-20 px-4 bg-gradient-to-b from-deep-charcoal/90 to-deep-charcoal"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-24">
          <div className="inline-flex items-center justify-center mb-8">
            <span className="px-5 py-2 border border-gray-700 rounded-full text-sm text-gray-300 font-medium">
              Use Cases
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Built for Every Role in Architecture
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Whether you're designing, building, or managing projects, Kantes adapts to your needs
          </p>
        </div>

        {/* Use Cases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {useCases.map((useCase, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) cardsRef.current[index] = el
              }}
              className="bg-[#1a1a1a] border border-gray-800 rounded-2xl p-8 hover:border-gray-700 hover:-translate-y-1 transition-all duration-300"
            >
              {/* Title */}
              <h3 className="text-2xl font-semibold text-white mb-4">
                {useCase.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-400 leading-relaxed mb-6">
                {useCase.description}
              </p>

              {/* Benefits */}
              <ul className="space-y-3">
                {useCase.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-gray-300">
                    <span className="text-neon-blue flex-shrink-0">✓</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
