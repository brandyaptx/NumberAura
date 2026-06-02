import type { Reading } from '@/lib/numerology';

type ResultDetails = {
  title: string;
  lines: string[];
  note?: string;
};

export function ResultCard({
  label,
  reading,
  details
}: {
  label: string;
  reading: Reading;
  details?: ResultDetails;
}) {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/10 p-6 shadow-2xl shadow-plum/20">
      <p className="text-sm uppercase tracking-[0.3em] text-gold">{label}</p>
      <div className="mt-3 flex items-end gap-4">
        <div className="text-6xl font-black text-white">{reading.number}</div>
        <div className="pb-2 text-2xl font-bold text-white">{reading.title}</div>
      </div>
      <p className="mt-4 text-lg leading-8 text-slate-200">{reading.summary}</p>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div>
          <h3 className="font-bold text-white">Highlights</h3>
          <ul className="mt-2 space-y-2 text-slate-300">
            {reading.strengths.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-white">Watch-outs</h3>
          <ul className="mt-2 space-y-2 text-slate-300">
            {reading.challenges.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
      </div>
      <p className="mt-5 rounded-2xl bg-night/60 p-4 text-slate-200">{reading.advice}</p>
      {details && (
        <div className="mt-6 border-t border-white/10 pt-5">
          <h3 className="font-bold text-white">{details.title}</h3>
          <ol className="mt-3 space-y-2 text-sm leading-6 text-slate-300">
            {details.lines.map((line, index) => (
              <li key={`${line}-${index}`}>{line}</li>
            ))}
          </ol>
          {details.note && <p className="mt-3 text-sm text-slate-400">{details.note}</p>}
        </div>
      )}
    </section>
  );
}
