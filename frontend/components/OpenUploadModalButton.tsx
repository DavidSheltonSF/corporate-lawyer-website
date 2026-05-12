'use client';
import { Button } from './ui/Button/Button';

interface Props {
  handleClick: Function;
  disabled?: boolean;
}
export function OpenUploadModalButton({ handleClick, disabled }: Props) {
  return (
    <div className="size-[48px] min-md:h-[48px] min-md:w-[200px]">
      <Button
      darkHover
        backgroundColor="var(--white-color)"
        height="100%"
        width="100%"
        onclick={() => handleClick()}
        disabled={disabled}
      >
        <span className="flex justify-center items-center size-full md:hidden">
          <img src="/icons/upload.svg" alt="" />
        </span>
        <span className="hidden md:block">Adicionar Documento</span>
      </Button>
    </div>
  );
}
