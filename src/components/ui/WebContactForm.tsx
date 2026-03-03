import { useState, useRef, useEffect, type FormEvent } from 'react'
import Button from './Button'
import FadeInSection from './FadeInSection'

export default function WebContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const scrollPositionRef = useRef(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    user_phone: '',
    user_company: '',
    user_project: '',
  })

  function formatPhoneNumber(value: string): string {
    const digits = value.replace(/\D/g, '').slice(0, 10)
    if (digits.length === 0) return ''
    if (digits.length <= 3) return `(${digits}`
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
  }

  useEffect(() => {
    if (submitted) {
      window.scrollTo(0, scrollPositionRef.current)
    }
  }, [submitted])

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    if (name === 'user_phone') {
      setFormData(prev => ({ ...prev, [name]: formatPhoneNumber(value) }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    console.log('Form data:', formData)

    try {
      console.log('Sending to http://localhost:3001/api/contact')
      const response = await fetch('http://localhost:3002/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      console.log('Response status:', response.status)
      console.log('Response ok:', response.ok)

      if (!response.ok) {
        const data = await response.json()
        console.error('Error response:', data)
        throw new Error(data.error || 'Failed to send email')
      }

      const data = await response.json()
      console.log('Success response:', data)
      scrollPositionRef.current = window.scrollY
      setSubmitted(true)
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'An error occurred'
      console.error('Full error:', err)
      setError(errorMsg)
    } finally {
      setLoading(false)
    }
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
        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/30 rounded text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* Row 1: Name + Email */}
        <div className="grid grid-cols-1 gap-16">
          <div>
            <label className="text-xs uppercase tracking-widest font-semibold text-text-muted block mb-3">
              Name
            </label>
            <input
              type="text"
              name="user_name"
              value={formData.user_name}
              onChange={handleChange}
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
              name="user_email"
              value={formData.user_email}
              onChange={handleChange}
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
              name="user_phone"
              value={formData.user_phone}
              onChange={handleChange}
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
              name="user_project"
              value={formData.user_project}
              onChange={handleChange}
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
              name="user_company"
              value={formData.user_company}
              onChange={handleChange}
              placeholder="Your company"
              className="w-full bg-transparent border-b border-border py-3 min-h-[44px] text-text placeholder:text-text-dim focus:border-accent-green focus:outline-none transition-colors duration-300"
            />
          </div>
        </div>

        <Button>{loading ? 'Sending...' : 'Send Inquiry'}</Button>
      </form>
    </FadeInSection>
  )
}
