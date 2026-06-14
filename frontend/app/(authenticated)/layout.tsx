import '@/styles/globals.css';
import '@/styles/animations.css';
import { ClientNavbar } from '@/components/layout/Navbar/ClientNavbar';
import { ModalRenderer } from '@/components/renderer/ModalRenderer';
import { getMe } from '@/services/users/getMe';
import { redirect } from 'next/navigation';
import { AuthHydrator } from '@/components/AuthHydrator';
import { Notifications } from '@/components/features/notifications/Notifications';
import { QueryProvider } from '@/components/providers/QueryProvider';

export default async function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  try {
    const response = await getMe();
    if (!response.success) {
      redirect('/login');
    }

    if (!response.data) {
      throw new Error('Response was successful but user data was not provided');
    }
    const user = response.data;

    return (
      <>
        <QueryProvider>
          <AuthHydrator user={user}>
            <ClientNavbar />
            <ModalRenderer />
            <main className="flex-1 p-[40px] min-h-[90vh]">{children}</main>
            <Notifications />
          </AuthHydrator>
        </QueryProvider>
      </>
    );
  } catch (error) {
    console.log(error);
    redirect('/login');
  }
}
