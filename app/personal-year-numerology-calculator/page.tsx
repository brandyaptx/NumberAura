import type { Metadata } from 'next';
import Link from 'next/link';
import { SimpleDateCalculator } from '@/components/DateCalculator';
import { CalculatorShell } from '@/components/SeoContent';
import { personalYearNumbers } from '@/lib/number-content';

export const metadata: Metadata = {
  title: 'Personal Year Numerology Calculator',
  description: 'Calculate a personal year number from a birthday and target year, then read the yearly numerology theme from 1 through 9.',
  alternates: {
    canonical: '/personal-year-numerology-calculator'
  }
};

const faq = [
  {
    question: 'How do I calculate my personal year number?',
    answer: 'Add the birth month, birth day, and target year digits, then reduce the total to a number from 1 to 9.'
  },
  {
    question: 'Does the personal year number change every year?',
    answer: 'Yes. It changes with the calendar year because the target year is part of the calculation.'
  },
  {
    question: 'Is personal year the same as life path?',
    answer: 'No. Life path is based on the full birth date and stays fixed. Personal year changes from year to year.'
  }
];

export default function Page() {
  return (
    <CalculatorShell
      eyebrow="Year tool"
      title="Personal Year Numerology Calculator"
      keyword="personal year numerology calculator"
      path="/personal-year-numerology-calculator"
      intro="Enter a birthday and a target year to calculate a personal year number and read the theme for that period."
      faq={faq}
      extraContent={
        <>
          <h2>Personal year number formula</h2>
          <p>Add the birth month, birth day, and target year. For example, August 17 in 2026 becomes 8 + 1 + 7 + 2 + 0 + 2 + 6 = 26, then 26 to 8.</p>
          <h2>Personal year meanings</h2>
          <p>Each year from 1 through 9 has a different focus. Read the matching meaning page after calculating your result.</p>
          <div className="not-prose mt-5 grid grid-cols-3 gap-3">
            {personalYearNumbers.map((number) => (
              <Link key={number} href={`/personal-year-${number}`} className="rounded-2xl border border-white/10 bg-night/70 p-4 text-center transition hover:border-gold hover:bg-white/10">
                <span className="block text-2xl font-black text-white">{number}</span>
                <span className="mt-1 block text-xs font-bold text-slate-400">Year</span>
              </Link>
            ))}
          </div>
        </>
      }
    >
      <SimpleDateCalculator type="personalYear" />
    </CalculatorShell>
  );
}
