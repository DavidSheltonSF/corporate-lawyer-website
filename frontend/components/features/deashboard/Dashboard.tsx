import { DashboardCard } from '@/components/DashboardCard';
import { DashboardCardInfo } from '@/components/DashboardCardInfo';
import { CasesStats } from '@/types/CasesStats';

interface Props {
  data?: CasesStats;
}

export function Dashboard({ data }: Props) {
  return (
    <div className="flex flex-wrap gap-[40px]">
      <DashboardCard title="Processos" sectionIndex={1}>
        <DashboardCardInfo name="Em andamento" value={data?.open || 0} />
        <DashboardCardInfo name="Encerrados" value={data?.closed || 0} />
      </DashboardCard>
      <DashboardCard title="Atendimento">
        <DashboardCardInfo name="Data" value="2 de jan. de 2026" />
      </DashboardCard>
      <DashboardCard title="Próxima audiência">
        <DashboardCardInfo name="Data" value="15 de jan. de 2026" />
      </DashboardCard>
      <DashboardCard title="Documentação">
        <DashboardCardInfo name="status" value="pendente" />
      </DashboardCard>
    </div>
  );
}
