import type { Metadata } from 'next';
import './globals.css';
import { SiteHeader } from '@/components/SiteHeader';

export const metadata: Metadata = {
  metadataBase: new URL('https://numberaura.com'),
  title: {
    default: 'Free Numerology Calculators - NumberAura',
    template: '%s | NumberAura'
  },
  description: 'Free numerology calculators for names, addresses, wedding dates, personal years, life path numbers, and word meanings.',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg'
  },
  openGraph: {
    title: 'Free Numerology Calculators - NumberAura',
    description: 'Calculate name numbers, address numbers, personal year numbers, wedding date numbers, and more.',
    type: 'website'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        {children}
        <footer className="border-t border-white/10 px-4 py-10 text-center text-sm text-slate-400">
          <p>NumberAura is a lightweight numerology tool site for entertainment and self-reflection.</p>
          <p className="mt-2">Copyright {new Date().getFullYear()} NumberAura</p>
        </footer>
      </body>
    </html>
  );
}
