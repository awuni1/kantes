'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])

  const featuredTestimonial = {
    quote: "Kantes has completely transformed our workflow. What used to take weeks now takes days. The AI-powered BIM generation is incredibly accurate and saves us countless hours.",
    name: "Sarah Mitchell",
    role: "Senior Architect",
    company: "Summit Design Group",
  }

  const testimonials = [
    {
      quote: "The export functionality is seamless. We can easily move between Kantes and our traditional CAD software without any compatibility issues. It's become an essential part of our toolkit.",
      name: "Michael Chen",
      role: "BIM Manager",
      rating: 5,
    },
    {
      quote: "Our clients are blown away by the photorealistic renders we can produce instantly. Kantes has helped us win more projects and deliver exceptional presentations every time.",
      name: "Elena Rodriguez",
      role: "Principal Designer",
      rating: 5,
    },
    {
      quote: "From generating construction drawings to managing complex BIM models, Kantes handles it all. It's revolutionized how we approach architectural design.",
      name: "David Kim",
      role: "Construction Manager",
      rating: 5,
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

  const StarRating = ({ rating }: { rating: number }) => (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <span key={i} className={`text-xl ${i < rating ? 'text-yellow-500' : 'text-gray-700'}`}>
          ★
        </span>
      ))}
    </div>
  )

  return (
    <section
      ref={sectionRef}
      className="relative py-16 md:py-20 px-4 bg-deep-charcoal"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Trusted by Industry Leaders
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            See what architects and designers are saying about Kantes
          </p>
        </div>

        {/* Featured Testimonial */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 max-w-6xl mx-auto">
          {/* Quote Card */}
          <div
            ref={(el) => {
              if (el) cardsRef.current[0] = el
            }}
            className="bg-[#1a1a1a] border border-gray-800 rounded-3xl p-12 flex flex-col justify-center"
          >
            <p className="text-2xl md:text-3xl text-white leading-relaxed mb-8">
              "{featuredTestimonial.quote}"
            </p>
            <div className="text-6xl text-gray-600">"</div>
            <div className="mt-4">
              <h4 className="text-white font-bold">{featuredTestimonial.name}</h4>
              <p className="text-gray-400 text-sm">{featuredTestimonial.role}</p>
              <p className="text-gray-500 text-sm">{featuredTestimonial.company}</p>
            </div>
          </div>

          {/* Image Card */}
          <div
            ref={(el) => {
              if (el) cardsRef.current[1] = el
            }}
            className="bg-[#0f0f0f] border border-gray-800 rounded-3xl overflow-hidden h-[400px] lg:h-full"
          >
            <div className="w-full h-full flex items-center justify-center">
              {/* Professional silhouette */}
              <div className="relative">
                <svg
                  width="200"
                  height="200"
                  viewBox="0 0 200 200"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-gray-700"
                >
                  {/* Head */}
                  <circle cx="100" cy="60" r="30" fill="currentColor" opacity="0.6" />

                  {/* Body */}
                  <path
                    d="M70 100 Q70 90 80 90 L120 90 Q130 90 130 100 L140 160 Q140 170 130 170 L70 170 Q60 170 60 160 Z"
                    fill="currentColor"
                    opacity="0.6"
                  />

                  {/* Arms */}
                  <path
                    d="M80 95 Q60 100 50 120 L45 140 Q43 145 48 147 Q53 149 55 144 L65 115 Q70 105 80 105 Z"
                    fill="currentColor"
                    opacity="0.6"
                  />
                  <path
                    d="M120 95 Q140 100 150 120 L155 140 Q157 145 152 147 Q147 149 145 144 L135 115 Q130 105 120 105 Z"
                    fill="currentColor"
                    opacity="0.6"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Small Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) cardsRef.current[index + 2] = el
              }}
              className="bg-[#1a1a1a] border border-gray-800 rounded-2xl p-8 hover:border-gray-700 transition-all duration-200"
            >
              {/* Star Rating */}
              <div className="mb-4 text-yellow-500">
                <StarRating rating={testimonial.rating} />
              </div>

              {/* Quote */}
              <p className="text-gray-300 mb-6 leading-relaxed">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div>
                <h4 className="text-white font-semibold">{testimonial.name}</h4>
                <p className="text-gray-400 text-sm">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
