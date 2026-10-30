import { PaidRepairPage } from '@/components/PaidRepairPage';
import { paidRepairs } from '@/lib/paidRepairs';
import { pageMetadata } from '@/lib/seo';

const page = paidRepairs['outlet-gfci-repair'];
export const metadata = pageMetadata({ path: '/outlet-gfci-repair/', title: page.title, description: page.description, index: false });
export default function Page() { return <PaidRepairPage page={page} />; }
