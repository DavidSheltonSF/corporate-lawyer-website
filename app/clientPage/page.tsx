'use client';
import { HeroSection } from '@/components/HeroSection';
import { getTokenFromCookies } from '@/lib/getTokenFromCookies';
import { getUserInformation } from '@/lib/getUserInformation';
import { UserProps } from '@/types/UserProps';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ClientPage() {
  const [user, setUser] = useState<UserProps>({
    firstName: '',
    lastName: '',
    email: '',
    cpf: '',
    password: '',
    role: 'client',
  });

  useEffect(() => {
    async function loadUserInfo() {
      const token = await getTokenFromCookies();
      if (!token) {
        redirect('/clientPageLogin');
      }

      const userData = await getUserInformation(token);

      if (!userData) {
        console.log('Something went wrong');
        redirect('/clientPageLogin');
      }
      setUser(userData);
    }
    loadUserInfo();
  }, []);

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
