import CaseSearchSection from '@/components/CaseSearchSection';
import { DashboardCard } from '@/components/DashboardCard';
import { DashboardCardInfo } from '@/components/DashboardCardInfo';
import { DashBoardSection } from '@/components/DashBoardSection';
import { DynamicSection } from '@/components/DynamicSection';
import { DynamicSections } from '@/components/DynamicSections';
import { HeroSection } from '@/components/HeroSection';
import { UserDataProvider } from '@/contexts/UserDataProvider';
import { getTokenFromCookies } from '@/lib/getTokenFromCookies';
import { fetchUserByToken } from '@/services/fetchUserByToken';
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
             <DashBoardSection userData={user}/>
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
