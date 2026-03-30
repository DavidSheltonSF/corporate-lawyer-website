'use client';

import { useState } from 'react';
import { UploadModalContext } from './UploadModalContext';
import { ServicesModalContext } from './ServicesModalContext';

interface Props {
  children: React.ReactNode;
}

export function ModalsProvider({ children }: Props) {
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
          {children}
        </UploadModalContext.Provider>
      </ServicesModalContext.Provider>
    </div>
  );
}
