'use client';
import { Activity, useEffect, useState } from 'react';
import { InputForm } from './InputForm';
import { LoadingMessage } from './LoadingMessage';

import { login } from '@/actions/login';
import { redirect } from 'next/navigation';
import { RequestState } from '@/types/RequestState';
import { Button } from './ui/Button/Button';
import { ButtonVariant } from './ui/Button/ButtonVariant';
import { Input } from './ui/Input/Input';
import { RequestFeedback } from './ui/Feedback/RequestFeedback';

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
      className="flex flex-col w-[90%] min-md:w-[70%] min-lg:w-[480px] bg-color-white rounded-md p-[24px] gap-[24px] text-color-black"
      action={handleSubmit}
    >
      <h1>Entrar</h1>
      <RequestFeedback requestState={requestState} />
      <div className="text-center font-bold">
        <LoadingMessage message="Loading" loading={requestState?.status === 'loading'} />
      </div>

      <Input id="input-email" name="email" type="email" required={true} placeholder="Email" />
      <Input
        id="input-password"
        name="password"
        type="password"
        required={true}
        placeholder="Senha"
      />
      <Button variant={ButtonVariant.PRIMARY} type="submit" className="w-full">
        Entrar
      </Button>
    </form>
  );
}
