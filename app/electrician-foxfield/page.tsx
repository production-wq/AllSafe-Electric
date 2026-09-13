import { generateCityMetadata, CityPageContent } from '@/lib/cityPage';

export const generateMetadata = generateCityMetadata('foxfield');

export default function Page() {
  return <CityPageContent citySlug="foxfield" />;
}
