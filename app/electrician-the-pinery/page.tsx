import { generateCityMetadata, CityPageContent } from '@/lib/cityPage';

export const generateMetadata = generateCityMetadata('the-pinery');

export default function Page() {
  return <CityPageContent citySlug="the-pinery" />;
}
