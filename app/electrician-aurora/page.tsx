import { generateCityMetadata, CityPageContent } from '@/lib/cityPage';

export const generateMetadata = generateCityMetadata('aurora');

export default function Page() {
  return <CityPageContent citySlug="aurora" />;
}
