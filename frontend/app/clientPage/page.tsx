import { HeroSection } from '@/components/HeroSection';
import { ClientView } from '@/components/views/ClientView';
import { LawyerView } from '@/components/views/LawyerView';
import { UserDataProvider } from '@/contexts/UserDataProvider';
import { getMe } from '@/services/getMe';
import { User } from '@/types/User';
import { WithId } from '@/types/WithId';
import { redirect } from 'next/navigation';

export default async function ClientPage() {
  let user: WithId<User> | null = null;

  try {
    user = await getMe();
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
        {user.role === 'lawyer' ? <LawyerView /> : <ClientView />}
      </UserDataProvider>
    </div>
  );
}
