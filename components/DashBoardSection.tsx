import { DashboardCard } from './DashboardCard';
import { DashboardCardInfo } from './DashboardCardInfo';
import { WithId } from '@/types/WIthId';
import { UserProps } from '@/types/UserProps';

interface Props {
  userData: WithId<UserProps>;
}

export async function DashBoardSection({ userData }: Props) {
  return (
    <div className="flex gap-[40px]">
      <DashboardCard title="Processos">
        <DashboardCardInfo name="Em andamento" value={0} />
        <DashboardCardInfo name="Encerrados" value={0} />
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
