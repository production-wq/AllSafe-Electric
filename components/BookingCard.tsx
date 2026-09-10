'use client';

import { useState } from 'react';
import { services } from '@/lib/services';
import { business } from '@/lib/business';
import { track } from '@/lib/analytics';
import { CalendarIcon, PhoneIcon } from './Icons';

/**
 * Hero booking card, planning/docs/07 §3. A three-tap pre-qualifier
 * (service · when · zip), NOT the full widget. On submit it deep-links to
 * Housecall Pro with the choices as UTM/context params and hands off to /book/.
 * Reducing the first interaction to three taps is worth more than any copy change.
 */
export function BookingCard() {
  const [service, setService] = useState('');
  const [when, setWhen] = useState('this-week');
  const [zip, setZip] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    track.book('hero', { service });
    const u = new URL(business.bookingUrl);
    u.searchParams.set('utm_source', 'allsafe-site');
    u.searchParams.set('utm_medium', 'hero_card');
    if (service) u.searchParams.set('utm_content', service);
    // Hand off via /book/ so we keep the visitor on-domain first, carrying state.
    const book = new URL('/book/', window.location.origin);
    if (service) book.searchParams.set('service', service);
    book.searchParams.set('when', when);
    if (zip) book.searchParams.set('zip', zip);
    book.searchParams.set('next', u.toString());
    window.location.href = book.toString();
  };

  return (
    <form
      onSubmit={submit}
      onFocus={() => track.beginBooking()}
      className="w-full rounded-card bg-white p-6 shadow-lift"
      aria-label="Book a visit"
    >
      <p className="flex items-center gap-2 text-h3 font-bold">
        <CalendarIcon className="text-leaf-600" /> Book a visit
      </p>

      <fieldset className="mt-4">
        <legend className="text-[0.9rem] font-semibold text-muted">When</legend>
        <div className="mt-2 grid grid-cols-3 gap-2" role="radiogroup">
          {[
            ['today', 'Today'],
            ['this-week', 'This week'],
            ['planning', 'Planning'],
          ].map(([val, label]) => (
            <button
              key={val}
              type="button"
              role="radio"
              aria-checked={when === val}
              onClick={() => setWhen(val)}
              className={`rounded border px-2 py-2.5 text-[0.95rem] font-medium transition-colors ${
                when === val
                  ? 'border-brand-600 bg-brand-600 text-white'
                  : 'border-rule bg-white text-ink hover:border-brand-600'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="mt-4">
        <label htmlFor="hero-service" className="block text-[0.9rem] font-semibold text-muted">
          What do you need?
        </label>
        <select
          id="hero-service"
          value={service}
          onChange={(e) => setService(e.target.value)}
          className="mt-1.5 h-[52px] w-full rounded border border-rule bg-white px-3"
        >
          <option value="">Choose a service</option>
          {services.map((s) => (
            <option key={s.slug} value={s.slug}>
              {s.navLabel}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-4">
        <label htmlFor="hero-zip" className="block text-[0.9rem] font-semibold text-muted">
          ZIP code
        </label>
        <input
          id="hero-zip"
          inputMode="numeric"
          maxLength={5}
          value={zip}
          onChange={(e) => setZip(e.target.value.replace(/\D/g, ''))}
          placeholder="80134"
          className="mt-1.5 h-[52px] w-full rounded border border-rule bg-white px-3"
        />
      </div>

      <button type="submit" className="btn btn-primary mt-5 w-full">
        Check availability
      </button>
      <p className="mt-3 text-center text-[0.95rem] text-muted">
        or call{' '}
        <a
          href={business.phone.href}
          onClick={() => track.call('hero')}
          className="inline-flex items-center gap-1 font-semibold text-brand-700"
        >
          <PhoneIcon width={16} height={16} /> {business.phone.display}
        </a>
      </p>
    </form>
  );
}
