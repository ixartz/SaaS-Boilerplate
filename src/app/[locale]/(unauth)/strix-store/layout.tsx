import type { Metadata } from 'next';
import { unstable_setRequestLocale } from 'next-intl/server';
import type { ReactNode } from 'react';

import { GovernorRail } from '@/features/strix-store/components/GovernorRail';
import { StoreNav } from '@/features/strix-store/components/StoreNav';
import { StrixInterceptModal } from '@/features/strix-store/components/StrixInterceptModal';
import { StoreProvider } from '@/features/strix-store/state/StoreContext';

export const metadata: Metadata = {
  title: 'Strix Store · Governed merch shop',
  description: 'A fully governed demo merch shop. Watch Strix intercept high-risk agent actions in real time.',
  openGraph: {
    title: 'Strix Store · The merch shop that can\'t be drained',
    description: 'An autonomous agent tries to refund $42,380, reprice the catalog to $1, and grant itself admin. Strix blocks every attempt and emits a proof receipt.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Strix Store · The merch shop that can\'t be drained',
    description: 'Watch an autonomous agent try to drain a shop. Watch Strix stop it every time.',
  },
};

export default function StrixStoreLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  unstable_setRequestLocale(params.locale);
  return (
    <StoreProvider>
      <div className="min-h-screen bg-[#07080a] text-white">
        <StoreNav />
        <main className="mx-auto max-w-7xl px-4 py-8 pb-24 sm:px-6">
          {children}
        </main>
        <footer className="border-t border-white/5 py-8 text-center text-xs text-white/40">
          Strix Store is a runnable demo. All actions are evaluated client-side
          against policy; no real refunds, charges, or exports occur.
        </footer>
        <StrixInterceptModal />
        <GovernorRail />
      </div>
    </StoreProvider>
  );
}
