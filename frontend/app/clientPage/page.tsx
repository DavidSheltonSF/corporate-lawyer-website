'use';
import { HeroSection } from '@/components/HeroSection';
import { ClientView } from '@/components/views/ClientView';
import { LawyerView } from '@/components/views/LawyerView';
import { AuthenticatedUserProvider } from '@/contexts/AuthenticatedUserProvider';
import { getMe } from '@/services/users/getMe';
import { User } from '@/types/User';
import { WithId } from '@/types/WithId';
import { redirect } from 'next/navigation';
import { Notifications } from '@/components/features/notifications/Notifications';
import { CaseModal } from '@/components/modals/CaseModal';
import { CaseFilesUploadModal } from '@/components/modals/CaseFilesUploadModal';

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
      <AuthenticatedUserProvider userData={user}>
        <CaseModal />
        <CaseFilesUploadModal />
        {user.role === 'lawyer' ? <LawyerView /> : <ClientView />}
      </AuthenticatedUserProvider>
      <Notifications />
    </div>
  );
}
