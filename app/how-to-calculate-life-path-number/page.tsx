import type { Metadata } from 'next';
import Link from 'next/link';
import { JsonLd, breadcrumbJsonLd, faqJsonLd, howToJsonLd } from '@/components/StructuredData';
import { baseUrl, lifePathNumbers } from '@/lib/number-content';

const path = '/how-to-calculate-life-path-number';

const faq = [
  {
    question: 'How do you calculate a life path number in numerology?',
    answer: 'Add every digit in the full date of birth, then reduce the total to a single digit or master number.'
  },
  {
    question: 'Do I use the month name or month number?',
    answer: 'Use the month number. For example, August is 8 and November is 11.'
  },
  {
    question: 'Is life path number the same as birthday number?',
    answer: 'No. The life path number uses the full birth date, while the birthday number uses only the day of the month.'
  }
];

export const metadata: Metadata = {
  title: 'How to Calculate Life Path Number',
  description: 'Learn how to calculate a life path number from a date of birth, with examples, master number notes, and links to life path number meanings.',
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
        { name: 'How to Calculate Life Path Number', url: pageUrl }
      ])} />
      <JsonLd data={faqJsonLd(faq)} />
      <JsonLd data={howToJsonLd({
        name: 'How to calculate a life path number',
        description: 'Calculate a life path number from the digits in a full birth date.',
        steps: [
          'Write the birth date in numeric form.',
          'Add every digit in the date together.',
          'If the total is 11, 22, or 33, keep it as a master number.',
          'Otherwise, add the digits in the total until one digit remains.',
          'Read the life path number meaning and compare it with the birthday number.'
        ]
      })} />

      <div className="mx-auto max-w-4xl">
        <p className="text-sm font-bold uppercase tracking-[0.35em] text-gold">Life path guide</p>
        <h1 className="mt-4 text-4xl font-black tracking-tight text-white md:text-6xl">How to Calculate Life Path Number</h1>
        <p className="mt-5 text-xl leading-9 text-slate-200">
          A life path number is calculated from the full date of birth. It is usually the first number to read because it gives the broadest numerology theme.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/life-path-number-calculator" className="rounded-2xl bg-gold px-5 py-3 font-black text-night transition hover:bg-white">
            Use life path calculator
          </Link>
          <Link href="/birthday-number-calculator" className="rounded-2xl border border-white/10 px-5 py-3 font-bold text-white transition hover:border-gold">
            Compare birthday number
          </Link>
        </div>

        <article className="prose-lite mt-12 rounded-3xl border border-white/10 bg-white/5 p-8">
          <h2>Life path number formula</h2>
          <p>Write the date of birth in digits, add every digit, then reduce. For August 17, 1992, the digits are 1 + 9 + 9 + 2 + 0 + 8 + 1 + 7. The raw total is 37, and 37 reduces to 10, then 1.</p>

          <h2>Master numbers</h2>
          <p>If the reduced total lands on 11, 22, or 33, many numerology systems keep that number instead of reducing again. NumberAura keeps those master numbers in life path readings.</p>

          <h2>Common mistakes</h2>
          <p>Do not use only the birth day for life path. That is the birthday number. Do not skip the year. The life path calculation needs the full date because the month, day, and year all contribute to the final number.</p>

          <h2>Life path number meanings</h2>
          <p>After you calculate your result, read the matching meaning page. Each page explains strengths, challenges, and a practical reflection prompt.</p>
          <div className="not-prose mt-5 grid grid-cols-3 gap-3 sm:grid-cols-4">
            {lifePathNumbers.map((number) => (
              <Link key={number} href={`/life-path-number-${number}`} className="rounded-2xl border border-white/10 bg-night/70 p-4 text-center transition hover:border-gold hover:bg-white/10">
                <span className="block text-2xl font-black text-white">{number}</span>
                <span className="mt-1 block text-xs font-bold text-slate-400">Meaning</span>
              </Link>
            ))}
          </div>

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
