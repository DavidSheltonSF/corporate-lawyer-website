'use client';

import { useEffect, useRef } from 'react';
import { Button } from '../Button/Button';
import { CloseIcon } from '@/components/icons/CloseIcon';
import { twMerge } from 'tailwind-merge';

interface Props {
  title?: string;
  closeModal: Function;
  children: React.ReactNode;
  additionalStyles: string;
}

export function PrimaryModal(props: Props) {
  const { closeModal, children, title, additionalStyles } = props;
  const modalRef = useRef<HTMLDivElement>(null);

  function close() {
    if (!modalRef.current) return;
    modalRef.current.classList.add('fade-out-animation-fast');
    setTimeout(() => {
      closeModal();
    }, 300);
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const baseStyles =
    'flex flex-col z-20 fixed bg-color-white fade-in-animation-fast rounded-lg overflow-hidden shadow-[0px_0px__3px_black] text-color-black';

  return (
    <div ref={modalRef} className={twMerge(baseStyles, additionalStyles)}>
      <div className="flex items-center w-full  border-divider bg-color-white px-[24px] py-[8px]">
        <h3 className="font-bold">{title}</h3>
        <Button
          className="bg-color-white ml-auto p-[4px] brightness-95 hover:brightness-90"
          onClick={() => {
            close();
          }}
        >
          <CloseIcon className="w-[32px] h-[32px]" />
        </Button>
      </div>
      <div className="size-full overflow-y-auto">{children}</div>
    </div>
  );
}
