import Link from 'next/link';

export const DemoBadge = () => (
  <div className="fixed bottom-4 right-4 z-10 hidden sm:block">
    <Link
      href="/strix-store"
      className="group flex items-center gap-2 rounded-full border border-emerald-500/30 bg-black/80 px-3 py-2 text-xs font-semibold text-white shadow-lg backdrop-blur transition-colors hover:border-emerald-400/60"
    >
      <span className="inline-block size-1.5 animate-pulse rounded-full bg-emerald-400" />
      <span className="text-white/60">Live demo</span>
      <span className="text-white group-hover:text-emerald-300">
        Strix Store →
      </span>
    </Link>
  </div>
);
