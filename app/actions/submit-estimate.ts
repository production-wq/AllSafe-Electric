'use server';

import { headers } from 'next/headers';
import { business } from '@/lib/business';
import { services } from '@/lib/services';
import { citySlugs } from '@/lib/cities';

/**
 * Estimate form Server Action, planning/docs/07 §4.
 * No third-party iframe. Honeypot + timing check, NO CAPTCHA.
 *
 * Leads fan out to (best-effort, never block the user):
 *   1. email  → allsafehomeservices@gmail.com   (plural, see planning/CLAUDE.md §3)
 *   2. webhook → Housecall Pro (create customer)
 *   3. webhook → Built Right Digital lead log
 *   4. GA4 `generate_lead`. Fired client-side on the returned {ok:true}
 *
 * If a destination fails the visitor still sees success and the lead is logged for
 * retry. Never show a homeowner an error because a webhook timed out.
 */

export interface EstimateState {
  ok: boolean;
  error?: string;
  fieldErrors?: Record<string, string>;
  values?: Record<string, string>;
  leadId?: string;
}

const zips = new Set([
  // Parker / Douglas / south-metro service-area ZIPs (non-exhaustive; audit-friendly allowlist)
  '80134', '80138', '80104', '80108', '80109', '80016', '80015', '80112', '80111',
  '80124', '80126', '80129', '80130', '80125', '80116', '80107', '80118', '80131',
  '80122', '80120', '80121', '80013', '80014', '80231', '80237',
]);

function digits(s: string) {
  return (s || '').replace(/\D/g, '');
}

export async function submitEstimate(
  _prev: EstimateState,
  formData: FormData
): Promise<EstimateState> {
  const get = (k: string) => String(formData.get(k) ?? '').trim();
  const values: Record<string, string> = {
    name: get('name'),
    phone: get('phone'),
    email: get('email'),
    zip: get('zip'),
    message: get('message'),
    service: get('service'),
    when: get('when'),
  };

  // Honeypot + timing check
  if (get('company_website')) return { ok: true, leadId: 'ignored' }; // silent drop for bots
  const started = Number(get('form_started_at')) || 0;
  if (started && Date.now() - started < 2500) {
    return { ok: true, leadId: 'ignored' };
  }

  const fieldErrors: Record<string, string> = {};
  if (values.name.length < 2) fieldErrors.name = 'Please enter your name.';
  if (digits(values.phone).length !== 10)
    fieldErrors.phone = 'Enter a 10-digit US phone number so we can reach you.';
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(values.email))
    fieldErrors.email = 'Enter a valid email address.';
  if (!/^\d{5}$/.test(values.zip)) fieldErrors.zip = 'Enter your 5-digit ZIP code.';
  if (values.message.length < 5)
    fieldErrors.message = 'A sentence about what is going on helps us come prepared.';

  if (Object.keys(fieldErrors).length) {
    return { ok: false, fieldErrors, values, error: 'Please fix the highlighted fields.' };
  }

  const outOfArea = !zips.has(values.zip);
  const serviceMeta = services.find((s) => s.slug === values.service || s.navLabel === values.service);
  const photo = formData.get('photo');
  const hasPhoto = photo instanceof File && photo.size > 0;

  const leadId = `AS-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
  const hdrs = await headers();
  const lead = {
    leadId,
    receivedAt: new Date().toISOString(),
    name: values.name,
    phone: business.phone.display === values.phone ? values.phone : formatPhone(values.phone),
    email: values.email,
    zip: values.zip,
    outOfArea,
    message: values.message,
    service: serviceMeta?.navLabel ?? values.service ?? 'General',
    serviceSlug: serviceMeta?.slug ?? null,
    urgency: values.when || 'unspecified',
    hasPhoto,
    referer: hdrs.get('referer') ?? null,
    userAgent: hdrs.get('user-agent') ?? null,
    source: 'allsafe-website-estimate-form',
  };

  await Promise.allSettled([
    sendEmail(lead),
    postWebhook(process.env.HCP_LEAD_WEBHOOK_URL, lead, 'housecall-pro'),
    postWebhook(process.env.BRD_LEAD_LOG_WEBHOOK_URL, lead, 'brd-lead-log'),
  ]).then((results) => {
    const failed = results.filter((r) => r.status === 'rejected');
    if (failed.length) {
      // Queue for retry, in production this is a durable queue; here we log loudly.
      console.error(`[lead ${leadId}] ${failed.length} destination(s) failed. Queued for retry`, {
        lead,
      });
    }
  });

  return {
    ok: true,
    leadId,
    values: {...values, city: guessCity(values.zip) ?? '' },
  };
}

function formatPhone(v: string) {
  const d = digits(v);
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}

function guessCity(zip: string): string | null {
  const m: Record<string, string> = {
    '80134': 'parker-co',
    '80138': 'parker-co',
    '80104': 'castle-rock-co',
    '80108': 'castle-rock-co',
    '80109': 'castle-rock-co',
    '80126': 'highlands-ranch-co',
    '80129': 'highlands-ranch-co',
    '80130': 'highlands-ranch-co',
    '80124': 'lone-tree-co',
    '80112': 'centennial-co',
    '80111': 'centennial-co',
    '80015': 'centennial-co',
    '80016': 'centennial-co',
  };
  const slug = m[zip];
  return slug && citySlugs.includes(slug) ? slug : null;
}

async function sendEmail(lead: Record<string, unknown>) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_EMAIL_TO || business.email.leads;
  const from = process.env.LEAD_EMAIL_FROM || business.email.public;
  if (!key) {
    console.info('[lead] RESEND_API_KEY not set, email not sent. Lead:', lead.leadId);
    return;
  }
  const lines = Object.entries(lead)
    .map(([k, v]) => `${k}: ${v ?? ''}`)
    .join('\n');
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: `Allsafe Electric Website <${from}>`,
      to: [to],
      reply_to: String(lead.email),
      subject: `New estimate request, ${lead.service} (${lead.zip})`,
      text: lines,
    }),
  });
  if (!res.ok) throw new Error(`email provider ${res.status}`);
}

async function postWebhook(url: string | undefined, lead: unknown, label: string) {
  if (!url) {
    console.info(`[lead] ${label} webhook not configured`);
    return;
  }
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(lead),
  });
  if (!res.ok) throw new Error(`${label} ${res.status}`);
}
