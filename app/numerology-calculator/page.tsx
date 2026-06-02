import type { Metadata } from 'next';
import { FullReportCalculator } from '@/components/FullReportCalculator';
import { CalculatorShell } from '@/components/SeoContent';

export const metadata: Metadata = {
  title: 'Free Numerology Calculator',
  description: 'Calculate a free numerology report with life path, birthday, expression, soul urge, personality, and personal year numbers.'
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
  }
];

export default function Page() {
  return (
    <CalculatorShell
      eyebrow="Full report"
      title="Free Numerology Calculator"
      keyword="free numerology calculator"
      path="/numerology-calculator"
      intro="Enter a name, birth date, and target year to generate a complete numerology report with six core numbers and step-by-step calculations."
      faq={faq}
    >
      <FullReportCalculator />
    </CalculatorShell>
  );
}
