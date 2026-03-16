import { useState } from 'react';
import { DeleteClientModalContext } from './DeleteClientModalContext';
import { ClientCardOptionsModalContext } from './ClientCardOptionsModalContext';
import { UserIdentity } from '@/types/UserIdentity';
import { WithId } from '@/types/WithId';

interface Props {
  children: React.ReactNode;
}

export function ClientCardModalsProvider({ children }: Props) {
  const [selectedClient, setSelectedClient] = useState < WithId<UserIdentity> | null>(null);
  const [clientCardOptionsIsOpen, setClientCardOptionsIsOpen] = useState(false);
  const [deleteClientIsOpen, setDeleteClientIsOpen] = useState(false);
  return (
    <ClientCardOptionsModalContext.Provider
      value={{ isOpen: clientCardOptionsIsOpen, setIsOpen: setClientCardOptionsIsOpen, selectedClient, setSelectedClient }}
    >
      <DeleteClientModalContext.Provider
        value={{ isOpen: deleteClientIsOpen, setIsOpen: setDeleteClientIsOpen, selectedClient }}
      >
        {children}
      </DeleteClientModalContext.Provider>
    </ClientCardOptionsModalContext.Provider>
  );
}
