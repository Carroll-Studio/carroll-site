import { useState, type FormEvent } from 'react'
import Button from './Button'
import FadeInSection from './FadeInSection'

export default function ContactForm() {
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
      <form onSubmit={handleSubmit} className="space-y-6 md:space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-16">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-16">
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
          <div>
            <label className="text-xs uppercase tracking-widest font-semibold text-text-muted block mb-3">
              Budget Range
            </label>
            <select className="w-full bg-transparent border-b border-border py-3 min-h-[44px] text-text focus:border-accent-green focus:outline-none transition-colors duration-300 appearance-none cursor-pointer">
              <option value="" className="bg-bg">Select a range</option>
              <option value="5k-10k" className="bg-bg">$5,000 - $10,000</option>
              <option value="10k-25k" className="bg-bg">$10,000 - $25,000</option>
              <option value="25k-50k" className="bg-bg">$25,000 - $50,000</option>
              <option value="50k+" className="bg-bg">$50,000+</option>
            </select>
          </div>
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

        <Button>Send Inquiry</Button>
      </form>
    </FadeInSection>
  )
}
