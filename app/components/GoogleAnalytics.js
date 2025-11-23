'use client';

import Script from 'next/script';

export default function GoogleAnalytics({ gaId, gtId }) {
    if (!gaId && !gtId) return null;

    const primaryId = gaId || gtId;

    return (
        <>
            <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${primaryId}`}
                strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
                {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          ${gaId ? `gtag('config', '${gaId}');` : ''}
          ${gtId ? `gtag('config', '${gtId}');` : ''}
        `}
            </Script>
        </>
    );
}
