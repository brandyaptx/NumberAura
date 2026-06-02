import Link from 'next/link';

export function ToolCard({ title, description, href }: { title: string; description: string; href: string }) {
  return (
    <Link href={href} className="group rounded-3xl border border-white/10 bg-white/10 p-6 transition hover:-translate-y-1 hover:border-gold/70 hover:bg-white/15">
      <h3 className="text-xl font-black text-white group-hover:text-gold">{title}</h3>
      <p className="mt-3 leading-7 text-slate-300">{description}</p>
      <p className="mt-5 text-sm font-bold text-gold">Open calculator</p>
    </Link>
  );
}
