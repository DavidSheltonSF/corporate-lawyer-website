'use client';

import { PropsWithChildren, useState } from 'react';
import { ServicesModalContext } from './ServicesModalContext';

export function ServicesModalProvider({children}: PropsWithChildren) {
  const [isOpen, setIsOpen] = useState(false);
  const [serviceAreaId, setServiceAreaId] = useState('kkk');

  return (
    <ServicesModalContext.Provider
      value={{ isOpen, setIsOpen, serviceAreaId, setServiceAreaId }}
    >{children}</ServicesModalContext.Provider>
  );
}
