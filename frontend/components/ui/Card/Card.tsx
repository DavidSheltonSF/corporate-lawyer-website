import { VerticalMoreIcon } from '@/components/icons/VerticalMoreIcon';
import { Button } from '../Button/Button';
import { CardDropdown } from '../CardDropdown/CardDropdown';
import { CardAction } from '@/components/ui/CardDropdown/types';
import { twMerge } from 'tailwind-merge';

interface Props {
  className?: string;
  onClick?: () => void;
  isDropdownOpen?: boolean;
  openDropdown?: () => void;
  closeDropdown?: () => void;
  actions?: CardAction[];
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
  function renderMoreButton() {
    if (!isDropdownOpen || !openDropdown || !closeDropdown || !actions) return;
    return (
      <Button
        className="group flex justify-center items-center p-[4px] hover:bg-[var(--color-primary)] transition-[background] duration-300"
        onClick={(e) => {
          e.stopPropagation();
          openDropdown && openDropdown();
        }}
      >
        <VerticalMoreIcon className="size-[32px] stroke-color-black group-hover:invert" />
      </Button>
    );
  }

  function renderDropdown() {
    if (!isDropdownOpen || !closeDropdown || !actions) return;
    return <CardDropdown actions={actions} close={closeDropdown} />;
  }

  const hoverStyles = onClick ? 'cursor-pointer' : '';
  const baseStyles = 'relative flex flex-col bg-color-white rounded-[8px]';

  return (
    <article className={twMerge(baseStyles, hoverStyles, className)} onClick={onClick}>
      {renderDropdown()}
      <div className="absolute top-[8px] right-[8px]">{renderMoreButton()}</div>
      <div>{children}</div>
    </article>
  );
}
