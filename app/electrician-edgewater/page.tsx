import { generateCityMetadata, CityPageContent } from '@/lib/cityPage';

export const generateMetadata = generateCityMetadata('edgewater');

export default function Page() {
  return <CityPageContent citySlug="edgewater" />;
}
