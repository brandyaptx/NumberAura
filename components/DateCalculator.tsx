'use client';

import { useState } from 'react';
import { digitSum, getReading, lifePathNumber, nameNumber, personalYearNumber } from '@/lib/numerology';
import { ResultCard } from '@/components/ResultCard';

export function SimpleDateCalculator({ type }: { type: 'life' | 'wedding' | 'personalYear' | 'address' | 'word' }) {
  const [date, setDate] = useState('1992-08-17');
  const [year, setYear] = useState(new Date().getFullYear());
  const [text, setText] = useState(type === 'address' ? '1288 Maple Street' : 'Aurora');

  let number = 1;
  let label = 'Your number';

  if (type === 'life') {
    number = lifePathNumber(date);
    label = 'Life path number';
  }
  if (type === 'wedding') {
    number = digitSum(date);
    label = 'Wedding date number';
  }
  if (type === 'personalYear') {
    const [month, day] = date.split('-').slice(1).map(Number);
    number = personalYearNumber(month || 1, day || 1, year);
    label = 'Personal year number';
  }
  if (type === 'address') {
    number = digitSum(text);
    label = 'Address number';
  }
  if (type === 'word') {
    number = nameNumber(text, 'all');
    label = 'Word number';
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 rounded-3xl border border-white/10 bg-white/10 p-6 md:grid-cols-2">
        {(type === 'life' || type === 'wedding' || type === 'personalYear') && (
          <label className="text-sm font-bold text-white">Date
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="mt-3 w-full rounded-2xl border border-white/10 bg-night px-4 py-4 text-white outline-none focus:border-gold" />
          </label>
        )}
        {type === 'personalYear' && (
          <label className="text-sm font-bold text-white">Year
            <input type="number" value={year} onChange={(e) => setYear(Number(e.target.value))} className="mt-3 w-full rounded-2xl border border-white/10 bg-night px-4 py-4 text-white outline-none focus:border-gold" />
          </label>
        )}
        {(type === 'address' || type === 'word') && (
          <label className="text-sm font-bold text-white">Text
            <input value={text} onChange={(e) => setText(e.target.value)} className="mt-3 w-full rounded-2xl border border-white/10 bg-night px-4 py-4 text-white outline-none focus:border-gold" />
          </label>
        )}
      </div>
      <ResultCard label={label} reading={getReading(number)} />
    </div>
  );
}
