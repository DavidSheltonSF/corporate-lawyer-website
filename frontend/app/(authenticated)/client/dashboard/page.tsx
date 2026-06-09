import { DashboardSection } from '@/components/DashboardSection';

export default async function ClientPage() {
  return (
    <div className="flex flex-col gap-[24px]">
      <h1>Dashboard</h1>
      <DashboardSection />
    </div>
  );
}
