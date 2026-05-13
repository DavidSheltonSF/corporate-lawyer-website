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
      <div className="absolute top-[8px] right-[8px] bg-inherit">
        <Button
          darkHover
          width="48px"
          height="48px"
          onclick={() => {
            close();
          }}
        >
          <span className="flex justify-center items-center size-full ">
            <CloseIcon color="var(--black-color)" width="100%" height="100%" />
          </span>
        </Button>
      </div>
      <div className="size-full overflow-y-auto">{children}</div>
    </div>
  );
}
