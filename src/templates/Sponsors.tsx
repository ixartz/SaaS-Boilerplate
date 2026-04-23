import { Section } from '@/features/landing/Section';

const STATS = [
  { label: 'Agent frameworks integrated', value: '7+' },
  { label: 'Capabilities in the demo', value: '9' },
  { label: 'Avg. policy eval latency', value: '<1 ms' },
  { label: 'Receipt fields per decision', value: '14' },
];

export const Sponsors = () => (
  <Section className="py-8">
    <div className="grid grid-cols-2 gap-4 rounded-2xl border bg-card/40 px-6 py-8 text-center sm:grid-cols-4">
      {STATS.map(s => (
        <div key={s.label} className="flex flex-col items-center gap-1">
          <div className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {s.value}
          </div>
          <div className="text-xs uppercase tracking-wider text-muted-foreground">
            {s.label}
          </div>
        </div>
      ))}
    </div>
  </Section>
);
