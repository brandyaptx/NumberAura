export type Reading = {
  number: number;
  title: string;
  summary: string;
  strengths: string[];
  challenges: string[];
  advice: string;
};

export type Reduction = {
  number: number;
  steps: number[];
};

export type DigitBreakdown = {
  digits: number[];
  total: number;
  reduction: Reduction;
};

export type LetterBreakdown = {
  letters: Array<{
    letter: string;
    value: number;
    included: boolean;
  }>;
  total: number;
  reduction: Reduction;
};

export type NumerologySystem = 'pythagorean' | 'chaldean';

const readings: Record<number, Reading> = {
  1: {
    number: 1,
    title: 'The Initiator',
    summary: 'Number 1 represents independence, originality, leadership, and the courage to begin something new.',
    strengths: ['Self-starting energy', 'Confidence', 'Clear personal direction'],
    challenges: ['Impatience', 'Doing everything alone', 'Over-identifying with success'],
    advice: 'Use your drive to start, but let collaboration make your ideas stronger.'
  },
  2: {
    number: 2,
    title: 'The Harmonizer',
    summary: 'Number 2 represents sensitivity, partnership, patience, diplomacy, and emotional intelligence.',
    strengths: ['Cooperation', 'Listening skills', 'Emotional awareness'],
    challenges: ['Avoiding conflict', 'Overthinking others\' reactions', 'People-pleasing'],
    advice: 'Trust your intuition, but remember that healthy harmony includes honest boundaries.'
  },
  3: {
    number: 3,
    title: 'The Creative Voice',
    summary: 'Number 3 represents expression, humor, creativity, optimism, and social warmth.',
    strengths: ['Communication', 'Playfulness', 'Creative problem-solving'],
    challenges: ['Scattered focus', 'Avoiding deeper feelings', 'Starting more than finishing'],
    advice: 'Give your ideas structure so your creativity becomes something others can experience.'
  },
  4: {
    number: 4,
    title: 'The Builder',
    summary: 'Number 4 represents discipline, practicality, planning, reliability, and long-term foundations.',
    strengths: ['Consistency', 'Organization', 'Dependability'],
    challenges: ['Rigidity', 'Fear of change', 'Overworking'],
    advice: 'Build carefully, but leave enough flexibility for life to surprise you.'
  },
  5: {
    number: 5,
    title: 'The Explorer',
    summary: 'Number 5 represents freedom, variety, adaptability, curiosity, and movement.',
    strengths: ['Flexibility', 'Courage to experiment', 'Quick learning'],
    challenges: ['Restlessness', 'Avoiding commitment', 'Impulsive decisions'],
    advice: 'Use freedom as a path to growth, not as a way to avoid responsibility.'
  },
  6: {
    number: 6,
    title: 'The Nurturer',
    summary: 'Number 6 represents care, responsibility, beauty, family, service, and emotional support.',
    strengths: ['Compassion', 'Loyalty', 'Creating comfort'],
    challenges: ['Taking on too much', 'Trying to fix everyone', 'Perfectionism'],
    advice: 'Care deeply, but do not confuse love with carrying every burden yourself.'
  },
  7: {
    number: 7,
    title: 'The Seeker',
    summary: 'Number 7 represents reflection, research, spirituality, analysis, and private insight.',
    strengths: ['Depth', 'Observation', 'Independent thinking'],
    challenges: ['Isolation', 'Skepticism that blocks trust', 'Living too much in the head'],
    advice: 'Protect your quiet time, while also letting trusted people into your inner world.'
  },
  8: {
    number: 8,
    title: 'The Strategist',
    summary: 'Number 8 represents ambition, management, material mastery, resilience, and executive energy.',
    strengths: ['Leadership under pressure', 'Goal focus', 'Resource management'],
    challenges: ['Control issues', 'Measuring worth by results', 'Work-life imbalance'],
    advice: 'Aim high, but define success in a way that protects your health and relationships.'
  },
  9: {
    number: 9,
    title: 'The Humanitarian',
    summary: 'Number 9 represents compassion, wisdom, completion, generosity, and a broad view of life.',
    strengths: ['Empathy', 'Big-picture thinking', 'Emotional maturity'],
    challenges: ['Holding onto the past', 'Martyrdom', 'Difficulty receiving help'],
    advice: 'Let endings become teachers, not anchors.'
  },
  11: {
    number: 11,
    title: 'The Intuitive Messenger',
    summary: 'Master Number 11 represents heightened intuition, inspiration, sensitivity, and visionary communication.',
    strengths: ['Insight', 'Inspiration', 'Emotional and spiritual awareness'],
    challenges: ['Nervous intensity', 'Self-doubt', 'Feeling misunderstood'],
    advice: 'Ground your sensitivity in routines so inspiration can become steady guidance.'
  },
  22: {
    number: 22,
    title: 'The Master Builder',
    summary: 'Master Number 22 represents the ability to turn large visions into useful, lasting structures.',
    strengths: ['Practical vision', 'Long-range planning', 'Large-scale impact'],
    challenges: ['Pressure', 'Fear of your own ambition', 'Taking on too much'],
    advice: 'Choose one meaningful structure to build instead of scattering your powerful energy.'
  },
  33: {
    number: 33,
    title: 'The Compassionate Teacher',
    summary: 'Master Number 33 represents service, healing presence, emotional wisdom, and uplifting others.',
    strengths: ['Compassionate leadership', 'Teaching', 'Heart-centered influence'],
    challenges: ['Self-sacrifice', 'Emotional overload', 'Unrealistic standards'],
    advice: 'Serve from overflow, not exhaustion.'
  }
};

