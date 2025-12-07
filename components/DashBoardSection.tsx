import { DashboardCard } from './DashboardCard';
import { DashboardCardInfo } from './DashboardCardInfo';
import { WithId } from '@/types/WIthId';
import { UserProps } from '@/types/UserProps';
import { fetchClientCases } from '@/services/fetchClientCases';
import { CaseStatusEnum } from '@/types/CaseProps';

interface Props {
  userData: WithId<UserProps>;
}

export async function DashBoardSection({ userData }: Props) {
  const inProgressCasesPromise = fetchClientCases(userData.id, {
    page: 1,
    limit: 4,
    status: CaseStatusEnum.em_andamento,
  });

  const closedCasesPromise = fetchClientCases(userData.id, {
    page: 1,
    limit: 4,
    status: CaseStatusEnum.encerrado,
  });

  const [inProgressCases, closedCases] = await Promise.all([
    inProgressCasesPromise,
    closedCasesPromise,
  ]);

  return (
    <div className="flex gap-[40px]">
      <DashboardCard title="Processos">
        <DashboardCardInfo name="Em andamento" value={inProgressCases?.total} />
        <DashboardCardInfo name="Encerrados" value={closedCases?.total} />
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
