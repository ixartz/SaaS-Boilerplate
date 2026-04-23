import Link from 'next/link';

import { StickyBanner } from '@/features/landing/StickyBanner';

export const DemoBanner = () => (
  <StickyBanner>
    Live demo · watch an agent try to drain a shop and fail —
    {' '}
    <Link href="/strix-store">open the Strix Store →</Link>
  </StickyBanner>
);