export function reduceNumberSteps(input: number, keepMasters = true): Reduction {
  let n = Math.abs(Math.trunc(input));
  const steps = [n];

  while (n > 9) {
    if (keepMasters && (n === 11 || n === 22 || n === 33)) {
      return { number: n, steps };
    }

    n = String(n).split('').reduce((sum, digit) => sum + Number(digit), 0);
    steps.push(n);
  }

  return { number: n, steps };
}

export function reduceNumber(input: number, keepMasters = true): number {
  return reduceNumberSteps(input, keepMasters).number;
}

export function digitBreakdown(value: string, keepMasters = true): DigitBreakdown {
  const digits = value.replace(/\D/g, '').split('').filter(Boolean).map(Number);
  const total = digits.reduce((sum, digit) => sum + digit, 0);

  return {
    digits,
    total,
    reduction: reduceNumberSteps(total, keepMasters)
  };
}

export function digitSum(value: string, keepMasters = true): number {
  return digitBreakdown(value, keepMasters).reduction.number;
}

const chaldeanValues: Record<string, number> = {
  A: 1,
  I: 1,
  J: 1,
  Q: 1,
  Y: 1,
  B: 2,
  K: 2,
  R: 2,
  C: 3,
  G: 3,
  L: 3,
  S: 3,
  D: 4,
  M: 4,
  T: 4,
  E: 5,
  H: 5,
  N: 5,
  X: 5,
  U: 6,
  V: 6,
  W: 6,
  O: 7,
  Z: 7,
  F: 8,
  P: 8
};

export function letterValue(char: string, system: NumerologySystem = 'pythagorean'): number {
  const code = char.toUpperCase().charCodeAt(0);
  if (code < 65 || code > 90) return 0;
  if (system === 'chaldean') return chaldeanValues[char.toUpperCase()] || 0;
  return ((code - 65) % 9) + 1;
}

function isIncludedLetter(letter: string, mode: 'all' | 'vowels' | 'consonants'): boolean {
  const vowels = new Set(['A', 'E', 'I', 'O', 'U']);
  const isVowel = vowels.has(letter);

  if (mode === 'vowels') return isVowel;
  if (mode === 'consonants') return !isVowel;
  return true;
}

export function letterBreakdown(
  name: string,
  mode: 'all' | 'vowels' | 'consonants' = 'all',
  system: NumerologySystem = 'pythagorean'
): LetterBreakdown {
  const letters = name.toUpperCase().replace(/[^A-Z]/g, '').split('').map((letter) => ({
    letter,
    value: letterValue(letter, system),
    included: isIncludedLetter(letter, mode)
  }));

  const total = letters.reduce((sum, item) => item.included ? sum + item.value : sum, 0);

  return {
    letters,
    total,
    reduction: reduceNumberSteps(total)
  };
}

export function nameNumber(
  name: string,
  mode: 'all' | 'vowels' | 'consonants' = 'all',
  system: NumerologySystem = 'pythagorean'
): number {
  return letterBreakdown(name, mode, system).reduction.number;
}

export function lifePathNumber(date: string): number {
  return digitSum(date);
}

export function personalYearNumber(month: number, day: number, year: number): number {
  return digitSum(`${month}${day}${year}`);
}

export function getReading(number: number): Reading {
  return readings[number] || readings[reduceNumber(number, false)] || readings[1];
}

export function compatibilityScore(a: number, b: number): number {
  const diff = Math.abs(reduceNumber(a, false) - reduceNumber(b, false));
  return Math.max(58, 96 - diff * 6);
}
