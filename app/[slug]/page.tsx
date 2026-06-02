import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { JsonLd, breadcrumbJsonLd } from '@/components/StructuredData';
import {
  baseUrl,
  getNumberMeaningPage,
  lifePathNumbers,
  numberMeaningPages,
  personalYearNumbers
} from '@/lib/number-content';
import { getReading } from '@/lib/numerology';

export function generateStaticParams() {
  return numberMeaningPages.map((page) => ({ slug: page.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const page = getNumberMeaningPage(params.slug);

  if (!page) {
    return {};
  }

  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: `/${page.slug}`
    }
  };
}

function relatedNumbers(kind: 'lifePath' | 'personalYear') {
  const numbers = kind === 'lifePath' ? lifePathNumbers : personalYearNumbers;
  const prefix = kind === 'lifePath' ? 'Life Path' : 'Personal Year';
  const slugPrefix = kind === 'lifePath' ? 'life-path-number' : 'personal-year';

  return numbers.map((number) => ({
    number,
    label: `${prefix} ${number}`,
    href: `/${slugPrefix}-${number}`
  }));
}

export default function NumberMeaningPage({ params }: { params: { slug: string } }) {
  const page = getNumberMeaningPage(params.slug);

  if (!page) {
    notFound();
  }

  const reading = getReading(page.number);
  const related = relatedNumbers(page.kind);

  return (
    <main className="px-4 py-14">
      <JsonLd data={breadcrumbJsonLd([
        { name: 'NumberAura', url: baseUrl },
        { name: page.calculatorLabel, url: `${baseUrl}${page.calculatorHref}` },
        { name: page.title, url: `${baseUrl}/${page.slug}` }
      ])} />
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-bold uppercase tracking-[0.35em] text-gold">{page.eyebrow}</p>
        <h1 className="mt-4 text-4xl font-black tracking-tight text-white md:text-6xl">{page.title}</h1>
        <p className="mt-5 max-w-3xl text-xl leading-9 text-slate-200">{page.intro}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href={page.calculatorHref} className="rounded-2xl bg-gold px-5 py-3 font-black text-night transition hover:bg-white">
            Use the {page.calculatorLabel}
          </Link>
          <Link href="/numerology-calculator" className="rounded-2xl border border-white/10 px-5 py-3 font-bold text-white transition hover:border-gold">
            Get a full report
          </Link>
        </div>

        <section className="mt-10 rounded-3xl border border-white/10 bg-white/10 p-6">
          <p className="text-sm uppercase tracking-[0.3em] text-gold">Number {page.number}</p>
          <div className="mt-3 flex items-end gap-4">
            <div className="text-6xl font-black text-white">{page.number}</div>
            <div className="pb-2 text-2xl font-bold text-white">{reading.title}</div>
          </div>
          <p className="mt-4 text-lg leading-8 text-slate-200">{reading.summary}</p>
        </section>

        <article className="prose-lite mt-10 rounded-3xl border border-white/10 bg-white/5 p-8">
          {page.sections.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              <p>{section.body}</p>
            </section>
          ))}

          <h2>Quick Advice</h2>
          <p>{reading.advice}</p>
        </article>

        <section className="mt-10">
          <h2 className="text-2xl font-black text-white">
            {page.kind === 'lifePath' ? 'Explore Life Path Numbers' : 'Explore Personal Year Numbers'}
          </h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <Link key={item.href} href={item.href} className="rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-gold hover:bg-white/10">
                <span className="text-sm font-bold text-slate-400">{item.label}</span>
                <span className="mt-2 block text-3xl font-black text-white">{item.number}</span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
