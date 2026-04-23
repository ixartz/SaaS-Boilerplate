import { auth } from '@clerk/nextjs/server';
import Link from 'next/link';

import { TitleBar } from '@/features/dashboard/TitleBar';
import { AppConfig } from '@/utils/AppConfig';

function buildDemoApiKey(seedSource: string | null | undefined) {
  const seed = (seedSource ?? 'demo').replace(/[^a-z0-9]/gi, '').toLowerCase();
  const padded = (`${seed}xxxxxxxxxxxxxxxx`).slice(0, 16);
  return `strix_demo_sk_${padded}`;
}

const DashboardIndexPage = async () => {
  const session = await auth();
  const apiKey = buildDemoApiKey(session?.orgId ?? session?.userId);

  return (
    <>
      <TitleBar
        title="Welcome to Strix"
        description="Your agent-governance workspace."
      />

      <div className="space-y-6">
        <section className="rounded-xl border bg-card p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold">
                You're in. Let's ship a governed agent.
              </h2>
              <p className="mt-1 max-w-xl text-sm text-muted-foreground">
                Your demo workspace is provisioned. Jump into the live sandbox
                to watch an agent get intercepted, or copy the quickstart below
                into your own stack.
              </p>
            </div>
            <Link
              href="/strix-store/agent"
              className="shrink-0 rounded-md bg-foreground px-4 py-2 text-sm font-semibold text-background hover:opacity-90"
            >
              Open Agent Console →
            </Link>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <QuickstartCard apiKey={apiKey} />
          <NextStepsCard />
        </section>

        <section className="rounded-xl border bg-card p-6">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Example: governed tool call
          </h3>
          <pre className="mt-3 overflow-x-auto rounded-md bg-muted p-4 font-mono text-xs leading-relaxed text-foreground/80">
            {`import { governed } from '@strix/sdk';

const verdict = await governed({
  capabilityId: 'orders.refund.single',
  principal: { id: 'agent:support-1', kind: 'agent', role: 'agent', name: 'Support Agent' },
  args: { orderId: order.id, amountCents: 4900 },
  estimatedImpact: { dollarsCents: 4900, recordCount: 1 },
});

if (verdict.decision === 'allow') {
  await stripe.refunds.create({ payment_intent: order.piId, amount: 4900 });
} else {
  await notifyApprovers(verdict.receipt);
}`}
          </pre>
          <div className="mt-3 text-xs text-muted-foreground">
            Verdicts include a hash-chained receipt you can stream to S3, Datadog,
            or your transparency log of choice.
          </div>
        </section>
      </div>
    </>
  );
};

function QuickstartCard({ apiKey }: { apiKey: string }) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border bg-card p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Demo API key
        </h3>
        <span className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-300">
          sandbox
        </span>
      </div>
      <code className="block overflow-x-auto rounded-md bg-muted px-3 py-2 font-mono text-xs">
        {apiKey}
      </code>
      <p className="text-xs text-muted-foreground">
        This key only works against the local sandbox. Production keys are
        issued after a short onboarding call — we want to get your policies
        right before you ship traffic.
      </p>
      <Link
        href="/strix-store"
        className="mt-1 inline-flex w-fit rounded-md border px-3 py-1.5 text-sm font-medium hover:bg-muted"
      >
        Try it in the sandbox
      </Link>
    </div>
  );
}

function NextStepsCard() {
  const steps = [
    { label: 'Run the live intercept demo', href: '/strix-store/agent' },
    { label: 'Inspect proof receipts', href: '/strix-store/receipts' },
    { label: 'Review the policy engine source', href: AppConfig.githubUrl },
    { label: 'Book a 20-minute walkthrough', href: `mailto:${AppConfig.contactEmail}` },
  ];
  return (
    <div className="flex flex-col gap-2 rounded-xl border bg-card p-6">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
        Next steps
      </h3>
      <ul className="mt-2 divide-y">
        {steps.map((s, i) => {
          const external = s.href.startsWith('http') || s.href.startsWith('mailto');
          return (
            <li key={s.label} className="py-2">
              <Link
                href={s.href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noopener noreferrer' : undefined}
                className="group flex items-center justify-between text-sm"
              >
                <span>
                  <span className="mr-2 inline-block w-5 text-muted-foreground">
                    {i + 1}
                    .
                  </span>
                  {s.label}
                </span>
                <span className="text-muted-foreground transition-colors group-hover:text-foreground">
                  →
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export const dynamic = 'force-dynamic';

export default DashboardIndexPage;
