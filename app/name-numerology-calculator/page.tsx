import type { Metadata } from 'next';
import Link from 'next/link';
import { NameCalculator } from '@/components/NameCalculator';
import { CalculatorShell } from '@/components/SeoContent';

export const metadata: Metadata = {
  title: 'Name Numerology Calculator: Pythagorean & Chaldean',
  description: 'Calculate name numerology numbers with Pythagorean or Chaldean letter values, including expression, soul urge, and personality numbers.',
  alternates: {
    canonical: '/name-numerology-calculator'
  }
};

const faq = [
  {
    question: 'What does a name numerology calculator do?',
    answer: 'It converts letters in a name into numbers, then reduces the total into expression, soul urge, and personality numbers.'
  },
  {
    question: 'What is the difference between Pythagorean and Chaldean numerology?',
    answer: 'Pythagorean numerology uses a repeating 1 to 9 alphabet sequence. Chaldean numerology uses a different traditional mapping and does not assign 9 to letters.'
  },
  {
    question: 'Should I use my full birth name or current name?',
    answer: 'Many people compare both. The full birth name is often used for a baseline reading, while a current name can show the name energy you use now.'
  }
];

export default function Page() {
  return (
    <CalculatorShell
      eyebrow="Name tool"
      title="Free Name Numerology Calculator"
      keyword="name numerology calculator"
      path="/name-numerology-calculator"
      intro="Enter a full name to calculate expression, soul urge, and personality numbers, then compare Pythagorean and Chaldean letter mappings."
      faq={faq}
      extraContent={
        <>
          <h2>What name numbers are calculated?</h2>
          <p>The expression number uses every letter in the name. The soul urge number uses vowels only. The personality number uses consonants only. Together, these three readings make a compact name numerology profile.</p>
          <h2>Pythagorean vs Chaldean</h2>
          <p>Pythagorean numerology is common for simple online calculators because letters repeat through 1 to 9. Chaldean numerology uses a different letter table and often gives a different final number. Use both systems as comparison tools rather than treating one as a guaranteed answer.</p>
          <h2>Next steps</h2>
          <p>For a complete report, combine this name reading with the <Link href="/numerology-calculator">full numerology calculator</Link>. To learn the date-based side, read <Link href="/how-to-calculate-life-path-number">how to calculate a life path number</Link>.</p>
        </>
      }
    >
      <NameCalculator />
    </CalculatorShell>
  );
}
