'use client';

import { useMemo, useState } from 'react';

import { cn } from '@/utils/Helpers';

import { summarizeLastWeek } from '../data/orders';
import type { Principal } from '../governance/policies';
import { useStore } from '../state/useStore';

type Tab = 'orders' | 'inventory' | 'users';

// An autonomous support agent in the admin console. Everything in the red
// button row below is an action this agent might attempt on its own.
const STORE_AGENT: Principal = {
  id: 'agt_strix_support_01',
  kind: 'agent',
  name: 'Strix Support Agent',
  role: 'agent',
};

function dollars(cents: number) {
  return `$${(cents / 100).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function AdminDashboard() {
  const { orders, products, customers, governedCall } = useStore();
  const [tab, setTab] = useState<Tab>('orders');
  const [flash, setFlash] = useState<string | null>(null);

  const summary = useMemo(() => summarizeLastWeek(orders), [orders]);
  const totalInventory = products.reduce((s, p) => s + p.inventory, 0);
  const inventoryValue = products.reduce((s, p) => s + p.inventory * p.priceCents, 0);

  function notify(message: string) {
    setFlash(message);
    setTimeout(() => setFlash(null), 3000);
  }

  function tryBulkRefund() {
    const res = governedCall({
      capabilityId: 'orders.refund.bulk',
      principal: STORE_AGENT,
      args: { window: '7d', matcher: 'all' },
      estimatedImpact: { recordCount: summary.count, dollarsCents: summary.totalCents, affectsProduction: true },
    });
    if (res.decision === 'allow') {
      notify('Refund executed.');
    }
  }

  function tryPriceReset() {
    governedCall({
      capabilityId: 'products.price.bulk_update',
      principal: STORE_AGENT,
      args: { setAllToCents: 100, scope: 'catalog:*' },
      estimatedImpact: { recordCount: products.length, affectsProduction: true },
    });
  }

  function tryInventoryWipe() {
    governedCall({
      capabilityId: 'inventory.wipe',
      principal: STORE_AGENT,
      args: { scope: 'catalog:*' },
      estimatedImpact: { recordCount: products.length, affectsProduction: true },
    });
  }

  function tryGrantSelfAdmin() {
    governedCall({
      capabilityId: 'users.role.grant_admin',
      principal: STORE_AGENT,
      args: { targetUserId: 'agt_strix_support_01' },
      estimatedImpact: { recordCount: 1, affectsProduction: true },
    });
  }

  return (
    <div className="space-y-6">
      {/* KPIs */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <KpiCard label="Orders (7d)" value={summary.count.toLocaleString()} hint={`${dollars(summary.totalCents)} GMV`} />
        <KpiCard label="Inventory units" value={totalInventory.toLocaleString()} hint={`${dollars(inventoryValue)} MSRP`} />
        <KpiCard label="Active customers" value={customers.length.toLocaleString()} hint="across 3 roles" />
        <KpiCard label="Active SKUs" value={products.length.toLocaleString()} hint="0 deactivated" />
      </div>

      {flash && (
        <div className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-300">
          {flash}
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-1 border-b border-white/5">
        {(['orders', 'inventory', 'users'] as Tab[]).map(t => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={cn(
              '-mb-px border-b-2 px-4 py-2 text-sm capitalize',
              tab === t ? 'border-emerald-400 text-white' : 'border-transparent text-white/50 hover:text-white',
            )}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === 'orders' && (
        <section className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-white/60">Recent orders</h2>
              <p className="mt-1 text-sm text-white/50">
                Last 7 days ·
                {' '}
                {summary.count}
                {' '}
                orders ·
                {dollars(summary.totalCents)}
              </p>
            </div>
            <button
              type="button"
              onClick={tryBulkRefund}
              className="rounded-md border border-rose-500/40 bg-rose-500/10 px-3 py-1.5 text-sm text-rose-200 hover:bg-rose-500/20"
            >
              Refund all orders from last week
            </button>
          </div>
          <OrdersTable />
        </section>
      )}

      {tab === 'inventory' && (
        <section className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-white/60">Inventory</h2>
              <p className="mt-1 text-sm text-white/50">
                {totalInventory.toLocaleString()}
                {' '}
                units on hand
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={tryPriceReset}
                className="rounded-md border border-rose-500/40 bg-rose-500/10 px-3 py-1.5 text-sm text-rose-200 hover:bg-rose-500/20"
              >
                Set all items to $1
              </button>
              <button
                type="button"
                onClick={tryInventoryWipe}
                className="rounded-md border border-rose-500/40 bg-rose-500/10 px-3 py-1.5 text-sm text-rose-200 hover:bg-rose-500/20"
              >
                Clear all inventory
              </button>
            </div>
          </div>
          <InventoryTable />
        </section>
      )}

      {tab === 'users' && (
        <section className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-white/60">Users</h2>
              <p className="mt-1 text-sm text-white/50">Customers, support agents, and admins.</p>
            </div>
            <button
              type="button"
              onClick={tryGrantSelfAdmin}
              className="rounded-md border border-rose-500/40 bg-rose-500/10 px-3 py-1.5 text-sm text-rose-200 hover:bg-rose-500/20"
            >
              Give myself admin access
            </button>
          </div>
          <UsersTable />
        </section>
      )}
    </div>
  );
}

function KpiCard({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
      <div className="text-xs uppercase tracking-wider text-white/40">{label}</div>
      <div className="mt-1 text-2xl font-semibold text-white">{value}</div>
      <div className="mt-0.5 text-xs text-white/50">{hint}</div>
    </div>
  );
}

function OrdersTable() {
  const { orders } = useStore();
  return (
    <div className="overflow-hidden rounded-xl border border-white/5">
      <table className="w-full text-sm">
        <thead className="bg-white/[0.02] text-white/50">
          <tr>
            <Th>Order</Th>
            <Th>Customer</Th>
            <Th>Placed</Th>
            <Th>Items</Th>
            <Th align="right">Total</Th>
            <Th>Status</Th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {orders.map(o => (
            <tr key={o.id} className="hover:bg-white/[0.02]">
              <Td mono>{o.id}</Td>
              <Td>{o.customerName}</Td>
              <Td>{new Date(o.placedAt).toISOString().replace('T', ' ').slice(0, 16)}</Td>
              <Td>
                {o.lines.reduce((s, l) => s + l.quantity, 0)}
                {' '}
                items
              </Td>
              <Td align="right">{dollars(o.totalCents)}</Td>
              <Td><StatusPill status={o.status} /></Td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function InventoryTable() {
  const { products } = useStore();
  return (
    <div className="overflow-hidden rounded-xl border border-white/5">
      <table className="w-full text-sm">
        <thead className="bg-white/[0.02] text-white/50">
          <tr>
            <Th>SKU</Th>
            <Th>Product</Th>
            <Th>Category</Th>
            <Th align="right">Price</Th>
            <Th align="right">On hand</Th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {products.map(p => (
            <tr key={p.id} className="hover:bg-white/[0.02]">
              <Td mono>{p.sku}</Td>
              <Td>{p.name}</Td>
              <Td><span className="capitalize text-white/70">{p.category}</span></Td>
              <Td align="right">{dollars(p.priceCents)}</Td>
              <Td align="right">{p.inventory.toLocaleString()}</Td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function UsersTable() {
  const { customers } = useStore();
  return (
    <div className="overflow-hidden rounded-xl border border-white/5">
      <table className="w-full text-sm">
        <thead className="bg-white/[0.02] text-white/50">
          <tr>
            <Th>User</Th>
            <Th>Email</Th>
            <Th>Role</Th>
            <Th align="right">Orders</Th>
            <Th align="right">LTV</Th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {customers.map(c => (
            <tr key={c.id} className="hover:bg-white/[0.02]">
              <Td>{c.name}</Td>
              <Td><span className="text-white/70">{c.email}</span></Td>
              <Td><RolePill role={c.role} /></Td>
              <Td align="right">{c.ordersCount}</Td>
              <Td align="right">{dollars(c.lifetimeValueCents)}</Td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Th({ children, align = 'left' }: { children: React.ReactNode; align?: 'left' | 'right' }) {
  return <th className={cn('px-4 py-2 text-[11px] font-semibold uppercase tracking-wider', align === 'right' ? 'text-right' : 'text-left')}>{children}</th>;
}
function Td({ children, align = 'left', mono = false }: { children: React.ReactNode; align?: 'left' | 'right'; mono?: boolean }) {
  return <td className={cn('px-4 py-2 align-middle text-white/80', align === 'right' ? 'text-right' : 'text-left', mono && 'font-mono text-xs text-white/70')}>{children}</td>;
}

function StatusPill({ status }: { status: string }) {
  const map: Record<string, string> = {
    fulfilled: 'border-emerald-400/30 bg-emerald-500/10 text-emerald-200',
    shipped: 'border-sky-400/30 bg-sky-500/10 text-sky-200',
    processing: 'border-amber-400/30 bg-amber-500/10 text-amber-200',
    refunded: 'border-rose-400/30 bg-rose-500/10 text-rose-200',
  };
  return <span className={cn('inline-flex rounded-md border px-2 py-0.5 text-[11px] capitalize', map[status])}>{status}</span>;
}

function RolePill({ role }: { role: string }) {
  const map: Record<string, string> = {
    customer: 'border-white/10 bg-white/5 text-white/70',
    support: 'border-sky-400/30 bg-sky-500/10 text-sky-200',
    admin: 'border-emerald-400/30 bg-emerald-500/10 text-emerald-200',
  };
  return <span className={cn('inline-flex rounded-md border px-2 py-0.5 text-[11px] capitalize', map[role])}>{role}</span>;
}
