import { ToolCard } from '@/components/ToolCard';
import { Disclaimer } from '@/components/Disclaimer';

const tools = [
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
            NumberAura helps you calculate simple numerology numbers and read clear, friendly meanings. Start with a name, address, wedding date, life path number, or personal year.
          </p>
          <div className="mt-8 max-w-2xl">
            <Disclaimer />
          </div>
        </div>
      </section>

      <section className="px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-black text-white">Popular calculators</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool) => <ToolCard key={tool.href} {...tool} />)}
          </div>
        </div>
      </section>

      <section className="px-4 pb-20">
        <div className="prose-lite mx-auto max-w-4xl rounded-3xl border border-white/10 bg-white/5 p-8">
          <h2>Why focus on numerology calculators?</h2>
          <p>Numerology tools are simple, fast, and easy to understand. Instead of asking users to learn complex astrology terms, a calculator can turn a name, date, or address into one symbolic number and a short reading.</p>
          <p>This makes NumberAura useful for people comparing baby names, checking a new apartment number, choosing a wedding date, naming a brand, or journaling about the year ahead.</p>
          <h2>How the calculators work</h2>
          <p>The site uses the Pythagorean numerology system for letters and basic digit reduction for dates and addresses. Master numbers 11, 22, and 33 are preserved in many readings because they are commonly treated as special numbers in modern numerology.</p>
        </div>
      </section>
    </main>
  );
}
