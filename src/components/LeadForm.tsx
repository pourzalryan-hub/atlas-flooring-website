'use client'

import { useState } from 'react'
import { trackFormSubmit } from '@/lib/gtm'

interface LeadFormProps {
  /** Pre-filled "Interested in" value, sent with the lead (hidden from the user). */
  product?: string
  /** Where the lead came from, shown in the notification + sheet (e.g. "Laminate Landing"). */
  source?: string
  /** Heading above the form. */
  heading?: string
  /** Small reassurance line under the heading. */
  subheading?: string
  /** Submit button label. */
  ctaLabel?: string
  /** Show the optional free-text message box (off by default to keep landing forms short). */
  showMessage?: boolean
}

interface FormState {
  name: string
  email: string
  phone: string
  address: string
  message: string
  // Honeypot — hidden from real users, only bots fill it. Deliberately NOT named
  // like a real field so browser autofill never touches it and drops a real lead.
  contact_time: string
}

const initialForm: FormState = {
  name: '',
  email: '',
  phone: '',
  address: '',
  message: '',
  contact_time: '',
}

const fieldClass =
  'w-full bg-white border border-stone-300 rounded-lg px-4 py-3 text-base font-lato text-charcoal focus:outline-none focus:ring-2 focus:ring-gold'

export default function LeadForm({
  product,
  source = 'Website',
  heading = 'Get Your Free Quote',
  subheading = 'No obligation. We reply within one business day.',
  ctaLabel = 'Get My Free Quote →',
  showMessage = false,
}: LeadFormProps) {
  const [form, setForm] = useState<FormState>(initialForm)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          address: form.address,
          product: product ?? '',
          message: form.message,
          source,
          contact_time: form.contact_time,
        }),
      })

      const json = await res.json()
      if (!res.ok || !json?.ok) {
        throw new Error(json?.error ?? 'Submission failed')
      }

      trackFormSubmit({ product: product ?? '' })
      setSubmitted(true)
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Something went wrong. Please call us at (416) 533-3366.'
      )
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
        <div className="text-gold text-5xl mb-3">✓</div>
        <h3 className="font-playfair text-2xl text-charcoal mb-3">Thank You!</h3>
        <p className="font-lato text-warm-grey leading-relaxed">
          We&apos;ve got your request and will call you within one business day. Need
          us sooner? Call{' '}
          <a href="tel:4165333366" className="text-gold font-semibold hover:underline">
            (416) 533-3366
          </a>
          .
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
      <h3 className="font-playfair text-2xl text-charcoal mb-1">{heading}</h3>
      {subheading && (
        <p className="font-lato text-sm text-warm-grey mb-5">{subheading}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Honeypot — invisible to people; if filled, the server drops it as a bot. */}
        <div
          aria-hidden="true"
          style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }}
        >
          <label htmlFor="lf_contact_time">Preferred contact time</label>
          <input
            id="lf_contact_time"
            type="text"
            name="contact_time"
            tabIndex={-1}
            autoComplete="off"
            value={form.contact_time}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block font-lato text-sm font-semibold text-charcoal mb-1">
            Name <span className="text-gold">*</span>
          </label>
          <input
            required
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className={fieldClass}
            placeholder="Jane Smith"
          />
        </div>

        <div>
          <label className="block font-lato text-sm font-semibold text-charcoal mb-1">
            Phone <span className="text-gold">*</span>
          </label>
          <input
            required
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className={fieldClass}
            placeholder="(416) 555-0100"
          />
        </div>

        <div>
          <label className="block font-lato text-sm font-semibold text-charcoal mb-1">
            Email <span className="text-gold">*</span>
          </label>
          <input
            required
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className={fieldClass}
            placeholder="jane@example.com"
          />
        </div>

        <div>
          <label className="block font-lato text-sm font-semibold text-charcoal mb-1">
            Project Address <span className="text-warm-grey font-normal">(optional)</span>
          </label>
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            className={fieldClass}
            placeholder="Where the flooring is going"
          />
        </div>

        {showMessage && (
          <div>
            <label className="block font-lato text-sm font-semibold text-charcoal mb-1">
              Message <span className="text-warm-grey font-normal">(optional)</span>
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={3}
              className={fieldClass}
              placeholder="Room type, timeline, or any questions."
            />
          </div>
        )}

        {error && (
          <p className="font-lato text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-gold text-white font-lato font-semibold text-lg py-4 rounded hover:bg-gold-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitting ? 'Sending…' : ctaLabel}
        </button>

        <p className="font-lato text-xs text-warm-grey text-center">
          Prefer to talk?{' '}
          <a href="tel:4165333366" className="text-gold font-semibold hover:underline">
            Call (416) 533-3366
          </a>
        </p>
      </form>
    </div>
  )
}
