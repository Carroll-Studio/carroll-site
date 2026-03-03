import { useState, type FormEvent } from 'react'
import Button from './Button'
import FadeInSection from './FadeInSection'

export default function WebContactForm() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <FadeInSection direction="none">
        <div className="py-20 text-center">
          <h3 className="font-display text-3xl font-bold text-text mb-4">Thank you.</h3>
          <p className="text-text-muted">We&apos;ll be in touch within 24 hours.</p>
        </div>
      </FadeInSection>
    )
  }

  return (
    <FadeInSection>
      <form onSubmit={handleSubmit} className="space-y-16">
        {/* Row 1: Name + Email */}
        <div className="grid grid-cols-1 gap-16">
          <div>
            <label className="text-xs uppercase tracking-widest font-semibold text-text-muted block mb-3">
              Name
            </label>
            <input
              type="text"
              required
              placeholder="Your name"
              className="w-full bg-transparent border-b border-border py-3 min-h-[44px] text-text placeholder:text-text-dim focus:border-accent-green focus:outline-none transition-colors duration-300"
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-widest font-semibold text-text-muted block mb-3">
              Email
            </label>
            <input
              type="email"
              required
              placeholder="your@email.com"
              className="w-full bg-transparent border-b border-border py-3 min-h-[44px] text-text placeholder:text-text-dim focus:border-accent-green focus:outline-none transition-colors duration-300"
            />
          </div>
        </div>

        {/* Row 2: Phone + Tell us about your project */}
        <div className="grid grid-cols-1 gap-16">
          <div>
            <label className="text-xs uppercase tracking-widest font-semibold text-text-muted block mb-3">
              Phone
            </label>
            <input
              type="tel"
              placeholder="(123) 456-7890"
              className="w-full bg-transparent border-b border-border py-3 min-h-[44px] text-text placeholder:text-text-dim focus:border-accent-green focus:outline-none transition-colors duration-300"
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-widest font-semibold text-text-muted block mb-3">
              Tell us about your project
            </label>
            <textarea
              rows={4}
              required
              placeholder="What are you looking to build?"
              className="w-full bg-transparent border-b border-border py-3 min-h-[44px] text-text placeholder:text-text-dim focus:border-accent-green focus:outline-none transition-colors duration-300 resize-none"
            />
          </div>
        </div>

        {/* Row 3: Company */}
        <div className="grid grid-cols-1 gap-16">
          <div>
            <label className="text-xs uppercase tracking-widest font-semibold text-text-muted block mb-3">
              Company
            </label>
            <input
              type="text"
              placeholder="Your company"
              className="w-full bg-transparent border-b border-border py-3 min-h-[44px] text-text placeholder:text-text-dim focus:border-accent-green focus:outline-none transition-colors duration-300"
            />
          </div>
        </div>

        <Button>Send Inquiry</Button>
      </form>
    </FadeInSection>
  )
}
