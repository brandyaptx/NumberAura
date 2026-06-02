'use client';

import type { FormEvent } from 'react';
import { useState } from 'react';
import {
  digitBreakdown,
  getReading,
  letterBreakdown,
  type DigitBreakdown,
  type LetterBreakdown
} from '@/lib/numerology';
import { ResultCard } from '@/components/ResultCard';

type CalculatorType = 'life' | 'birthday' | 'wedding' | 'personalYear' | 'address' | 'word';

type CalculatorResult = {
  label: string;
  number: number;
  details: {
    title: string;
    lines: string[];
    note?: string;
  };
};

const examples: Record<CalculatorType, { date: string; year: string; text: string }> = {
  life: { date: '1992-08-17', year: String(new Date().getFullYear()), text: '' },
  birthday: { date: '1992-08-17', year: String(new Date().getFullYear()), text: '' },
  wedding: { date: '2026-10-24', year: String(new Date().getFullYear()), text: '' },
  personalYear: { date: '1992-08-17', year: String(new Date().getFullYear()), text: '' },
  address: { date: '', year: String(new Date().getFullYear()), text: '1288 Maple Street' },
  word: { date: '', year: String(new Date().getFullYear()), text: 'Aurora' }
};

function formatDigitValues(breakdown: DigitBreakdown): string {
  return breakdown.digits.length ? breakdown.digits.join(' + ') : 'No digits found';
}

function formatDigitReduction(breakdown: DigitBreakdown): string {
  const steps = breakdown.reduction.steps;

  if (steps.length <= 1) {
    return `${breakdown.total}`;
  }

  return steps.join(' -> ');
}

function formatLetterValues(breakdown: LetterBreakdown): string {
  const values = breakdown.letters
    .filter((item) => item.included)
    .map((item) => `${item.letter}=${item.value}`);

  return values.length ? values.join(' + ') : 'No letters found';
}

function formatLetterReduction(breakdown: LetterBreakdown): string {
  const steps = breakdown.reduction.steps;

  if (steps.length <= 1) {
    return `${breakdown.total}`;
  }

  return steps.join(' -> ');
}

function dateParts(date: string): { month: number; day: number } | null {
  const parts = date.split('-').map(Number);

  if (parts.length !== 3 || parts.some((part) => !Number.isFinite(part))) {
    return null;
  }

  return {
    month: parts[1],
    day: parts[2]
  };
}

