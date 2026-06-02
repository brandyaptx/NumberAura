'use client';

import Link from 'next/link';
import type { FormEvent } from 'react';
import { useState } from 'react';
import {
  digitBreakdown,
  getReading,
  letterBreakdown,
  type DigitBreakdown,
  type LetterBreakdown,
  type Reading
} from '@/lib/numerology';
import { ResultCard } from '@/components/ResultCard';

type FullReportResult = {
  label: string;
  number: number;
  reading: Reading;
  href?: string;
  details: {
    title: string;
    lines: string[];
    note?: string;
  };
};

function formatDigitValues(breakdown: DigitBreakdown): string {
  return breakdown.digits.length ? breakdown.digits.join(' + ') : 'No digits found';
}

function formatDigitReduction(breakdown: DigitBreakdown): string {
  const steps = breakdown.reduction.steps;
  return steps.length <= 1 ? `${breakdown.total}` : steps.join(' -> ');
}

function formatLetterValues(breakdown: LetterBreakdown): string {
  const values = breakdown.letters
    .filter((item) => item.included)
    .map((item) => `${item.letter}=${item.value}`);

  return values.length ? values.join(' + ') : 'No matching letters';
}

function formatLetterReduction(breakdown: LetterBreakdown): string {
  const steps = breakdown.reduction.steps;
  return steps.length <= 1 ? `${breakdown.total}` : steps.join(' -> ');
}

function parseDate(date: string): { month: number; day: number; year: number } | null {
  const [year, month, day] = date.split('-').map(Number);

  if (![year, month, day].every((part) => Number.isFinite(part))) {
    return null;
  }

  return { month, day, year };
}

function digitResult(label: string, title: string, source: string, note: string, href?: string): FullReportResult {
  const breakdown = digitBreakdown(source);
  const number = breakdown.reduction.number;

  return {
    label,
    number,
    reading: getReading(number),
    href,
    details: {
      title,
      lines: [
        `Digits used: ${formatDigitValues(breakdown)}`,
        `Raw total: ${breakdown.total}`,
        `Reduced result: ${formatDigitReduction(breakdown)}`
      ],
      note
    }
  };
}

function letterResult(label: string, title: string, breakdown: LetterBreakdown, note: string): FullReportResult {
  const number = breakdown.reduction.number;

  return {
    label,
    number,
    reading: getReading(number),
    details: {
      title,
      lines: [
        `Letters used: ${formatLetterValues(breakdown)}`,
        `Raw total: ${breakdown.total}`,
        `Reduced result: ${formatLetterReduction(breakdown)}`
      ],
      note
    }
  };
}

