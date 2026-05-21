'use client';

import { useEffect, useRef } from 'react';
import { Button } from '../Button/Button';
import { CloseIcon } from '@/components/icons/CloseIcon';
import { twMerge } from 'tailwind-merge';
import { ButtonVariant } from '../Button/ButtonVariant';
import { PropsWithClassName } from '@/types/PropsWithClassName';

interface Props {
  confirmButtonVariant?: ButtonVariant;
  title?: string;
  formId?: string;
  onConfirm?: () => void;
  onClose: Function;
  confirmText?: string;
  closeText?: string;
  children: React.ReactNode;
}

export function BaseModal(props: PropsWithClassName<Props>) {
  const {
    confirmButtonVariant = ButtonVariant.PRIMARY,
    formId,
    onConfirm,
    onClose,
    confirmText = 'Confirmar',
    closeText = 'Voltar',
    children,
    title,
    className,
  } = props;
  const modalRef = useRef<HTMLDivElement>(null);

  function close() {
    if (!modalRef.current) return;
    modalRef.current.classList.add('fade-out-animation-fast');
    setTimeout(() => {
      onClose();
    }, 200);
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  function renderFooterButtons() {
    return (
      <div className="flex justify-end items-center gap-[16px]">
        <Button variant={ButtonVariant.SECONDARY} onClick={() => onClose()}>
          {closeText}
        </Button>
        {(onConfirm || formId) && (
          <Button
            form={formId}
            type={formId ? 'submit' : 'button'}
            variant={confirmButtonVariant}
            onClick={onConfirm}
          >
            {confirmText}
          </Button>
        )}
      </div>
    );
  }

  const positionStyles = 'fixed top-[4vh] left-1/2 translate-x-[-50%] z-20';
  const sizeStyles = 'h-fit';
  const baseStyles =
    'flex flex-col bg-color-white fade-in-animation-fast rounded-lg overflow-hidden shadow-[0px_0px__3px_black] text-color-black';

  return (
    <div ref={modalRef} className={twMerge(baseStyles, positionStyles, sizeStyles, className)}>
      <div className="flex w-full border-divider bg-color-white px-[24px] py-[20px]">
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
      <div className="flex-1 h-fit overflow-y-auto min-lg:overflow-y-visible border-divider">
        {children}
      </div>
      <footer className="py-[16px] px-[24px]">{renderFooterButtons()}</footer>
    </div>
  );
}
