import { VerticalMoreIcon } from '@/components/icons/VerticalMoreIcon';
import { Button } from '../Button/Button';
import { CardDropdown } from '../CardDropdown';
import { CardAction } from '@/types/CardAction';
import { twMerge } from 'tailwind-merge';

interface Props {
  className?: string;
  onClick?: () => void;
  isDropdownOpen: boolean;
  openDropdown: () => void;
  closeDropdown: () => void;
  actions: CardAction[];
  children: React.ReactNode;
}

export function Card({
  actions,
  onClick,
  openDropdown,
  isDropdownOpen,
  closeDropdown,
  children,
  className,
}: Props) {
  function openActions() {
    openDropdown();
  }

  function renderDropdown() {
    if (isDropdownOpen) {
      return <CardDropdown actions={actions} close={closeDropdown} />;
    }
  }

  const hoverStyles = onClick ? 'cursor-pointer' : '';
  const baseStyles = 'relative flex flex-col bg-color-white rounded-[8px]';

  return (
    <article className={twMerge(baseStyles, hoverStyles, className)} onClick={onClick}>
      {renderDropdown()}
      <div className="absolute top-[8px] right-[8px]">
        <Button
          className="group flex justify-center items-center p-[4px] hover:bg-[var(--color-primary)] transition-[background] duration-300"
          onClick={(e) => {
            e.stopPropagation();
            openActions();
          }}
        >
          <VerticalMoreIcon className="size-[32px] stroke-color-black group-hover:invert" />
        </Button>
      </div>
      <div>{children}</div>
    </article>
  );
}
