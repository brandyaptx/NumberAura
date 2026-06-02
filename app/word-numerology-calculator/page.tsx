import type { Metadata } from 'next';
import { SimpleDateCalculator } from '@/components/DateCalculator';
import { CalculatorShell } from '@/components/SeoContent';

export const metadata: Metadata = {
  title: 'Word Numerology Calculator',
  description: 'Calculate the numerology number of a word, brand name, project name, or idea.'
};

export default function Page() {
  return (
    <CalculatorShell eyebrow="Word tool" title="Word Numerology Calculator" keyword="word numerology calculator" intro="Enter a word, brand name, project name, or idea to calculate its symbolic numerology number.">
      <SimpleDateCalculator type="word" />
    </CalculatorShell>
  );
}
