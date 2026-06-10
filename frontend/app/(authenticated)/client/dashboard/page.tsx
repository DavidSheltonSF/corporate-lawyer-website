import { DashboardSection } from '@/components/DashboardSection';
import { Text } from '@/components/ui/Text';

export default async function ClientPage() {
  return (
    <div className="flex flex-col gap-[24px]">
      <Text as={'h1'} variant='h1'>Dashboard</Text>
      <DashboardSection />
    </div>
  );
}
