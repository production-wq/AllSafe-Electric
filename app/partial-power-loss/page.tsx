import { PaidRepairPage } from '@/components/PaidRepairPage';
import { paidRepairs } from '@/lib/paidRepairs';
import { pageMetadata } from '@/lib/seo';

const page = paidRepairs['partial-power-loss'];
export const metadata = pageMetadata({ path: '/partial-power-loss/', title: page.title, description: page.description, index: false });
export default function Page() { return <PaidRepairPage page={page} />; }
