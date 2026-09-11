/**
 * GA4 event helpers, planning/docs/07 §8, planning/docs/13 §2.
 * All events are no-ops until NEXT_PUBLIC_GA4_ID is set and the gtag snippet loads
 * (components/Analytics.tsx). Safe to call unconditionally from client components.
 */

type Loc =
  | 'header'
  | 'hero'
  | 'sticky_bar'
  | 'mid_page'
  | 'footer'
  | 'availability_strip'
  | 'reviews'
  | 'homepage_marquee'
  | 'inline';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function send(event: string, params: Record<string, unknown> = {}) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag === 'function') {
    window.gtag('event', event, params);
  } else {
    window.dataLayer.push({ event, ...params });
  }
}

const pagePath = () =>
  typeof window !== 'undefined' ? window.location.pathname : undefined;

export const track = {
  call: (location: Loc, opts: { service?: string; isBusinessHours?: boolean } = {}) =>
    send('click_call', {
      location,
      page_path: pagePath(),
      is_business_hours: opts.isBusinessHours ?? null,
      service: opts.service ?? null,
    }),

  book: (location: Loc, opts: { service?: string } = {}) =>
    send('click_book', { location, page_path: pagePath(), service: opts.service ?? null }),

  beginBooking: () => send('begin_booking', { page_path: pagePath() }),

  generateLead: (opts: {
    service?: string;
    city?: string;
    hasPhoto?: boolean;
    urgency?: string;
  }) =>
    send('generate_lead', {
      page_path: pagePath(),
      service: opts.service ?? null,
      city: opts.city ?? null,
      has_photo: opts.hasPhoto ?? false,
      urgency: opts.urgency ?? null,
    }),

  formStart: (formId: string) => send('form_start', { page_path: pagePath(), form_id: formId }),
  formError: (field: string, errorType: string) => send('form_error', { field, error_type: errorType }),

  viewReviews: () => send('view_reviews', { page_path: pagePath() }),
  clickDirections: () => send('click_directions', { page_path: pagePath() }),
  clickGbp: (location: Loc) => send('click_gbp', { location }),
  toolStart: (toolName: string) => send('tool_start', { tool_name: toolName }),
  toolComplete: (toolName: string, resultBucket: string) =>
    send('tool_complete', { tool_name: toolName, result_bucket: resultBucket }),
};
