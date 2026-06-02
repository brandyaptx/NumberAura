import Link from 'next/link';

const tools = [
  ['Name Calculator', '/name-numerology-calculator'],
  ['Address Calculator', '/address-numerology-calculator'],
  ['Wedding Date', '/wedding-date-numerology-calculator'],
  ['Personal Year', '/personal-year-numerology-calculator']
];

export function SiteHeader() {
  return (
    <header className="border-b border-white/10 bg-night/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/" className="text-xl font-black tracking-tight text-white">
          NumberAura<span className="text-gold">.</span>
        </Link>
        <nav className="flex flex-wrap gap-3 text-sm text-slate-300">
          {tools.map(([label, href]) => (
            <Link key={href} href={href} className="rounded-full border border-white/10 px-3 py-1.5 hover:border-gold hover:text-white">
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
