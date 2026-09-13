import { generateCityMetadata, CityPageContent } from '@/lib/cityPage';

export const generateMetadata = generateCityMetadata('elizabeth');

export default function Page() {
  return <CityPageContent citySlug="elizabeth" />;
}
