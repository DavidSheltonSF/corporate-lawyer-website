'use client';
import { PropsWithClassName } from '@/types/PropsWithClassName';
import { UploadIcon } from './icons/UploadIcon';
import { Button } from './ui/Button/Button';
import { twMerge } from 'tailwind-merge';

interface Props {
  handleClick: Function;
  disabled?: boolean;
}
export function OpenUploadModalButton({
  handleClick,
  disabled,
  className,
}: PropsWithClassName<Props>) {
  const baseStyles =
    'flex items-center px-[16px] py-[8px] gap-[8px] bg-color-white hover:brightness-95 border';
  return (
    <Button
      className={twMerge(baseStyles, className)}
      onClick={() => handleClick()}
      disabled={disabled}
    >
      <UploadIcon className="size-[24px]" />
      <span className="hidden min-md:block">Anexar arquivo</span>
    </Button>
  );
}
