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
      darkHover
      onclick={() => {
        handleClick();
      }}
      textColor="var(--black-color)"
      width="100%"
    >
      <div className="flex gap-[8px]">
        <Icon width="24px" height="24px" />
        <span className="flex justify-start">{label}</span>
      </div>
    </Button>
  );
}
