import { generateCityMetadata, CityPageContent } from '@/lib/cityPage';

export const generateMetadata = generateCityMetadata('acres-green');

export default function Page() {
  return <CityPageContent citySlug="acres-green" />;
}
