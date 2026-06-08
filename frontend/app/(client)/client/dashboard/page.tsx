import { HeroSection } from '@/components/HeroSection';
import { ClientView } from '@/components/views/ClientView';
import { LawyerView } from '@/components/views/LawyerView';
import { getMe } from '@/services/users/getMe';
import { redirect } from 'next/navigation';
import { Notifications } from '@/components/features/notifications/Notifications';
import { ModalRenderer } from '@/components/renderer/ModalRenderer';
import { AuthHydrator } from '@/components/AuthHydrator';

export default async function ClientPage() {
  try {
    const response = await getMe();
    if (!response.success) {
      redirect('/clientPageLogin');
    }

    if (!response.data) {
      throw new Error('Response was successful but user data was not provided');
    }
    const user = response.data;

    return (
      <AuthHydrator user={user}>
        <ModalRenderer />
        <div className="bg-color-black min-h-[100vh]">
          <HeroSection
            background="var(--blue-gradient)"
            title={`Bem vinda(a) ${user?.role === 'lawyer' ? 'Dra' : ''} ${user?.firstName}`}
            additionalStyles="h-[280px]"
          />
          {user.role === 'lawyer' ? <LawyerView /> : <ClientView />}

          <Notifications />
        </div>
      </AuthHydrator>
    );
  } catch (error) {
    console.log(error);
    redirect('/clientPageLogin');
  }
}
