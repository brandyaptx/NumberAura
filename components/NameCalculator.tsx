'use client';

import type { FormEvent } from 'react';
import { useState } from 'react';
import { getReading, letterBreakdown, type LetterBreakdown, type NumerologySystem } from '@/lib/numerology';
import { ResultCard } from '@/components/ResultCard';

type NameResult = {
  name: string;
  system: NumerologySystem;
  expression: LetterBreakdown;
  soul: LetterBreakdown;
  personality: LetterBreakdown;
};

const systemLabels: Record<NumerologySystem, string> = {
  pythagorean: 'Pythagorean',
  chaldean: 'Chaldean'
};

function formatValues(breakdown: LetterBreakdown): string {
  const values = breakdown.letters
    .filter((item) => item.included)
    .map((item) => `${item.letter}=${item.value}`);

  return values.length ? values.join(' + ') : 'No matching letters';
}

function formatReduction(breakdown: LetterBreakdown): string {
  const steps = breakdown.reduction.steps;

  if (steps.length <= 1) {
    return `${breakdown.total}`;
  }

  return steps.join(' -> ');
}

function buildResult(name: string, system: NumerologySystem): NameResult {
  return {
    name,
    system,
    expression: letterBreakdown(name, 'all', system),
    soul: letterBreakdown(name, 'vowels', system),
    personality: letterBreakdown(name, 'consonants', system)
  };
}

export function NameCalculator() {
  const [name, setName] = useState('');
  const [system, setSystem] = useState<NumerologySystem>('pythagorean');
  const [result, setResult] = useState<NameResult | null>(null);
  const [error, setError] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedName = name.trim();

    if (!/[A-Za-z]/.test(trimmedName)) {
      setError('Enter at least one letter to calculate a name number.');
      setResult(null);
      return;
    }

    setError('');
    setResult(buildResult(trimmedName, system));
  }

  function useExample() {
    const exampleName = 'Taylor Morgan';

    setName(exampleName);
    setError('');
    setResult(buildResult(exampleName, system));
  }

  function changeSystem(nextSystem: NumerologySystem) {
    setSystem(nextSystem);
    if (result) {
      setResult(buildResult(result.name, nextSystem));
    }
  }

  function clearCalculator() {
    setName('');
    setError('');
    setResult(null);
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="rounded-3xl border border-white/10 bg-white/10 p-6">
        <label className="text-sm font-bold text-white" htmlFor="name">Full name</label>
        <input id="name" value={name} onChange={(e) => setName(e.target.value)} className="mt-3 w-full rounded-2xl border border-white/10 bg-night px-4 py-4 text-white outline-none focus:border-gold" placeholder="Enter a full name" />
        <fieldset className="mt-5">
          <legend className="text-sm font-bold text-white">Numerology system</legend>
          <div className="mt-3 flex flex-wrap gap-3">
            {(['pythagorean', 'chaldean'] as NumerologySystem[]).map((option) => (
              <label
                key={option}
                className={`cursor-pointer rounded-2xl border px-4 py-3 text-sm font-bold transition ${
                  system === option
                    ? 'border-gold bg-gold text-night'
                    : 'border-white/10 text-slate-200 hover:border-gold'
                }`}
              >
                <input
                  type="radio"
                  name="numerology-system"
                  value={option}
                  checked={system === option}
                  onChange={() => changeSystem(option)}
                  className="sr-only"
                />
                {systemLabels[option]}
              </label>
            ))}
          </div>
        </fieldset>
        {error && <p className="mt-3 text-sm font-semibold text-rose-300" role="alert">{error}</p>}
        <div className="mt-5 flex flex-wrap gap-3">
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
          Enter a full name, choose Pythagorean or Chaldean, then calculate expression, soul urge, and personality readings.
        </div>
      )}
      {result && (
        <div className="grid gap-6">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-slate-300">
            System used: <span className="font-bold text-white">{systemLabels[result.system]}</span>. Switch systems above to compare how the same name changes.
          </div>
          <ResultCard
            label="Expression number"
            reading={getReading(result.expression.reduction.number)}
            details={{
              title: `How "${result.name}" becomes an expression number`,
              lines: [
                `Letters used: ${formatValues(result.expression)}`,
                `Raw total: ${result.expression.total}`,
                `Reduced result: ${formatReduction(result.expression)}`
              ],
              note: `Expression numbers use every letter in the name with the ${systemLabels[result.system]} letter mapping.`
            }}
          />
          <ResultCard
            label="Soul urge number"
            reading={getReading(result.soul.reduction.number)}
            details={{
              title: 'How the soul urge number is calculated',
              lines: [
                `Vowels used: ${formatValues(result.soul)}`,
                `Raw total: ${result.soul.total}`,
                `Reduced result: ${formatReduction(result.soul)}`
              ],
              note: `Soul urge numbers use the vowels A, E, I, O, and U with the ${systemLabels[result.system]} letter mapping.`
            }}
          />
          <ResultCard
            label="Personality number"
            reading={getReading(result.personality.reduction.number)}
            details={{
              title: 'How the personality number is calculated',
              lines: [
                `Consonants used: ${formatValues(result.personality)}`,
                `Raw total: ${result.personality.total}`,
                `Reduced result: ${formatReduction(result.personality)}`
              ],
              note: `Personality numbers use consonants only with the ${systemLabels[result.system]} letter mapping.`
            }}
          />
        </div>
      )}
    </div>
  );
}
