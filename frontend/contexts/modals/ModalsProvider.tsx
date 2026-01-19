'use client';

import { useState } from 'react';
import { ServicesModalContext } from './ServicesModalContext';
import { ModalWindow } from '@/components/ModalWindow';
import { ServiceDetailsModal } from '@/components/ServiceDetailsModal';

interface Props {
  children: React.ReactNode;
}

export function ModalsProvider({ children }: Props) {
  const [servicesModalIsOpen, setServicesModalIsOpen] = useState(false);
  const [serviceAreaId, setServiceAreaId] = useState('');

  return (
    <div>
      <ModalWindow modalIsOpen={servicesModalIsOpen} setModalIsOpen={setServicesModalIsOpen}>
        <ServiceDetailsModal serviceAreaId={serviceAreaId} />
      </ModalWindow>

      <ServicesModalContext.Provider
        value={{
          isOpen: servicesModalIsOpen,
          setIsOpen: setServicesModalIsOpen,
          serviceAreaId,
          setServiceAreaId,
        }}
      >
        {children}
      </ServicesModalContext.Provider>
    </div>
  );
}
