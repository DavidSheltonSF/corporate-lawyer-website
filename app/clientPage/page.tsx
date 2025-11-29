'use client';
import { DynamicSection } from '@/components/DynamicSection';
import { DynamicSections } from '@/components/DynamicSections';
import { HeroSection } from '@/components/HeroSection';
import { getTokenFromCookies } from '@/lib/getTokenFromCookies';
import { getUserInformation } from '@/lib/getUserInformation';
import { UserProps } from '@/types/UserProps';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ClientPage() {
  const [user, setUser] = useState<UserProps | null>(null);

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
        title={`Bem vindo(a) ${user?.role === 'lawyer' ? 'Dra' : ''} ${user?.firstName}`}
        additionalStyles="h-[280px]"
      />
      <main>
        <DynamicSections sectionsNames={['Geral', 'Processos']}>
          <DynamicSection>
            <div>
              <h1>Geral</h1>
            </div>
          </DynamicSection>
          <DynamicSection>
            <div>
              <h1>Processos</h1>
            </div>
          </DynamicSection>
        </DynamicSections>
      </main>
    </div>
  );
}
