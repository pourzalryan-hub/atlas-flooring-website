'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import FAQAccordion from '@/components/FAQAccordion'
import CTABanner from '@/components/CTABanner'
import { trackFormSubmit } from '@/lib/gtm'

// SEO metadata cannot be exported from a client component.
// Add this to a separate layout.tsx or use a parent server component if needed.
// Suggested title: "Contact Us | Atlas Rug & Design Centre Toronto"

const faqItems = [
  {
    q: 'How quickly do you respond to inquiries?',
    a: 'We aim to respond to all inquiries within one business day. For urgent matters, call us directly at (416) 533-3366 during showroom hours.',
  },
  {
    q: 'Do I need an appointment to visit the showroom?',
    a: 'We\'re open Monday through Saturday, 10am to 4pm. Walk-ins are welcome during these hours. Outside of regular hours, visits are available by appointment — call us at (416) 533-3366 to arrange a time.',
  },
  {
    q: 'Do you offer free estimates?',
    a: 'Yes — all estimates and consultations are completely free, whether in-showroom or at your home. We\'ll measure your space, help you choose the right product, and provide a detailed written quote with no obligation.',
  },
  {
    q: 'Do you serve areas outside Toronto?',
    a: 'Absolutely. We serve all of the GTA including North York, Etobicoke, Scarborough, Mississauga, Oakville, Vaughan, Brampton, Markham, Richmond Hill, and Thornhill.',
  },
  {
    q: 'Do you handle commercial flooring projects?',
    a: 'Yes, we work with builders, developers, designers, and business owners on commercial projects. Contact us to discuss your requirements and timeline.',
  },
]

const productOptions = [
  'Hardwood Flooring',
  'Carpet & Broadloom',
  'Stair Runners',
  'Luxury Vinyl',
  'Laminate Flooring',
  'Floor Refinishing',
  'Multiple Products',
  'Not Sure',
]

const serviceAreaChips = [
  'Toronto', 'North York', 'Etobicoke', 'Scarborough', 'Mississauga',
  'Oakville', 'Vaughan', 'Brampton', 'Markham', 'Richmond Hill', 'Thornhill',
]

const fieldClass =
  'w-full bg-white border border-stone-300 rounded-lg px-4 py-3 text-base font-lato text-charcoal focus:outline-none focus:ring-2 focus:ring-gold'

interface FormState {
  name: string
  email: string
  phone: string
  product: string
  message: string
}

const initialForm: FormState = {
  name: '',
  email: '',
  phone: '',
  product: '',
  message: '',
}

function SamplePrefill({ setForm }: { setForm: React.Dispatch<React.SetStateAction<FormState>> }) {
  const searchParams = useSearchParams()
  useEffect(() => {
    const sample = searchParams?.get('sample')
    if (sample) {
      setForm((prev) => ({
        ...prev,
        product: 'Carpet & Broadloom',
        message: `I'm interested in carpet sample ${sample}. Could you tell me more about availability and pricing?`,
      }))
    }
  }, [searchParams, setForm])
  return null
}

