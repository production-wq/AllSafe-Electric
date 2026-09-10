import type { Metadata } from 'next';
import Link from 'next/link';
import { business } from '@/lib/business';

export const metadata: Metadata = {
  title: 'Thanks — we have your request | Allsafe Electric',
  robots: { index: false, follow: false },
  alternates: { canonical: '/thank-you/' },
};

export default function ThankYouPage() {
  return (
    <section className="section">
      <div className="container-page max-w-2xl text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-green text-white">
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <h1 className="mt-6 text-step-4">Thanks — that&apos;s in</h1>
        <p className="mt-4 text-step-1 text-muted">
          We&apos;ll get back to you the same business day. If it&apos;s urgent, don&apos;t wait for
          the email — call{' '}
          <a href={business.phone.href} className="link-cta">
            {business.phone.display}
          </a>{' '}
          and Jud will usually pick up.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn btn-secondary">
            Back to home
          </Link>
          <a
            href={business.google.writeReviewUrl}
            target="_blank"
            rel="noopener"
            className="link-cta self-center"
          >
            Already a customer? Leave a review
          </a>
        </div>
      </div>
    </section>
  );
}
