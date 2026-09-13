import { generateCityMetadata, CityPageContent } from '@/lib/cityPage';

export const generateMetadata = generateCityMetadata('stonegate');

export default function Page() {
  return <CityPageContent citySlug="stonegate" />;
}
