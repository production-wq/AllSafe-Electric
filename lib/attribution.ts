/** First-party attribution, stored only after an explicit measurement choice. */
export const attributionKeys = ['gclid', 'gbraid', 'wbraid', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'landing_page'] as const;
export type Attribution = Partial<Record<(typeof attributionKeys)[number], string>>;
const consentKey = 'allsafe-measurement-choice-v1';
const attributionKey = 'allsafe-attribution-v1';
const lifetime = 90 * 24 * 60 * 60 * 1000;
let memoryChoice: boolean | null = null;
let choiceAt = 0;
let memoryAttribution: Attribution = {};
let attributionAt = 0;

export function measurementChoice(): boolean | null {
  if (typeof window === 'undefined') return null;
  try {
    const saved = JSON.parse(localStorage.getItem(consentKey) || 'null');
    if (saved && Date.now() - saved.at < lifetime) return saved.allowed === true;
  } catch { /* Storage may be blocked. */ }
  return Date.now() - choiceAt < lifetime ? memoryChoice : null;
}
export function setMeasurementChoice(allowed: boolean) {
  memoryChoice = allowed;
  choiceAt = Date.now();
  try {
    localStorage.setItem(consentKey, JSON.stringify({ allowed, at: Date.now() }));
    if (!allowed) localStorage.removeItem(attributionKey);
  } catch { /* The choice remains effective for this page. */ }
  if (!allowed) memoryAttribution = {};
  window.dispatchEvent(new Event('allsafe-consent-change'));
}
export function captureAttribution(): Attribution {
  if (typeof window === 'undefined' || measurementChoice() !== true) return {};
  const query = new URLSearchParams(window.location.search);
  let prior = Date.now() - attributionAt < lifetime ? memoryAttribution : {};
  let capturedAt = Date.now() - attributionAt < lifetime ? attributionAt : Date.now();
  try {
    const saved = JSON.parse(localStorage.getItem(attributionKey) || 'null');
    if (saved && Date.now() - saved.at < lifetime) { prior = saved.data; capturedAt = saved.at; }
  } catch { /* Best effort; never prevent a service request. */ }
  const hasCampaign = attributionKeys.some(k => k !== 'landing_page' && query.has(k));
  // Replace the complete campaign together: never attach an old click ID to a new campaign.
  if (hasCampaign) capturedAt = Date.now();
  const data: Attribution = hasCampaign ? {} : { ...prior };
  if (hasCampaign || !data.landing_page) data.landing_page = window.location.pathname.slice(0, 300);
  if (hasCampaign) for (const key of attributionKeys) {
    if (key === 'landing_page') continue;
    const value = query.get(key)?.trim();
    if (value) data[key] = value.slice(0, 500);
  }
  memoryAttribution = data;
  attributionAt = capturedAt;
  try { localStorage.setItem(attributionKey, JSON.stringify({ at: capturedAt, data })); } catch { /* no storage */ }
  return data;
}
