'use client';
import { Activity, ReactNode, useEffect, useState } from 'react';
import { InputForm } from './InputForm';
import { LoadingMessage } from './LoadingMessage';

import { login } from '@/actions/login';
import { redirect } from 'next/navigation';
import { RequestState } from '@/types/RequestState';

export function LoginForm() {
  const [requestState, setRequestState] = useState<RequestState | null>(null);

  async function handleSubmit(formData: FormData) {
    try {
      setRequestState({ status: 'loading' });
      await login(formData);
      setRequestState({ status: 'ok' });
    } catch (error: any) {
      console.log(error);
      setRequestState({ status: 'error', message: error.message });
    }
  }

  useEffect(() => {
    if (requestState?.status === 'ok') {
      redirect('/clientPage');
    }
  }, [requestState]);

  return (
    <form
      className="flex flex-col w-[90%] lg:w-[480px] bg-color-primary border-[2px] border-color-primary-light rounded-[16px] px-[24px] py-[40px]  gap-[32px] text-color-white text-xl"
      action={handleSubmit}
    >
      <Activity mode={requestState?.status === 'error' ? 'visible' : 'hidden'}>
        <div className="text-red-400 text-center font-bold">
          <p>{requestState?.message}</p>
        </div>
      </Activity>
      <div className="text-center font-bold">
        <LoadingMessage message="Loading" loading={requestState?.status === 'loading'} />
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
      >
        Entrar
      </button>
    </form>
  );
}
