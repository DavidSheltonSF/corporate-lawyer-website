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
        <section className="flex flex-col items-center justify-center h-[60vh] lg:h-[60vh]">
          <div className="text-yellow-300">
            <strong>Public credentials (this is currently a personal project)</strong>
            <p>email: flavia@email.com</p>
            <p>password: Flavia@123</p>
          </div>
          <LoginForm />
        </section>
      </main>
    </div>
  );
}
