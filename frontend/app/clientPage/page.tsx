import CaseSearchSection from '@/components/CaseSearchSection';
import { DashboardSection } from '@/components/DashboardSection';
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
    <div className="bg-color-black min-h-[100vh]">
      <HeroSection
        background="var(--blue-gradient)"
        title={`Bem vindo(a) ${user?.role === 'lawyer' ? 'Dra' : ''} ${user?.firstName}`}
        additionalStyles="h-[280px]"
      />

      <UserDataProvider userData={user}>
        <main>
          <DynamicSections sectionsNames={['Geral', 'Processos']}>
            <DynamicSection>
              <DashboardSection userData={user} />
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
