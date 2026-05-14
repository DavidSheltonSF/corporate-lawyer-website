'use client';

import { useEffect, useRef } from 'react';
import { Button } from '../Button/Button';
import { CloseIcon } from '@/components/icons/CloseIcon';

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

  return (
    <div ref={modalRef} className={`bg-color-white fade-in-animation-fast ${additionalStyles}`}>
      <div className="absolute top-[16px] right-[16px] bg-inherit">
        <Button
          className="p-[8px] bg-inherit hover:brightness-95"
          onclick={() => {
            close();
          }}
        >
          <CloseIcon color="var(--black-color)" width="32px" height="32px" />
        </Button>
      </div>
      <div className="size-full overflow-y-auto">{children}</div>
    </div>
  );
}
