import { generateCityMetadata, CityPageContent } from '@/lib/cityPage';

export const generateMetadata = generateCityMetadata('parker');

export default function Page() {
  return <CityPageContent citySlug="parker" />;
}
