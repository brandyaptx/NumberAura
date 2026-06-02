import type { Metadata } from 'next';
import { SimpleDateCalculator } from '@/components/DateCalculator';
import { CalculatorShell } from '@/components/SeoContent';

export const metadata: Metadata = {
  title: 'Wedding Date Numerology Calculator',
  description: 'Calculate the numerology number of a wedding date and read a symbolic relationship theme.'
};

export default function Page() {
  return (
    <CalculatorShell eyebrow="Wedding tool" title="Wedding Date Numerology Calculator" keyword="wedding date numerology calculator" path="/wedding-date-numerology-calculator" intro="Choose a wedding date and see the symbolic number theme connected with that date.">
      <SimpleDateCalculator type="wedding" />
    </CalculatorShell>
  );
}
