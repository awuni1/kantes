'use client'

import Preloader from '@/components/preloader/Preloader'
import Hero from '@/components/hero/Hero'
import Features from '@/components/sections/Features'
import HowItWorks from '@/components/sections/HowItWorks'
import UseCases from '@/components/sections/UseCases'
import Integrations from '@/components/sections/Integrations'
import Benefits from '@/components/sections/Benefits'
import Testimonials from '@/components/sections/Testimonials'
import FAQ from '@/components/sections/FAQ'
import Footer from '@/components/sections/Footer'
import FloatingElements from '@/components/FloatingElements'

export default function Home() {
  return (
    <main className="relative min-h-screen bg-deep-charcoal overflow-x-hidden">
      {/* Preloader - fades out completely after animation */}
      <Preloader />

      {/* Hero Section - includes Spline 3D background */}
      <Hero />

      {/* How It Works Section with floating elements */}
      <div className="relative">
        <FloatingElements variant="orbs" density="light" />
        <HowItWorks />
      </div>

      {/* Use Cases Section - tight connection */}
      <UseCases />

      {/* Features Section with floating elements */}
      <div className="relative">
        <FloatingElements variant="mixed" density="medium" />
        <Features />
      </div>

      {/* Integrations Section - tight connection */}
      <Integrations />

      {/* Benefits/Stats Section with floating elements */}
      <div className="relative">
        <FloatingElements variant="dots" density="medium" />
        <Benefits />
      </div>

      {/* Testimonials Section - tight connection */}
      <Testimonials />

      {/* FAQ Section with floating elements */}
      <div className="relative">
        <FloatingElements variant="mixed" density="light" />
        <FAQ />
      </div>

      {/* Footer */}
      <Footer />
    </main>
  )
}
