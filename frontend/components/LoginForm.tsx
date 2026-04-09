'use client';
import { Activity, ReactNode, useState } from 'react';
import { InputForm } from './InputForm';
import { LoadingMessage } from './LoadingMessage';

import { login } from '@/actions/login';
import { redirect } from 'next/navigation';

export function LoginForm() {
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    let authError = false;
    try {
      await login(formData);
    } catch (error: any) {
      console.log(error);
      setErrorMessage(error.message);
      authError = true;
    } finally {
      setLoading(false);
      if (!authError) {
        redirect('/clientPage');
      }
    }
  }
  return (
    <form
      className="flex flex-col w-[90%] lg:w-[480px] bg-color-primary border-[2px] border-color-primary-light rounded-[16px] px-[24px] py-[40px]  gap-[32px] text-color-white text-xl"
      action={handleSubmit}
    >
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
    </form>
  );
}
