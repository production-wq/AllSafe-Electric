import type { Metadata, Viewport } from 'next';
import { Figtree, Newsreader } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AvailabilityStrip } from '@/components/AvailabilityStrip';
import { StickyBar } from '@/components/StickyBar';
import { Analytics } from '@/components/Analytics';
import { Schema } from '@/components/Schema';
import { businessNode, websiteNode } from '@/lib/schema';
import { SITE_URL, business } from '@/lib/business';

const figtree = Figtree({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-figtree',
  display: 'swap',
});

const newsreader = Newsreader({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-newsreader',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#0165AC',
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Allsafe Electric | Parker, CO residential electrician',
    template: '%s',
  },
  description:
    'Licensed master electrician in Parker, Colorado. Jud answers the phone and shows up when he said he would. Panels, EV chargers, wiring, lighting and emergency repairs.',
  applicationName: business.name,
  authors: [{ name: business.owner.name }],
  creator: business.name,
  publisher: business.name,
  formatDetection: { telephone: true, address: false, email: false },
  alternates: { canonical: '/' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-US" className={`${figtree.variable} ${newsreader.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-[60] focus:rounded focus:bg-white focus:px-4 focus:py-2 focus:shadow-lift"
        >
          Skip to content
        </a>
        <AvailabilityStrip />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <StickyBar />
        <Schema nodes={[businessNode(), websiteNode()]} />
        <Analytics />
      </body>
    </html>
  );
}
