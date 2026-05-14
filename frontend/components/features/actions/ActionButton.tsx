import { IconProps } from '@/components/icons/Icon';
import { Button } from '../../ui/Button/Button';
import React from 'react';

interface Props {
  Icon: React.ComponentType<IconProps>;
  label: string;
  handleClick: () => void;
}
export function ActionButton({ Icon, label, handleClick }: Props) {
  return (
    <Button
      className="flex gap-[8px] w-full py-[8px] px-[16px] bg-color-white hover:brightness-95"
      onclick={() => {
        handleClick();
      }}
    >
      <Icon width="24px" height="24px" />
      <span className="flex justify-start">{label}</span>
    </Button>
  );
}
