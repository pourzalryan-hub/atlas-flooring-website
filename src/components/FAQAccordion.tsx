"use client";

import { useState } from "react";

interface FAQItem {
  q: string;
  a: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
}

export default function FAQAccordion({ items }: FAQAccordionProps) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div
          key={i}
          className="border border-stone-200 rounded-xl overflow-hidden"
        >
          <button
            className="w-full flex items-center justify-between px-6 py-5 text-left bg-white hover:bg-off-white transition-colors"
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
          >
            <span className="font-lato font-semibold text-charcoal pr-4">
              {item.q}
            </span>
            <span
              className={`flex-shrink-0 w-6 h-6 rounded-full border-2 border-gold flex items-center justify-center text-gold transition-transform ${
                open === i ? "rotate-45" : ""
              }`}
            >
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
              </svg>
            </span>
          </button>

          {open === i && (
            <div className="px-6 py-5 bg-off-white border-t border-stone-100">
              <p className="font-lato text-warm-grey leading-relaxed">{item.a}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
