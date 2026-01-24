import CasePage from '@/app/clientPage/Case/[id]/page';
import { RouteModal } from '@/components/modals/RouteModal';

export default async function CaseModal({ params }: { params: Promise<{ id: string }> }) {
  return (
    <RouteModal>
      <CasePage params={params} />
    </RouteModal>
  );
}
