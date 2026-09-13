import { generateCityMetadata, CityPageContent } from '@/lib/cityPage';

export const generateMetadata = generateCityMetadata('dove-valley');

export default function Page() {
  return <CityPageContent citySlug="dove-valley" />;
}
