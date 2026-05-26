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
import { InputFeedback } from './ui/Input/InputFeedback';

export function LoginForm() {
  const [requestState, setRequestState] = useState<RequestState | null>(null);
  const errors = requestState?.details?.fields;
  const isLoading = requestState?.status === 'loading';

  async function handleSubmit(formData: FormData) {
    try {
      setRequestState({ status: 'loading' });
      await new Promise((resolve) => setTimeout(resolve, 5000));
      const response = await login(formData);
      if (!response.success) {
        setRequestState({
          status: 'error',
          message: response.message,
          code: response.code,
          details: response.details,
        });
        return;
      }
      setRequestState({ status: 'ok' });
    } catch (error: any) {
      console.log(error);
      setRequestState({ status: 'error', message: 'Erro inesperado' });
    }
  }

  useEffect(() => {
    if (requestState?.status === 'ok') {
      redirect('/clientPage');
    }
  }, [requestState]);

  return (
    <form
      className="flex flex-col w-[90%] min-md:w-[50%] min-lg:w-[480px] rounded-md p-[24px] gap-[24px] text-color-black text-center"
      action={handleSubmit}
    >
      <h1 className="text-color-white">Acessar plataforma</h1>
      <RequestFeedback requestState={requestState} />
      <div className="text-center font-bold text-white bg-green-200 h-[50px]">
        <LoadingMessage message="Loading" loading={isLoading} />
        {requestState?.status}
        {String(isLoading)}
      </div>

      <div className="flex flex-col gap-[4px] items-start">
        <Input
          className="bg-color-white"
          id="input-email"
          name="email"
          type="email"
          required={true}
          placeholder="Email"
          //onChange={() => setRequestState(null)}
        />
        {errors?.email && <InputFeedback label={errors?.email} />}
      </div>
      <div className="flex flex-col gap-[4px]  items-start">
        <Input
          className="bg-color-white"
          id="input-password"
          name="password"
          type="password"
          required={true}
          placeholder="Senha"
          //onChange={() => setRequestState(null)}
        />
        {errors?.password && <InputFeedback label={errors?.password} />}
      </div>
      <Button variant={ButtonVariant.PRIMARY} type="submit" className="w-full">
        Entrar
      </Button>
    </form>
  );
}
