import type { Metadata } from 'next';
import Link from 'next/link';
import { JsonLd, breadcrumbJsonLd, faqJsonLd, howToJsonLd } from '@/components/StructuredData';
import { baseUrl } from '@/lib/number-content';

const path = '/how-to-calculate-numerology';

const faq = [
  {
    question: 'How do I calculate my numerology number?',
    answer: 'Choose the number you want to calculate. A life path number uses the full birth date, an expression number uses every letter in a name, a soul urge number uses vowels, and a personality number uses consonants.'
  },
  {
    question: 'What is the easiest numerology number to start with?',
    answer: 'Start with the life path number because it only needs a date of birth and is usually treated as the broadest numerology theme.'
  },
  {
    question: 'Do master numbers always reduce?',
    answer: 'Many modern numerology readings keep 11, 22, and 33 as master numbers instead of reducing them to 2, 4, and 6.'
  }
];

export const metadata: Metadata = {
  title: 'How to Calculate Numerology Numbers',
  description: 'Learn how to calculate numerology numbers from a name and birth date, including life path, expression, soul urge, personality, birthday, and personal year numbers.',
  alternates: {
    canonical: path
  }
};

export default function Page() {
  const pageUrl = `${baseUrl}${path}`;

  return (
    <main className="px-4 py-14">
      <JsonLd data={breadcrumbJsonLd([
        { name: 'NumberAura', url: baseUrl },
        { name: 'How to Calculate Numerology Numbers', url: pageUrl }
      ])} />
      <JsonLd data={faqJsonLd(faq)} />
      <JsonLd data={howToJsonLd({
        name: 'How to calculate numerology numbers',
        description: 'A practical guide to calculating the most common numerology numbers from a name and birth date.',
        steps: [
          'Write down the full birth date for date-based numbers or the full name for name-based numbers.',
          'Convert each digit or letter into its numerology value.',
          'Add the values together to get a raw total.',
          'Reduce the total by adding its digits until you reach a single digit or a master number.',
          'Read the meaning of the final number and compare it with the other core numbers.'
        ]
      })} />

      <div className="mx-auto max-w-4xl">
        <p className="text-sm font-bold uppercase tracking-[0.35em] text-gold">Numerology guide</p>
        <h1 className="mt-4 text-4xl font-black tracking-tight text-white md:text-6xl">How to Calculate Numerology Numbers</h1>
        <p className="mt-5 text-xl leading-9 text-slate-200">
          Numerology calculations reduce a name or birth date into a symbolic number. The most useful report combines date numbers and name numbers so you can compare the broad life theme, personal style, motivation, and yearly cycle.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/numerology-calculator" className="rounded-2xl bg-gold px-5 py-3 font-black text-night transition hover:bg-white">
            Use the full calculator
          </Link>
          <Link href="/life-path-number-calculator" className="rounded-2xl border border-white/10 px-5 py-3 font-bold text-white transition hover:border-gold">
            Calculate life path
          </Link>
        </div>

        <article className="prose-lite mt-12 rounded-3xl border border-white/10 bg-white/5 p-8">
          <h2>The basic reduction method</h2>
          <p>Add the digits or letter values together, then reduce the total. For example, 37 becomes 3 + 7 = 10, then 1 + 0 = 1. If the total is 11, 22, or 33, many numerology readings keep it as a master number.</p>

          <h2>How to calculate a life path number</h2>
          <p>Use every digit in the full date of birth. A birthday of August 17, 1992 becomes 1 + 9 + 9 + 2 + 0 + 8 + 1 + 7 = 37, then 37 to 10 to 1. Read the full guide on <Link href="/how-to-calculate-life-path-number">how to calculate a life path number</Link>.</p>

          <h2>How to calculate name numerology</h2>
          <p>Convert each letter in the full name into a number. NumberAura supports the Pythagorean system by default and also lets you compare Chaldean values in the <Link href="/name-numerology-calculator">name numerology calculator</Link>.</p>

          <h2>Core numerology numbers</h2>
          <p><strong>Expression number:</strong> every letter in the full name. <strong>Soul urge number:</strong> vowels only. <strong>Personality number:</strong> consonants only. <strong>Birthday number:</strong> the day of the month. <strong>Personal year number:</strong> birth month, birth day, and target year.</p>

          <h2>Read the meanings</h2>
          <p>After calculating a number, compare it with the meaning pages. Start with <Link href="/life-path-number-1">life path number 1</Link>, <Link href="/life-path-number-11">life path number 11</Link>, or <Link href="/personal-year-1">personal year 1</Link> and follow the internal links from there.</p>

          <h2>FAQ</h2>
          {faq.map((item) => (
            <div key={item.question}>
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </div>
          ))}
        </article>
      </div>
    </main>
  );
}