export default function ContactPage() {
  const [form, setForm] = useState<FormState>(initialForm)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT
    if (!endpoint) {
      setError('Form is not configured. Please call us at (416) 533-3366.')
      setSubmitting(false)
      return
    }

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          product: form.product,
          message: form.message,
        }),
      })

      const json = await res.json()
      if (!res.ok) {
        const msg = json?.errors?.[0]?.message ?? 'Submission failed'
        throw new Error(msg)
      }

      trackFormSubmit({
        product: form.product,
      })

      setSubmitted(true)
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Something went wrong. Please call us directly at (416) 533-3366.'
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main>
      <Suspense fallback={null}>
        <SamplePrefill setForm={setForm} />
      </Suspense>
      {/* 1. Compact Hero */}
      <section className="flex items-center justify-center bg-charcoal pt-20" style={{ minHeight: '40vh' }}>
        <div className="text-center px-4">
          <h1 className="font-playfair text-4xl md:text-6xl text-white mb-4">Let's Start Your Project</h1>
          <p className="font-lato text-lg text-stone-300 max-w-xl mx-auto">
            Visit our showroom, give us a call, or fill out the form below.
          </p>
        </div>
      </section>

      {/* 2. Main 2-Column Section */}
      <section className="py-20 bg-off-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">

            {/* LEFT — Contact Form (60%) */}
            <div className="lg:col-span-3">
              <p className="text-xs font-lato font-semibold tracking-widest text-gold uppercase mb-3">SEND US A MESSAGE</p>
              <h2 className="font-playfair text-4xl text-charcoal mb-8">Tell Us About Your Project</h2>

              {submitted ? (
                <div className="bg-white rounded-2xl shadow-sm p-10 text-center">
                  <div className="text-gold text-5xl mb-4">✓</div>
                  <h3 className="font-playfair text-3xl text-charcoal mb-4">Thank You!</h3>
                  <p className="font-lato text-lg text-warm-grey">
                    We've received your request and will be in touch within one business day. If you need
                    immediate help, call us at{' '}
                    <a href="tel:4165333366" className="text-gold hover:underline">
                      (416) 533-3366
                    </a>
                    .
                  </p>
                </div>
              ) : (
                <form id="contact-form" onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
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

                  {/* Email */}
                  <div>
                    <label className="block font-lato text-sm font-semibold text-charcoal mb-1">
                      Email Address <span className="text-gold">*</span>
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

                  {/* Phone */}
                  <div>
                    <label className="block font-lato text-sm font-semibold text-charcoal mb-1">
                      Phone Number <span className="text-gold">*</span>
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

                  {/* Product (optional) */}
                  <div>
                    <label className="block font-lato text-sm font-semibold text-charcoal mb-1">
                      What Are You Looking For? <span className="text-warm-grey font-normal">(optional)</span>
                    </label>
                    <select
                      name="product"
                      value={form.product}
                      onChange={handleChange}
                      className={fieldClass}
                    >
                      <option value="">Select a product type</option>
                      {productOptions.map((o) => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </select>
                  </div>

                  {/* Message (optional) */}
                  <div>
                    <label className="block font-lato text-sm font-semibold text-charcoal mb-1">
                      Message <span className="text-warm-grey font-normal">(optional)</span>
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={4}
                      className={fieldClass}
                      placeholder="Tell us a bit about your project — room type, timeline, or any questions."
                    />
                  </div>

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
                    {submitting ? 'Sending…' : 'Send My Request →'}
                  </button>
                </form>
              )}
            </div>

            {/* RIGHT — Contact Details (40%) */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-sm p-8 sticky top-24">
                <h3 className="font-playfair text-2xl text-charcoal mb-6">Visit Our Toronto Showroom</h3>

                <div className="space-y-4 mb-8">
                  <div>
                    <p className="font-lato text-sm font-semibold text-charcoal uppercase tracking-wide mb-1">Address</p>
                    <p className="font-lato text-warm-grey">978 Bathurst St<br />Toronto, ON M5R 3G6</p>
                  </div>
                  <div>
                    <p className="font-lato text-sm font-semibold text-charcoal uppercase tracking-wide mb-1">Phone</p>
                    <a href="tel:4165333366" className="font-lato text-gold hover:underline text-lg">
                      (416) 533-3366
                    </a>
                  </div>
                  <div>
                    <p className="font-lato text-sm font-semibold text-charcoal uppercase tracking-wide mb-1">Email</p>
                    <a href="mailto:info@atlasrugflooring.com" className="font-lato text-gold hover:underline">
                      info@atlasrugflooring.com
                    </a>
                  </div>
                </div>

                {/* Hours Table */}
                <div className="mb-6">
                  <p className="font-lato text-sm font-semibold text-charcoal uppercase tracking-wide mb-3">Showroom Hours</p>
                  <table className="w-full font-lato text-warm-grey text-sm">
                    <tbody>
                      <tr className="border-b border-stone-100">
                        <td className="py-2">Mon – Sat</td>
                        <td className="py-2 text-right font-medium text-charcoal">10am – 4pm</td>
                      </tr>
                      <tr className="border-b border-stone-100">
                        <td className="py-2">Sunday</td>
                        <td className="py-2 text-right text-stone-400">Closed</td>
                      </tr>
                      <tr>
                        <td className="py-2 text-stone-400 italic">Other times</td>
                        <td className="py-2 text-right text-stone-400 italic">By appointment</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Notes */}
                <div className="mb-6 space-y-1">
                  <p className="font-lato text-sm text-warm-grey">🏠 Family-owned since 1959</p>
                  <p className="font-lato text-sm text-warm-grey">🔨 Expert installation services</p>
                  <p className="font-lato text-sm text-warm-grey">✅ Free in-home estimates</p>
                  <p className="font-lato text-sm text-warm-grey">♿ Accessible entrance</p>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Map */}
      <section className="w-full h-96">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2848.37895734215!2d-79.41579772382227!3d43.66987417110136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b3525276a61bd%3A0xd4c0d500baa7bb29!2sAtlas%20Rugs!5e1!3m2!1sen!2sca!4v1782141517162!5m2!1sen!2sca"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>

      {/* 4. In-Home Consultation */}
      <section className="py-24 bg-off-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <div>
              <p className="text-xs font-lato font-semibold tracking-widest text-gold uppercase mb-3">FREE SERVICE</p>
              <h2 className="font-playfair text-4xl md:text-5xl text-charcoal mb-6">
                We Come to You —<br />Free In-Home Consultations
              </h2>
              <p className="font-lato text-lg text-warm-grey leading-relaxed mb-6">
                Can't make it to the showroom? Our design consultants will come to you. We'll assess your
                space, bring product samples, and provide a written quote — all at no cost and no obligation.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'Free in-home measurement',
                  'Product samples brought to you',
                  'Lighting and space assessment',
                  'Detailed written quote',
                  'No obligation, no pressure',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 font-lato text-warm-grey">
                    <span className="text-gold font-bold">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2 mb-8">
                {serviceAreaChips.map((chip) => (
                  <span
                    key={chip}
                    className="px-3 py-1 bg-white border border-stone-200 text-warm-grey font-lato text-sm rounded-full"
                  >
                    {chip}
                  </span>
                ))}
              </div>
              <a
                href="#contact-form"
                className="inline-flex items-center px-8 py-4 bg-gold text-white font-lato font-semibold rounded hover:bg-gold-dark transition-colors"
              >
                Book a Free In-Home Consultation →
              </a>
            </div>
            {/* Image */}
            <div className="aspect-[4/3] rounded-2xl overflow-hidden relative">
              <Image src="/images/about-showroom.png" alt="Beautiful hardwood flooring in a Toronto home" fill className="object-cover" unoptimized />
            </div>
          </div>
        </div>
      </section>

      {/* 5. FAQ */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-lato font-semibold tracking-widest text-gold uppercase mb-3">FAQ</p>
            <h2 className="font-playfair text-4xl md:text-5xl text-charcoal">Common Questions</h2>
          </div>
          <FAQAccordion items={faqItems} />
        </div>
      </section>

      {/* 6. Bottom CTA */}
      <section className="py-20 bg-gold">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-playfair text-4xl md:text-5xl text-white mb-4">Ready to Get Started?</h2>
          <p className="font-lato text-lg text-white/80 mb-8 max-w-xl mx-auto">
            Visit us at 978 Bathurst St or give us a call — we'd love to help.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:4165333366"
              className="inline-flex items-center px-8 py-4 border-2 border-charcoal text-charcoal font-lato font-semibold rounded hover:bg-charcoal hover:text-white transition-colors"
            >
              Call (416) 533-3366
            </a>
            <a
              href="https://www.google.com/maps/search/?api=1&query=978+Bathurst+St+Toronto+ON+M5R+3G6"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 border-2 border-charcoal text-charcoal font-lato font-semibold rounded hover:bg-charcoal hover:text-white transition-colors"
            >
              Get Directions
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
