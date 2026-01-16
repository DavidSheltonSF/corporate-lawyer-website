import CaseSearchSection from '@/components/CaseSearchSection';
import { DashboardSection } from '@/components/DashboardSection';
import { DynamicSection } from '@/components/DynamicSection';
import { DynamicSections } from '@/components/DynamicSections';
import { HeroSection } from '@/components/HeroSection';
import { UserDataProvider } from '@/contexts/UserDataProvider';
import { fetchUserByToken } from '@/services/fetchUserByToken';
import { User } from '@/types/User';
import { WithId } from '@/types/WithId';
import { redirect } from 'next/navigation';

export default async function ClientPage() {
  let user: WithId<User> | null = null;

  try {
    user = await fetchUserByToken();
  } catch (error) {
    console.log(error);
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
              <DashboardSection />
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
