import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CTABanner from "@/components/CTABanner";
import { articles, getArticle, readingTime, BLOG_AUTHOR } from "@/lib/blog";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const article = getArticle(params.slug);
  if (!article) return {};
  return {
    title: `${article.title} | Atlas Rug & Design Centre`,
    description: article.description,
    alternates: { canonical: `/blog/${article.slug}` },
    openGraph: {
      title: article.title,
      description: article.description,
      url: `https://atlasrugflooring.com/blog/${article.slug}`,
      siteName: "Atlas Rug & Design Centre",
      type: "article",
      publishedTime: article.date,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
    },
  };
}

export default function BlogArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const article = getArticle(params.slug);
  if (!article) notFound();

  const minutes = readingTime(article.body);
  const related = articles
    .filter((a) => a.slug !== article.slug && a.category === article.category)
    .slice(0, 3);
  const fallbackRelated = articles
    .filter((a) => a.slug !== article.slug)
    .slice(0, 3);
  const relatedArticles = related.length > 0 ? related : fallbackRelated;

  return (
    <main className="font-lato">
      {/* Hero */}
      <section
        className="flex items-center justify-center bg-charcoal"
        style={{ minHeight: "45vh" }}
      >
        <div className="text-center px-4 max-w-3xl mx-auto pt-20">
          <nav className="mb-6">
            <ol className="flex items-center justify-center gap-2 font-lato text-sm text-white/50">
              <li>
                <Link href="/" className="hover:text-gold transition-colors">
                  Home
                </Link>
              </li>
              <li className="text-white/30">›</li>
              <li>
                <Link href="/blog" className="hover:text-gold transition-colors">
                  Blog
                </Link>
              </li>
            </ol>
          </nav>
          <span className="text-gold font-lato text-xs font-semibold uppercase tracking-widest">
            {article.category}
          </span>
          <h1 className="font-playfair text-3xl md:text-5xl text-white mt-4 mb-6 leading-tight">
            {article.title}
          </h1>
          <p className="font-lato text-sm text-white/60">
            By {BLOG_AUTHOR} · {minutes} min read
          </p>
        </div>
      </section>

      {/* Body */}
      <section className="bg-white py-16 px-4">
        <div
          className="max-w-3xl mx-auto blog-content
            [&_p]:font-lato [&_p]:text-warm-grey [&_p]:text-lg [&_p]:leading-relaxed [&_p]:mb-6
            [&_h2]:font-playfair [&_h2]:text-3xl [&_h2]:text-charcoal [&_h2]:mt-12 [&_h2]:mb-4
            [&_h3]:font-playfair [&_h3]:text-2xl [&_h3]:text-charcoal [&_h3]:mt-8 [&_h3]:mb-3
            [&_a]:text-gold [&_a]:font-semibold hover:[&_a]:underline"
          dangerouslySetInnerHTML={{ __html: article.body }}
        />

        {/* In-content CTA */}
        <div className="max-w-3xl mx-auto mt-12 rounded-2xl border border-stone-100 shadow-sm bg-off-white p-8 text-center">
          <h2 className="font-playfair text-2xl text-charcoal mb-3">
            Ready to Talk to a Flooring Expert?
          </h2>
          <p className="text-warm-grey leading-relaxed mb-6">
            Book a free in-home consultation with Atlas Rug &amp; Design Centre.
            We'll bring samples to you and help you choose with confidence.
          </p>
          <Link href="/contact" className="btn-gold">
            Book a Free Consultation
          </Link>
        </div>
      </section>

      {/* Related articles */}
      <section className="bg-off-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-playfair text-3xl text-charcoal mb-8 text-center">
            Related Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedArticles.map((a) => (
              <Link
                key={a.slug}
                href={`/blog/${a.slug}`}
                className="group rounded-2xl shadow-sm overflow-hidden border border-stone-100 bg-white p-6 hover:shadow-md transition-shadow"
              >
                <span className="text-gold font-lato text-xs font-semibold uppercase tracking-wide">
                  {a.category}
                </span>
                <h3 className="font-playfair text-lg text-charcoal mt-2 group-hover:text-gold transition-colors">
                  {a.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        title="Put These Tips to Use"
        subtitle="Visit our showroom or book a free consultation — we'll help you choose with confidence."
        primaryCta={{ label: "Book a Consultation", href: "/contact" }}
        secondaryCta={{ label: "Call (416) 533-3366", href: "tel:4165333366" }}
      />
    </main>
  );
}
