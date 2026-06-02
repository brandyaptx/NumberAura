import type { Metadata } from 'next';
import Link from 'next/link';
import { FullReportCalculator } from '@/components/FullReportCalculator';
import { CalculatorShell } from '@/components/SeoContent';

export const metadata: Metadata = {
  title: 'Numerology Calculator: Free Name & Date Report',
  description: 'Use a free numerology calculator to calculate life path, birthday, expression, soul urge, personality, and personal year numbers from a name and birth date.',
  alternates: {
    canonical: '/numerology-calculator'
  }
};

const faq = [
  {
    question: 'What does this numerology calculator include?',
    answer: 'It calculates life path, birthday, expression, soul urge, personality, and personal year numbers from a name, birth date, and target year.'
  },
  {
    question: 'Do I need my full birth time?',
    answer: 'No. These numerology calculations use a name and birth date. They do not require a birth time or birth place.'
  },
  {
    question: 'Which number should I read first?',
    answer: 'Start with the life path number for the broadest theme, then compare it with the expression and personal year numbers.'
  },
  {
    question: 'How do I calculate my numerology number?',
    answer: 'Life path uses every digit in the birth date. Expression uses every letter in the full name. Soul urge uses vowels, personality uses consonants, birthday uses the day of birth, and personal year uses birth month, birth day, and a target year.'
  },
  {
    question: 'Does this calculator include master numbers?',
    answer: 'Yes. The calculator preserves 11, 22, and 33 as master numbers when they appear in a reduction.'
  }
];

export default function Page() {
  return (
    <CalculatorShell
      eyebrow="Full report"
      title="Free Numerology Calculator"
      keyword="free numerology calculator"
      path="/numerology-calculator"
      intro="Enter a name, birth date, and target year to generate a complete numerology report with six core numbers, meanings, and step-by-step calculations."
      faq={faq}
      extraContent={
        <>
          <h2>What this numerology calculator checks</h2>
          <p>This full report combines the most searched numerology calculations in one place: life path number, birthday number, expression number, soul urge number, personality number, and personal year number.</p>
          <h3>Life path and birthday numbers</h3>
          <p>The <Link href="/life-path-number-calculator">life path number calculator</Link> uses the full birth date. The <Link href="/birthday-number-calculator">birthday number calculator</Link> uses only the day of the month, which makes it a supporting number rather than the main life path theme.</p>
          <h3>Name numerology numbers</h3>
          <p>The expression, soul urge, and personality numbers are name-based. If you want to compare letter systems, use the <Link href="/name-numerology-calculator">name numerology calculator</Link>, which now supports both Pythagorean and Chaldean mappings.</p>
          <h3>Personal year number</h3>
          <p>The personal year number combines birth month, birth day, and a target year. It is useful when someone searches for yearly themes such as career focus, relationship tone, or timing for a new start.</p>
          <h2>How to calculate numerology numbers</h2>
          <p>For a manual walkthrough, read <Link href="/how-to-calculate-numerology">how to calculate numerology numbers</Link>. For the most common date formula, read <Link href="/how-to-calculate-life-path-number">how to calculate a life path number</Link>.</p>
        </>
      }
    >
      <FullReportCalculator />
    </CalculatorShell>
  );
}
