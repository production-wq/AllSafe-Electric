import { generateCityMetadata, CityPageContent } from '@/lib/cityPage';

export const generateMetadata = generateCityMetadata('franktown');

export default function Page() {
  return <CityPageContent citySlug="franktown" />;
}
