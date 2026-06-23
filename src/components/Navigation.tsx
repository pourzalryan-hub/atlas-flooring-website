"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const products = [
  { label: "Hardwood Flooring", href: "/hardwood" },
  { label: "Engineered Hardwood", href: "/engineered-hardwood" },
  { label: "Carpet & Broadloom", href: "/carpet" },
  { label: "Stair Runners", href: "/stair-runners" },
  { label: "Luxury Vinyl", href: "/vinyl" },
  { label: "Laminate Flooring", href: "/laminate" },
  { label: "Floor Refinishing", href: "/refinishing" },
  { label: "Area Rugs", href: "/area-rugs" },
  { label: "Condo Flooring", href: "/condo-flooring" },
  { label: "Basement Flooring", href: "/basement-flooring" },
  { label: "Commercial Flooring", href: "/commercial" },
];

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Locations", href: "/locations" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openProducts = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setProductsOpen(true);
  };

  const closeProducts = () => {
    closeTimer.current = setTimeout(() => setProductsOpen(false), 120);
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || mobileOpen
          ? "bg-charcoal shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <span className="font-playfair text-xl md:text-2xl text-white tracking-wide">
              Atlas Rug{" "}
              <span className="text-gold">&amp;</span> Design Centre
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link
              href="/"
              className="font-lato text-sm text-white/80 hover:text-gold transition-colors"
            >
              Home
            </Link>

            {/* Products dropdown */}
            <div
              className="relative"
              onMouseEnter={openProducts}
              onMouseLeave={closeProducts}
            >
              <button className="font-lato text-sm text-white/80 hover:text-gold transition-colors flex items-center gap-1 py-2">
                Products
                <svg
                  className={`w-4 h-4 transition-transform ${productsOpen ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {productsOpen && (
                <div
                  className="absolute top-full left-0 w-52 bg-charcoal border border-white/10 rounded-lg shadow-xl overflow-hidden"
                  onMouseEnter={openProducts}
                  onMouseLeave={closeProducts}
                >
                  {/* invisible bridge so mouse can travel from button to panel */}
                  <div className="absolute -top-2 left-0 right-0 h-2" />
                  {products.map((p) => (
                    <Link
                      key={p.href}
                      href={p.href}
                      className="block px-5 py-3 font-lato text-sm text-white/80 hover:bg-gold/20 hover:text-gold transition-colors border-b border-white/5 last:border-0"
                    >
                      {p.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {navLinks.slice(1).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-lato text-sm text-white/80 hover:text-gold transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right — phone + CTA */}
          <div className="hidden lg:flex items-center gap-6">
            <a
              href="tel:4165333366"
              className="font-lato text-sm text-white/80 hover:text-gold transition-colors"
            >
              (416) 533-3366
            </a>
            <Link href="/contact" className="btn-gold text-sm px-6 py-3">
              Get a Free Quote
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-3 -mr-1 text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-6 flex flex-col gap-1.5">
              <span
                className={`block h-0.5 bg-current transition-transform origin-center ${mobileOpen ? "rotate-45 translate-y-2" : ""}`}
              />
              <span
                className={`block h-0.5 bg-current transition-opacity ${mobileOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`block h-0.5 bg-current transition-transform origin-center ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-charcoal border-t border-white/10">
          <div className="px-4 py-6 space-y-1">
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className="block py-3 font-lato text-white/80 hover:text-gold border-b border-white/10"
            >
              Home
            </Link>

            <div className="border-b border-white/10">
              <p className="py-3 font-lato text-xs tracking-widest text-gold uppercase">
                Products
              </p>
              {products.map((p) => (
                <Link
                  key={p.href}
                  href={p.href}
                  onClick={() => setMobileOpen(false)}
                  className="block pl-4 py-2.5 font-lato text-sm text-white/70 hover:text-gold"
                >
                  {p.label}
                </Link>
              ))}
            </div>

            {navLinks.slice(1).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block py-3 font-lato text-white/80 hover:text-gold border-b border-white/10"
              >
                {link.label}
              </Link>
            ))}

            <div className="pt-4 space-y-3">
              <a
                href="tel:4165333366"
                className="block text-center py-3 font-lato text-white/80 border border-white/20 rounded"
              >
                (416) 533-3366
              </a>
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="btn-gold w-full justify-center"
              >
                Get a Free Quote
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
