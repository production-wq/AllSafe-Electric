import { generateCityMetadata, CityPageContent } from '@/lib/cityPage';

export const generateMetadata = generateCityMetadata('castle-rock');

export default function Page() {
  return <CityPageContent citySlug="castle-rock" />;
}
