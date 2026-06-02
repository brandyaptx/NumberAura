import type { Metadata } from 'next';
import { SimpleDateCalculator } from '@/components/DateCalculator';
import { CalculatorShell } from '@/components/SeoContent';

export const metadata: Metadata = {
  title: 'Life Path Number Calculator',
  description: 'Calculate a life path number from a date with a free numerology tool.'
};

export default function Page() {
  return (
    <CalculatorShell eyebrow="Date tool" title="Life Path Number Calculator" keyword="life path number calculator" intro="Enter a date to calculate a life path number and read a simple numerology meaning.">
      <SimpleDateCalculator type="life" />
    </CalculatorShell>
  );
}
