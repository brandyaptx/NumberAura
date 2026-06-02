import { Disclaimer } from '@/components/Disclaimer';
import { JsonLd, breadcrumbJsonLd, faqJsonLd } from '@/components/StructuredData';
import { baseUrl } from '@/lib/number-content';

type FaqItem = {
  question: string;
  answer: string;
};

const defaultFaq: FaqItem[] = [
  {
    question: 'Is this calculator free?',
    answer: 'Yes. The current version is free and does not require an account.'
  },
  {
    question: 'Which numerology system is used?',
    answer: 'Most name and word tools use a simple Pythagorean letter mapping, and the name calculator can compare Chaldean values. Date and address tools use digit reduction, with common master numbers preserved in many readings.'
  },
  {
    question: 'Can I use this for serious decisions?',
    answer: 'Use the reading as a creative reflection prompt. It should not replace your own judgment, research, or professional guidance.'
  }
];

export function CalculatorShell({
  eyebrow,
  title,
  intro,
  children,
  keyword,
  path,
  faq = defaultFaq,
  extraContent
}: {
  eyebrow: string;
  title: string;
  intro: string;
  keyword: string;
  children: React.ReactNode;
  path?: string;
  faq?: FaqItem[];
  extraContent?: React.ReactNode;
}) {
  const pageUrl = path ? `${baseUrl}${path}` : baseUrl;

  return (
    <main className="px-4 py-14">
      <JsonLd data={breadcrumbJsonLd([
        { name: 'NumberAura', url: baseUrl },
        { name: title, url: pageUrl }
      ])} />
      <JsonLd data={faqJsonLd(faq)} />
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-bold uppercase tracking-[0.35em] text-gold">{eyebrow}</p>
        <h1 className="mt-4 text-4xl font-black tracking-tight text-white md:text-6xl">{title}</h1>
        <p className="mt-5 max-w-3xl text-xl leading-9 text-slate-200">{intro}</p>
        <div className="mt-8"><Disclaimer /></div>
        <div className="mt-10">{children}</div>
        <article className="prose-lite mt-14 rounded-3xl border border-white/10 bg-white/5 p-8">
          <h2>How to use this {keyword}</h2>
          <p>Enter the requested name, date, address, or word. The calculator reduces the input into a symbolic number and then displays a short reading with the calculation steps. You can try several variations and compare how the result changes.</p>
          <h2>What the result means</h2>
          <p>Each number is connected with a general theme. For example, 1 often points to independence, 2 to cooperation, 3 to expression, 4 to structure, 5 to freedom, 6 to care, 7 to reflection, 8 to ambition, and 9 to completion.</p>
          {extraContent}
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
