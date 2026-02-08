'use client';

import { useState } from 'react';
import { UploadModalContext } from './UploadModalContext';
import { ServicesModalContext } from './ServicesModalContext';
import { ServiceDetailsModal } from '@/components/modals/ServiceDetailsModal';
import { CaseModalContext } from './CaseModalContext';

interface Props {
  children: React.ReactNode;
}

export function ModalsProvider({ children }: Props) {
  const [caseModalIsOpen, setCaseModalIsOpen] = useState(false);
  const [caseId, setCaseId] = useState(null);
  const [uploadModalIsOpen, setUploadModalIsOpen] = useState(false);
  const [servicesModalIsOpen, setServicesModalIsOpen] = useState(false);
  const [serviceAreaId, setServiceAreaId] = useState('');

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
        <UploadModalContext.Provider
          value={{ isOpen: uploadModalIsOpen, setIsOpen: setUploadModalIsOpen }}
        >
          <CaseModalContext value={{ isOpen: caseModalIsOpen, setIsOpen: setCaseModalIsOpen, caseId, setCaseId }}>
            {children}
          </CaseModalContext>
        </UploadModalContext.Provider>
      </ServicesModalContext.Provider>
    </div>
  );
}
