'use client';
import { LoginForm } from '@/components/LoginForm';
import { HeroSection } from '@/components/HeroSection';

export default function ClientPageLogin() {
  return (
    <div className="bg-color-black">
      <HeroSection
        background="var(--blue-gradient)"
        title="Página do Cliente"
        description="Clientes cadastrados podem consultar o andamento dos seus processos diretamente na plataforma."
        additionalStyles="h-[280px]"
      />
      <main>
        <section className="flex items-center justify-center h-[60vh] lg:h-[60vh]">
          <LoginForm />
        </section>
      </main>
    </div>
  );
}
