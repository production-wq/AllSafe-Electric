import { generateCityMetadata, CityPageContent } from '@/lib/cityPage';

export const generateMetadata = generateCityMetadata('centennial');

export default function Page() {
  return <CityPageContent citySlug="centennial" />;
}
