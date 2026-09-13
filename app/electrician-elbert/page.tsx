import { generateCityMetadata, CityPageContent } from '@/lib/cityPage';

export const generateMetadata = generateCityMetadata('elbert');

export default function Page() {
  return <CityPageContent citySlug="elbert" />;
}
