'use client';
import { UploadIcon } from './icons/UploadIcon';
import { Button } from './ui/Button/Button';

interface Props {
  handleClick: Function;
  disabled?: boolean;
}
export function OpenUploadModalButton({ handleClick, disabled }: Props) {
  return (
    <Button
      className="flex items-center px-[16px] py-[8px] gap-[8px] bg-color-white hover:brightness-95 border"
      onClick={() => handleClick()}
      disabled={disabled}
    >
      <UploadIcon className='size-[24px]'/>
      <span className="hidden min-md:block">Anexar arquivo</span>
    </Button>
  );
}
