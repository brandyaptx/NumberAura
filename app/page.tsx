import Link from 'next/link';
import { ToolCard } from '@/components/ToolCard';
import { Disclaimer } from '@/components/Disclaimer';
import { lifePathNumbers, personalYearNumbers } from '@/lib/number-content';

const tools = [
  {
    title: 'Free Numerology Calculator',
    href: '/numerology-calculator',
    description: 'Generate a complete report with life path, birthday, expression, soul urge, personality, and personal year numbers.'
  },
  {
    title: 'Name Numerology Calculator',
    href: '/name-numerology-calculator',
    description: 'Calculate expression, soul urge, and personality numbers from a full name using the Pythagorean system.'
  },
  {
    title: 'Address Numerology Calculator',
    href: '/address-numerology-calculator',
    description: 'Find the number vibration of a house, apartment, or street address with a simple address number reading.'
  },
  {
    title: 'Wedding Date Numerology Calculator',
    href: '/wedding-date-numerology-calculator',
    description: 'Turn a wedding date into a symbolic number reading for tone, theme, and relationship energy.'
  },
  {
    title: 'Personal Year Numerology Calculator',
    href: '/personal-year-numerology-calculator',
    description: 'Use your birth month, birth day, and the current year to explore your personal year number.'
  },
  {
    title: 'Birthday Number Calculator',
    href: '/birthday-number-calculator',
    description: 'Calculate the birthday number from a birth day and compare it with your life path number.'
  },
  {
    title: 'Life Path Number Calculator',
    href: '/life-path-number-calculator',
    description: 'Calculate your life path number from your date of birth and read a quick meaning.'
  },
  {
    title: 'Word Numerology Calculator',
    href: '/word-numerology-calculator',
    description: 'Check the numerology number of a word, brand name, project name, or baby name idea.'
  }
];

const guides = [
  {
    title: 'How to Calculate Numerology Numbers',
    href: '/how-to-calculate-numerology',
    description: 'Learn the formulas behind life path, expression, soul urge, personality, birthday, and personal year numbers.'
  },
  {
    title: 'How to Calculate Life Path Number',
    href: '/how-to-calculate-life-path-number',
    description: 'Follow the date-of-birth formula, master number notes, and links to every life path number meaning.'
  }
];

export default function HomePage() {
  return (
    <main>
      <section className="bg-[radial-gradient(circle_at_top,#5b3cc4_0%,#0d1020_42%,#080a14_100%)] px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-bold uppercase tracking-[0.35em] text-gold">Free numerology tools</p>
          <h1 className="mt-5 max-w-4xl text-5xl font-black tracking-tight text-white md:text-7xl">
            Free Numerology Calculators for Names, Dates, Addresses, and Words
          </h1>
          <p className="mt-6 max-w-2xl text-xl leading-9 text-slate-200">
            NumberAura helps you calculate a full numerology report from a name and birth date, then explore clear meanings for life path, birthday, name, and personal year numbers.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/numerology-calculator" className="rounded-2xl bg-gold px-5 py-3 font-black text-night transition hover:bg-white">
              Start full report
            </Link>
            <Link href="/life-path-number-calculator" className="rounded-2xl border border-white/10 px-5 py-3 font-bold text-white transition hover:border-gold">
              Calculate life path
            </Link>
            <Link href="/how-to-calculate-numerology" className="rounded-2xl border border-white/10 px-5 py-3 font-bold text-white transition hover:border-gold">
              Learn the formulas
            </Link>
          </div>
          <div className="mt-8 max-w-2xl">
            <Disclaimer />
          </div>
        </div>
      </section>

      <section className="px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-black text-white">Popular numerology calculators</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool) => <ToolCard key={tool.href} {...tool} />)}
          </div>
        </div>
      </section>

      <section className="px-4 pb-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-black text-white">Numerology guides</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {guides.map((guide) => (
              <Link key={guide.href} href={guide.href} className="group rounded-3xl border border-white/10 bg-white/10 p-6 transition hover:-translate-y-1 hover:border-gold/70 hover:bg-white/15">
                <h3 className="text-xl font-black text-white group-hover:text-gold">{guide.title}</h3>
                <p className="mt-3 leading-7 text-slate-300">{guide.description}</p>
                <p className="mt-5 text-sm font-bold text-gold">Read guide</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-16">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-black text-white">Life path number meanings</h2>
            <p className="mt-4 leading-8 text-slate-300">Read the meaning of each life path number after calculating your birth date.</p>
            <div className="mt-6 grid grid-cols-3 gap-3 sm:grid-cols-4">
              {lifePathNumbers.map((number) => (
                <Link key={number} href={`/life-path-number-${number}`} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center transition hover:border-gold hover:bg-white/10">
                  <span className="block text-2xl font-black text-white">{number}</span>
                  <span className="mt-1 block text-xs font-bold text-slate-400">Life Path</span>
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-black text-white">Personal year meanings</h2>
            <p className="mt-4 leading-8 text-slate-300">Explore the yearly cycle themes from personal year 1 through 9.</p>
            <div className="mt-6 grid grid-cols-3 gap-3">
              {personalYearNumbers.map((number) => (
                <Link key={number} href={`/personal-year-${number}`} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center transition hover:border-gold hover:bg-white/10">
                  <span className="block text-2xl font-black text-white">{number}</span>
                  <span className="mt-1 block text-xs font-bold text-slate-400">Year</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-20">
        <div className="prose-lite mx-auto max-w-4xl rounded-3xl border border-white/10 bg-white/5 p-8">
          <h2>Why focus on numerology calculators?</h2>
          <p>Numerology tools are simple, fast, and easy to understand. Instead of asking users to learn complex astrology terms, a calculator can turn a name, date, or address into one symbolic number and a short reading.</p>
          <p>This makes NumberAura useful for people comparing baby names, checking a new apartment number, choosing a wedding date, naming a brand, or journaling about the year ahead.</p>
          <h2>How the calculators work</h2>
          <p>The site uses digit reduction for dates and addresses, Pythagorean values for most letter-based calculations, and a Chaldean comparison mode in the name numerology calculator. Master numbers 11, 22, and 33 are preserved in many readings because they are commonly treated as special numbers in modern numerology.</p>
        </div>
      </section>
    </main>
  );
}
