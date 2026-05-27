import { DashboardCard } from '@/components/DashboardCard';
import { DashboardCardInfo } from '@/components/DashboardCardInfo';

interface Props {
  data: {
    open: number;
    closed: number;
  };
}

export function Dashboard({ data }: Props) {
  return (
    <div className="flex flex-wrap gap-[40px]">
      <DashboardCard title="Processos" sectionIndex={1}>
        <DashboardCardInfo name="Em andamento" value={data.open} />
        <DashboardCardInfo name="Encerrados" value={data.closed} />
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
