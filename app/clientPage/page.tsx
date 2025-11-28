import { HeroSection } from '@/components/HeroSection';
import { getUserInformation } from '@/lib/getUserInformation';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function ClientPage() {
  const cookieStore = await cookies();
  const auth = cookieStore.get('authentication');
  const token = auth?.value;
  if (!token) {
    redirect('/clientLogin');
  }
  const user = await getUserInformation(token);

  if (!user) {
    console.log('Some thing went wrong');
    redirect('/clientLogin');
  }

  return (
    <div className="bg-color-black">
      <HeroSection
        background="var(--blue-gradient)"
        title={`Bem vindo(a) ${user.role === 'lawyer' ? 'Dra' : ''} ${user.firstName}`}
        additionalStyles="h-[280px]"
      />
      <main>
        <section className="flex items-center justify-center h-[90vh] lg:h-[60vh]"></section>
      </main>
    </div>
  );
}
