import { generateCityMetadata, CityPageContent } from '@/lib/cityPage';

export const generateMetadata = generateCityMetadata('highlands-ranch');

export default function Page() {
  return <CityPageContent citySlug="highlands-ranch" />;
}
