'use client'

import Link from 'next/link'
import { useForm, ValidationError } from '@formspree/react'

export default function WaitlistPage() {
  const [state, handleSubmit] = useForm("xdkwvdzj")

  return (
    <main className="relative min-h-screen bg-[#0a0a0a] flex flex-col lg:flex-row overflow-hidden gap-0">
      {/* LEFT SIDE - Waitlist Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16 bg-[#0a0a0a]">
        <div className="w-full max-w-md">
          {/* Back to Home Link */}
          <Link
            href="/"
            className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-8"
          >
            <span className="mr-2">←</span> Back to Home
          </Link>

          {!state.succeeded ? (
            <>
              {/* Badge */}
              <div className="inline-flex items-center justify-center mb-8">
                <span className="px-5 py-2 border border-gray-700 rounded-full text-sm text-gray-300 font-medium">
                  Join Waitlist
                </span>
              </div>

              {/* Heading */}
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Be the First to Experience Kantes
              </h1>

              {/* Description */}
              <p className="text-lg text-gray-400 mb-8">
                Join the waitlist and get early access to the future of AI-powered BIM modeling.
              </p>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name Input */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Name (Optional)
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-800 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-gray-700 transition-colors"
                  />
                  <ValidationError
                    prefix="Name"
                    field="name"
                    errors={state.errors}
                  />
                </div>

                {/* Email Input */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="you@company.com"
                    required
                    className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-800 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-gray-700 transition-colors"
                  />
                  <ValidationError
                    prefix="Email"
                    field="email"
                    errors={state.errors}
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={state.submitting}
                  className="w-full px-6 py-4 bg-white text-black font-semibold rounded-xl hover:bg-gray-100 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {state.submitting ? 'Joining...' : 'Join the Waitlist'}
                </button>
              </form>

              {/* Fine Print */}
              <p className="text-sm text-gray-500 mt-6">
                We'll notify you when Kantes is ready. No spam, ever.
              </p>
            </>
          ) : (
            // Success Message
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-green-500/10 border border-green-500/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">✓</span>
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">
                You're on the list!
              </h2>
              <p className="text-lg text-gray-400 mb-8">
                Thank you for joining. We'll notify you as soon as Kantes is ready.
              </p>
              <Link
                href="/"
                className="inline-block text-gray-400 hover:text-white transition-colors"
              >
                ← Back to Home
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* RIGHT SIDE - Spline 3D Scene */}
      <div className="w-full lg:w-1/2 h-[50vh] lg:h-screen bg-[#0a0a0a] relative overflow-hidden">
        <iframe
          key="spline-embed-v2"
          src="https://my.spline.design/websitelandingpage10-FETidi1Dg00oQ5UAdNxlmITA/"
          frameBorder="0"
          width="100%"
          height="100%"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          className="w-full h-full absolute inset-0"
          style={{ border: 'none' }}
        />
      </div>
    </main>
  )
}
