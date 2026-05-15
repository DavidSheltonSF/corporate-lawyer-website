import { VerticalMoreIcon } from '@/components/icons/VerticalMoreIcon';
import { Button } from '../Button/Button';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { CardDropdown } from '../CardDropdown';
import { useModal } from '@/hooks/useModal';
import { CardAction } from '@/components/features/actions/types';

interface Props {
  className?: string;
  openCardModal: () => void;
  isDropdownOpen: boolean;
  openDropdown: () => void;
  closeDropdown: () => void;
  actions: CardAction[];
  children: React.ReactNode;
}

export function Card({
  actions,
  openCardModal,
  openDropdown,
  isDropdownOpen,
  closeDropdown,
  children,
  className,
}: Props) {
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const { openModal } = useModal();

  function openActions() {
    isDesktop ? openDropdown() : openModal('mobile-actions', { actions });
  }

  function renderDropdown() {
    if (isDropdownOpen) {
      return <CardDropdown actions={actions} close={closeDropdown} />;
    }
  }

  return (
    <article
      className={`relative flex flex-col bg-color-white rounded-[8px] ${className}`}
      onClick={openCardModal}
    >
      {renderDropdown()}
      <div className="absolute top-[8px] right-[8px]">
        <Button
          className="group flex justify-center items-center p-[4px] hover:bg-[var(--color-primary)] transition-[background] duration-300"
          onclick={(e) => {
            e.stopPropagation();
            openActions();
          }}
        >
          <VerticalMoreIcon className="size-[32px] fill-color-black group-hover:invert" />
        </Button>
      </div>
      <div>{children}</div>
    </article>
  );
}
