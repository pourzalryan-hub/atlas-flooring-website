import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Atlas Rug & Design Centre",
  description: "Privacy policy for Atlas Rug & Design Centre. Learn how we collect, use, and protect your personal information in compliance with Canadian privacy law (CASL/PIPEDA).",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <main className="font-lato bg-off-white min-h-screen">
      <section className="flex items-center justify-center bg-charcoal" style={{ minHeight: '30vh' }}>
        <div className="text-center px-4">
          <h1 className="font-playfair text-4xl md:text-5xl text-white mb-3">Privacy Policy</h1>
          <p className="font-lato text-stone-300 text-lg">Last updated: June 2025</p>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto prose prose-stone">

          <div className="space-y-10 text-warm-grey leading-relaxed">

            <div>
              <h2 className="font-playfair text-2xl text-charcoal mb-3">1. Who We Are</h2>
              <p>
                Atlas Rug &amp; Design Centre ("Atlas", "we", "us", or "our") is a family-owned flooring
                retailer and installation company located at 978 Bathurst St, Toronto, ON M5R 3G6. We can
                be reached at <a href="mailto:info@atlasrugflooring.com" className="text-gold hover:underline">info@atlasrugflooring.com</a> or{" "}
                <a href="tel:4165333366" className="text-gold hover:underline">(416) 533-3366</a>.
              </p>
            </div>

            <div>
              <h2 className="font-playfair text-2xl text-charcoal mb-3">2. Information We Collect</h2>
              <p>We collect personal information only when you voluntarily provide it to us, including:</p>
              <ul className="list-disc pl-6 mt-3 space-y-1">
                <li>Name and contact details (email address, phone number)</li>
                <li>Project details you share through our contact form</li>
                <li>Communications you send us by email or phone</li>
              </ul>
              <p className="mt-3">
                We do not collect payment information through this website. We do not use cookies for
                tracking or advertising beyond standard analytics.
              </p>
            </div>

            <div>
              <h2 className="font-playfair text-2xl text-charcoal mb-3">3. How We Use Your Information</h2>
              <p>We use the information you provide solely to:</p>
              <ul className="list-disc pl-6 mt-3 space-y-1">
                <li>Respond to your inquiry or quote request</li>
                <li>Schedule consultations, measurements, or installations</li>
                <li>Send follow-up communications related to your project</li>
                <li>Improve our services based on feedback you provide</li>
              </ul>
              <p className="mt-3">
                We will not use your contact information to send unsolicited commercial messages without
                your express consent, in compliance with Canada's Anti-Spam Legislation (CASL).
              </p>
            </div>

            <div>
              <h2 className="font-playfair text-2xl text-charcoal mb-3">4. How We Share Your Information</h2>
              <p>
                We do not sell, rent, or trade your personal information to third parties. We may share
                your information with:
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-1">
                <li>
                  <strong className="text-charcoal">Service providers</strong> — such as our form
                  submission processor (Formspree) — solely to deliver the services you requested.
                  These parties are bound to handle your data securely and only as directed by us.
                </li>
                <li>
                  <strong className="text-charcoal">Installation partners</strong> — where necessary to
                  complete your flooring project (e.g. scheduling a measurement or installation visit).
                </li>
              </ul>
            </div>

            <div>
              <h2 className="font-playfair text-2xl text-charcoal mb-3">5. Data Retention</h2>
              <p>
                We retain your personal information only as long as necessary to fulfill the purpose for
                which it was collected, or as required by law. Project and customer records are typically
                kept for up to seven years for warranty and accounting purposes.
              </p>
            </div>

            <div>
              <h2 className="font-playfair text-2xl text-charcoal mb-3">6. Your Rights</h2>
              <p>Under PIPEDA and applicable provincial law, you have the right to:</p>
              <ul className="list-disc pl-6 mt-3 space-y-1">
                <li>Request access to the personal information we hold about you</li>
                <li>Request correction of inaccurate or incomplete information</li>
                <li>Withdraw consent to receive commercial messages at any time</li>
                <li>Request deletion of your personal information, subject to legal retention requirements</li>
              </ul>
              <p className="mt-3">
                To exercise any of these rights, contact us at{" "}
                <a href="mailto:info@atlasrugflooring.com" className="text-gold hover:underline">
                  info@atlasrugflooring.com
                </a>.
              </p>
            </div>

            <div>
              <h2 className="font-playfair text-2xl text-charcoal mb-3">7. Security</h2>
              <p>
                We take reasonable precautions to protect your personal information from unauthorized
                access, disclosure, or misuse. Our website is served over HTTPS. Form submissions are
                processed by Formspree, which uses industry-standard encryption.
              </p>
            </div>

            <div>
              <h2 className="font-playfair text-2xl text-charcoal mb-3">8. Third-Party Links</h2>
              <p>
                Our website may contain links to third-party websites (e.g. Google Maps). We are not
                responsible for the privacy practices of those sites and encourage you to review their
                privacy policies.
              </p>
            </div>

            <div>
              <h2 className="font-playfair text-2xl text-charcoal mb-3">9. Changes to This Policy</h2>
              <p>
                We may update this policy from time to time. The date at the top of this page indicates
                when it was last revised. Continued use of our website after changes are posted
                constitutes acceptance of the updated policy.
              </p>
            </div>

            <div>
              <h2 className="font-playfair text-2xl text-charcoal mb-3">10. Contact Us</h2>
              <p>If you have any questions about this Privacy Policy, please contact us:</p>
              <div className="mt-3 space-y-1">
                <p><strong className="text-charcoal">Atlas Rug &amp; Design Centre</strong></p>
                <p>978 Bathurst St, Toronto, ON M5R 3G6</p>
                <p>
                  <a href="tel:4165333366" className="text-gold hover:underline">(416) 533-3366</a>
                </p>
                <p>
                  <a href="mailto:info@atlasrugflooring.com" className="text-gold hover:underline">
                    info@atlasrugflooring.com
                  </a>
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
