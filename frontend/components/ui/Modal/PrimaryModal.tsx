'use client';

import { useEffect, useRef } from 'react';
import { Button } from '../Button/Button';
import { CloseIcon } from '@/components/icons/CloseIcon';
import { twMerge } from 'tailwind-merge';

interface Props {
  closeModal: Function;
  children: React.ReactNode;
  additionalStyles: string;
}

export function PrimaryModal(props: Props) {
  const { closeModal, children, additionalStyles } = props;
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
    'z-10 fixed bg-color-white fade-in-animation-fast rounded-lg overflow-hidden shadow-[0px_0px__3px_black] text-color-black';

  return (
    <div ref={modalRef} className={twMerge(baseStyles, additionalStyles)}>
      <div className="absolute top-[16px] right-[16px] bg-inherit">
        <Button
          className="p-[8px] bg-inherit hover:brightness-95"
          onclick={() => {
            close();
          }}
        >
          <CloseIcon className="w-[40px] h-[40px]" />
        </Button>
      </div>
      <div className="size-full overflow-y-auto">{children}</div>
    </div>
  );
}
