import { generateCityMetadata, CityPageContent } from '@/lib/cityPage';

export const generateMetadata = generateCityMetadata('englewood');

export default function Page() {
  return <CityPageContent citySlug="englewood" />;
}
