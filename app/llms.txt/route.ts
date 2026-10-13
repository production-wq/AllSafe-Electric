import { business, abs } from '@/lib/business';
import { services } from '@/lib/services';
import { cities } from '@/lib/cities';

/**
 * /llms.txt, planning/docs/09 §10. A plain-text index for answer engines:
 * key pages with one-line descriptions, the NAP block, and the service list.
 */
export const dynamic = 'force-static';

export function GET() {
  const panel = services.find((s) => s.slug === 'electrical-panel-services');
  const fmt = (n: number) => `$${n.toLocaleString('en-US')}`;
  const link = (path: string, title: string, note: string) => `- [${title}](${abs(path)}): ${note}`;

  const lines: string[] = [];
  // llmstxt.org structure: H1, blockquote summary, details, then H2 sections of markdown link lists.
  lines.push(`# ${business.name}`);
  lines.push('');
  lines.push(
    `> ${business.name} is a licensed residential electrical contractor in Parker, Colorado, serving `
    + `the south Denver metro since ${business.founded.year}. Residential work only.`
  );
  lines.push('');
  lines.push(
    `Owned and operated by ${business.owner.name} (${business.owner.jobTitle}, license `
    + `${business.licenses.master.id}). Electrical contractor license ${business.licenses.contractor.id}. `
    + `We are open weekdays, 8am to 6pm.`
  );
  lines.push('');
  lines.push(`- Address: ${business.address.streetAddress}, ${business.address.addressLocality}, ${business.address.addressRegion} ${business.address.postalCode}`);
  lines.push(`- Phone: ${business.phone.display}`);
  lines.push(`- Email: ${business.email.public}`);
  lines.push('');
  lines.push('## Key pages');
  lines.push(link('/', 'Home', 'Parker residential electrician overview'));
  lines.push(link('/electrical-services/', 'Electrical services', 'All residential electrical services'));
  lines.push(link('/about/', 'About', 'Company story, licenses and credentials'));
  lines.push(link('/reviews/', 'Reviews', 'Google reviews from local homeowners'));
  lines.push(link('/contact/', 'Contact', 'Call or request a free estimate'));
  lines.push(link('/service-area/', 'Service area', 'Cities and neighborhoods served'));
  lines.push('');
  lines.push('## Services');
  for (const s of services) {
    lines.push(link(`/${s.slug}/`, s.h1, s.blurb));
  }
  lines.push('');
  lines.push('## Guides');
  lines.push(link('/resources/', 'Resources', 'Douglas County permit authorities, CORE vs Xcel, Colorado code'));
  lines.push(link('/blog/', 'Blog', 'Electrical advice for Parker homeowners'));
  lines.push('');
  lines.push('## Optional');
  lines.push(link('/coupons/', 'Coupons', 'Current offers'));
  lines.push(link('/privacy-policy/', 'Privacy policy', 'How we handle your information'));
  lines.push(`- [Google Business Profile](${business.google.profileUrl}): Hours, photos and reviews`);
  lines.push('');
  lines.push('## Service area');
  lines.push(cities.map((c) => `${c.name}, CO`).join('; ') + '.');
  lines.push('');
  lines.push('## Notes for citation');
  if (panel) {
    lines.push(`- Panel upgrades in Parker and Douglas County typically run ${fmt(panel.priceRange.low)} to ${fmt(panel.priceRange.high)} depending on amperage, meter location, and inspection findings.`);
  }
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
