'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function RevitPluginPage() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleDownload = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Step 1: Save form data to API (Supabase + send email)
      const response = await fetch('/api/revit-plugin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to save data')
      }

      // Step 2: Trigger file download by opening the GET endpoint in a new context
      // This allows the browser to handle the streaming download natively
      const downloadUrl = '/api/revit-plugin'
      
      // Create a hidden link and click it to trigger download
      const link = document.createElement('a')
      link.href = downloadUrl
      link.download = 'Kantes-Revit-Setup.zip'
      link.style.display = 'none'
      document.body.appendChild(link)
      link.click()
      
      // Clean up after a short delay
      setTimeout(() => {
        document.body.removeChild(link)
      }, 100)

      // Show success message
      setIsSuccess(true)
    } catch (error) {
      console.error('Error processing download:', error)
      alert(error instanceof Error ? error.message : 'There was an error processing your request. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="relative min-h-screen bg-deep-charcoal text-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Back to Home Link */}
        <Link
          href="/"
          className="inline-flex items-center text-cool-gray hover:text-neon-blue transition-colors mb-8"
        >
          <span className="mr-2">←</span> Back to Home
        </Link>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
          Kantes Revit Plugin
        </h1>
        <p className="text-xl text-cool-gray mb-12 max-w-3xl">
          Kantes plugin inside Revit is a productivity suite. Automate repetitive Revit tasks with tools that streamline your BIM workflows, eliminate manual errors, and reduce project delivery time by up to 95%.
        </p>

        {/* Download Section */}
        <div className="bg-[#1a1a1a] border border-gray-800 rounded-2xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Download the Revit Plugin</h2>
          <p className="text-cool-gray mb-6">
            Enter your details to get the latest version of the Kantes Revit plugin. We'll also send occasional updates about new tools and improvements.
          </p>

          {!isSuccess ? (
            <form onSubmit={handleDownload} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your Name"
                  required
                  className="w-full px-4 py-3 bg-[#0a0a0a] border border-gray-800 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-neon-blue transition-colors"
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                  Company Name *
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder="Company Name"
                  required
                  className="w-full px-4 py-3 bg-[#0a0a0a] border border-gray-800 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-neon-blue transition-colors"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="you@company.com"
                  required
                  className="w-full px-4 py-3 bg-[#0a0a0a] border border-gray-800 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-neon-blue transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-4 bg-neon-blue text-deep-charcoal font-bold rounded-xl shadow-neon-glow transition-all duration-300 hover:scale-105 hover:shadow-neon-glow-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isSubmitting ? 'Processing...' : 'Download Plugin'}
              </button>
            </form>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-500/10 border border-green-500/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">✓</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Download Started!
              </h3>
              <p className="text-cool-gray mb-6">
                Thank you for downloading the Kantes Revit Plugin. Check your email for updates and support.
              </p>
              <button
                onClick={() => {
                  setIsSuccess(false)
                  setFormData({ name: '', company: '', email: '' })
                }}
                className="text-neon-blue hover:underline"
              >
                Download Again
              </button>
            </div>
          )}
        </div>

        {/* Installation Instructions */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6">How to Install the Kantes Revit Plugin</h2>
          <p className="text-cool-gray mb-6">
            Follow these steps to install the plugin inside Revit:
          </p>
          <ol className="space-y-4 list-decimal list-inside text-cool-gray">
            <li className="pl-2">
              Download the Kantes Revit plugin ZIP file.
            </li>
            <li className="pl-2">
              Extract the contents of the ZIP file to a folder on your PC.
            </li>
            <li className="pl-2">
              Right-click on the setup installer file and choose <strong className="text-white">Run as administrator</strong>.
            </li>
            <li className="pl-2">
              When the installer opens, review the details and click the <strong className="text-white">Install</strong> button when it appears.
            </li>
            <li className="pl-2">
              Once installation completes, restart Revit. You should now see the Kantes plugin available in your Revit interface.
            </li>
          </ol>
        </div>

        {/* Usage Instructions */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6">How to Use the Kantes Revit Plugin</h2>
          <div className="space-y-4 text-cool-gray">
            <p>
              Once installed, the Kantes plugin will appear in your Revit ribbon. Here's how to get started:
            </p>
            <ul className="space-y-3 list-disc list-inside">
              <li className="pl-2">
                <strong className="text-white">Access the Plugin:</strong> Look for the Kantes tab in your Revit ribbon after restarting the application.
              </li>
              <li className="pl-2">
                <strong className="text-white">Automate Tasks:</strong> Use the plugin tools to automate repetitive tasks like element placement, parameter updates, and view creation.
              </li>
              <li className="pl-2">
                <strong className="text-white">Streamline Workflows:</strong> Leverage the built-in tools to reduce manual errors and speed up your BIM project delivery.
              </li>
              <li className="pl-2">
                <strong className="text-white">Get Support:</strong> If you encounter any issues or have questions, join our Discord community for help and updates.
              </li>
            </ul>
          </div>
        </div>

        {/* Discord Community Section */}
        <div className="bg-[#1a1a1a] border border-gray-800 rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-white mb-4">Share Your Feedback</h2>
          <p className="text-cool-gray mb-6">
            Have questions, suggestions, or need help? Join our Discord community to connect with other users and share your feedback.
          </p>
          <a
            href="https://discord.gg/s7Dc7kzbz"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#5865F2] text-white font-bold rounded-xl transition-all duration-300 hover:scale-105 hover:bg-[#4752C4]"
          >
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
            </svg>
            Join Discord Community
          </a>
        </div>
      </div>
    </main>
  )
}