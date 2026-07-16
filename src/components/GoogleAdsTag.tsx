'use client';

import Script from 'next/script';

export default function GoogleAdsTag() {
  const gadsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || 'AW-11531777265'; // Coloque aqui seu ID AW-XXXX ou configure no .env.local

  return (
    <>
      {/* Script Global do Google Ads */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gadsId}`}
        strategy="afterInteractive"
      />
      <Script id="google-ads-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gadsId}');
        `}
      </Script>
    </>
  );
}

// Helper para disparar conversão de compra no Google Ads
export function trackGoogleAdsPurchase(value: number, transactionId?: string) {
  const gadsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || 'AW-11531777265';
  const conversionLabel = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL || 'CONVERSION_LABEL_AQUI'; // Substitua pelo seu rótulo se desejar usar global

  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'conversion', {
      'send_to': `${gadsId}/${conversionLabel}`,
      'value': value,
      'currency': 'BRL',
      'transaction_id': transactionId || ''
    });
    console.log('[Google Ads Ctr] Purchase conversion tracked:', value);
  }
}
