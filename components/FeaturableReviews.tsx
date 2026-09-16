'use client';

import Script from 'next/script';

/**
 * Live Google reviews via Featurable, which pulls from the Google Business
 * Profile. Added 2026-09-16 at the client's request, using the embed snippet
 * from their Featurable dashboard.
 *
 * The original snippet is a plain `<div>` plus a `<script src>` tag. In the App
 * Router a raw `<script>` in JSX is not executed, so the loader goes through
 * `next/script` with `afterInteractive`: that guarantees the target div is in
 * the DOM before the bundle runs and looks for it.
 *
 * `data-featurable-async` is what the bundle scans for, so the attribute has to
 * survive into the rendered HTML exactly as written.
 *
 * Note this is a third-party embed: the widget markup, styling and review
 * content all come from Featurable at runtime, so it will not inherit the
 * site's own card styling, and it renders nothing until their script loads.
 */
const WIDGET_ID = 'featurable-2feef360-6644-443f-8393-95abb0721a40';

export function FeaturableReviews({ className = '' }: { className?: string }) {
  return (
    <div className={className}>
      <div id={WIDGET_ID} data-featurable-async="" />
      <Script
        src="https://featurable.com/assets/bundle.js"
        strategy="afterInteractive"
        charSet="UTF-8"
      />
    </div>
  );
}
