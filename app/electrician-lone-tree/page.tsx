import { generateCityMetadata, CityPageContent } from '@/lib/cityPage';

export const generateMetadata = generateCityMetadata('lone-tree');

export default function Page() {
  return <CityPageContent citySlug="lone-tree" />;
}
