const fs = require('fs');

const path = '/Users/saikatchowdhury444gmail.com/Desktop/AllSafe-Electric/data/url-map.csv';
let content = fs.readFileSync(path, 'utf8');

// Reverse the electrical-services one
content = content.replace(
  '/electrical-services/,B,/electrical-services-parker-co/,301,Homepage hero linked here; nav+footer link to the -parker-co hub. Consolidate to the indexed one. VERIFY against GSC (planning/docs/99 #1).,,1',
  '/electrical-services-parker-co/,B,/electrical-services/,301,Single URL pattern per page type,,1'
);

// Add emergency repairs redirect
content += '/emergency-electrical-repairs-parker-co/,B,/emergency-electrical-repairs/,301,Single URL pattern per page type,,\n';

// The 21 cities
const cities = [
  'parker', 'castle-rock', 'highlands-ranch', 'lone-tree', 'centennial',
  'the-pinery', 'stonegate', 'castle-pines', 'franktown', 'elizabeth',
  'foxfield', 'dove-valley', 'elbert', 'englewood', 'littleton',
  'aurora', 'cherry-hills-village', 'greenwood-village', 'roxborough-park',
  'meridian', 'cottonwood'
];

// Let's actually extract cities from lib/cities.ts
const citiesContent = fs.readFileSync('/Users/saikatchowdhury444gmail.com/Desktop/AllSafe-Electric/lib/cities.ts', 'utf8');
const citySlugs = [];
const regex = /slug:\s*'([^']+)'/g;
let match;
while ((match = regex.exec(citiesContent)) !== null) {
  citySlugs.push(match[1]);
}

// tier2Areas are also mapped to slugs in service-area/page.tsx
const tier2Regex = /export const tier2Areas = \[(.*?)\];/s;
const tier2Match = tier2Regex.exec(citiesContent);
if (tier2Match) {
  const t2 = tier2Match[1].split(',').map(s => s.trim().replace(/['"]/g, '')).filter(Boolean);
  for (const name of t2) {
    const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    if (!citySlugs.includes(slug)) citySlugs.push(slug);
  }
}

for (const slug of citySlugs) {
  content += `/electrician-${slug}/,B,/electricians/${slug}-co/,301,Single URL pattern per page type,,\n`;
}

fs.writeFileSync(path, content);
console.log('Updated url-map.csv with ' + citySlugs.length + ' city slugs');
