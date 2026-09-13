import { generateCityMetadata, CityPageContent } from '@/lib/cityPage';

export const generateMetadata = generateCityMetadata('littleton');

export default function Page() {
  return <CityPageContent citySlug="littleton" />;
}
