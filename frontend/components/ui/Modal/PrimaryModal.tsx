'use client';

import { useEffect, useRef } from 'react';

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
    <div
      ref={modalRef}
      className={`flex flex-col bg-color-primary fade-in-animation-fast ${additionalStyles}`}
    >
      <div className="flex justify-end items-center h-[56px] pr-[8px]">
        <button
          className="size-[40px] cursor-pointer hover:bg-white/20 transition-[background-color] duration-300 rounded-lg"
          onClick={() => {
            close();
          }}
        >
          <img className="size-full" src="/icons/close.svg" alt="" />
        </button>
      </div>
      <div className="bg-color-white size-full overflow-y-auto">{children}</div>
    </div>
  );
}
