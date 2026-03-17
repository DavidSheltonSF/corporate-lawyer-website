import { useState } from 'react';
import { DeleteClientModalContext } from './DeleteClientModalContext';
import { ClientCardOptionsModalContext } from './ClientCardOptionsModalContext';
import { UserIdentity } from '@/types/UserIdentity';
import { WithId } from '@/types/WithId';
import { UpdateClientModalContext } from './UpdateClientModalContext';

interface Props {
  children: React.ReactNode;
}

export function ClientCardModalsProvider({ children }: Props) {
  const [selectedClient, setSelectedClient] = useState<WithId<UserIdentity> | null>(null);
  const [clientCardOptionsIsOpen, setClientCardOptionsIsOpen] = useState(false);
  const [deleteClientIsOpen, setDeleteClientIsOpen] = useState(false);
  const [updateClientIsOpen, setUpdateClientIsOpen] = useState(false);
  return (
    <ClientCardOptionsModalContext.Provider
      value={{
        isOpen: clientCardOptionsIsOpen,
        setIsOpen: setClientCardOptionsIsOpen,
        selectedClient,
        setSelectedClient,
      }}
    >
      <UpdateClientModalContext.Provider
        value={{ isOpen: updateClientIsOpen, setIsOpen: setUpdateClientIsOpen, selectedClientId: selectedClient?.id || null }}
      >
        <DeleteClientModalContext.Provider
          value={{ isOpen: deleteClientIsOpen, setIsOpen: setDeleteClientIsOpen, selectedClient }}
        >
          {children}
        </DeleteClientModalContext.Provider>
      </UpdateClientModalContext.Provider>
    </ClientCardOptionsModalContext.Provider>
  );
}
