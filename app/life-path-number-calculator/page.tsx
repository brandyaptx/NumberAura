import type { Metadata } from 'next';
import Link from 'next/link';
import { SimpleDateCalculator } from '@/components/DateCalculator';
import { CalculatorShell } from '@/components/SeoContent';
import { lifePathNumbers } from '@/lib/number-content';

export const metadata: Metadata = {
  title: 'Life Path Number Calculator',
  description: 'Calculate your life path number from a date of birth, see the reduction steps, and read life path number meanings from 1 to 9 plus 11, 22, and 33.',
  alternates: {
    canonical: '/life-path-number-calculator'
  }
};

const faq = [
  {
    question: 'How do I calculate my life path number?',
    answer: 'Add every digit in the full date of birth, then reduce the total to a single digit or master number.'
  },
  {
    question: 'What are life path master numbers?',
    answer: 'Master numbers are 11, 22, and 33. Many modern numerology readings keep them instead of reducing them to 2, 4, and 6.'
  },
  {
    question: 'Is the life path number different from the birthday number?',
    answer: 'Yes. The life path number uses the full birth date. The birthday number uses only the day of the month.'
  }
];

export default function Page() {
  return (
    <CalculatorShell
      eyebrow="Date tool"
      title="Life Path Number Calculator"
      keyword="life path number calculator"
      path="/life-path-number-calculator"
      intro="Enter a date of birth to calculate a life path number, see the digit reduction, and read a clear numerology meaning."
      faq={faq}
      extraContent={
        <>
          <h2>Life path number formula</h2>
          <p>Use every digit in the full date of birth. For example, August 17, 1992 becomes 1 + 9 + 9 + 2 + 0 + 8 + 1 + 7 = 37, then 37 to 10 to 1.</p>
          <p>Read the complete manual guide here: <Link href="/how-to-calculate-life-path-number">how to calculate life path number</Link>.</p>
          <h2>Life path number meanings</h2>
          <p>After calculating your result, open the matching meaning page for strengths, challenges, and a practical reflection prompt.</p>
          <div className="not-prose mt-5 grid grid-cols-3 gap-3 sm:grid-cols-4">
            {lifePathNumbers.map((number) => (
              <Link key={number} href={`/life-path-number-${number}`} className="rounded-2xl border border-white/10 bg-night/70 p-4 text-center transition hover:border-gold hover:bg-white/10">
                <span className="block text-2xl font-black text-white">{number}</span>
                <span className="mt-1 block text-xs font-bold text-slate-400">Meaning</span>
              </Link>
            ))}
          </div>
        </>
      }
    >
      <SimpleDateCalculator type="life" />
    </CalculatorShell>
  );
}
