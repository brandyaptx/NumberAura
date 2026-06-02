import type { Metadata } from 'next';
import Link from 'next/link';
import { SimpleDateCalculator } from '@/components/DateCalculator';
import { CalculatorShell } from '@/components/SeoContent';

export const metadata: Metadata = {
  title: 'Birthday Number Calculator',
  description: 'Calculate your birthday number from your birth day, see the reduction steps, and compare it with your life path number.',
  alternates: {
    canonical: '/birthday-number-calculator'
  }
};

const faq = [
  {
    question: 'What is a birthday number in numerology?',
    answer: 'A birthday number is calculated from the day of the month you were born. It is often read as a supporting influence alongside the life path number.'
  },
  {
    question: 'How do I calculate my birthday number?',
    answer: 'Use the day from your birth date, then reduce it to a single digit or master number. For example, the 17th becomes 1 + 7 = 8.'
  },
  {
    question: 'Is the birthday number the same as the life path number?',
    answer: 'No. The life path number uses the full birth date, while the birthday number uses only the day of the month.'
  }
];

export default function Page() {
  return (
    <CalculatorShell
      eyebrow="Birthday tool"
      title="Birthday Number Calculator"
      keyword="birthday number calculator"
      path="/birthday-number-calculator"
      intro="Enter a birth date to calculate the birthday number from the day of the month and read a quick numerology meaning."
      faq={faq}
      extraContent={
        <>
          <h2>Birthday number vs life path number</h2>
          <p>The birthday number is calculated from the day of birth only. The life path number uses the full date of birth, so it is usually treated as the larger theme. Use the <Link href="/life-path-number-calculator">life path number calculator</Link> to compare both.</p>
          <h2>How to calculate it manually</h2>
          <p>If you were born on the 17th, add 1 + 7 to get 8. If you were born on the 11th or 22nd, many numerology readings keep those as master numbers.</p>
        </>
      }
    >
      <SimpleDateCalculator type="birthday" />
    </CalculatorShell>
  );
}
