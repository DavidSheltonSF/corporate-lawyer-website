'use client';

import { useState } from 'react';
import { ServicesModalContext } from './ServicesModalContext';
import { CaseModalContext } from './CaseModalContext';
import { CaseFilesUploadModalContext } from './CaseFilesUploadModalContext';
import { ClientModalContext } from './ClientModalContext';

interface Props {
  children: React.ReactNode;
}

export function ModalsProvider({ children }: Props) {
  const [servicesModalIsOpen, setServicesModalIsOpen] = useState(false);
  const [serviceAreaId, setServiceAreaId] = useState('');
  const [caseModalIsOpen, setCaseModalIsOpen] = useState(false);
  const [caseModalOnClose, setCaseModalOnClose] = useState(null);
  const [caseFilesUploadModalIsOpen, setCaseFilesUploadModalIsOpen] = useState(false);
  const [clientModalIsOpen, setClientModalIsOpen] = useState(false);

  return (
    <div>
      <ServicesModalContext.Provider
        value={{
          isOpen: servicesModalIsOpen,
          setIsOpen: setServicesModalIsOpen,
          serviceAreaId,
          setServiceAreaId,
        }}
      >
        <ClientModalContext.Provider
          value={{
            isOpen: clientModalIsOpen,
            setIsOpen: setClientModalIsOpen,
          }}
        >
          <CaseModalContext.Provider
            value={{
              isOpen: caseModalIsOpen,
              setIsOpen: setCaseModalIsOpen,
              onClose: caseModalOnClose,
            }}
          >
            <CaseFilesUploadModalContext
              value={{
                isOpen: caseFilesUploadModalIsOpen,
                setIsOpen: setCaseFilesUploadModalIsOpen,
              }}
            >
              {children}
            </CaseFilesUploadModalContext>
          </CaseModalContext.Provider>
        </ClientModalContext.Provider>
      </ServicesModalContext.Provider>
    </div>
  );
}