function buildDigitResult(label: string, title: string, source: string, note: string): CalculatorResult {
  const breakdown = digitBreakdown(source);

  return {
    label,
    number: breakdown.reduction.number,
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

export function SimpleDateCalculator({ type }: { type: CalculatorType }) {
  const defaultExample = examples[type];
  const [date, setDate] = useState('');
  const [year, setYear] = useState(defaultExample.year);
  const [text, setText] = useState('');
  const [result, setResult] = useState<CalculatorResult | null>(null);
  const [error, setError] = useState('');

  function calculate(nextDate = date, nextYear = year, nextText = text) {
    if (type === 'life') {
      if (!nextDate) {
        setError('Choose a birth date to calculate a life path number.');
        setResult(null);
        return;
      }

      setError('');
      setResult(buildDigitResult(
        'Life path number',
        'How this life path number is calculated',
        nextDate,
        'Life path numbers reduce every digit in the full birth date.'
      ));
      return;
    }

    if (type === 'wedding') {
      if (!nextDate) {
        setError('Choose a wedding date to calculate its number.');
        setResult(null);
        return;
      }

      setError('');
      setResult(buildDigitResult(
        'Wedding date number',
        'How this wedding date number is calculated',
        nextDate,
        'Wedding date numbers reduce every digit in the selected date.'
      ));
      return;
    }

    if (type === 'birthday') {
      const parsedDate = dateParts(nextDate);

      if (!parsedDate) {
        setError('Choose a birth date to calculate a birthday number.');
        setResult(null);
        return;
      }

      setError('');
      setResult(buildDigitResult(
        'Birthday number',
        'How this birthday number is calculated',
        String(parsedDate.day),
        'Birthday numbers use the day of the month from the birth date, then reduce it to a single digit or master number.'
      ));
      return;
    }

    if (type === 'personalYear') {
      const parsedDate = dateParts(nextDate);
      const targetYear = Number(nextYear);

      if (!parsedDate) {
        setError('Choose your birthday to calculate a personal year number.');
        setResult(null);
        return;
      }

      if (!Number.isInteger(targetYear) || targetYear < 1000 || targetYear > 9999) {
        setError('Enter a four-digit target year.');
        setResult(null);
        return;
      }

      const source = `${parsedDate.month}${parsedDate.day}${targetYear}`;

      setError('');
      setResult(buildDigitResult(
        'Personal year number',
        'How this personal year number is calculated',
        source,
        `Personal year numbers combine birth month ${parsedDate.month}, birth day ${parsedDate.day}, and target year ${targetYear}.`
      ));
      return;
    }

    if (type === 'address') {
      const trimmedText = nextText.trim();

      if (!/\d/.test(trimmedText)) {
        setError('Enter an address with at least one number, such as a street or apartment number.');
        setResult(null);
        return;
      }

      setError('');
      setResult(buildDigitResult(
        'Address number',
        'How this address number is calculated',
        trimmedText,
        'Address numbers use the visible digits in the street, house, unit, or apartment number.'
      ));
      return;
    }

    const trimmedText = nextText.trim();

    if (!/[A-Za-z]/.test(trimmedText)) {
      setError('Enter at least one letter to calculate a word number.');
      setResult(null);
      return;
    }

    const breakdown = letterBreakdown(trimmedText, 'all');

    setError('');
    setResult({
      label: 'Word number',
      number: breakdown.reduction.number,
      details: {
        title: 'How this word number is calculated',
        lines: [
          `Letters used: ${formatLetterValues(breakdown)}`,
          `Raw total: ${breakdown.total}`,
          `Reduced result: ${formatLetterReduction(breakdown)}`
        ],
        note: 'Word numbers use the Pythagorean A=1 through I=9 letter cycle.'
      }
    });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    calculate();
  }

  function useExample() {
    const example = examples[type];

    setDate(example.date);
    setYear(example.year);
    setText(example.text);
    calculate(example.date, example.year, example.text);
  }

  function clearCalculator() {
    setDate('');
    setYear(defaultExample.year);
    setText('');
    setError('');
    setResult(null);
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="grid gap-4 rounded-3xl border border-white/10 bg-white/10 p-6 md:grid-cols-2">
        {(type === 'life' || type === 'birthday' || type === 'wedding' || type === 'personalYear') && (
          <label className="text-sm font-bold text-white">Date
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="mt-3 w-full rounded-2xl border border-white/10 bg-night px-4 py-4 text-white outline-none focus:border-gold" />
          </label>
        )}
        {type === 'personalYear' && (
          <label className="text-sm font-bold text-white">Target year
            <input type="number" value={year} onChange={(e) => setYear(e.target.value)} min="1000" max="9999" className="mt-3 w-full rounded-2xl border border-white/10 bg-night px-4 py-4 text-white outline-none focus:border-gold" />
          </label>
        )}
        {type === 'address' && (
          <label className="text-sm font-bold text-white md:col-span-2">Address
            <input value={text} onChange={(e) => setText(e.target.value)} className="mt-3 w-full rounded-2xl border border-white/10 bg-night px-4 py-4 text-white outline-none focus:border-gold" placeholder="Example: 1288 Maple Street Apt 4B" />
          </label>
        )}
        {type === 'word' && (
          <label className="text-sm font-bold text-white md:col-span-2">Word or phrase
            <input value={text} onChange={(e) => setText(e.target.value)} className="mt-3 w-full rounded-2xl border border-white/10 bg-night px-4 py-4 text-white outline-none focus:border-gold" placeholder="Example: Aurora" />
          </label>
        )}
        {error && <p className="text-sm font-semibold text-rose-300 md:col-span-2" role="alert">{error}</p>}
        <div className="flex flex-wrap gap-3 md:col-span-2">
          <button type="submit" className="rounded-2xl bg-gold px-5 py-3 font-black text-night transition hover:bg-white">
            Calculate
          </button>
          <button type="button" onClick={useExample} className="rounded-2xl border border-white/10 px-5 py-3 font-bold text-white transition hover:border-gold">
            Use example
          </button>
          <button type="button" onClick={clearCalculator} className="rounded-2xl border border-white/10 px-5 py-3 font-bold text-slate-300 transition hover:border-white/30">
            Clear
          </button>
        </div>
      </form>
      {!result && (
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-slate-300">
          Enter the requested value, then choose Calculate to generate a number and reading.
        </div>
      )}
      {result && (
        <ResultCard
          label={result.label}
          reading={getReading(result.number)}
          details={result.details}
        />
      )}
    </div>
  );
}
