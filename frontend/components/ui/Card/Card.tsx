import { VerticalMoreIcon } from '@/components/icons/VerticalMoreIcon';
import { Button } from '../Button/Button';
import { CardDropdown } from '../CardDropdown/CardDropdown';
import { CardAction } from '@/components/ui/CardDropdown/types';
import { twMerge } from 'tailwind-merge';
import { useState } from 'react';

interface Props {
  className?: string;
  onClick?: () => void;
  actions?: CardAction[];
  children: React.ReactNode;
}

export function Card({
  actions,
  onClick,

  children,
  className,
}: Props) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  function renderMoreButton() {
    if (!actions) return;
    return (
      <Button
        className="group flex justify-center items-center p-[4px] hover:bg-[var(--color-primary)] transition-[background] duration-300"
        onClick={(e) => {
          e.stopPropagation();
          setIsDropdownOpen(true);
        }}
      >
        <VerticalMoreIcon className="size-[32px] stroke-color-black group-hover:invert" />
      </Button>
    );
  }

  function renderDropdown() {
    if (!isDropdownOpen || !actions) return;
    return <CardDropdown actions={actions} close={() => setIsDropdownOpen(false)} />;
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
