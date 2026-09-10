'use client';

import Script from 'next/script';

/**
 * GA4 + CallRail, planning/docs/13. Third-party scripts load afterInteractive so
 * nothing blocks render (planning/docs/05 §5). Consent Mode v2 defaults to denied
 * and is granted after a consent choice (wire the banner to `window.__grantConsent`).
 * Renders nothing until the public IDs are set, so local/staging stays clean.
 */
export function Analytics() {
  const ga = process.env.NEXT_PUBLIC_GA4_ID;
  const callrail = process.env.NEXT_PUBLIC_CALLRAIL_SWAP_SCRIPT;

  return (
    <>
      {ga && (
        <>
          <Script id="consent-mode" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('consent', 'default', {
                ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied',
                analytics_storage: 'denied', functionality_storage: 'granted', security_storage: 'granted',
                wait_for_update: 500
              });
              window.__grantConsent = function(){
                gtag('consent', 'update', {
                  ad_storage:'granted', ad_user_data:'granted', ad_personalization:'granted', analytics_storage:'granted'
                });
              };
            `}
          </Script>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${ga}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              gtag('js', new Date());
              gtag('config', '${ga}', { send_page_view: true });
            `}
          </Script>
        </>
      )}
      {callrail && <Script src={callrail} strategy="afterInteractive" />}
    </>
  );
}
