import { CloseIcon } from '../icons/CloseIcon';
import { Button } from './Button/Button';

interface Props {
  label: string;
  onClear: () => void;
}

export function FilterTag({ label, onClear }: Props) {
  return (
    <div className="flex justify-between gap-[16px] h-fit w-fit cursor-pointer p-[16px] py-[8px] bg-color-white text-color-black rounded-full">
      <span>{label}</span>
      <Button
        className="p-0 bg-color-white hover:brightness-95"
        onClick={() => {
          onClear();
        }}
      >
        <CloseIcon className="size-[24px]" />
      </Button>
    </div>
  );
}
