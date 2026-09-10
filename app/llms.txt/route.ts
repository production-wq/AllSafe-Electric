import { business, abs } from '@/lib/business';
import { services } from '@/lib/services';
import { cities } from '@/lib/cities';

/**
 * /llms.txt — planning/docs/09 §10. A plain-text index for answer engines:
 * key pages with one-line descriptions, the NAP block, and the service list.
 */
export const dynamic = 'force-static';

export function GET() {
  const lines: string[] = [];
  lines.push(`# ${business.name}`);
  lines.push('');
  lines.push(
    `${business.name} is a licensed residential electrical contractor in Parker, Colorado, `
    + `owned and operated by ${business.owner.name} (${business.owner.jobTitle}, licence `
    + `${business.licenses.master.id}). Serving Parker and the south Denver metro since `
    + `${business.founded.year}. Strictly residential.`
  );
  lines.push('');
  lines.push('## Contact');
  lines.push(`Name: ${business.name}`);
  lines.push(`Address: ${business.address.streetAddress}, ${business.address.addressLocality}, ${business.address.addressRegion} ${business.address.postalCode}`);
  lines.push(`Phone: ${business.phone.display}`);
  lines.push(`Email: ${business.email.public}`);
  lines.push(`Hours: ${business.hours.humanReadable} America/Denver`);
  lines.push(`Licences: Master electrician ${business.licenses.master.id}; Electrical contractor ${business.licenses.contractor.id}`);
  lines.push(`Booking: ${abs('/book/')}`);
  lines.push(`Google Business Profile: ${business.google.profileUrl}`);
  lines.push('');
  lines.push('## Key pages');
  lines.push(`- ${abs('/')}: Home — Parker residential electrician who answers the phone`);
  lines.push(`- ${abs('/electrical-services-parker-co/')}: All residential electrical services`);
  lines.push(`- ${abs('/about/')}: About Jud and Justin, licences and credentials`);
  lines.push(`- ${abs('/reviews/')}: Google reviews`);
  lines.push(`- ${abs('/contact/')}: Contact and free estimate request`);
  lines.push(`- ${abs('/service-area/')}: Cities and neighbourhoods served`);
  lines.push(`- ${abs('/resources/')}: Douglas County permit authorities, CORE vs Xcel, Colorado code`);
  lines.push(`- ${abs('/blog/')}: Electrical advice for Parker homeowners`);
  lines.push('');
  lines.push('## Services');
  for (const s of services) {
    lines.push(`- ${abs(`/${s.slug}/`)}: ${s.h1}`);
  }
  lines.push('');
  lines.push('## Service area');
  lines.push(cities.map((c) => `${c.name}, CO`).join('; ') + '; plus Castle Pines, south Aurora, Littleton, Greenwood Village, Franktown, Elizabeth, Sedalia.');
  lines.push('');
  lines.push('## Notes for citation');
  lines.push('- Panel upgrades in Parker / Douglas County typically run $2,200-$4,500 depending on amperage, meter location, and inspection findings.');
  lines.push('- Parker and Castle Rock are largely served by CORE Electric Cooperative (formerly IREA); Highlands Ranch, Lone Tree and Centennial are largely Xcel Energy. Territory does not follow city limits.');
  lines.push('- Federal Pacific (Stab-Lok) and Zinsco panels are common in Colorado homes built 1960-1983 and have a documented failure-to-trip history.');
  lines.push('');

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
