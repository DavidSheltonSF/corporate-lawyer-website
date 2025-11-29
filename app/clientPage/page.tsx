import { DashboardCard } from '@/components/DashboardCard';
import { DashboardCardInfo } from '@/components/DashboardCardInfo';
import { DynamicSection } from '@/components/DynamicSection';
import { DynamicSections } from '@/components/DynamicSections';
import { HeroSection } from '@/components/HeroSection';
import { getTokenFromCookies } from '@/lib/getTokenFromCookies';
import { getUserInformation } from '@/lib/getUserInformation';
import { redirect } from 'next/navigation';

export default async function ClientPage() {
  const token = await getTokenFromCookies();
  if (!token) {
    redirect('/clientPageLogin');
  }

  const user = await getUserInformation(token);

  if (!user) {
    console.log('Something went wrong');
    redirect('/clientPageLogin');
  }

  // await new Promise((resolve) => {
  //   setTimeout(resolve, 2000); // 2 seconds
  // });

  return (
    <div className="bg-color-black">
      <HeroSection
        background="var(--blue-gradient)"
        title={`Bem vindo(a) ${user?.role === 'lawyer' ? 'Dra' : ''} ${user?.firstName}`}
        additionalStyles="h-[280px]"
      />
      <main>
        <DynamicSections sectionsNames={['Geral', 'Processos']}>
          <DynamicSection>
            <div className="flex gap-[40px]">
              <DashboardCard title="Processos">
                <DashboardCardInfo name="Em andamento" value={1} />
                <DashboardCardInfo name="Encerrados" value={2} />
              </DashboardCard>
              <DashboardCard title="Atendimento">
                <DashboardCardInfo name="Data" value="2 de jan. de 2026" />
              </DashboardCard>
              <DashboardCard title="Próxima audiência">
                <DashboardCardInfo name="Data" value="15 de jan. de 2026" />
              </DashboardCard>
              <DashboardCard title='Documentação'>
                <DashboardCardInfo name="status" value="pendente"/>
              </DashboardCard>
            </div>
          </DynamicSection>
          <DynamicSection>
            <div>
              <h1>Processos</h1>
            </div>
          </DynamicSection>
        </DynamicSections>
      </main>
    </div>
  );
}
