import CaseSearchSection from '@/frontend/components/CaseSearchSection';
import { DashboardCard } from '@/frontend/components/DashboardCard';
import { DashboardCardInfo } from '@/frontend/components/DashboardCardInfo';
import { DashBoardSection } from '@/frontend/components/DashBoardSection';
import { DynamicSection } from '@/frontend/components/DynamicSection';
import { DynamicSections } from '@/frontend/components/DynamicSections';
import { HeroSection } from '@/frontend/components/HeroSection';
import { UserDataProvider } from '@/frontend/contexts/UserDataProvider';
import { getTokenFromCookies } from '@/frontend/lib/getTokenFromCookies';
import { fetchUserByToken } from '@/frontend/services/fetchUserByToken';
import { redirect } from 'next/navigation';

export default async function ClientPage() {
  const token = await getTokenFromCookies();
  if (!token) {
    redirect('/clientPageLogin');
  }

  const user = await fetchUserByToken(token);

  if (!user) {
    console.log('Something went wrong');
    redirect('/clientPageLogin');
  }

  return (
    <div className="bg-color-black">
      <HeroSection
        background="var(--blue-gradient)"
        title={`Bem vindo(a) ${user?.role === 'lawyer' ? 'Dra' : ''} ${user?.firstName}`}
        additionalStyles="h-[280px]"
      />

      <UserDataProvider userData={user}>
        <main>
          <DynamicSections sectionsNames={['Geral', 'Processos']}>
            <DynamicSection>
              <DashBoardSection userData={user} />
            </DynamicSection>
            <DynamicSection>
              <CaseSearchSection />
            </DynamicSection>
          </DynamicSections>
        </main>
      </UserDataProvider>
    </div>
  );
}
