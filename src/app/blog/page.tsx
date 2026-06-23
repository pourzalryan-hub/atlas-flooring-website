'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import CTABanner from '@/components/CTABanner'
import { articles } from '@/lib/blog'

const featured = articles[0]
const rest = articles.slice(1)

export default function BlogPage() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: wire up newsletter subscription
    setSubscribed(true)
  }

  return (
    <main>
      {/* 1. Hero */}
      <section className="flex items-center justify-center bg-charcoal pt-20" style={{ minHeight: '40vh' }}>
        <div className="text-center px-4">
          <h1 className="font-playfair text-4xl md:text-6xl text-white mb-4">
            Flooring Tips, Trends & Advice
          </h1>
          <p className="font-lato text-lg text-stone-300 max-w-2xl mx-auto">
            Guides and insights from Toronto's flooring experts — helping you make the best decisions for your home.
          </p>
        </div>
      </section>

      {/* 2. Featured Post */}
      <section className="py-20 bg-off-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-lato font-semibold tracking-widest text-gold uppercase mb-8">FEATURED ARTICLE</p>
          <Link
            href={`/blog/${featured.slug}`}
            className="block bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="aspect-[4/3] lg:aspect-auto lg:min-h-[400px] relative">
                <Image src={featured.image} alt={featured.title} fill className="object-cover" unoptimized />
              </div>
              <div className="p-10 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-charcoal text-white font-lato text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide">
                    FEATURED
                  </span>
                  <span className="text-gold font-lato text-xs font-semibold uppercase tracking-wide">
                    {featured.category}
                  </span>
                </div>
                <h2 className="font-playfair text-3xl md:text-4xl text-charcoal mb-4">
                  {featured.title}
                </h2>
                <p className="font-lato text-lg text-warm-grey leading-relaxed mb-6">
                  {featured.excerpt}
                </p>
                <span className="font-lato text-sm font-semibold text-gold">Read More →</span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* 3. Post Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-lato font-semibold tracking-widest text-gold uppercase mb-3">ALL ARTICLES</p>
          <h2 className="font-playfair text-4xl md:text-5xl text-charcoal mb-12">From Our Design Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rest.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow border border-stone-100"
              >
                <div className="aspect-video w-full relative">
                  <Image src={post.image} alt={post.title} fill className="object-cover" unoptimized />
                </div>
                <div className="p-6">
                  <span className="text-gold font-lato text-xs font-semibold uppercase tracking-wide">
                    {post.category}
                  </span>
                  <h3 className="font-playfair text-xl text-charcoal mt-2 mb-3 group-hover:text-gold transition-colors">{post.title}</h3>
                  <p className="font-lato text-warm-grey text-sm leading-relaxed mb-4">{post.excerpt}</p>
                  <span className="font-lato text-sm font-semibold text-gold">Read More →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Newsletter Signup */}
      <section className="py-24 bg-charcoal">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-lato font-semibold tracking-widest text-gold uppercase mb-3">STAY IN THE LOOP</p>
          <h2 className="font-playfair text-4xl md:text-5xl text-white mb-4">
            Get Flooring Tips in Your Inbox
          </h2>
          <p className="font-lato text-lg text-stone-300 mb-10">
            Monthly advice from our design team — no spam, unsubscribe anytime.
          </p>

          {subscribed ? (
            <div className="text-white">
              <div className="text-gold text-4xl mb-4">✓</div>
              <p className="font-lato text-lg">You're subscribed! Watch your inbox for our next issue.</p>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="flex-1 bg-white/10 border border-white/20 text-white placeholder:text-stone-400 rounded-lg px-4 py-3 font-lato focus:outline-none focus:ring-2 focus:ring-gold"
              />
              <button
                type="submit"
                className="px-8 py-3 bg-gold text-white font-lato font-semibold rounded hover:bg-gold-dark transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </section>

      {/* 5. CTA Banner */}
      <CTABanner
        title="Ready to Put These Tips to Use?"
        subtitle="Visit our showroom or book a free consultation — we'll help you choose with confidence."
        primaryCta={{ label: 'Book a Consultation', href: '/contact' }}
        secondaryCta={{ label: 'Visit the Showroom', href: '/contact#directions' }}
      />
    </main>
  )
}
