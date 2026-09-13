import { generateCityMetadata, CityPageContent } from '@/lib/cityPage';

export const generateMetadata = generateCityMetadata('denver');

export default function Page() {
  return <CityPageContent citySlug="denver" />;
}
