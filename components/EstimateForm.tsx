'use client';

import { useActionState, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { submitEstimate, type EstimateState } from '@/app/actions/submit-estimate';
import { services } from '@/lib/services';
import { business } from '@/lib/business';
import { track } from '@/lib/analytics';
import { CheckIcon } from './Icons';

const initial: EstimateState = { ok: false };

export function EstimateForm({
  compact = false,
  defaultService,
  formId = 'estimate',
}: {
  compact?: boolean;
  defaultService?: string;
  formId?: string;
}) {
  const [state, formAction, pending] = useActionState(submitEstimate, initial);
  const router = useRouter();
  const startedRef = useRef<number>(0);
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    startedRef.current = Date.now();
  }, []);

  useEffect(() => {
    if (state.ok && state.leadId && state.leadId !== 'ignored') {
      track.generateLead({
        service: state.values?.service,
        city: state.values?.city,
        urgency: state.values?.when,
      });
      const t = setTimeout(() => router.push('/thank-you/'), 1400);
      return () => clearTimeout(t);
    }
  }, [state, router]);

  if (state.ok && state.leadId && state.leadId !== 'ignored') {
    return (
      <div
        role="status"
        className="rounded-card border border-brand-green/40 bg-brand-green/5 p-6 text-ink"
      >
        <p className="flex items-center gap-2 text-step-1 font-semibold">
          <CheckIcon className="text-brand-green" /> Sent.
        </p>
        <p className="mt-2 text-[1rem]">
          Thanks{state.values?.name ? `, ${state.values.name.split(' ')[0]}` : ''}. We have your
          request and will reply the same business day. If it is urgent, call{' '}
          <a href={business.phone.href} className="font-semibold underline">
            {business.phone.display}
          </a>
          .
        </p>
      </div>
    );
  }

  const err = state.fieldErrors ?? {};
  const v = state.values ?? {};

  return (
    <form
      id={formId}
      action={formAction}
      className={compact ? 'mt-4 space-y-3.5' : 'mt-6 space-y-5'}
      noValidate
      onChange={() => {
        if (!touched) {
          setTouched(true);
          track.formStart(formId);
        }
      }}
    >
      {/* honeypot + timing */}
      <input
        type="text"
        name="company_website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden
      />
      <input type="hidden" name="form_started_at" value={startedRef.current || ''} readOnly />

      {state.error && (
        <p role="alert" className="rounded border border-urgent/40 bg-urgent/5 px-3 py-2 text-[0.95rem] text-urgent">
          {state.error}
        </p>
      )}

      <Field label="Your name" name="name" error={err.name} defaultValue={v.name} autoComplete="name" required />

      <div className="grid gap-3.5 sm:grid-cols-2">
        <Field
          label="Phone"
          name="phone"
          type="tel"
          inputMode="tel"
          error={err.phone}
          defaultValue={v.phone}
          autoComplete="tel"
          placeholder="(303) 555-0142"
          required
        />
        <Field
          label="Email"
          name="email"
          type="email"
          inputMode="email"
          error={err.email}
          defaultValue={v.email}
          autoComplete="email"
          required
        />
      </div>

      <div className="grid gap-3.5 sm:grid-cols-2">
        <Field
          label="ZIP code"
          name="zip"
          inputMode="numeric"
          maxLength={5}
          error={err.zip}
          defaultValue={v.zip}
          autoComplete="postal-code"
          hint="So we can tell you the drive time"
          required
        />
        <div>
          <label htmlFor={`${formId}-service`} className="block text-[0.95rem] font-semibold">
            Service
          </label>
          <select
            id={`${formId}-service`}
            name="service"
            defaultValue={defaultService ?? v.service ?? ''}
            className="mt-1.5 h-[52px] w-full rounded border border-rule bg-white px-3"
          >
            <option value="">Not sure / something else</option>
            {services.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.navLabel}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor={`${formId}-message`} className="block text-[0.95rem] font-semibold">
          What&apos;s going on?
        </label>
        <textarea
          id={`${formId}-message`}
          name="message"
          rows={compact ? 3 : 4}
          defaultValue={v.message}
          placeholder="Breaker keeps tripping in the kitchen"
          aria-invalid={Boolean(err.message)}
          aria-describedby={err.message ? `${formId}-message-err` : undefined}
          className="mt-1.5 w-full rounded border border-rule bg-white px-3 py-2.5"
          required
        />
        {err.message && (
          <p id={`${formId}-message-err`} className="mt-1 text-[0.9rem] text-urgent">
            {err.message}
          </p>
        )}
      </div>

      {!compact && (
        <>
          <fieldset>
            <legend className="text-[0.95rem] font-semibold">When do you need this?</legend>
            <div className="mt-2 flex flex-wrap gap-4 text-[0.98rem]">
              {[
                ['today', 'Today'],
                ['this-week', 'This week'],
                ['planning', 'Just planning'],
              ].map(([val, label]) => (
                <label key={val} className="flex items-center gap-2">
                  <input type="radio" name="when" value={val} defaultChecked={v.when === val} />
                  {label}
                </label>
              ))}
            </div>
          </fieldset>

          <div>
            <label htmlFor={`${formId}-photo`} className="block text-[0.95rem] font-semibold">
              Photo <span className="font-normal text-muted">(optional — a photo of the panel or the problem really helps)</span>
            </label>
            <input
              id={`${formId}-photo`}
              type="file"
              name="photo"
              accept="image/*"
              capture="environment"
              className="mt-1.5 block w-full text-[0.95rem]"
            />
          </div>
        </>
      )}

      <button type="submit" disabled={pending} className="btn btn-primary w-full sm:w-auto">
        {pending ? 'Sending…' : 'Get my estimate'}
      </button>

      <p className="text-[0.85rem] text-muted">
        We reply the same business day. Your details are used only to contact you about this
        request — see our{' '}
        <Link href="/privacy-policy/" className="underline">
          privacy policy
        </Link>
        .
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  error,
  hint,
  type = 'text',
  ...rest
}: {
  label: string;
  name: string;
  error?: string;
  hint?: string;
  type?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  const id = `f-${name}`;
  return (
    <div>
      <label htmlFor={id} className="block text-[0.95rem] font-semibold">
        {label}
      </label>
      {hint && <p className="text-[0.85rem] text-muted">{hint}</p>}
      <input
        id={id}
        name={name}
        type={type}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-err` : undefined}
        className="mt-1.5 h-[52px] w-full rounded border border-rule bg-white px-3"
        {...rest}
      />
      {error && (
        <p id={`${id}-err`} className="mt-1 text-[0.9rem] text-urgent">
          {error}
        </p>
      )}
    </div>
  );
}
