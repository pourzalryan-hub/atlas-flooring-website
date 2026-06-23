// GTM dataLayer helpers — safe to call even if GTM hasn't loaded yet

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[]
  }
}

export function pushEvent(event: string, params: Record<string, unknown> = {}) {
  if (typeof window === 'undefined') return
  window.dataLayer = window.dataLayer ?? []
  window.dataLayer.push({ event, ...params })
}

export function trackFormSubmit(data: {
  product: string
}) {
  pushEvent('contact_form_submit', {
    product_interest: data.product,
    // Google Ads conversion event — map this to a GTM trigger
    conversion_event: 'generate_lead',
  })
}
