import { generateCityMetadata, CityPageContent } from '@/lib/cityPage';

export const generateMetadata = generateCityMetadata('greenwood-village');

export default function Page() {
  return <CityPageContent citySlug="greenwood-village" />;
}
