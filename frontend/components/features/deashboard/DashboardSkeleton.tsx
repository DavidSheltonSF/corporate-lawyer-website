import { DashboardCardSkeleton } from '@/components/DashboardCardSkeleton';


export function DashboardSkeleton() {
  return (
    <div className="flex flex-wrap gap-[40px]">
      <DashboardCardSkeleton title="Processos" />
      <DashboardCardSkeleton title="Atendimento" />
      <DashboardCardSkeleton title="Próxima audiência" />
      <DashboardCardSkeleton title="Documentação" />
    </div>
  );
}
