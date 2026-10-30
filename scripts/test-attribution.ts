import assert from 'node:assert/strict';
import { captureAttribution, measurementChoice, setMeasurementChoice } from '../lib/attribution';
const saved = new Map<string, string>();
const clock = Date.now;
let now = clock();
Date.now = () => now;
Object.assign(globalThis, {
  localStorage: { getItem: (k: string) => saved.get(k) ?? null, setItem: (k: string, v: string) => saved.set(k, v), removeItem: (k: string) => saved.delete(k) },
  window: { location: { pathname: '/outlet-gfci-repair/', search: '?gclid=sample-click&utm_campaign=repair' }, dispatchEvent() {} },
});
assert.equal(measurementChoice(), null);
assert.deepEqual(captureAttribution(), {});
assert.equal(saved.size, 0, 'no attribution storage before consent');
setMeasurementChoice(true);
assert.equal(captureAttribution().gclid, 'sample-click');
window.location.pathname = '/contact/';
window.location.search = '';
assert.equal(captureAttribution().landing_page, '/outlet-gfci-repair/');
window.location.search = '?utm_source=bing&utm_campaign=second';
assert.equal(captureAttribution().gclid, undefined, 'a different campaign must not inherit an old Google click');
window.location.search = '';
now += 91 * 24 * 60 * 60 * 1000;
setMeasurementChoice(true);
assert.equal(captureAttribution().utm_source, undefined, 'expired attribution must not revive from memory');
setMeasurementChoice(false);
assert.deepEqual(captureAttribution(), {});
assert.equal(saved.has('allsafe-attribution-v1'), false);
Date.now = clock;
console.log('Attribution consent, campaign isolation, navigation and expiry tests passed.');
