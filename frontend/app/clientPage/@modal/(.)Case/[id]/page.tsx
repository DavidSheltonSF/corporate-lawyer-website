import CasePage from '@/app/clientPage/Case/[id]/page';
import { PrimaryModalWindow } from '@/components/PrimaryModalWindow';

export default async function CaseModal({ params }: { params: Promise<{ id: string }> }) {
  return (
    <PrimaryModalWindow>
      <CasePage params={params} />
    </PrimaryModalWindow>
  );
}
