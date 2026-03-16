import { useState } from 'react';
import { DeleteClientModalContext } from './DeleteClientModalContext';
import { ClientCardOptionsModalContext } from './ClientCardOptionsModalContext';

interface Props {
  children: React.ReactNode;
}

export function ClientCardModalsProvider({ children }: Props) {
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null)
  const [clientCardOptionsIsOpen, setClientCardOptionsIsOpen] = useState(false);
  const [deleteClientIsOpen, setDeleteClientIsOpen] = useState(false);
  return (
    <ClientCardOptionsModalContext.Provider
      value={{ isOpen: clientCardOptionsIsOpen, setIsOpen: setClientCardOptionsIsOpen, selectedClientId, setSelectedClientId }}
    >
      <DeleteClientModalContext.Provider
        value={{ isOpen: deleteClientIsOpen, setIsOpen: setDeleteClientIsOpen, selectedClientId }}
      >
        {children}
      </DeleteClientModalContext.Provider>
    </ClientCardOptionsModalContext.Provider>
  );
}
