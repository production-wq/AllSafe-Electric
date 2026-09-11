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

type Variant = 'full' | 'compact' | 'row';

export function EstimateForm({
  variant = 'full',
  defaultService,
  formId = 'estimate',
  submitLabel = 'Get My Free Estimate',
}: {
  variant?: Variant;
  defaultService?: string;
  formId?: string;
  submitLabel?: string;
}) {
  const [state, formAction, pending] = useActionState(submitEstimate, initial);
  const router = useRouter();
  const startedRef = useRef<number>(0);
  const [touched, setTouched] = useState(false);
  const compact = variant !== 'full';

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
        className="rounded-card border border-green-200 bg-green-50 p-6 text-ink"
      >
        <p className="flex items-center gap-2 text-h3">
          <CheckIcon className="text-green-600" /> Got it, thanks.
        </p>
        <p className="mt-2 text-body text-slate">
          {state.values?.name ? `Thanks, ${state.values.name.split(' ')[0]}. ` : ''}We have your
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

  const HiddenBits = (
    <>
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
        <p
          role="alert"
          className="col-span-full rounded border border-green-300 bg-green-50 px-3 py-2 text-small text-green-800"
        >
          {state.error}
        </p>
      )}
    </>
  );

  const serviceSelect = (
    <div>
      <label htmlFor={`${formId}-service`} className="block text-small font-semibold text-ink">
        Service Needed
      </label>
      <select
        id={`${formId}-service`}
        name="service"
        defaultValue={defaultService ?? v.service ?? ''}
        className="mt-1.5 h-[50px] w-full rounded-btn border border-rule bg-white px-3 text-slate"
      >
        <option value="">Choose a service</option>
        {services.map((s) => (
          <option key={s.slug} value={s.slug}>
            {s.navLabel}
          </option>
        ))}
      </select>
    </div>
  );

  const message = (
    <div className={variant === 'row' ? '' : ''}>
      <label htmlFor={`${formId}-message`} className="block text-small font-semibold text-ink">
        Message
      </label>
      <textarea
        id={`${formId}-message`}
        name="message"
        rows={variant === 'row' ? 1 : 3}
        defaultValue={v.message}
        placeholder="Tell us what is going on"
        aria-invalid={Boolean(err.message)}
        aria-describedby={err.message ? `${formId}-message-err` : undefined}
        className="mt-1.5 w-full rounded-btn border border-rule bg-white px-3 py-2.5 text-slate"
        required
      />
      {err.message && (
        <p id={`${formId}-message-err`} className="mt-1 text-tiny text-green-800">
          {err.message}
        </p>
      )}
    </div>
  );

  const submit = (
    <button
      type="submit"
      disabled={pending}
      className={`btn btn-primary ${variant === 'row' ? 'h-[50px] w-full lg:w-auto' : 'w-full sm:w-auto'}`}
    >
      {pending ? 'Sending…' : submitLabel}
    </button>
  );

  const legal = (
    <p className="text-tiny text-grey">
      No obligation. We reply the same business day, and your details are used only to contact you
      about this request. See our{' '}
      <Link href="/privacy-policy/" className="underline">
        privacy policy
      </Link>
      .
    </p>
  );

  // ── Row layout: the designer's wide hero form ──────────────────────────
  if (variant === 'row') {
    return (
      <form
        id={formId}
        action={formAction}
        noValidate
        onChange={() => {
          if (!touched) {
            setTouched(true);
            track.formStart(formId);
          }
        }}
      >
        <div className="grid gap-4 lg:grid-cols-5">
          {HiddenBits}
          <Field label="Name" name="name" error={err.name} defaultValue={v.name} autoComplete="name" required />
          <Field label="Phone" name="phone" type="tel" inputMode="tel" error={err.phone} defaultValue={v.phone} autoComplete="tel" required />
          <Field label="Email" name="email" type="email" inputMode="email" error={err.email} defaultValue={v.email} autoComplete="email" required />
          {serviceSelect}
          {message}
        </div>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {submit}
          {legal}
        </div>
        <input type="hidden" name="zip" value={v.zip ?? ''} />
      </form>
    );
  }

  // ── Compact + full ────────────────────────────────────────────────────
  return (
    <form
      id={formId}
      action={formAction}
      className={compact ? 'mt-4 space-y-3.5' : 'mt-6 space-y-4'}
      noValidate
      onChange={() => {
        if (!touched) {
          setTouched(true);
          track.formStart(formId);
        }
      }}
    >
      {HiddenBits}
      <Field label="Your name" name="name" error={err.name} defaultValue={v.name} autoComplete="name" required />
      <div className="grid gap-3.5 sm:grid-cols-2">
        <Field label="Phone" name="phone" type="tel" inputMode="tel" error={err.phone} defaultValue={v.phone} autoComplete="tel" placeholder="(303) 555-0142" required />
        <Field label="Email" name="email" type="email" inputMode="email" error={err.email} defaultValue={v.email} autoComplete="email" required />
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
        {serviceSelect}
      </div>
      {message}

      {variant === 'full' && (
        <>
          <fieldset>
            <legend className="text-small font-semibold text-ink">When do you need this?</legend>
            <div className="mt-2 flex flex-wrap gap-4 text-body">
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
            <label htmlFor={`${formId}-photo`} className="block text-small font-semibold text-ink">
              Photo{' '}
              <span className="font-normal text-grey">
                (optional, a photo of the panel or the problem really helps)
              </span>
            </label>
            <input
              id={`${formId}-photo`}
              type="file"
              name="photo"
              accept="image/*"
              capture="environment"
              className="mt-1.5 block w-full text-small"
            />
          </div>
        </>
      )}

      {submit}
      {legal}
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
      <label htmlFor={id} className="block text-small font-semibold text-ink">
        {label}
      </label>
      {hint && <p className="text-tiny text-grey">{hint}</p>}
      <input
        id={id}
        name={name}
        type={type}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-err` : undefined}
        className="mt-1.5 h-[50px] w-full rounded-btn border border-rule bg-white px-3 text-slate"
        {...rest}
      />
      {error && (
        <p id={`${id}-err`} className="mt-1 text-tiny text-green-800">
          {error}
        </p>
      )}
    </div>
  );
}
