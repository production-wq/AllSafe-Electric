import { generateCityMetadata, CityPageContent } from '@/lib/cityPage';

export const generateMetadata = generateCityMetadata('lakewood');

export default function Page() {
  return <CityPageContent citySlug="lakewood" />;
}
