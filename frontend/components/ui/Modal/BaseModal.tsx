'use client';

import { useEffect, useRef } from 'react';
import { Button } from '../Button/Button';
import { CloseIcon } from '@/components/icons/CloseIcon';
import { twMerge } from 'tailwind-merge';
import { ButtonVariant } from '../Button/ButtonVariant';
import { PropsWithClassName } from '@/types/PropsWithClassName';
import { BaseModalFooter } from './BaseModalFooter';

interface Props {
  confirmButtonVariant?: ButtonVariant;
  confirmDisabled?: boolean;
  title?: string;
  formId?: string;
  onConfirm?: () => void;
  onClose: () => void;
  confirmText?: string;
  closeText?: string;
  omitFooter?: boolean;
  children: React.ReactNode;
}

BaseModal.Footer = BaseModalFooter;

export function BaseModal(props: PropsWithClassName<Props>) {
  const {
    confirmButtonVariant = ButtonVariant.PRIMARY,
    confirmDisabled = false,
    formId,
    onConfirm,
    onClose,
    confirmText = 'Confirmar',
    closeText = 'Voltar',
    children,
    title,
    className,
    omitFooter = false,
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

  const positionStyles = 'fixed top-[4vh] left-1/2 translate-x-[-50%] z-30';

  const baseStyles =
    'flex flex-col bg-color-white fade-in-animation-fast rounded-lg shadow-[0px_0px__3px_black] text-color-black';

  return (
    <div
      ref={modalRef}
      className={twMerge(baseStyles, positionStyles, className)}
      style={{ height: 'fit-content' }}
    >
      <div className="flex w-full border-divider bg-color-white px-[24px] py-[20px] rounded-t-[inherit]">
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
      <div className="size-full border-divider">{children}</div>
      {!omitFooter && (
        <BaseModal.Footer
          onClose={onClose}
          onConfirm={onConfirm}
          closeText={closeText}
          confirmText={confirmText}
          formId={formId}
          confirmButtonVariant={confirmButtonVariant}
          confirmDisabled={confirmDisabled}
        />
      )}
    </div>
  );
}
