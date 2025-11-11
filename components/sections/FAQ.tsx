'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type ChatMessage = {
  role: 'user' | 'assistant'
  content: string
  questionId: number
  visualAid?: string
  relatedQuestions?: number[]
}

export default function FAQ() {
  const sectionRef = useRef<HTMLElement>(null)
  const chatMockupRef = useRef<HTMLDivElement>(null)
  const [activeQuestion, setActiveQuestion] = useState<number | null>(null)
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [hasStarted, setHasStarted] = useState(false)
  const [typedResponse, setTypedResponse] = useState('')
  const typingIntervalRef = useRef<NodeJS.Timeout | null>(null)

  const faqs = [
    {
      id: 0,
      question: 'How quickly can I start creating with Kantes?',
      answer: 'You can start creating immediately after signing up! Our onboarding takes just 5 minutes. Simply describe your project in plain English, and Kantes will generate your first BIM model in minutes. No CAD experience required.',
      category: 'Getting Started',
      icon: 'rocket',
      visualAid: 'onboarding',
      relatedQuestions: [1, 2],
    },
    {
      id: 1,
      question: 'Do I need CAD experience to use Kantes?',
      answer: 'No! Kantes is designed for both CAD experts and beginners. Simply describe what you want to build in natural language, and our AI handles the technical complexity. For advanced users, we offer full manual control and customization options.',
      category: 'Getting Started',
      icon: 'rocket',
      visualAid: 'ai-interface',
      relatedQuestions: [0, 2],
    },
    {
      id: 2,
      question: 'Can I edit the AI-generated designs?',
      answer: 'Absolutely! Every Kantes model is fully editable. You can refine dimensions, adjust layouts, modify materials, and make any changes you need. The AI provides a strong starting point, but you maintain complete creative control.',
      category: 'Getting Started',
      icon: 'rocket',
      visualAid: 'editing',
      relatedQuestions: [0, 1],
    },
    {
      id: 3,
      question: 'How does Kantes integrate with existing CAD/BIM software?',
      answer: 'Kantes seamlessly exports to all major platforms including Revit (.rvt), AutoCAD (.dwg), ArchiCAD (.pln), and SketchUp (.skp). All BIM data, layers, blocks, and annotations are preserved. We also offer 2-way sync with Revit and ArchiCAD for real-time collaboration.',
      category: 'Technical',
      icon: 'technical',
      visualAid: 'integrations',
      relatedQuestions: [4, 5],
    },
    {
      id: 4,
      question: 'Can I trust AI for structural integrity and code compliance?',
      answer: 'Yes! Kantes includes automated code compliance checking verified by ICC (International Code Council). All structural calculations follow engineering standards (IBC, ACI, AISC). However, we recommend professional engineer review for final construction documents, just like traditional CAD workflows.',
      category: 'Technical',
      icon: 'technical',
      visualAid: 'compliance',
      relatedQuestions: [3, 5],
    },
    {
      id: 5,
      question: 'Can I collaborate with my team in real-time?',
      answer: 'Absolutely! Kantes includes real-time collaboration features. Multiple team members can work on the same model simultaneously. See cursor positions, track changes, and communicate via built-in chat. Perfect for remote teams across different time zones.',
      category: 'Technical',
      icon: 'technical',
      visualAid: 'collaboration',
      relatedQuestions: [3, 4],
    },
    {
      id: 6,
      question: 'Is my data secure and private?',
      answer: 'Yes. We use enterprise-grade AES-256 encryption for all data. Your projects are stored on SOC 2 certified servers with automatic backups. We never share your data or use it for AI training without explicit permission. GDPR compliant with data centers in US and EU.',
      category: 'Security & Privacy',
      icon: 'security',
      visualAid: 'security',
      relatedQuestions: [5, 7],
    },
    {
      id: 7,
      question: 'Can I try Kantes before committing?',
      answer: 'Yes! We offer a 14-day free trial with full access to all features. No credit card required to start. Create unlimited projects, test all integrations, and experience the full power of Kantes risk-free.',
      category: 'Pricing & Trial',
      icon: 'pricing',
      visualAid: 'trial',
      relatedQuestions: [0, 6],
    },
  ]

  const getIconSVG = (iconType: string) => {
    switch (iconType) {
      case 'rocket':
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        )
      case 'technical':
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        )
      case 'security':
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        )
      case 'pricing':
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      default:
        return null
    }
  }

  const getVisualAid = (visualType: string | undefined) => {
    if (!visualType) return null

    const visualComponents = {
      onboarding: (
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-neon-blue/20 flex items-center justify-center text-neon-blue font-semibold text-sm">1</div>
            <span className="text-gray-300 text-sm">Sign up (30 seconds)</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-neon-blue/20 flex items-center justify-center text-neon-blue font-semibold text-sm">2</div>
            <span className="text-gray-300 text-sm">Describe your project</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-neon-blue/20 flex items-center justify-center text-neon-blue font-semibold text-sm">3</div>
            <span className="text-gray-300 text-sm">Get your BIM model</span>
          </div>
          <div className="mt-4 p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
            <p className="text-emerald-400 text-xs font-medium">⚡ Average time: 5 minutes</p>
          </div>
        </div>
      ),
      integrations: (
        <div className="grid grid-cols-2 gap-2">
          {['Revit', 'AutoCAD', 'ArchiCAD', 'SketchUp'].map((tool) => (
            <div key={tool} className="p-3 bg-[#1a1a1a] border border-gray-700 rounded-lg text-center">
              <div className="w-8 h-8 mx-auto mb-2 bg-gray-800 rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">{tool.slice(0, 2)}</span>
              </div>
              <span className="text-gray-400 text-xs">{tool}</span>
            </div>
          ))}
        </div>
      ),
      security: (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-emerald-500/20 flex items-center justify-center">
              <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-gray-300 text-sm">AES-256 Encryption</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-emerald-500/20 flex items-center justify-center">
              <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-gray-300 text-sm">SOC 2 Certified</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-emerald-500/20 flex items-center justify-center">
              <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-gray-300 text-sm">GDPR Compliant</span>
          </div>
        </div>
      ),
      trial: (
        <div className="space-y-3">
          <div className="p-4 bg-neon-blue/10 border border-neon-blue/30 rounded-lg">
            <div className="text-2xl font-bold text-white mb-1">14 Days</div>
            <div className="text-sm text-gray-400">Full Access Trial</div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <span className="text-neon-blue">✓</span> No credit card required
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <span className="text-neon-blue">✓</span> Unlimited projects
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <span className="text-neon-blue">✓</span> All features included
            </div>
          </div>
        </div>
      ),
    }

    return visualComponents[visualType as keyof typeof visualComponents] || (
      <div className="p-4 bg-[#1a1a1a] border border-gray-700 rounded-lg">
        <p className="text-gray-400 text-sm">Visual aid for {visualType}</p>
      </div>
    )
  }

  const handleQuestionClick = (questionId: number) => {
    const question = faqs.find((faq) => faq.id === questionId)
    if (!question) return

    // Add user message
    const userMessage: ChatMessage = {
      role: 'user',
      content: question.question,
      questionId,
    }

    setChatHistory((prev) => [...prev, userMessage])
    setActiveQuestion(questionId)
    setIsTyping(true)

    // Simulate AI thinking delay, then start typing response
    setTimeout(() => {
      startTypingResponse(question.answer, questionId, question.visualAid, question.relatedQuestions)
    }, 800)
  }

  const startTypingResponse = (
    text: string,
    questionId: number,
    visualAid?: string,
    relatedQuestions?: number[]
  ) => {
    let charIndex = 0
    setTypedResponse('')

    typingIntervalRef.current = setInterval(() => {
      if (charIndex < text.length) {
        setTypedResponse(text.slice(0, charIndex + 1))
        charIndex++
      } else {
        if (typingIntervalRef.current) {
          clearInterval(typingIntervalRef.current)
        }
        setIsTyping(false)

        // Add complete message to history
        const assistantMessage: ChatMessage = {
          role: 'assistant',
          content: text,
          questionId,
          visualAid,
          relatedQuestions,
        }
        setChatHistory((prev) => [...prev, assistantMessage])
        setTypedResponse('')
      }
    }, 15)
  }

  useEffect(() => {
    if (!chatMockupRef.current || !sectionRef.current) return

    // Entrance animation with scroll trigger
    gsap.fromTo(
      chatMockupRef.current,
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
            // Auto-play first question
            if (!hasStarted) {
              setHasStarted(true)
              setTimeout(() => handleQuestionClick(0), 500)
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

  const filteredFaqs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const currentVisualAid = chatHistory[chatHistory.length - 1]?.visualAid || (isTyping && activeQuestion !== null ? faqs[activeQuestion]?.visualAid : null)
  const currentRelatedQuestions = chatHistory[chatHistory.length - 1]?.relatedQuestions

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-28 px-4 bg-deep-charcoal"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center mb-8">
            <span className="px-5 py-2 border border-gray-700 rounded-full text-sm text-gray-300 font-medium">
              FAQ
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Ask Kantes Anything
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed mb-8">
            Get instant answers from our AI assistant
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Try: How do I start with Kantes?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 bg-[#1a1a1a] border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-neon-blue/50 transition-colors"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Question Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {filteredFaqs.map((faq) => (
            <button
              key={faq.id}
              onClick={() => handleQuestionClick(faq.id)}
              className="p-4 bg-[#1a1a1a] border border-gray-800 rounded-xl hover:border-neon-blue/30 hover:-translate-y-1 transition-all duration-300 text-left group"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gray-800 group-hover:bg-neon-blue/10 border border-gray-700 group-hover:border-neon-blue/30 flex items-center justify-center text-gray-400 group-hover:text-neon-blue transition-all">
                  {getIconSVG(faq.icon)}
                </div>
                <span className="text-xs text-gray-500 font-medium">{faq.category}</span>
              </div>
              <h3 className="text-sm font-medium text-white group-hover:text-neon-blue transition-colors line-clamp-2">
                {faq.question}
              </h3>
            </button>
          ))}
        </div>

        {/* AI Chat Mockup Platform */}
        <div
          ref={chatMockupRef}
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
                <span className="text-white font-medium">Kantes AI Assistant</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full">
                <span className="text-emerald-400 text-xs font-medium">● Online</span>
              </div>
            </div>
          </div>

          {/* Main Content - Split Layout */}
          <div className="flex flex-col lg:flex-row bg-[#0a0a0a]">
            {/* Left Panel - Chat History */}
            <div className="w-full lg:w-[60%] bg-[#0f0f0f] border-r border-gray-800 flex flex-col" style={{ minHeight: '500px' }}>
              {/* Chat Content */}
              <div className="flex-1 px-4 py-6 overflow-y-auto space-y-4">
                {chatHistory.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
                  >
                    {message.role === 'assistant' && (
                      <div className="flex-shrink-0 mr-2">
                        <div className="w-8 h-8 relative">
                          <Image
                            src="/assets/kantes-logo.png"
                            alt="Kantes"
                            fill
                            className="object-contain"
                          />
                        </div>
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] px-4 py-3 rounded-lg ${
                        message.role === 'user'
                          ? 'bg-[#1a1a1a] border border-gray-800 text-gray-300'
                          : 'bg-neon-blue/10 border border-neon-blue/30 text-gray-200'
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.content}</p>
                    </div>
                  </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex justify-start animate-fadeIn">
                    <div className="flex-shrink-0 mr-2">
                      <div className="w-8 h-8 relative">
                        <Image
                          src="/assets/kantes-logo.png"
                          alt="Kantes"
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                    <div className="max-w-[80%] px-4 py-3 rounded-lg bg-neon-blue/10 border border-neon-blue/30">
                      {typedResponse ? (
                        <p className="text-sm leading-relaxed text-gray-200">
                          {typedResponse}
                          <span className="inline-block w-0.5 h-4 bg-neon-blue ml-0.5 animate-pulse"></span>
                        </p>
                      ) : (
                        <div className="flex items-center gap-1">
                          <span className="w-2 h-2 bg-neon-blue rounded-full animate-pulse"></span>
                          <span className="w-2 h-2 bg-neon-blue rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></span>
                          <span className="w-2 h-2 bg-neon-blue rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {chatHistory.length === 0 && !isTyping && (
                  <div className="flex items-center justify-center h-full text-gray-600 text-sm">
                    Click a question above to start chatting with Kantes AI
                  </div>
                )}
              </div>

              {/* Input Area */}
              <div className="px-4 py-3 border-t border-gray-800">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Ask a question..."
                    className="flex-1 px-4 py-2 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white placeholder-gray-500 text-sm focus:outline-none focus:border-neon-blue/50 transition-colors"
                  />
                  <button className="w-10 h-10 bg-neon-blue rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Panel - Visual Aids */}
            <div className="flex-1 bg-[#0a0a0a] flex flex-col p-6" style={{ minHeight: '500px' }}>
              <h3 className="text-white font-semibold mb-4 text-sm">Additional Information</h3>

              <div className="flex-1 space-y-6">
                {/* Visual Aid */}
                {currentVisualAid && (
                  <div className="animate-fadeIn">
                    {getVisualAid(currentVisualAid)}
                  </div>
                )}

                {/* Related Questions */}
                {currentRelatedQuestions && currentRelatedQuestions.length > 0 && !isTyping && (
                  <div className="animate-fadeIn">
                    <h4 className="text-gray-400 text-xs font-medium mb-3">Related Questions</h4>
                    <div className="space-y-2">
                      {currentRelatedQuestions.map((relatedId) => {
                        const relatedFaq = faqs.find((faq) => faq.id === relatedId)
                        if (!relatedFaq) return null
                        return (
                          <button
                            key={relatedId}
                            onClick={() => handleQuestionClick(relatedId)}
                            className="w-full text-left px-3 py-2 bg-[#1a1a1a] border border-gray-800 rounded-lg hover:border-neon-blue/30 transition-colors"
                          >
                            <p className="text-xs text-gray-300 hover:text-neon-blue transition-colors">
                              {relatedFaq.question}
                            </p>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )}

                {!currentVisualAid && !currentRelatedQuestions && (
                  <div className="flex items-center justify-center h-full text-gray-600 text-sm text-center px-4">
                    Visual aids and related questions will appear here
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Bottom Status Bar */}
          <div className="bg-[#0a0a0a] border-t border-gray-800 px-4 py-2 flex items-center justify-between">
            <span className="text-gray-600 text-xs">
              Powered by Kantes AI • Instant answers to your questions
            </span>
            <span className="text-gray-600 text-xs">
              {chatHistory.length} {chatHistory.length === 1 ? 'message' : 'messages'}
            </span>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-400 mb-4">Still have questions?</p>
          <a
            href="mailto:support@kantes.ai"
            className="inline-flex items-center gap-2 px-6 py-3 bg-neon-blue hover:bg-blue-600 text-white rounded-lg transition-colors font-medium"
          >
            Contact Support
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out;
        }
      `}</style>
    </section>
  )
}
