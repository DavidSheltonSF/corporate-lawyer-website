import { VerticalMoreIcon } from '@/components/icons/VerticalMoreIcon';
import { Button } from '../Button/Button';
import { MouseEvent } from 'react';

interface Props {
  className: string
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

export function CardMoreButton({ onClick, className }: Props) {
  return (
    <Button
      className={className}
      onClick={onClick}
    >
      <VerticalMoreIcon className="size-[32px] stroke-color-black group-hover:invert" />
    </Button>
  );
}
