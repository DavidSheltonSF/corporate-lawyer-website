'use client';

import { useState } from 'react';
import { ServicesModalContext } from './ServicesModalContext';
import { CaseModalContext } from './CaseModalContext';
import { CaseFilesUploadModalContext } from './CaseFilesUploadModalContext';

interface Props {
  children: React.ReactNode;
}

export function ModalsProvider({ children }: Props) {
  const [servicesModalIsOpen, setServicesModalIsOpen] = useState(false);
  const [serviceAreaId, setServiceAreaId] = useState('');
  const [caseModalIsOpen, setCaseModalIsOpen] = useState(false);
  const [caseFilesUploadModalIsOpen, setCaseFilesUploadModalIsOpen] = useState(false);

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
        <CaseModalContext.Provider
          value={{
            isOpen: caseModalIsOpen,
            setIsOpen: setCaseModalIsOpen,
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
      </ServicesModalContext.Provider>
    </div>
  );
}
