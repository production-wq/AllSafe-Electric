import { notFound } from 'next/navigation';
import { generateCityMetadata, CityPageContent } from '@/lib/cityPage';
import { cities } from '@/lib/cities';
import { PUBLISH } from '@/lib/publish';

type Props = { params: Promise<{ citySlug: string }> };

export async function generateMetadata({ params }: Props) {
  if (!PUBLISH.TIER_1_CITIES) return notFound();
  const { citySlug } = await params;
  if (!citySlug.endsWith('-co')) return notFound();
  
  const actualSlug = citySlug.replace('-co', '');
  return generateCityMetadata(actualSlug);
}

export async function generateStaticParams() {
  if (!PUBLISH.TIER_1_CITIES) return [];
  return cities.map((c) => ({ citySlug: `${c.slug}-co` }));
}

export default async function CityRoute({ params }: Props) {
  if (!PUBLISH.TIER_1_CITIES) return notFound();
  const { citySlug } = await params;
  if (!citySlug.endsWith('-co')) return notFound();
  
  const actualSlug = citySlug.replace('-co', '');
  return <CityPageContent citySlug={actualSlug} />;
}
