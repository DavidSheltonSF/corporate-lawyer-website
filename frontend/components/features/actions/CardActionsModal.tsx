'use client';
import { PrimaryModal } from '../../ui/Modal/PrimaryModal';
import { ActionButton } from './ActionButton';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { CardAction } from './types';

interface Props {
  data: { actions: CardAction[] };
  close: Function;
}

export function CardActionsModal({ data, close }: Props) {
  const { actions } = data;
  const isMobile = useMediaQuery('(max-width: 1024px)');

  const renderActions = actions.map((actionItem, index) => {
    const { Icon, label, action } = actionItem;
    return <ActionButton key={index} Icon={Icon} label={label} action={action} />;
  });

  return (
    isMobile && (
      <PrimaryModal
        additionalStyles="top-[15%] left-1/2 translate-x-[-50%] w-[90%] min-md:w-[400px] h-fit"
        closeModal={() => {
          close();
        }}
      >
        <div className="size-full flex flex-col text-center items-center justify-center gap-[8px] p-[8px]">
          <div className="flex flex-col w-full justify-around">{renderActions}</div>
        </div>
      </PrimaryModal>
    )
  );
}