export function FullReportCalculator() {
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [targetYear, setTargetYear] = useState(String(new Date().getFullYear()));
  const [results, setResults] = useState<FullReportResult[]>([]);
  const [error, setError] = useState('');

  function calculate(nextName = name, nextBirthDate = birthDate, nextTargetYear = targetYear) {
    const trimmedName = nextName.trim();
    const parsedDate = parseDate(nextBirthDate);
    const year = Number(nextTargetYear);

    if (!/[A-Za-z]/.test(trimmedName)) {
      setError('Enter at least one letter in the name.');
      setResults([]);
      return;
    }

    if (!parsedDate) {
      setError('Choose a valid birth date.');
      setResults([]);
      return;
    }

    if (!Number.isInteger(year) || year < 1000 || year > 9999) {
      setError('Enter a four-digit target year.');
      setResults([]);
      return;
    }

    const lifePath = digitResult(
      'Life path number',
      'How your life path number is calculated',
      nextBirthDate,
      'Life path numbers reduce every digit in the full birth date.',
      undefined
    );
    lifePath.href = `/life-path-number-${lifePath.number}`;

    const birthday = digitResult(
      'Birthday number',
      'How your birthday number is calculated',
      String(parsedDate.day),
      'Birthday numbers use the day of the month from the birth date.'
    );

    const expression = letterResult(
      'Expression number',
      'How your expression number is calculated',
      letterBreakdown(trimmedName, 'all'),
      'Expression numbers use every letter in the full name.'
    );

    const soul = letterResult(
      'Soul urge number',
      'How your soul urge number is calculated',
      letterBreakdown(trimmedName, 'vowels'),
      'Soul urge numbers use vowels only.'
    );

    const personality = letterResult(
      'Personality number',
      'How your personality number is calculated',
      letterBreakdown(trimmedName, 'consonants'),
      'Personality numbers use consonants only.'
    );

    const personalYear = digitResult(
      'Personal year number',
      'How your personal year number is calculated',
      `${parsedDate.month}${parsedDate.day}${year}`,
      `Personal year numbers combine birth month ${parsedDate.month}, birth day ${parsedDate.day}, and target year ${year}.`
    );
    personalYear.href = `/personal-year-${personalYear.number}`;

    setError('');
    setResults([lifePath, birthday, expression, soul, personality, personalYear]);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    calculate();
  }

  function useExample() {
    const exampleName = 'Taylor Morgan';
    const exampleBirthDate = '1992-08-17';
    const exampleYear = String(new Date().getFullYear());

    setName(exampleName);
    setBirthDate(exampleBirthDate);
    setTargetYear(exampleYear);
    calculate(exampleName, exampleBirthDate, exampleYear);
  }

  function clearCalculator() {
    setName('');
    setBirthDate('');
    setTargetYear(String(new Date().getFullYear()));
    setError('');
    setResults([]);
  }

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="grid gap-4 rounded-3xl border border-white/10 bg-white/10 p-6 md:grid-cols-3">
        <label className="text-sm font-bold text-white md:col-span-3">Full name
          <input value={name} onChange={(event) => setName(event.target.value)} className="mt-3 w-full rounded-2xl border border-white/10 bg-night px-4 py-4 text-white outline-none focus:border-gold" placeholder="Example: Taylor Morgan" />
        </label>
        <label className="text-sm font-bold text-white md:col-span-2">Birth date
          <input type="date" value={birthDate} onChange={(event) => setBirthDate(event.target.value)} className="mt-3 w-full rounded-2xl border border-white/10 bg-night px-4 py-4 text-white outline-none focus:border-gold" />
        </label>
        <label className="text-sm font-bold text-white">Target year
          <input type="number" value={targetYear} onChange={(event) => setTargetYear(event.target.value)} min="1000" max="9999" className="mt-3 w-full rounded-2xl border border-white/10 bg-night px-4 py-4 text-white outline-none focus:border-gold" />
        </label>
        {error && <p className="text-sm font-semibold text-rose-300 md:col-span-3" role="alert">{error}</p>}
        <div className="flex flex-wrap gap-3 md:col-span-3">
          <button type="submit" className="rounded-2xl bg-gold px-5 py-3 font-black text-night transition hover:bg-white">
            Calculate full report
          </button>
          <button type="button" onClick={useExample} className="rounded-2xl border border-white/10 px-5 py-3 font-bold text-white transition hover:border-gold">
            Use example
          </button>
          <button type="button" onClick={clearCalculator} className="rounded-2xl border border-white/10 px-5 py-3 font-bold text-slate-300 transition hover:border-white/30">
            Clear
          </button>
        </div>
      </form>

      {!results.length && (
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-slate-300">
          Enter a full name, birth date, and target year to generate a complete numerology report.
        </div>
      )}

      {results.length > 0 && (
        <>
          <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-2xl font-black text-white">Report Summary</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((result) => (
                <div key={result.label} className="rounded-2xl bg-night/70 p-4">
                  <p className="text-sm font-bold text-slate-400">{result.label}</p>
                  <p className="mt-2 text-3xl font-black text-white">{result.number}</p>
                  <p className="mt-1 text-sm text-gold">{result.reading.title}</p>
                  {result.href && (
                    <Link href={result.href} className="mt-3 inline-block text-sm font-bold text-white hover:text-gold">
                      Read meaning
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </section>

          <div className="grid gap-6">
            {results.map((result) => (
              <ResultCard
                key={result.label}
                label={result.label}
                reading={result.reading}
                details={result.details}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
