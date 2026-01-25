'use client';
import { useContext } from 'react';
import { SecondaryModalWindow } from './SecondaryModalWindow';
import { ServiceDetailsModal } from './ServiceDetailsModal';
import { ServicesModalContext } from '@/contexts/modals/ServicesModalContext';
import { MissingContextError } from '@/errors/MissingContextError';

export function LawAreaServicesModal() {
  const context = useContext(ServicesModalContext);

  if (!context) {
    throw new MissingContextError('ServicesModalContext');
  }

  const { isOpen, setIsOpen, serviceAreaId } = context;

  return (
    isOpen && (
      <div
        className={`flex z-9999 fixed left-[50%] translate-x-[-50%] top-[10vh] w-[30rem] h-[25rem] rounded-xl border border-color-secondary overflow-hidden bg-green-200 fade-in-animation`}
      >
        <SecondaryModalWindow closeModal={() => setIsOpen(false)}>
          <ServiceDetailsModal serviceAreaId={serviceAreaId}></ServiceDetailsModal>
        </SecondaryModalWindow>
      </div>
    )
  );
}
