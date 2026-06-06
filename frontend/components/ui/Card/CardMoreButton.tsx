import { VerticalMoreIcon } from '@/components/icons/VerticalMoreIcon';
import { Button } from '../Button/Button';
import { MouseEvent, Ref } from 'react';

interface Props {
  ref: Ref<HTMLButtonElement>;
  className: string;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

export function CardMoreButton({ ref, onClick, className }: Props) {
  return (
    <Button ref={ref} className={className} onClick={onClick}>
      <VerticalMoreIcon className="size-[32px] stroke-color-black group-hover:invert" />
    </Button>
  );
}
