'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null)
  const mockupRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [typedText, setTypedText] = useState('')
  const [currentStep, setCurrentStep] = useState(0)
  const [showVideo, setShowVideo] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const typingIntervalRef = useRef<NodeJS.Timeout | null>(null)

  const promptText = "Design a modern beach house facility with open-plan living areas and floor-to-ceiling windows. Target site: coastal lot with ocean views."

  const processingSteps = [
    { label: 'Parsing intent...', tag: 'ai.intent' },
    { label: 'Planning steps...', tag: 'workflow.plan' },
    { label: 'Generating geometry preview...', tag: 'geometry.run' },
    { label: 'Loading model artifacts...', tag: 'model.artifacts' },
    { label: 'Auto QA in progress...', tag: 'qa.run' },
  ]

  const startTypingAnimation = () => {
    let charIndex = 0
    typingIntervalRef.current = setInterval(() => {
      if (charIndex < promptText.length) {
        setTypedText(promptText.slice(0, charIndex + 1))
        charIndex++
      } else {
        if (typingIntervalRef.current) {
          clearInterval(typingIntervalRef.current)
        }
        // Start processing steps after typing completes
        startProcessingSteps()
      }
    }, 30)
  }

  useEffect(() => {
    if (!mockupRef.current || !sectionRef.current) return

    // Entrance animation with scroll trigger
    gsap.fromTo(
      mockupRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          onEnter: () => {
            // Start typing animation when section comes into view
            if (!hasStarted) {
              setHasStarted(true)
              startTypingAnimation()
            }
          },
        },
      }
    )

    return () => {
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current)
      }
    }
  }, [])

  const startProcessingSteps = () => {
    let step = 0
    const stepInterval = setInterval(() => {
      if (step < processingSteps.length) {
        setCurrentStep(step + 1)
        step++
      } else {
        clearInterval(stepInterval)
        // Show video after all steps complete
        setTimeout(() => setShowVideo(true), 500)
      }
    }, 800)
  }

  // Ensure video auto-plays when it appears
  useEffect(() => {
    if (showVideo && videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log('Video autoplay prevented:', error)
      })
    }
  }, [showVideo])

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-24 px-4 bg-gradient-to-b from-deep-charcoal to-deep-charcoal/90"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center justify-center mb-8">
            <span className="px-5 py-2 border border-gray-700 rounded-full text-sm text-gray-300 font-medium">
              How It Works
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            See Kantes in Action
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Watch Kantes transform your ideas into construction-ready designs in real-time
          </p>
        </div>

        {/* Platform Mockup */}
        <div
          ref={mockupRef}
          className="relative w-full max-w-6xl mx-auto border-2 border-blue-500 rounded-2xl overflow-hidden shadow-2xl shadow-blue-500/20"
        >
          {/* Top Header Bar */}
          <div className="bg-[#0a0a0a] border-b border-gray-800 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 relative">
                  <Image
                    src="/assets/kantes-logo.png"
                    alt="Kantes Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="text-white font-medium">Kantes</span>
              </div>
              <span className="text-gray-400 text-sm">Untitled Project</span>
            </div>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1.5 text-gray-400 text-sm hover:text-white transition-colors">
                Export
              </button>
              <button className="px-3 py-1.5 bg-gray-800 text-white text-sm rounded hover:bg-gray-700 transition-colors">
                New Design
              </button>
              <button className="px-4 py-1.5 bg-emerald-500 text-white text-sm rounded hover:bg-emerald-600 transition-colors">
                Team
              </button>
            </div>
          </div>

          {/* Main Content - Split Layout */}
          <div className="flex flex-col md:flex-row bg-[#0a0a0a]">
            {/* Left Panel - Chat */}
            <div className="w-full md:w-[35%] bg-[#0f0f0f] border-r border-gray-800 flex flex-col" style={{ minHeight: '500px' }}>
              {/* Chat Header */}
              <div className="px-4 py-3 border-b border-gray-800 flex items-center justify-between">
                <span className="text-white font-medium italic">Chat</span>
                <div className="flex items-center gap-2">
                  <button className="w-6 h-6 rounded-full border border-gray-600 flex items-center justify-center text-gray-400 hover:text-white hover:border-gray-400 transition-colors">
                    <span className="text-lg leading-none">+</span>
                  </button>
                  <button className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
                    <span className="text-lg leading-none">×</span>
                  </button>
                </div>
              </div>

              {/* Chat Content */}
              <div className="flex-1 px-4 py-6 overflow-y-auto">
                {/* User Prompt */}
                <div className="mb-6">
                  <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-800">
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {typedText}
                      <span className="inline-block w-0.5 h-4 bg-neon-blue ml-0.5 animate-pulse"></span>
                    </p>
                  </div>
                </div>

                {/* Processing Steps */}
                {currentStep > 0 && (
                  <div className="space-y-2">
                    {processingSteps.slice(0, currentStep).map((step, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between text-sm animate-fadeIn"
                      >
                        <div className="flex items-center gap-2">
                          <div className="flex gap-0.5">
                            <span className="w-1 h-1 bg-neon-blue rounded-full animate-pulse"></span>
                            <span className="w-1 h-1 bg-neon-blue rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></span>
                            <span className="w-1 h-1 bg-neon-blue rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></span>
                          </div>
                          <span className="text-gray-400">{step.label}</span>
                        </div>
                        <span className="text-gray-600 text-xs font-mono">{step.tag}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Input Area */}
              <div className="px-4 py-3 border-t border-gray-800">
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1.5 bg-[#1a1a1a] border border-gray-700 rounded text-gray-400 text-xs hover:bg-[#222] transition-colors">
                    Add Context
                  </button>
                  <div className="flex-1"></div>
                  <button className="w-8 h-8 bg-neon-blue rounded flex items-center justify-center hover:bg-blue-600 transition-colors">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Panel - 3D Canvas / Video */}
            <div className="flex-1 bg-[#0a0a0a] flex flex-col" style={{ minHeight: '500px' }}>
              {/* Toolbar */}
              <div className="px-4 py-3 border-b border-gray-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1.5 bg-[#1a1a1a] text-gray-400 text-xs rounded hover:bg-[#222] transition-colors">
                    2D View
                  </button>
                  <button className="px-3 py-1.5 bg-[#1a1a1a] text-gray-400 text-xs rounded hover:bg-[#222] transition-colors">
                    3D View
                  </button>
                  <button className="px-3 py-1.5 bg-[#1a1a1a] text-gray-400 text-xs rounded hover:bg-[#222] transition-colors">
                    Orbit
                  </button>
                  <button className="px-3 py-1.5 bg-[#1a1a1a] text-gray-400 text-xs rounded hover:bg-[#222] transition-colors">
                    Perspective
                  </button>
                  <span className="text-gray-600 text-xs ml-2">v0.3 + Auto QA</span>
                </div>
              </div>

              {/* Canvas Area - Video Embed */}
              <div className="flex-1 relative bg-[#0a0a0a] flex items-center justify-center">
                {showVideo ? (
                  <video
                    ref={videoRef}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  >
                    <source src="/assets/Demo1.mp4" type="video/mp4" />
                  </video>
                ) : (
                  <div className="text-center text-gray-600 text-sm px-4">
                    3D model canvas placeholder — pan, zoom, rotate controls
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Bottom Status Bar */}
          <div className="bg-[#0a0a0a] border-t border-gray-800 px-4 py-2 flex items-center justify-between">
            <span className="text-gray-600 text-xs">
              Ready • Tip: Hold right mouse to orbit. Scroll to zoom. Press C to Regen.
            </span>
            <div className="flex items-center gap-4 text-gray-600 text-xs">
              <span>G</span>
              <span>Ctrl</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </section>
  )
}
