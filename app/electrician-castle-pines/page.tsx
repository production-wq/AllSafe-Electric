import { generateCityMetadata, CityPageContent } from '@/lib/cityPage';

export const generateMetadata = generateCityMetadata('castle-pines');

export default function Page() {
  return <CityPageContent citySlug="castle-pines" />;
}
