// Blog posts are placeholders — see pages/blog.md for AI auto-publishing implementation guide

'use client'

import { useState } from 'react'
import CTABanner from '@/components/CTABanner'

// SEO metadata: title "Flooring Tips & Advice Toronto | Atlas Rug & Design Centre Blog"
// (Add to a server layout.tsx since this is a client component due to newsletter useState)

interface BlogPost {
  id: number
  category: string
  title: string
  excerpt: string
  color: string
}

const featuredPost = {
  category: 'Hardwood',
  title: 'Hardwood vs. Engineered Hardwood: Which is Right for Your Toronto Home?',
  excerpt:
    'Solid hardwood and engineered hardwood are both beautiful options — but the right choice depends on your subfloor, humidity, and lifestyle. ' +
    'Here's how Toronto homeowners can decide with confidence.',
  date: 'Coming Soon',
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    category: 'Carpet',
    title: '5 Signs It\'s Time to Replace Your Carpet',
    excerpt:
      'Persistent odours, visible matting, and allergy flare-ups are all signals your carpet has passed its prime. Learn when a refresh makes sense.',
    color: 'bg-stone-200',
  },
  {
    id: 2,
    category: 'Luxury Vinyl',
    title: 'The Complete Guide to Luxury Vinyl Plank',
    excerpt:
      'LVP has transformed what\'s possible in kitchens, basements, and bathrooms. We break down what to look for and what to avoid.',
    color: 'bg-amber-100',
  },
  {
    id: 3,
    category: 'Stair Runners',
    title: 'How to Choose a Stair Runner',
    excerpt:
      'Pattern, pile height, binding style — stair runner selection has more nuance than most people expect. Here\'s your complete guide.',
    color: 'bg-stone-200',
  },
  {
    id: 4,
    category: 'Flooring Tips',
    title: 'Basement Flooring Toronto: Your Best Options',
    excerpt:
      'Toronto basements face moisture, cold, and limited light. Discover which flooring types perform best in below-grade spaces.',
    color: 'bg-amber-100',
  },
  {
    id: 5,
    category: 'Hardwood',
    title: 'How to Care for Hardwood Floors',
    excerpt:
      'The right cleaning routine can double the life of your hardwood. Learn what products to avoid and how to protect your investment.',
    color: 'bg-stone-200',
  },
  {
    id: 6,
    category: 'Trends',
    title: 'Flooring Trends in Toronto Homes for 2025',
    excerpt:
      'From wide-plank white oak to warm neutral LVP, here are the styles we\'re seeing most in Toronto homes this year.',
    color: 'bg-amber-100',
  },
]

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
      <section className="flex items-center justify-center bg-charcoal" style={{ minHeight: '40vh' }}>
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
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Image */}
              <div className="aspect-[4/3] lg:aspect-auto lg:min-h-[400px]">
                <div className="w-full h-full bg-stone-300 flex items-center justify-center">
                  <span className="text-stone-500 text-sm font-lato">Image: Hardwood vs engineered hardwood comparison</span>
                </div>
              </div>
              {/* Content */}
              <div className="p-10 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-charcoal text-white font-lato text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide">
                    FEATURED
                  </span>
                  <span className="text-gold font-lato text-xs font-semibold uppercase tracking-wide">
                    {featuredPost.category}
                  </span>
                </div>
                <h2 className="font-playfair text-3xl md:text-4xl text-charcoal mb-4">
                  {featuredPost.title}
                </h2>
                <p className="font-lato text-lg text-warm-grey leading-relaxed mb-6">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-lato text-sm text-stone-400">{featuredPost.date}</span>
                  <a
                    href="#"
                    className="inline-flex items-center px-6 py-3 border-2 border-gold text-gold font-lato font-semibold rounded hover:bg-gold hover:text-white transition-colors"
                  >
                    Read More →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Post Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-lato font-semibold tracking-widest text-gold uppercase mb-3">ALL ARTICLES</p>
          <h2 className="font-playfair text-4xl md:text-5xl text-charcoal mb-12">From Our Design Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow border border-stone-100"
              >
                {/* Image */}
                <div className={`aspect-video w-full ${post.color} flex items-center justify-center`}>
                  <span className="text-stone-500 text-xs font-lato px-3 text-center">Image: {post.title}</span>
                </div>
                {/* Content */}
                <div className="p-6">
                  <span className="text-gold font-lato text-xs font-semibold uppercase tracking-wide">
                    {post.category}
                  </span>
                  <h3 className="font-playfair text-xl text-charcoal mt-2 mb-3">{post.title}</h3>
                  <p className="font-lato text-warm-grey text-sm leading-relaxed mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-lato text-xs text-stone-400">Coming Soon</span>
                    <a href="#" className="font-lato text-sm font-semibold text-gold hover:underline">
                      Read More →
                    </a>
                  </div>
                </div>
              </div>
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
