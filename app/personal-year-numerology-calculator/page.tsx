import type { Metadata } from 'next';
import { SimpleDateCalculator } from '@/components/DateCalculator';
import { CalculatorShell } from '@/components/SeoContent';

export const metadata: Metadata = {
  title: 'Personal Year Numerology Calculator',
  description: 'Calculate a personal year number from a birthday and a selected year.'
};

export default function Page() {
  return (
    <CalculatorShell eyebrow="Year tool" title="Personal Year Numerology Calculator" keyword="personal year numerology calculator" path="/personal-year-numerology-calculator" intro="Enter a birthday and a year to calculate a personal year number and read the theme for that period.">
      <SimpleDateCalculator type="personalYear" />
    </CalculatorShell>
  );
}
