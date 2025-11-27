import { Form } from '@/components/Form';
import { HeroSection } from '@/components/HeroSection';
import { InputForm } from '@/components/InputForm';

export default function ClientPage() {
  return (
    <div className="bg-color-black">
      <HeroSection
        background="var(--blue-gradient)"
        title="Página do Cliente"
        description="Clientes cadastrados podem consultar o andamento dos seus processos diretamente na plataforma."
        additionalStyles="h-[280px]"
      />
      <main>
        <section className="flex items-center justify-center h-[90vh] lg:h-[60vh]">
          <Form >
            <InputForm
              id="input-email"
              name="email"
              iconPath="/icons/email-primary-light.svg"
              label="Email"
              type='email'
              required={true}
            />
            <InputForm
              id="input-password"
              name="password"
              iconPath="/icons/lock-primary-light.svg"
              label="Password"
              type='password'
              required={true}
            />
            <button
              type="submit"
              className="w-full bg-[var(--primary-color-light)] rounded-full font-bold h-[40px] hover:brightness-124 transition-all duration-[300ms] cursor-pointer"
            >
              Entrar
            </button>
          </Form>
        </section>
      </main>
    </div>
  );
}
