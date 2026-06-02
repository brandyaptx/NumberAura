'use client';

import { useState } from 'react';
import { getReading, nameNumber } from '@/lib/numerology';
import { ResultCard } from '@/components/ResultCard';

export function NameCalculator() {
  const [name, setName] = useState('Taylor Morgan');
  const expression = getReading(nameNumber(name, 'all'));
  const soul = getReading(nameNumber(name, 'vowels'));
  const personality = getReading(nameNumber(name, 'consonants'));

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-white/10 bg-white/10 p-6">
        <label className="text-sm font-bold text-white" htmlFor="name">Full name</label>
        <input id="name" value={name} onChange={(e) => setName(e.target.value)} className="mt-3 w-full rounded-2xl border border-white/10 bg-night px-4 py-4 text-white outline-none focus:border-gold" placeholder="Enter a full name" />
      </div>
      {name.trim() && (
        <div className="grid gap-6">
          <ResultCard label="Expression number" reading={expression} />
          <ResultCard label="Soul urge number" reading={soul} />
          <ResultCard label="Personality number" reading={personality} />
        </div>
      )}
    </div>
  );
}
