import { Disclaimer } from '@/components/Disclaimer';

export function CalculatorShell({
  eyebrow,
  title,
  intro,
  children,
  keyword
}: {
  eyebrow: string;
  title: string;
  intro: string;
  keyword: string;
  children: React.ReactNode;
}) {
  return (
    <main className="px-4 py-14">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-bold uppercase tracking-[0.35em] text-gold">{eyebrow}</p>
        <h1 className="mt-4 text-4xl font-black tracking-tight text-white md:text-6xl">{title}</h1>
        <p className="mt-5 max-w-3xl text-xl leading-9 text-slate-200">{intro}</p>
        <div className="mt-8"><Disclaimer /></div>
        <div className="mt-10">{children}</div>
        <article className="prose-lite mt-14 rounded-3xl border border-white/10 bg-white/5 p-8">
          <h2>How to use this {keyword}</h2>
          <p>Enter the requested name, date, address, or word. The calculator reduces the input into a symbolic number and then displays a short reading. You can try several variations and compare how the result changes.</p>
          <h2>What the result means</h2>
          <p>Each number is connected with a general theme. For example, 1 often points to independence, 2 to cooperation, 3 to expression, 4 to structure, 5 to freedom, 6 to care, 7 to reflection, 8 to ambition, and 9 to completion.</p>
          <h2>FAQ</h2>
          <h3>Is this calculator free?</h3>
          <p>Yes. The current version is free and does not require an account.</p>
          <h3>Which numerology system is used?</h3>
          <p>The name tools use a simple Pythagorean letter mapping. Date and address tools use digit reduction, with common master numbers preserved in many readings.</p>
          <h3>Can I use this for serious decisions?</h3>
          <p>Use the reading as a creative reflection prompt. It should not replace your own judgment, research, or professional guidance.</p>
        </article>
      </div>
    </main>
  );
}
