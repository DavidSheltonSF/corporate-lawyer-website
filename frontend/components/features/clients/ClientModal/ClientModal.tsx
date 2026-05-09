'use client';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { PrimaryModal } from '../../../ui/Modal/PrimaryModal';
import { FieldValue } from '../../../FieldValue';
import { CaseModalSkeleton } from '../../../modals/CaseModalSkeleton';
import { SafeUser } from '@/types/SafeUser';
import { getClientWithCases } from '@/services/users/getClientWithCases';
import { Case } from '@/types/Case';
import { handleLogout } from '@/lib/handleLogout';
import { UnauthorizedError } from '@/errors/UnauthorizedError';
import { ClientModalHeader } from './ClientModalHeader';
import { ClientModalInfo } from './ClientModalInfo';
import { ClientModalCases } from './ClientModalCases';

interface Props {
  clientId: string | null;
  isOpen: boolean;
  close: () => void;
  openRegisterCaseModal: () => void;
}

ClientModal.Header = ClientModalHeader;
ClientModal.Info = ClientModalInfo;
ClientModal.Cases = ClientModalCases;

export function ClientModal({ isOpen, close, clientId, openRegisterCaseModal }: Props) {
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
        if (error instanceof UnauthorizedError) {
          handleLogout();
        }
      }
    }

    function cleanClientDataOnClose() {
      if (isOpen) return;
      setClientData(null);
    }

    function resetStates() {
      setClientData(null);
      close;
    }

    fetchClientData();
    cleanClientDataOnClose();

    return () => {
      resetStates;
    };
  }, [isOpen]);

  return (
    isOpen && (
      <PrimaryModal
        additionalStyles={
          'fixed z-99999999999 top-[2%] left-1/2 translate-x-[-50%] w-[90%] min-lg:w-[880px] h-[90%] rounded-lg overflow-hidden shadow-[0px_0px__3px_black] text-color-black'
        }
        closeModal={close}
      >
        {loading || !clientData ? (
          <CaseModalSkeleton />
        ) : (
          <div className="flex flex-col size-full bg-color-white">
            <ClientModal.Header firstName={clientData.firstName} lastName={clientData.lastName} />
            <ClientModal.Info clientData={clientData} />
            <ClientModal.Cases
              cases={clientData.cases}
              openRegisterCaseModal={openRegisterCaseModal}
            />
          </div>
        )}
      </PrimaryModal>
    )
  );
}
