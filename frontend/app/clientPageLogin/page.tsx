'use client';

import { login } from '@/actions/login';
import { Form } from '@/components/Form';
import { HeroSection } from '@/components/HeroSection';
import { InputForm } from '@/components/InputForm';
import { LoadingMessage } from '@/components/LoadingMessage';
import { redirect } from 'next/navigation';
import { Activity, useState } from 'react';

export default function ClientPageLogin() {
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    try {
      await login(formData);
    } catch (error: any) {
      console.log(error);
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
      if (errorMessage === '') {
        redirect('/clientPage');
      }
    }
  }

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
          <Form action={handleSubmit}>
            <Activity mode={errorMessage !== '' ? 'visible' : 'hidden'}>
              <div className="text-red-400 text-center font-bold">
                <p>{errorMessage}</p>
              </div>
            </Activity>
            <div className="text-center font-bold">
              <LoadingMessage message="Loading" loading={loading} />
            </div>

            <InputForm
              id="input-email"
              name="email"
              iconPath="/icons/email-primary-light.svg"
              label="Email"
              type="email"
              required={true}
            />
            <InputForm
              id="input-password"
              name="password"
              iconPath="/icons/lock-primary-light.svg"
              label="Password"
              type="password"
              required={true}
            />
            <button
              type="submit"
              className="w-full bg-[var(--primary-color-light)] rounded-full font-bold h-[40px] hover:brightness-124 transition-all duration-[300ms] cursor-pointer"
              onClick={() => setLoading(true)}
            >
              Entrar
            </button>
          </Form>
        </section>
      </main>
    </div>
  );
}
