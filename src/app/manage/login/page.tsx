'use client'

import { useState } from 'react'

export default function LoginPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setBusy(true)
    setError('')
    try {
      const res = await fetch('/manage/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      const json = await res.json()
      if (!json?.ok) throw new Error(json?.error || 'Wrong password')
      // Only allow internal /manage destinations (no open redirects).
      const params = new URLSearchParams(window.location.search)
      const next = params.get('next') || '/manage'
      window.location.href = next.startsWith('/manage') ? next : '/manage'
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not sign in')
      setBusy(false)
    }
  }

  return (
    <main className="min-h-screen bg-charcoal flex items-center justify-center px-4 font-lato">
      <form onSubmit={submit} className="w-full max-w-sm bg-off-white rounded-2xl p-6 shadow-2xl">
        <div className="text-center mb-5">
          <h1 className="font-playfair text-2xl text-charcoal">Lead Manager</h1>
          <p className="text-warm-grey text-sm mt-0.5">Atlas Rug &amp; Design Centre</p>
        </div>

        <label className="block text-xs text-warm-grey mb-1" htmlFor="pw">Password</label>
        <input
          id="pw"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
          autoComplete="current-password"
          className="w-full border border-stone-300 rounded-lg px-3 py-3 text-base focus:outline-none focus:ring-2 focus:ring-gold"
        />

        {error && <p className="text-red-600 text-sm mt-2">{error}</p>}

        <button
          type="submit"
          disabled={busy || !password}
          className="w-full mt-4 bg-gold text-white font-semibold py-3 rounded-lg hover:bg-gold-dark transition-colors disabled:opacity-50"
        >
          {busy ? 'Signing in…' : 'Sign in'}
        </button>

        <p className="text-[11px] text-warm-grey text-center mt-3">
          Stays signed in on this device for 90 days.
        </p>
      </form>
    </main>
  )
}
