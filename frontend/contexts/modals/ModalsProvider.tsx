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
  const [caseMosalIsOpen, setCaseModalIsOpen] = useState(false);
  const [caseFilesUploadModalIsOpen, setCaseFilesUploadModalIsOpen] = useState(false);

  const [selectedCaseId, setSelectedCaseId] = useState('');

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
            isOpen: caseMosalIsOpen,
            setIsOpen: setCaseModalIsOpen,
            selectedCaseId: selectedCaseId,
            setSelectedCaseId: setSelectedCaseId,
          }}
        >
          <CaseFilesUploadModalContext
            value={{
              selectedCaseId,
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
