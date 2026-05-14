'use client';
import { Button } from './ui/Button/Button';

interface Props {
  handleClick: Function;
  disabled?: boolean;
}
export function OpenUploadModalButton({ handleClick, disabled }: Props) {
  return (
    <Button
      className="flex px-[16px] py-[8px] gap-[8px] size-full bg-color-white hover:brightness-95"
      onclick={() => handleClick()}
      disabled={disabled}
    >
      <img src="/icons/upload.svg" alt="" />
      <span className="hidden min-md:block">Adicionar Documento</span>
    </Button>
  );
}
