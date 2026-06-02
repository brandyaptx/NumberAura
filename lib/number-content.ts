import { getReading } from '@/lib/numerology';

export const baseUrl = 'https://numberaura.vercel.app';

export const lifePathNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22, 33] as const;
export const personalYearNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const;

export type NumberPageKind = 'lifePath' | 'personalYear';

export type NumberMeaningPage = {
  slug: string;
  kind: NumberPageKind;
  number: number;
  title: string;
  description: string;
  eyebrow: string;
  intro: string;
  calculatorHref: string;
  calculatorLabel: string;
  sections: Array<{
    heading: string;
    body: string;
  }>;
};

function lifePathPage(number: number): NumberMeaningPage {
  const reading = getReading(number);
  const titleTheme = reading.title.replace(/^The /, '').toLowerCase();

  return {
    slug: `life-path-number-${number}`,
    kind: 'lifePath',
    number,
    title: `Life Path Number ${number} Meaning`,
    description: `Read the meaning of life path number ${number}, including strengths, challenges, and a simple way to calculate it from a birth date.`,
    eyebrow: 'Life path meaning',
    intro: `Life path number ${number} carries ${titleTheme} energy. ${reading.summary}`,
    calculatorHref: '/life-path-number-calculator',
    calculatorLabel: 'Life Path Number Calculator',
    sections: [
      {
        heading: `What Life Path Number ${number} Means`,
        body: reading.summary
      },
      {
        heading: 'Strengths',
        body: `${reading.strengths.join(', ')} are common strengths connected with this number. These traits are best used with self-awareness instead of pressure to fit a fixed personality type.`
      },
      {
        heading: 'Growth Areas',
        body: `${reading.challenges.join(', ')} can show where this number needs balance. The goal is not to avoid the number's energy, but to use it with clearer timing and boundaries.`
      },
      {
        heading: 'How To Calculate It',
        body: 'Add every digit in the full birth date, then reduce the total until you reach a single digit or a master number such as 11, 22, or 33.'
      }
    ]
  };
}

function personalYearPage(number: number): NumberMeaningPage {
  const reading = getReading(number);
  const titleTheme = reading.title.replace(/^The /, '').toLowerCase();

  return {
    slug: `personal-year-${number}`,
    kind: 'personalYear',
    number,
    title: `Personal Year ${number} Meaning`,
    description: `Read the meaning of personal year ${number}, including its yearly theme, opportunities, watch-outs, and how to calculate it.`,
    eyebrow: 'Personal year meaning',
    intro: `Personal year ${number} brings a ${titleTheme} theme into the calendar cycle. ${reading.summary}`,
    calculatorHref: '/personal-year-numerology-calculator',
    calculatorLabel: 'Personal Year Numerology Calculator',
    sections: [
      {
        heading: `What Personal Year ${number} Means`,
        body: `In a personal year ${number}, the ${reading.summary.toLowerCase()}`
      },
      {
        heading: 'Best Uses For The Year',
        body: `${reading.strengths.join(', ')} are useful themes to lean into during this cycle. Treat the number as a planning prompt rather than a prediction.`
      },
      {
        heading: 'Watch-Outs',
        body: `${reading.challenges.join(', ')} can become more visible when this yearly energy is out of balance. Slower choices usually make the reading more useful.`
      },
      {
        heading: 'How To Calculate It',
        body: 'Add the digits from your birth month, birth day, and the target year. Reduce the total to a single digit for the personal year number.'
      }
    ]
  };
}

export const numberMeaningPages: NumberMeaningPage[] = [
  ...lifePathNumbers.map((number) => lifePathPage(number)),
  ...personalYearNumbers.map((number) => personalYearPage(number))
];

export function getNumberMeaningPage(slug: string): NumberMeaningPage | undefined {
  return numberMeaningPages.find((page) => page.slug === slug);
}
