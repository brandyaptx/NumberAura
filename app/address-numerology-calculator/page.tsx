import type { Metadata } from 'next';
import { SimpleDateCalculator } from '@/components/DateCalculator';
import { CalculatorShell } from '@/components/SeoContent';

export const metadata: Metadata = {
  title: 'Address Numerology Calculator',
  description: 'Calculate the numerology number of a house, apartment, or street address for free.'
};

export default function Page() {
  return (
    <CalculatorShell eyebrow="Address tool" title="Address Numerology Calculator" keyword="address numerology calculator" path="/address-numerology-calculator" intro="Enter a house, apartment, or street address to find its symbolic numerology number and a quick reading.">
      <SimpleDateCalculator type="address" />
    </CalculatorShell>
  );
}
