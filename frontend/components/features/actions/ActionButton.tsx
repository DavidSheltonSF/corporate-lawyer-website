import { IconProps } from '@/components/icons/Icon';
import { Button } from '../../ui/Button/Button';
import React from 'react';
import { CardAction } from './types';

export function ActionButton({ Icon, label, action }: CardAction) {
  return (
    <Button
      className="flex gap-[8px] w-full py-[8px] px-[16px] bg-color-white hover:brightness-95"
      onclick={action}
    >
      <Icon className="size-[24px]" />
      <span className="flex justify-start">{label}</span>
    </Button>
  );
}
