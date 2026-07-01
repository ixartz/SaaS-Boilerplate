'use client';

import Script from 'next/script';

export function KnocketWidget() {
  const knocketId = process.env.NEXT_PUBLIC_KNOCKET_ID;

  if (!knocketId) {
    return null;
  }

  return (
    <Script
      src={`https://trtc.io/knocket-sdk/sdk.js?identifier=${knocketId}`}
      strategy="lazyOnload"
    />
  );
}
