import type { Metadata } from 'next';
import { NameCalculator } from '@/components/NameCalculator';
import { CalculatorShell } from '@/components/SeoContent';

export const metadata: Metadata = {
  title: 'Free Name Numerology Calculator',
  description: 'Calculate your name numerology number, expression number, soul urge number, and personality number for free.'
};

export default function Page() {
  return (
    <CalculatorShell eyebrow="Name tool" title="Free Name Numerology Calculator" keyword="name numerology calculator" path="/name-numerology-calculator" intro="Enter a full name to calculate expression, soul urge, and personality numbers using a simple Pythagorean numerology method.">
      <NameCalculator />
    </CalculatorShell>
  );
}
