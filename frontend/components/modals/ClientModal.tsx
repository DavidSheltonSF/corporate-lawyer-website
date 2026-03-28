'use client';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { PrimaryModalWindow } from './PrimaryModalWindow';
import { FieldValue } from '../FieldValue';
import { CaseModalSkeleton } from './CaseModalSkeleton';
import { SafeUser } from '@/types/SafeUser';
import { Button } from '../Button';
import { getClientWithCases } from '@/services/getClientWithCases';
import { Case } from '@/types/Case';
import { reduceString } from '@/lib/reduceString';

interface Props {
  clientId: string | null;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  openRegisterCaseModal: Function;
}

export function ClientModal({ isOpen, setIsOpen, clientId, openRegisterCaseModal }: Props) {
  const [clientData, setClientData] = useState<(SafeUser & { cases: Case[] }) | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchClientData() {
      try {
        if (!isOpen || !clientId) return;
        setLoading(true);
        const clientFound = await getClientWithCases(clientId);
        setClientData(clientFound);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setIsOpen(false);
      }
    }

    function cleanClientDataOnClose() {
      if (isOpen) return;
      setClientData(null);
    }

    function resetStates() {
      setClientData(null);
      setIsOpen(false);
    }

    fetchClientData();
    cleanClientDataOnClose();

    return () => {
      resetStates;
    };
  }, [isOpen]);

  const renderClientCases = clientData?.cases.map((cas, index) => {
    return (
      <div
        key={index}
        className="flex flex-col gap-[8px] w-full border-[1px] p-[8px] rounded-[8px]"
      >
        <h1 className="font-bold ">{reduceString(cas.title, 24)}</h1>
        <div className="flex flex-col">{reduceString(cas.description || '', 70)}</div>
      </div>
    );
  });

  return (
    isOpen && (
      <PrimaryModalWindow
        additionalStyles={
          'fixed z-99999999999 top-[2%] left-1/2 translate-x-[-50%] w-[90%] min-lg:w-[880px] h-fit rounded-lg overflow-hidden shadow-[0px_0px__3px_black] text-color-black'
        }
        closeModal={() => {
          setIsOpen(false);
        }}
      >
        {loading || !clientData ? (
          <CaseModalSkeleton />
        ) : (
          <div className="flex flex-col size-full bg-color-white">
            <header className="w-full bg-color-primary p-[16px] border-t border-white/50">
              <h1 className="text-3xl text-color-white font-bold ">
                {clientData.firstName} {clientData.lastName}
              </h1>
            </header>
            <main className="flex flex-col w-full text-lg min-lg:text-xl">
              <div className="flex flex-col gap-[8px] border-b border-black/50 p-[16px]">
                <FieldValue field="Nomeº:" value={clientData.firstName} />
                <FieldValue field="Sobrenome:" value={clientData.lastName} />
                <FieldValue field="Email:" value={clientData.email} />
                <FieldValue field="CPF:" value={clientData.cpf} />
              </div>
              <div className="flex flex-col gap-[8px] border-b border-black/50">
                <div className="relative w-full bg-color-primary p-[16px]">
                  <h1 className="text-2xl font-bold text-color-white">Processos</h1>
                  <div className="absolute right-[16px] top-[50%] translate-y-[-50%]">
                    <Button onclick={() => openRegisterCaseModal()}>Adicionar Processo</Button>
                  </div>
                </div>
                <div className="flex flex-col gap-[24px] p-[24px] h-[224px] min-lg:h-[316px] overflow-auto">
                  {renderClientCases}
                </div>
              </div>
            </main>
          </div>
        )}
      </PrimaryModalWindow>
    )
  );
}
