'use client';

import Link from 'next/link';
import { useState } from 'react';

import { useStore } from '../state/useStore';

function formatPrice(cents: number) {
  return `$${(cents / 100).toFixed(2)}`;
}

export function CartSummary() {
  const { cart, products, removeFromCart, clearCart, governedCall } = useStore();
  const [lastReceiptId, setLastReceiptId] = useState<string | null>(null);

  const lines = cart.map((l) => {
    const product = products.find(p => p.id === l.productId)!;
    return { ...l, product };
  });
  const subtotal = lines.reduce((sum, l) => sum + l.quantity * l.product.priceCents, 0);

  function checkout() {
    const res = governedCall({
      capabilityId: 'orders.create',
      principal: {
        id: 'cus_demo_visitor',
        kind: 'human',
        name: 'You',
        role: 'viewer',
      },
      args: {
        lines: lines.map(l => ({ sku: l.product.sku, quantity: l.quantity })),
        currency: 'USD',
      },
      estimatedImpact: { recordCount: 1, dollarsCents: subtotal, affectsProduction: true },
    });
    setLastReceiptId(res.receipt.id);
    clearCart();
  }

  return (
    <aside className="sticky top-20 w-full rounded-xl border border-white/5 bg-white/[0.02] p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-white/60">Cart</h2>
        {cart.length > 0 && (
          <button type="button" onClick={clearCart} className="text-xs text-white/50 hover:text-white">
            Clear
          </button>
        )}
      </div>
      {lines.length === 0 && lastReceiptId && (
        <div className="rounded-md border border-emerald-500/30 bg-emerald-500/10 p-3 text-sm text-emerald-200">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-emerald-300">
            Strix: allowed
          </div>
          <p className="mt-1 text-white/80">
            Order created. Low-risk customer action, auto-approved within policy.
          </p>
          <Link
            href={`/strix-store/receipts/${lastReceiptId}`}
            className="mt-2 inline-flex text-[11px] font-medium text-emerald-300 hover:text-emerald-200"
          >
            View proof receipt →
          </Link>
        </div>
      )}
      {lines.length === 0 && !lastReceiptId && (
        <p className="text-sm text-white/40">Your cart is empty. Add a governed, ethically priced hoodie.</p>
      )}
      {lines.length > 0 && (
        <>
          <ul className="divide-y divide-white/5">
            {lines.map(l => (
              <li key={l.productId} className="flex items-center gap-3 py-3">
                <div className="text-2xl">{l.product.emoji}</div>
                <div className="flex-1">
                  <div className="truncate text-sm text-white">{l.product.name}</div>
                  <div className="text-xs text-white/50">
                    Qty
                    {' '}
                    {l.quantity}
                    {' '}
                    ·
                    {' '}
                    {formatPrice(l.product.priceCents)}
                  </div>
                </div>
                <button type="button" onClick={() => removeFromCart(l.productId)} className="text-xs text-white/50 hover:text-white">
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-4">
            <div className="text-sm text-white/60">Subtotal</div>
            <div className="text-lg font-semibold text-white">{formatPrice(subtotal)}</div>
          </div>
          <button
            type="button"
            onClick={checkout}
            className="mt-4 w-full rounded-md bg-emerald-500 py-2 text-sm font-semibold text-black hover:bg-emerald-400"
          >
            Checkout (governed)
          </button>
          <p className="mt-2 text-center text-[11px] text-white/40">
            No real charge. Strix evaluates
            {' '}
            <code className="text-white/60">orders.create</code>
            {' '}
            and emits a proof receipt on success.
          </p>
        </>
      )}
    </aside>
  );
}
